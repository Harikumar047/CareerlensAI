const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    resumeText: String,
    jdText: String,
    score: { type: Number, required: true },
    matchedSkills: [String],
    missingSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analysis', analysisSchema);
