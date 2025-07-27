const express = require('express');

const router = express.Router();

function createNoteRoutes(redis, io) {
    router.get('/:key', async (req, res) => {
        try {
            const key = req.params.key;
            if (!key || key.length > 128) return res.status(400).send('Invalid key');
            const response = await redis.hgetall(key);
            res.json({ key, value: response?.value || '', updatedAt: response?.updated_at || null });
        } catch (err) {
            console.error('Error fetching entry:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    router.post('/:key', async (req, res) => {
        try {
            const key = req.params.key;
            const value = req.body.value;
            const socketId = req.body.socketId;
            if (!key || key.length > 128) return res.status(400).send('Invalid key');
            if (typeof value !== 'string') return res.status(400).send('Invalid value');
            const updatedAt = new Date().toISOString();
            await redis.hset(key, {
                value: value,
                updated_at: updatedAt
            })
            io.to(key).except(socketId).emit('note_updated', { key });
            res.json({ success: true, updatedAt: updatedAt });
        } catch (err) {
            console.error('Error creating/updating entry:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    return router;
}

module.exports = createNoteRoutes;