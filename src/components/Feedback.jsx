import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../utils/constants";

export default function FeedbackSection() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Overall");
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    // Load on mount
    useEffect(() => {
        const saved = localStorage.getItem('careerlensFeedback');
        if (saved) {
            try {
                setFeedbacks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse feedback", e);
            }
        }
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem('careerlensFeedback', JSON.stringify(feedbacks));
    }, [feedbacks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !text.trim()) return;

        const feedbackObj = {
            id: Date.now(),
            name: name.trim() || "Anonymous Student",
            category,
            stars: rating,
            text: text.trim(),
            timestamp: new Date().toLocaleString(),
            user: name.trim() || 'Anonymous Student'
        };

        setFeedbacks([feedbackObj, ...feedbacks]);
        setSubmitted(true);
        setRating(0);
        setName("");
        setText("");
    };

    return (
        <div className="feedback-section" id="feedback-section">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div className="feedback-eyebrow">✨ Student Perspectives</div>
                <h2 className="feedback-title">Share Your <span>Experience</span></h2>
                <p className="feedback-sub">Help us refine CareerLens for the next generation of engineers.</p>
            </div>

            <div className="feedback-form-card">
                {submitted ? (
                    <div className="fb-success" style={{ marginBottom: 32 }}>
                        <div className="fb-success-icon" style={{ background: 'rgba(224, 224, 224, 0.1)', border: '1px solid var(--border)' }}>✔️</div>
                        <h4 style={{ color: 'var(--alto)', fontWeight: 600 }}>Thank you for your feedback!</h4>
                        <p style={{ color: 'var(--boulder)' }}>Your response helps us make Career Lens better. It's now listed below!</p>
                        <button className="fb-cat-btn" onClick={() => setSubmitted(false)} style={{ marginTop: 16 }}>
                            Submit another?
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
                        <div className="feedback-star-row">
                            <span className="feedback-star-label">Your rating:</span>
                            {[1, 2, 3, 4, 5].map(n => (
                                <button
                                    key={n} type="button"
                                    className={`fb-star${(hover || rating) >= n ? " lit" : ""}`}
                                    onMouseEnter={() => setHover(n)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(n)}
                                >★</button>
                            ))}
                        </div>

                        <div className="feedback-fields">
                            <div className="fb-field">
                                <label className="fb-label">Name</label>
                                <input className="fb-input" placeholder="Rahul S." value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="fb-field">
                                <label className="fb-label">Category</label>
                                <select className="fb-input" value={category} onChange={e => setCategory(e.target.value)}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="fb-field" style={{ marginBottom: 20 }}>
                            <label className="fb-label">Your thoughts <span style={{ color: "var(--alto)" }}>*</span></label>
                            <textarea className="fb-input fb-textarea" placeholder="Tell us how we helped you today..." value={text} onChange={e => setText(e.target.value)} required />
                        </div>

                        <button className="fb-submit" type="submit" disabled={!rating || !text.trim()}>
                            Submit Feedback →
                        </button>
                    </form>
                )}

                {/* Recent Feedback Section */}
                <section className="fb-history" style={{
                    marginTop: 32,
                    paddingTop: 32,
                    borderTop: "1px solid var(--border)",
                    width: '100%'
                }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>Recent Feedback</h3>
                    <div className="fb-list" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
                        {feedbacks.length ? (
                            feedbacks.map(fb => (
                                <div key={fb.id} className="glass-card fb-card-mini" style={{
                                    padding: 16,
                                    background: "rgba(74, 74, 74, 0.4)",
                                    borderLeft: "4px solid var(--silver-chalice)",
                                    marginBottom: 12
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontWeight: 600, fontSize: "0.9rem", color: 'var(--alto)' }}>{fb.name}</span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--silver-chalice)", fontWeight: 600 }}>{fb.category}</span>
                                    </div>
                                    <p style={{ fontSize: "0.95rem", margin: "8px 0", lineHeight: 1.5 }}>{fb.text}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="fb-item-stars">
                                            {Array.from({ length: 5 }).map((_, si) => (
                                                <span key={si} style={{ color: si < fb.stars ? "#fbbf24" : "var(--border)", fontSize: "0.8rem" }}>★</span>
                                            ))}
                                        </div>
                                        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{fb.timestamp}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: "var(--muted)", fontStyle: "italic", textAlign: 'center' }}>Be the first to share feedback!</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
