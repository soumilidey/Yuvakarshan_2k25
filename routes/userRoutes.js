
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { username, name, email, password, city, role } = req.body;
    try {
        const newUser = new User({ username, name, email, password, city, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) return res.status(404).json({ error: 'Invalid credentials' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search/:city/:role', async (req, res) => {
    const { city, role } = req.params;
    const oppositeRole = role === 'donor' ? 'receiver' : 'donor';
    const twentyHoursAgo = new Date(Date.now() - 20 * 60 * 60 * 1000);
    try {
        const users = await User.find({ city, role: oppositeRole, lastActive: { $gte: twentyHoursAgo } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find().sort({ totalOrders: -1 }).limit(10);
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/add-balance/:username', async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findOneAndUpdate({ username: req.params.username }, { $inc: { balance: amount } }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/receive-food/:username', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.params.username }, { $inc: { totalOrders: 1 }, lastActive: new Date() }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
