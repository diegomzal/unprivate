const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);

    let error = {
        message: 'Internal Server Error',
        status: 500
    };

    if (err.code === 'ECONNREFUSED') {
        error.message = 'Database connection failed';
        error.status = 503;
    }

    if (err.name === 'ValidationError') {
        error.message = 'Invalid input data';
        error.status = 400;
    }

    if (err.status === 429) {
        error.message = 'Too many requests';
        error.status = 429;
    }

    const response = {
        error: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(error.status).json(response);
};

module.exports = errorHandler;