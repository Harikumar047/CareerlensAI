const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    category: { type: String, required: true },
    timeWeeks: { type: Number, required: true },
    hoursPerWeek: { type: Number, required: true },
    readyPct: { type: Number, default: 0 },
    courses: [{
        title: String,
        url: String,
        platform: String,
        free: Boolean,
        hours: Number
    }],
    companies: [String],
    color: { type: String, default: '#00e5ff' }
});

module.exports = mongoose.model('Skill', skillSchema);
