import React from 'react';
import { shareWhatsApp } from '../logic/recommendationEngine';

const ResultCard = ({ internship, t, speak }) => {
    const getLabelColor = (label) => {
        switch (label) {
            case 'High': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Good': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getLabelText = (label) => {
        switch (label) {
            case 'High': return t.highMatch;
            case 'Good': return t.goodMatch;
            default: return t.tryMatch;
        }
    };

    return (
        <div className="group relative glass-card overflow-hidden">
            {/* Verification Badge */}
            {internship.isVerified && (
                <div className="absolute top-0 left-0 bg-blue-600 px-4 py-1 rounded-br-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg z-10">
                    ✓ PM Verified
                </div>
            )}

            <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                        {internship.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-blue-500/80">{internship.org}</p>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getLabelColor(internship.label)}`}>
                            {getLabelText(internship.label)}
                        </span>
                    </div>
                </div>
                <div className="bg-slate-800/80 px-4 py-2 rounded-2xl flex flex-col items-end border border-slate-700 shadow-inner">
                    <span className="text-xs font-black text-slate-500 uppercase">Stipend</span>
                    <span className="text-lg font-black text-emerald-400">{internship.stipend || "TBD"}</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 flex items-start gap-3 cursor-pointer group/why" onClick={() => speak(internship.why)}>
                    <span className="text-2xl mt-1">💡</span>
                    <p className="text-sm font-bold text-slate-300 italic flex-1 leading-relaxed">
                        {internship.why}
                    </p>
                    <span className="text-xl opacity-20 group-hover/why:opacity-100 transition-opacity">🔈</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-800/60">
                        <span className="text-xl">📍</span>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-slate-500">Location</span>
                            <span className="text-xs font-bold text-slate-200">{internship.district}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-800/60">
                        <span className="text-xl">🏢</span>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-slate-500">Mode</span>
                            <span className="text-xs font-bold text-slate-200">{internship.type}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 py-4 bg-white text-slate-950 font-black rounded-2xl shadow-xl transition-all hover:bg-blue-50 active:scale-95 text-sm uppercase tracking-widest">
                    Apply Now
                </button>
                <button
                    onClick={() => shareWhatsApp(internship.title, internship.org, internship.why)}
                    className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black rounded-2xl shadow-xl transition-all hover:bg-emerald-500 hover:text-white active:scale-90"
                    title={t.share}
                >
                    📱
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
