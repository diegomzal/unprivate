const Joi = require('joi');

const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().port().default(3000),
    REDIS_URL: Joi.string().required(),
}).unknown();

const validateEnv = () => {
    const { error, value } = envSchema.validate(process.env);
    
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    
    return value;
};

module.exports = validateEnv;