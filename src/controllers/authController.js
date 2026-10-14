const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please include all parameters (name, email, password)');
        }

        const userExists = await User.findByEmail(email);
        if (userExists) {
            res.status(400);
            throw new Error('User account already exists with that email profile');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            success: true,
            data: { name: newUser.name, email: newUser.email, token: generateToken(newUser.email) }
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                success: true,
                data: { name: user.name, email: user.email, token: generateToken(user.email) }
            });
        } else {
            res.status(401);
            throw new Error('Invalid email access credentials or password configuration mismatch');
        }
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Secure transaction access granted.",
            user: req.user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, getUserProfile };