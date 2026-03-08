const natural = require('natural');
const TfIdf = natural.TfIdf;

const calculateSimilarity = (text1, text2) => {
    const tfidf = new TfIdf();
    tfidf.addDocument(text1);
    tfidf.addDocument(text2);

    const vec1 = {};
    const vec2 = {};

    const terms = new Set();

    tfidf.listTerms(0).forEach(item => {
        vec1[item.term] = item.tfidf;
        terms.add(item.term);
    });

    tfidf.listTerms(1).forEach(item => {
        vec2[item.term] = item.tfidf;
        terms.add(item.term);
    });

    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    terms.forEach(term => {
        const v1 = vec1[term] || 0;
        const v2 = vec2[term] || 0;
        dotProduct += v1 * v2;
        mag1 += v1 * v1;
        mag2 += v2 * v2;
    });

    const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
    if (magnitude === 0) return 0;

    return (dotProduct / magnitude) * 100;
};

const extractSkills = (text, skillLibrary) => {
    const found = [];
    const lowercaseText = text.toLowerCase();

    skillLibrary.forEach(skill => {
        if (lowercaseText.includes(skill.name.toLowerCase())) {
            found.push(skill);
        }
    });

    return found;
};

module.exports = { calculateSimilarity, extractSkills };
