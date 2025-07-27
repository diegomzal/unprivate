const Redis = require("ioredis");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('node:http');
const { rateLimit } = require('express-rate-limit');
const { Server } = require("socket.io");
const createNoteRoutes = require('./routes/note');

dotenv.config();

const allowedOrigins = ['http://localhost:5173', 'https://unprivate-frontend.vercel.app'];
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: allowedOrigins } });
const redis = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false
})

app.get('/health', (req, res) => {
    res.send('OK');
});

app.use(cors({
	origin: allowedOrigins,
	credentials: false,
	methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use(express.json());
app.use(limiter);

app.use('/api/note', createNoteRoutes(redis, io));

function emitLiveStatus(key) {
  const room = io.sockets.adapter.rooms.get(key);
  const count = room ? room.size : 0;
  io.to(key).emit('live', count > 1);
}

io.on('connection', (socket) => {
  socket.joinedKeys = new Set();

  socket.on('subscribe_key', (key) => {
    console.log(`Socket ${socket.id} subscribing to key: ${key}`);
    if (typeof key !== 'string' || key.length > 128) return;
    socket.join(key);
    socket.joinedKeys.add(key);
    emitLiveStatus(key);
  });

  socket.on('unsubscribe_key', (key) => {
    console.log(`Socket ${socket.id} unsubscribing from key: ${key}`);
    if (typeof key !== 'string' || key.length > 128) return;
    socket.leave(key);
    socket.joinedKeys.delete(key);
    emitLiveStatus(key);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
    for (const key of socket.joinedKeys) {
      emitLiveStatus(key);
    }
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});