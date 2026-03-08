import styles from './ResultsCard.module.css'

function ScoreRing({ score }) {
    const radius = 54
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const color = score >= 70 ? '#10B981' : score >= 45 ? '#F59E0B' : '#EF4444'
    const label = score >= 70 ? 'Strong Match' : score >= 45 ? 'Moderate Match' : 'Low Match'

    return (
        <div className={styles.ringWrap}>
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle
                    cx="70" cy="70" r={radius}
                    fill="none" stroke={color} strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 70 70)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
            </svg>
            <div className={styles.ringInner}>
                <span className={styles.ringScore} style={{ color }}>{score}%</span>
                <span className={styles.ringLabel} style={{ color }}>{label}</span>
            </div>
        </div>
    )
}

function SkillChip({ skill, status }) {
    const map = {
        found: { cls: styles.chipFound, icon: '✓' },
        partial: { cls: styles.chipPartial, icon: '~' },
        missing: { cls: styles.chipMissing, icon: '✗' },
    }
    const { cls, icon } = map[status] || map.missing
    return <span className={`${styles.chip} ${cls}`}>{icon} {skill}</span>
}

export default function ResultsCard({ result }) {
    if (!result) return null
    const { score, found, partial, missing, summary } = result

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>Match Analysis</h2>
                <p className={styles.sub}>{summary}</p>
            </div>

            <div className={styles.body}>
                <div className={styles.scoreSection}>
                    <ScoreRing score={score} />
                </div>

                <div className={styles.skillsSection}>
                    {found.length > 0 && (
                        <div className={styles.group}>
                            <span className={styles.groupLabel}>✅ Skills matched</span>
                            <div className={styles.chips}>
                                {found.map(s => <SkillChip key={s} skill={s} status="found" />)}
                            </div>
                        </div>
                    )}
                    {partial.length > 0 && (
                        <div className={styles.group}>
                            <span className={styles.groupLabel}>⚠️ Partial match</span>
                            <div className={styles.chips}>
                                {partial.map(s => <SkillChip key={s} skill={s} status="partial" />)}
                            </div>
                        </div>
                    )}
                    {missing.length > 0 && (
                        <div className={styles.group}>
                            <span className={styles.groupLabel}>❌ Gaps to address</span>
                            <div className={styles.chips}>
                                {missing.map(s => <SkillChip key={s} skill={s} status="missing" />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
