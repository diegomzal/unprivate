const Redis = require("ioredis");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('node:http');
const { Server } = require("socket.io");

const validateEnv = require('./config/env');
const SocketService = require('./services/socketService');
const { globalLimiter, noteKeyLimiter } = require('./middleware/rateLimiter');
const createHealthRoutes = require('./routes/health');
const createNoteRoutes = require('./routes/note');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

let config;
try {
  config = validateEnv();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

const allowedOrigins = ['http://localhost:5173', 'https://unprivate-frontend.vercel.app'];
const PORT = config.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: allowedOrigins } });

const redis = new Redis(config.REDIS_URL, {
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

const socketService = new SocketService(io);

app.use(cors({
	origin: allowedOrigins,
	credentials: false,
	methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use(express.json({limit: '1mb'}));
app.use(globalLimiter);

app.use('/health', createHealthRoutes(redis));
app.use('/api/note', noteKeyLimiter, createNoteRoutes(redis, socketService));

app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
