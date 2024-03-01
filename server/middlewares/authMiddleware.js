const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const protectRoute = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.employee = await Employee.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ error: 'No token provided' });
    }
};

module.exports = {
    protectRoute,
};
