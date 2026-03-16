const jwt = require('jsonwebtoken');
const User = require('../api/models/user.model');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ error: true, message: 'Authentication required' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        const user = await User.findOne({ _id: decoded.userId }).select('-password');

        if (!user) {
            res.status(401).json({ error: true, message: 'User not found' });
            return;
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            res.status(401).json({ error: true, message: 'Authentication required' });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: true, message: 'Forbidden' });
            return;
        }

        next();
    };
};

module.exports = { authenticate, authorize };