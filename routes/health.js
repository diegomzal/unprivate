const express = require('express');
const router = express.Router();

function createHealthRoutes(redis) {
    router.get('/', async (req, res) => {
        const health = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            checks: {
                redis: 'unknown'
            }
        };

        try {
            await redis.ping();
            health.checks.redis = 'healthy';
        } catch (error) {
            health.checks.redis = 'unhealthy';
            health.status = 'degraded';
        }

        const statusCode = health.status === 'ok' ? 200 : 503;
        res.status(statusCode).json(health);
    });

    return router;
}

module.exports = createHealthRoutes;