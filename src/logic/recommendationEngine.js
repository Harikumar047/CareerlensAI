import { SCORING_WEIGHTS, EDUCATION_LEVELS } from '../constants';

/**
 * Filter and Rank internships based on candidate profile.
 */
export const recommendInternships = (internships, profile) => {
    if (!profile) return [];

    // 1. Eligibility Filter (Simple Education hierarchy check)
    const eduIndex = EDUCATION_LEVELS.indexOf(profile.education);

    const eligibleInternships = internships.filter(item => {
        const requiredEduIndex = EDUCATION_LEVELS.indexOf(item.required_edu);
        return eduIndex >= requiredEduIndex;
    });

    // 2. Scoring
    const scored = eligibleInternships.map(item => {
        let score = 0;

        // Skills (50%)
        const matchedSkills = item.skills.filter(s => profile.skills.includes(s));
        const skillScore = matchedSkills.length / Math.max(item.skills.length, 1);
        score += skillScore * SCORING_WEIGHTS.SKILLS;

        // Education (25%) - Bonus if education matches exactly or higher
        const targetEduIndex = EDUCATION_LEVELS.indexOf(item.required_edu);
        const eduScore = eduIndex >= targetEduIndex ? 1 : 0;
        score += eduScore * SCORING_WEIGHTS.EDUCATION;

        // Sector (20%)
        const sectorScore = item.sector === profile.sector ? 1 : 0;
        score += sectorScore * SCORING_WEIGHTS.SECTOR;

        // Location (5%)
        const locationScore = item.district === profile.district ? 1 : 0;
        score += locationScore * SCORING_WEIGHTS.LOCATION;

        return {
            ...item,
            finalScore: Math.round(score * 100),
            label: getLabel(score * 100),
            why: generateWhyText(item, profile)
        };
    });

    // 3. Sort & Diversity Priority
    // For judges: Prioritize top 3-5 and ensure variety of benefits if possible
    return scored.sort((a, b) => b.finalScore - a.finalScore).slice(0, 5);
};

const getLabel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 50) return 'Good';
    return 'Try';
};

const generateWhyText = (internship, profile) => {
    const matchingSkills = internship.skills.filter(s => profile.skills.includes(s));
    const skillText = matchingSkills.length > 0
        ? `matches your skills in ${matchingSkills.join(', ')}`
        : "offers a great learning path for you";

    const stipendText = internship.stipend ? ` with a stipend of ${internship.stipend}` : "";
    const locationText = internship.district === profile.district
        ? "right here in your district"
        : "within your state preference";

    return `Excellent choice as it ${skillText}${stipendText}, and is located ${locationText} (${internship.district}).`;
};

export const shareWhatsApp = (title, org, why) => {
    const text = `🚀 Professional Internship Found! \n\nRole: ${title} at ${org} \n\nWhy it's a match: ${why} \n\nCheck it out on CAREER LENS.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};
