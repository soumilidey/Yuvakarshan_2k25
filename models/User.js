
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    city: String,
    role: { type: String, enum: ['donor', 'receiver'] },
    foodDetails: String,
    balance: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    totalOrders: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
