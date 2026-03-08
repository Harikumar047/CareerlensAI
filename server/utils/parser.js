const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');
const path = require('path');

const extractText = async (file) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension === '.pdf') {
        const data = await pdf(file.buffer);
        return data.text;
    } else if (['.png', '.jpg', '.jpeg'].includes(extension)) {
        const { data: { text } } = await Tesseract.recognize(file.buffer, 'eng');
        return text;
    } else if (extension === '.txt') {
        return file.buffer.toString('utf-8');
    }

    throw new Error('Unsupported file format');
};

module.exports = { extractText };
