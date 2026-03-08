import { useCallback } from 'react';

export const useAudio = (language) => {
    const speak = useCallback((text) => {
        if (!window.speechSynthesis) {
            console.warn("Speech synthesis not supported in this browser.");
            return;
        }

        // Cancel mapping if any
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.9; // Slightly slower for clarity

        window.speechSynthesis.speak(utterance);
    }, [language]);

    return { speak };
};
