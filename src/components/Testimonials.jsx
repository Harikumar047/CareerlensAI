import React, { useState, useEffect } from "react";
import { IconQuote, IconVerified, IconStar, IconChevronLeft, IconChevronRight } from "./Icons";
import { TESTIMONIALS } from "../utils/constants";

export default function TestimonialsCarousel() {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const total = TESTIMONIALS.length;

    useEffect(() => {
        if (!autoplay) return;
        const id = setInterval(() => setActive(a => (a + 1) % total), 4500);
        return () => clearInterval(id);
    }, [autoplay, total]);

    const prev = () => { setAutoplay(false); setActive(a => (a - 1 + total) % total); };
    const next = () => { setAutoplay(false); setActive(a => (a + 1) % total); };

    return (
        <section className="testi-section">
            <div className="testi-inner">
                <div className="testi-header">
                    <div className="testi-eyebrow">⭐ Student Stories</div>
                    <h2 className="testi-title">Students <span>love</span> CareerLens</h2>
                    <p className="testi-subtitle">Real results from CS students across India — no paid promotions, no filters.</p>
                </div>

                <div className="testi-stats">
                    {[
                        { num: "10+", lbl: "Students Analyzed" },
                        { num: "78%", lbl: "Avg Match Improvement" },
                        { num: "3 weeks", lbl: "Avg Gap Closure Time" },
                        { num: "3.5 / 5", lbl: "Student Rating" },
                    ].map(({ num, lbl }) => (
                        <div className="testi-stat" key={lbl}>
                            <span className="testi-stat-num">{num}</span>
                            <span className="testi-stat-lbl">{lbl}</span>
                        </div>
                    ))}
                </div>

                <div className="testi-carousel">
                    <div className="testi-track-wrap">
                        <div className="testi-track" style={{ transform: `translateX(calc(-${active * 100}% - ${active * 16}px))` }}>
                            {TESTIMONIALS.map((item, i) => (
                                <div className="testi-slide" key={i}>
                                    <div
                                        className="testi-card"
                                        style={{ "--tcard-color": "var(--silver-chalice)", opacity: i === active ? 1 : 0.5, transform: i === active ? "scale(1)" : "scale(0.97)", transition: "all 0.4s ease" }}
                                    >
                                        <div className="testi-quote-icon"><IconQuote /></div>
                                        <div className="testi-top">
                                            <div className="testi-avatar" style={{ background: "var(--silver-chalice)" }}>{item.avatar}</div>
                                            <div className="testi-name-wrap">
                                                <div className="testi-name">
                                                    {item.name}
                                                    <span className="verified-icon"><IconVerified /></span>
                                                </div>
                                                <div className="testi-college">{item.college}</div>
                                                <div className="testi-role-badge">{item.role}</div>
                                            </div>
                                        </div>
                                        <div className="testi-stars">
                                            {Array.from({ length: 5 }).map((_, si) => {
                                                const filled = si < Math.floor(item.starsDisplay);
                                                const partial = !filled && si < item.starsDisplay;
                                                return (
                                                    <span key={si} style={{ position: "relative", display: "inline-block", color: "#fbbf24" }}>
                                                        <IconStar filled={false} />
                                                        {(filled || partial) && (
                                                            <span style={{
                                                                position: "absolute", top: 0, left: 0, overflow: "hidden",
                                                                width: filled ? "100%" : `${(item.starsDisplay % 1) * 100}%`,
                                                                color: "#fbbf24"
                                                            }}>
                                                                <IconStar filled={true} />
                                                            </span>
                                                        )}
                                                    </span>
                                                );
                                            })}
                                            <span style={{ fontSize: "0.75rem", color: "var(--muted)", marginLeft: 4, fontWeight: 600 }}>{item.starsDisplay}</span>
                                        </div>
                                        <p className="testi-quote">"{item.quote}"</p>
                                        <div className="testi-footer">
                                            <span
                                                className="testi-outcome-tag"
                                                style={{ background: `rgba(176, 176, 176, 0.1)`, color: "var(--silver-chalice)", border: `1px solid rgba(176, 176, 176, 0.2)` }}
                                            >
                                                🎯 {item.tag}
                                            </span>
                                            <span className="testi-days">{item.daysAgo}d ago · Verified User</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="testi-controls">
                        <button className="testi-btn" onClick={prev}><IconChevronLeft /></button>
                        <div className="testi-dots">
                            {TESTIMONIALS.map((_, i) => (
                                <button key={i} className={`testi-dot${i === active ? " active" : ""}`} onClick={() => { setAutoplay(false); setActive(i); }} />
                            ))}
                        </div>
                        <button className="testi-btn" onClick={next}><IconChevronRight /></button>
                    </div>
                </div>
            </div>
        </section>
    );
}
