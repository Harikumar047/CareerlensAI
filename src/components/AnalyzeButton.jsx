import styles from './AnalyzeButton.module.css'

export default function AnalyzeButton({ onClick, loading, disabled }) {
    return (
        <button
            className={`${styles.btn} ${loading ? styles.loading : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
            type="button"
        >
            {loading ? (
                <>
                    <span className={styles.spinner} />
                    Analysing…
                </>
            ) : (
                <>
                    <span>⚡</span>
                    Analyse Match
                </>
            )}
        </button>
    )
}
