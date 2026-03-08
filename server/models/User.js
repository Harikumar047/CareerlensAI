const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isPro: { type: Boolean, default: false },
    scansRemaining: { type: Number, default: 3 },
    lastReset: { type: Date, default: Date.now },
    stripeCustomerId: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
