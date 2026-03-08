import React, { useState, useEffect } from 'react';

const VoiceAssistant = ({ speak, onVoiceCommand, t }) => {
    const [isListening, setIsListening] = useState(false);
    const [showPulse, setShowPulse] = useState(false);

    const toggleListening = () => {
        if (!isListening) {
            setIsListening(true);
            setShowPulse(true);
            speak(t.lang === 'hi' ? "मैं सुन रही हूँ, बताइए" : "I am listening, please speak");

            // Mock voice command processing after 3 seconds
            setTimeout(() => {
                setIsListening(false);
                setShowPulse(false);
                onVoiceCommand?.();
            }, 3500);
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-50">
            <div className="relative group">
                {showPulse && (
                    <>
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 scale-150"></div>
                        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-10 scale-200 delay-300"></div>
                    </>
                )}

                <button
                    onClick={toggleListening}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-90
            ${isListening ? 'bg-blue-600 ring-8 ring-blue-600/20' : 'bg-slate-900 border border-slate-700 hover:border-blue-500'}
          `}
                >
                    {isListening ? '🎙️' : '💡'}

                    <div className="absolute -top-12 right-0 bg-white text-slate-900 font-black text-[10px] px-3 py-1 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                        Voice Help
                    </div>
                </button>
            </div>
        </div>
    );
};

export default VoiceAssistant;
