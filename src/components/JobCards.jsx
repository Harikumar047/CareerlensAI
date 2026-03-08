import React from 'react';

export default function JobCards({ jobs }) {
    if (!jobs || jobs.length === 0) return null;

    return (
        <div className="job-cards-section" style={{ marginTop: 40 }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
                <div className="testi-eyebrow">💼 Live Opportunities</div>
                <h2 className="cl-hero h1" style={{ fontSize: '2.25rem', marginBottom: 16 }}>Hiring <span>Right Now</span></h2>
                <p className="cl-hero p" style={{ fontSize: '1.1rem' }}>Based on your identified skill gaps and matching roles.</p>
            </div>

            <div className="job-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
                padding: '0 10px'
            }}>
                {jobs.map((job) => (
                    <div key={job.id} className="glass-card job-card" style={{
                        padding: 20,
                        transition: 'transform 0.2s',
                        cursor: 'default'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                            <img
                                src={job.logo}
                                alt={job.company}
                                className="company-logo"
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 8,
                                    objectFit: 'cover',
                                    background: 'white'
                                }}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1549923746-c50264f39a97?w=100&h=100&fit=crop&q=80";
                                }}
                            />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text)' }}>{job.title}</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>{job.company}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                            <div style={{ fontSize: '0.82rem', color: 'var(--silver-chalice)', background: 'rgba(125,125,125,0.08)', padding: '4px 10px', borderRadius: 6, fontWeight: 500 }}>
                                📍 {job.location}
                            </div>
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="apply-link"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: 12,
                                    background: 'linear-gradient(135deg, var(--black), var(--tundora))',
                                    border: '1px solid var(--border)',
                                    color: 'var(--alto)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s'
                                }}
                            >
                                Apply Now
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
