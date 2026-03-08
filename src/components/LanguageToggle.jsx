import React from 'react';

const LanguageToggle = ({ language, setLanguage, t }) => {
    return (
        <div className="fixed top-6 right-6 z-50">
            <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg border-2 border-white transition-all transform hover:scale-105 active:scale-95 text-lg"
                style={{ minHeight: '52px', minWidth: '120px' }}
            >
                {t.hindiToggle} 🇮🇳
            </button>
        </div>
    );
};

export default LanguageToggle;
