import React, { useState } from 'react';
import { EDUCATION_LEVELS, SKILL_OPTIONS, SECTORS, LOCATIONS } from '../constants';

const InputForm = ({ profile, setProfile, onFind, t, speak }) => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
        else onFind();
    };

    const prevStep = () => setStep(step - 1);

    const toggleSkill = (skill) => {
        const newSkills = profile.skills.includes(skill)
            ? profile.skills.filter(s => s !== skill)
            : [...profile.skills, skill];
        setProfile({ ...profile, skills: newSkills });
    };

    return (
        <div className="w-full max-w-xl mx-auto glass-card">
            {/* Progress */}
            <div className="flex justify-between mb-8">
                {[1, 2, 3, 4].map(s => (
                    <div
                        key={s}
                        className={`h-2 flex-1 mx-1 rounded-full transition-all ${step >= s ? 'bg-blue-500' : 'bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Step 1: Education */}
            {step === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2
                        className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
                        onClick={() => speak(t.educationLabel)}
                    >
                        🎓 {t.educationLabel} <span className="text-xl">🔈</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {EDUCATION_LEVELS.map(edu => (
                            <button
                                key={edu}
                                onClick={() => {
                                    setProfile({ ...profile, education: edu });
                                    nextStep();
                                }}
                                className={`p-4 text-left rounded-2xl border-2 transition-all text-xl font-semibold shadow-sm
                  ${profile.education === edu ? 'bg-blue-600 border-white text-white' : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'}
                `}
                                style={{ minHeight: '64px' }}
                            >
                                {edu}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Skills */}
            {step === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2
                        className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
                        onClick={() => speak(t.skillsLabel)}
                    >
                        🛠️ {t.skillsLabel} <span className="text-xl">🔈</span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {SKILL_OPTIONS.map(skill => (
                            <button
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={`px-6 py-4 rounded-full border-2 transition-all text-lg font-bold shadow-md
                  ${profile.skills.includes(skill) ? 'bg-green-600 border-white text-white' : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'}
                `}
                                style={{ minHeight: '52px' }}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={nextStep}
                        className="mt-6 p-4 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-lg"
                    >
                        {t.next || "Next"} →
                    </button>
                </div>
            )}

            {/* Step 3: Sector */}
            {step === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2
                        className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
                        onClick={() => speak(t.sectorLabel)}
                    >
                        🏭 {t.sectorLabel} <span className="text-xl">🔈</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {SECTORS.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => {
                                    setProfile({ ...profile, sector: sec.id });
                                    nextStep();
                                }}
                                className={`p-6 flex flex-col items-center gap-3 rounded-2xl border-2 transition-all shadow-md
                  ${profile.sector === sec.id ? 'bg-blue-600 border-white text-white' : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'}
                `}
                            >
                                <span className="text-4xl">{sec.icon}</span>
                                <span className="text-lg font-bold">{t.lang === 'hi' ? sec.hindi : sec.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 4: Location */}
            {step === 4 && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2
                        className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
                        onClick={() => speak(t.locationLabel)}
                    >
                        📍 {t.locationLabel} <span className="text-xl">🔈</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {LOCATIONS.map(loc => (
                            <button
                                key={loc}
                                onClick={() => {
                                    setProfile({ ...profile, district: loc });
                                    nextStep();
                                }}
                                className={`p-4 rounded-2xl border-2 transition-all text-xl font-bold shadow-md
                  ${profile.district === loc ? 'bg-blue-600 border-white text-white' : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'}
                `}
                                style={{ minHeight: '64px' }}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step > 1 && (
                <button
                    onClick={prevStep}
                    className="mt-8 text-white/80 font-bold underline text-lg"
                >
                    ← {t.back}
                </button>
            )}
        </div>
    );
};

export default InputForm;
