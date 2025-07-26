const Redis = require("ioredis");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit')
const createNoteRoutes = require('./routes/note');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/api/note', createNoteRoutes(redis))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});