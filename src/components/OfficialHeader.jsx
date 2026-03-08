import React from 'react';
import pmModi from '../assets/pm_modi.png';
import flagBg from '../assets/flag_bg.png';
import { motion } from 'framer-motion';

const AshokaChakra = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-900/20 animate-spin-slow" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        {[...Array(24)].map((_, i) => (
            <line
                key={i}
                x1="12" y1="12"
                x2={12 + 10 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={12 + 10 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.5"
            />
        ))}
    </svg>
);

const OfficialHeader = ({ t, language }) => {
    return (
        <header className="relative overflow-hidden rounded-[2.5rem] mb-12 group transition-all duration-500">
            {/* National Tricolor Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-white/5 to-green-600/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>

            {/* National Flag Background Image (High Transparency) */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700"
                style={{ backgroundImage: `url(${flagBg})` }}
            ></div>
            {/* Animated Gradient Showcase Border */}
            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem]"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8">
                {/* Left Section: Context & Title */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-inner"
                    >
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 shadow-[0_0_10px_#f97316]"></span>
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-200">
                            Government of India Official Portal
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                            {t.title} <span className="text-orange-500">.</span><span className="text-green-500">.</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-4 flex items-center gap-3 justify-center md:justify-start italic">
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded uppercase border border-green-500/30 font-black">Active</span>
                            {language === 'hi' ? "नई नियुक्तियाँ लाइव हैं" : "Empowering the youth with Live Career Insights"}
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: PM Profile Enhancement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-8 bg-black/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative group/pm"
                >
                    <div className="absolute -right-4 -top-4 opacity-40 group-hover/pm:opacity-100 transition-opacity">
                        <AshokaChakra />
                    </div>

                    <div className="hidden lg:flex flex-col items-end pr-4 border-r border-white/5">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">State Leadership</span>
                        <span className="text-2xl font-black text-white leading-none">Narendra Modi</span>
                        <span className="text-[10px] font-bold text-slate-500 italic mt-1">Prime Minister of India</span>
                    </div>

                    <div className="relative">
                        {/* Premium Frame Effect */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500 via-white to-green-500 rounded-3xl blur-[8px] opacity-40 group-hover/pm:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl w-24 h-24 md:w-32 md:h-32">
                            <img
                                src={pmModi}
                                alt="PM Modi"
                                className="w-full h-full object-cover group-hover/pm:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg border-2 border-slate-950 shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Texture/Shimmer */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        </header>
    );
};

export default OfficialHeader;
