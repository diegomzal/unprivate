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

io.on('connection', (socket) => {
  socket.on('subscribe_key', (key) => {
    socket.join(key);
  });

  socket.on('unsubscribe_key', (key) => {
    socket.leave(key);
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});