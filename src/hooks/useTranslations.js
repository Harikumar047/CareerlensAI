import { useState, useCallback } from 'react';

const translations = {
    en: {
        title: "CAREER LENS",
        subtitle: "PM Internship Recommendation Engine",
        step1: "Education",
        step2: "Skills",
        step3: "Sector",
        step4: "Location",
        findMatches: "Find Matches",
        back: "Back",
        resultsTitle: "Your Matches",
        whyFits: "Why this fits you",
        share: "Share with Parents",
        educationLabel: "What have you studied?",
        skillsLabel: "What do you know?",
        sectorLabel: "Which area interests you?",
        locationLabel: "Where do you live?",
        highMatch: "Perfect Match",
        goodMatch: "Good Match",
        tryMatch: "Try applying",
        hindiToggle: "हिंदी"
    },
    hi: {
        title: "कैरियर लेंस",
        subtitle: "पीएम इंटर्नशिप अनुशंसा इंजन",
        step1: "शिक्षा",
        step2: "कौशल",
        step3: "क्षेत्र",
        step4: "स्थान",
        findMatches: "मैच खोजें",
        back: "पीछे",
        resultsTitle: "आपके मैच",
        whyFits: "यह आपके लिए क्यों सही है",
        share: "माता-पिता के साथ साझा करें",
        educationLabel: "आपने क्या पढ़ाई की है?",
        skillsLabel: "आप क्या जानते हैं?",
        sectorLabel: "कौन सा क्षेत्र आपकी रुचि का है?",
        locationLabel: "आप कहाँ रहते हैं?",
        highMatch: "एकदम सही",
        goodMatch: "अच्छा मैच",
        tryMatch: "कोशिश करें",
        hindiToggle: "English"
    }
};

export const useTranslations = (lang) => {
    return translations[lang] || translations.en;
};
