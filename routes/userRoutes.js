const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, name, email, password, city, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ error: 'Username already taken' });

        const newUser = new User({
            username,
            name,
            email,
            password,
            city,
            role,
            balance: 0,
            totalOrders: 0,
            lastActive: new Date()
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) return res.status(404).json({ error: 'Invalid credentials' });

        // Update lastActive timestamp after login
        user.lastActive = new Date();
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search users by city and role (match with opposite role)
router.get('/search/:city/:role', async (req, res) => {
    const { city, role } = req.params;
    const oppositeRole = role === 'donor' ? 'receiver' : 'donor';
    const twentyHoursAgo = new Date(Date.now() - 20 * 60 * 60 * 1000);

    try {
        const users = await User.find({
            city,
            role: oppositeRole,
            lastActive: { $gte: twentyHoursAgo }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leaderboard route (top 10 users by orders)
router.get('/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find().sort({ totalOrders: -1 }).limit(10);
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Donation Submission Route 
router.put('/add-balance/:username', async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { $inc: { balance: amount }, lastActive: new Date() },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Food Request Submission 
router.post('/receive-food/:username', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { $inc: { totalOrders: 1 }, lastActive: new Date() },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
