import React from "react";
import { motion } from "framer-motion";
import { IconCheck, IconX, IconTrendingUp, IconBriefcase, IconSearch } from "./Icons";
import { SkillRoadmapCard } from "./SkillRoadmap";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function ResultsDashboard({ results, weekProgress, onProgressChange }) {
    if (!results) return null;

    return (
        <motion.div
            className="results-section space-y-8"
            id="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Card */}
                <motion.div className="glass-card flex flex-col items-center justify-center text-center" variants={itemVariants}>
                    <div className="score-ring-wrap">
                        <div className="score-ring">
                            <svg width="160" height="160" viewBox="0 0 140 140">
                                <circle className="score-ring-bg" cx="70" cy="70" r="56" />
                                <motion.circle
                                    className="score-ring-fill"
                                    cx="70" cy="70" r="56"
                                    initial={{ strokeDashoffset: 402.12 }}
                                    animate={{ strokeDashoffset: 402.12 * (1 - results.score / 100) }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="score-center">
                                <motion.div
                                    className="score-pct"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    {results.score}%
                                </motion.div>
                                <div className="score-lbl">MATCH</div>
                            </div>
                        </div>
                        <div className="score-tag">
                            <IconTrendingUp className="w-3 h-3 mr-1" />
                            {results.score > 80 ? "Top Talent" : "Strong Candidate"}
                        </div>
                    </div>
                </motion.div>

                {/* Skills Analysis */}
                <motion.div className="glass-card lg:col-span-2 space-y-6" variants={itemVariants}>
                    <div>
                        <div className="flex items-center gap-2 text-green-400 font-black uppercase tracking-widest text-xs mb-3">
                            <IconCheck className="w-4 h-4" /> Matched Skills
                        </div>
                        <div className="skill-list">
                            {results.matchedSkills.map((s, i) => (
                                <motion.div
                                    className="skill-chip matched"
                                    key={s}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {s}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-xs mb-3">
                            <IconX className="w-4 h-4" /> Skill Gaps
                        </div>
                        <div className="skill-list">
                            {results.missingSkills.map((s, i) => (
                                <motion.div
                                    className="skill-chip missing"
                                    key={s.name}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {s.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-xs mb-3">
                            <IconSearch className="w-4 h-4" /> Recommended Keywords
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {results.jobSearchKeywords?.map(kw => (
                                <span key={kw} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700 font-medium">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Target Roles */}
            <motion.div className="glass-card" variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <IconBriefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-white">Target Roles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.topRoles.map(r => (
                        <div className="role-item" key={r.title}>
                            <div className="role-info">
                                <div className="role-name">{r.title}</div>
                                <div className="role-co">{r.companies.join(", ")}</div>
                            </div>
                            <div className="role-match">{r.match}%</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Roadmap */}
            <motion.div variants={itemVariants}>
                <div className="roadmap-title">
                    🗺️ Your Personalized Roadmap
                    <span className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest ml-auto">
                        Interactive Path
                    </span>
                </div>
                <div className="space-y-4">
                    {results.missingSkills.map(skill => (
                        <SkillRoadmapCard
                            key={skill.name}
                            skill={skill}
                            weekProgress={weekProgress[skill.name] || 0}
                            onProgressChange={onProgressChange}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
