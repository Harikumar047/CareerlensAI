import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevron, IconBook, IconBuilding, IconShare } from "./Icons";

export function SkillRoadmapCard({ skill, weekProgress, onProgressChange }) {
    const [open, setOpen] = useState(false);
    const [liveCourses, setLiveCourses] = useState([]);
    const [naukriJobs, setNaukriJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && liveCourses.length === 0 && naukriJobs.length === 0) {
            const fetchLiveContent = async () => {
                setLoading(true);
                try {
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    const courseRes = await fetch(`${API_URL}/api/courses/${encodeURIComponent(skill.name)}`);
                    if (courseRes.ok) {
                        const courseData = await courseRes.json();
                        setLiveCourses(courseData.courses || []);
                    }

                    const jobRes = await fetch(`${API_URL}/api/naukri-jobs?skill=${encodeURIComponent(skill.name)}`);
                    if (jobRes.ok) {
                        const jobData = await jobRes.json();
                        setNaukriJobs(jobData.topJobs || []);
                    }
                } catch (err) {
                    console.error("Failed to fetch live content", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchLiveContent();
        }
    }, [open, skill.name, liveCourses.length, naukriJobs.length]);

    const readyColor = skill.readyPct >= 85 ? "#22c55e" : skill.readyPct >= 75 ? "#3b82f6" : "#facc15";

    return (
        <div className="roadmap-card border border-slate-800 bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300">
            <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
                    />
                    <div>
                        <div className="text-white font-bold text-lg">{skill.name}</div>
                        <div className="text-slate-400 text-xs font-medium mt-1">
                            {skill.timeWeeks}w · {skill.hoursPerWeek}h/week · {skill.level}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                        style={{ backgroundColor: `${readyColor}15`, color: readyColor, borderColor: `${readyColor}30` }}
                    >
                        {skill.readyPct}% READY
                    </div>
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconChevron />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t border-slate-800/30">
                            {/* Progress Tracker */}
                            <div className="mb-8 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/50 mt-6">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Learning Progress</span>
                                    <span className="text-white font-black text-sm">{weekProgress}/{skill.timeWeeks} Weeks</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(weekProgress / skill.timeWeeks) * 100}%` }}
                                        style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}60` }}
                                    />
                                </div>
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {Array.from({ length: skill.timeWeeks }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onProgressChange(skill.name, i + 1)}
                                            className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all border ${i < weekProgress
                                                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                                                : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500'
                                                }`}
                                        >
                                            W{i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center py-8">
                                    <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3" />
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fetching live intelligence...</p>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-fade-in">
                                    {/* Courses */}
                                    <div>
                                        <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] mb-4">
                                            <IconBook className="w-3 h-3" /> Recommended Courses
                                        </div>
                                        <div className="grid gap-3">
                                            {(liveCourses.length > 0 ? liveCourses : skill.courses).slice(0, 3).map((c, i) => (
                                                <div className="group flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all hover:border-blue-500/30" key={i}>
                                                    <div>
                                                        <div className="text-white font-bold text-sm mb-1">{c.title}</div>
                                                        <div className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
                                                            {c.platform} · {c.duration || (c.hours + 'h')} · <span className="text-green-400">FREE</span>
                                                        </div>
                                                    </div>
                                                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                                                        Enroll
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Jobs */}
                                    <div>
                                        <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] mb-4">
                                            <IconBuilding className="w-3 h-3" /> Live Opportunities (Naukri)
                                        </div>
                                        <div className="grid gap-3">
                                            {naukriJobs.length > 0 ? naukriJobs.map((j, i) => (
                                                <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-blue-500/30 transition-all" key={i}>
                                                    <div>
                                                        <div className="text-white font-bold text-sm mb-1">{j.title}</div>
                                                        <div className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
                                                            {j.company} · {j.location} · {j.postedDaysAgo}d ago
                                                        </div>
                                                    </div>
                                                    <a href={j.naukriUrl} target="_blank" rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                                                        Apply
                                                    </a>
                                                </div>
                                            )) : (
                                                <div className="py-6 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                                                    <p className="text-xs font-bold text-slate-500 italic">Finding hiring companies...</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const msg = encodeURIComponent(`I'm closing my ${skill.name} skill gap in ${skill.timeWeeks} weeks using Career Lens AI! 🚀`);
                                            window.open(`https://wa.me/?text=${msg}`, "_blank");
                                        }}
                                        className="w-full flex items-center justify-center gap-2 p-4 bg-green-600/10 text-green-400 border border-green-500/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600/20 transition-all"
                                    >
                                        <IconShare className="w-4 h-4" /> Share Progress on WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
