const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key');
        console.log('Login successful for user:', email);
        res.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get current user
router.get('/me', auth, async (req, res) => {
    try {
        console.log('Fetching user data for:', req.user.userId);
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User found:', user);
        res.json(user);
    } catch (error) {
        console.error('Error in /me endpoint:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = router; 