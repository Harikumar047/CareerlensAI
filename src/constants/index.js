export const EDUCATION_LEVELS = [
    "10th Pass",
    "12th Pass",
    "ITI / Diploma",
    "B.Com / Any Graduate",
    "Post Graduate"
];

export const SKILL_OPTIONS = [
    "Basic Computer",
    "Smartphone usage",
    "Excel",
    "Tally",
    "Hindi",
    "English",
    "Local Language",
    "Public Speaking",
    "Farming Knowledge",
    "Hardware",
    "Data Entry",
    "Communication"
];

export const SECTORS = [
    { id: "Education", icon: "📚", hindi: "शिक्षा" },
    { id: "Finance", icon: "💰", hindi: "वित्त" },
    { id: "Agriculture", icon: "🌾", hindi: "कृषि" },
    { id: "Healthcare", icon: "🏥", hindi: "स्वास्थ्य सेवा" },
    { id: "Energy", icon: "⚡", hindi: "ऊर्जा" },
    { id: "Technology", icon: "💻", hindi: "तकनीकी" }
];

export const LOCATIONS = [
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
    "Darbhanga",
    "Purnia"
];

export const SCORING_WEIGHTS = {
    SKILLS: 0.5,
    EDUCATION: 0.25,
    SECTOR: 0.20,
    LOCATION: 0.05
};

export const DIVERSITY_WEIGHTS = [
    { type: 'near_home', weight: 0.4 },
    { type: 'best_learning', weight: 0.3 },
    { type: 'good_certificate', weight: 0.3 }
];
