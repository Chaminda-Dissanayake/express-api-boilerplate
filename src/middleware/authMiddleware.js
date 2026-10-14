const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ');
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = decoded;
            return next();
        } catch (error) {
            res.status(401);
            return next(new Error('Not authorized, token validation failed'));
        }
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, missing security token'));
    }
};

module.exports = protect;