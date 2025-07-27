const express = require('express');
const Joi = require('joi');

const router = express.Router();

const keySchema = Joi.string().max(128).pattern(/^[\w\d\s!@#$%^&*()\-_=+\[\]{};:'",.<>?|~`]*$/).required();
const valueSchema = Joi.string().max(1000000).allow('').required();
const socketIdSchema = Joi.string().optional();

const validateKey = (key) => {
    const { error } = keySchema.validate(key);
    return error;
};

const validateNoteData = (data) => {
    const schema = Joi.object({
        value: valueSchema,
        socketId: socketIdSchema
    });
    return schema.validate(data);
};

function createNoteRoutes(redis, socketService) {
    router.get('/:key', async (req, res) => {
        try {
            const key = req.params.key;

            const keyError = validateKey(key);
            if (keyError) {
                return res.status(400).json({
                    error: 'Invalid key format',
                    details: keyError.details[0].message
                });
            }

            const response = await redis.hgetall(key);
            res.json({
                key,
                value: response?.value || '',
                updatedAt: response?.updated_at || null
            });

        } catch (err) {
            console.error('Error fetching note:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post('/:key', async (req, res) => {
        try {
            const key = req.params.key;

            const keyError = validateKey(key);
            if (keyError) {
                return res.status(400).json({
                    error: 'Invalid key format',
                    details: keyError.details[0].message
                });
            }

            const { error, value: validatedData } = validateNoteData(req.body);
            if (error) {
                return res.status(400).json({
                    error: 'Invalid request data',
                    details: error.details[0].message
                });
            }

            const { value, socketId } = validatedData;
            const updatedAt = new Date().toISOString();

            await redis.hset(key, {
                value: value,
                updated_at: updatedAt
            })

            socketService.notifyNoteUpdate(key, socketId);
            res.json({ success: true, updatedAt: updatedAt });

        } catch (err) {
            console.error('Error creating/updating note:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}

module.exports = createNoteRoutes;