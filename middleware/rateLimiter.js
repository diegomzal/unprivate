const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    message: 'Too many requests from this IP',
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

const noteKeyLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 30, 
    keyGenerator: (req) => `${ipKeyGenerator(req.ip)}:${req.params.key}`,
    message: 'Too many requests for this key',
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

module.exports = {
    globalLimiter,
    noteKeyLimiter
};