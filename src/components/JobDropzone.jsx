import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Tesseract from 'tesseract.js'
import styles from './Dropzone.module.css'

export default function JobDropzone({ onText }) {
    const [mode, setMode] = useState('text') // 'text' | 'image'
    const [textValue, setTextValue] = useState('')
    const [fileName, setFileName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)

    // ── Image OCR drop ──
    const onDrop = useCallback(async (accepted) => {
        const file = accepted[0]
        if (!file) return
        setFileName(file.name)
        setError(null)
        setLoading(true)
        setProgress(0)
        try {
            const result = await Tesseract.recognize(file, 'eng', {
                logger: (m) => {
                    if (m.status === 'recognizing text') setProgress(Math.round(m.progress * 100))
                },
            })
            const text = result.data.text.trim()
            if (!text) throw new Error('No text found in image.')
            onText(text)
        } catch (e) {
            setError(e.message || 'OCR failed.')
        } finally {
            setLoading(false)
        }
    }, [onText])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        multiple: false,
    })

    function handleTextChange(e) {
        setTextValue(e.target.value)
        onText(e.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.labelRow}>
                <label className={styles.label}>
                    <span className={styles.labelIcon}>📋</span> Job Description
                </label>
                <div className={styles.toggle}>
                    <button
                        className={`${styles.toggleBtn} ${mode === 'text' ? styles.toggleActive : ''}`}
                        onClick={() => setMode('text')}
                        type="button"
                    >
                        ✏️ Paste text
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${mode === 'image' ? styles.toggleActive : ''}`}
                        onClick={() => setMode('image')}
                        type="button"
                    >
                        📸 Scan image
                    </button>
                </div>
            </div>

            {mode === 'text' ? (
                <textarea
                    className={styles.textarea}
                    placeholder="Paste the job description here…"
                    value={textValue}
                    onChange={handleTextChange}
                    rows={7}
                />
            ) : (
                <div
                    {...getRootProps()}
                    className={`${styles.zone} ${isDragActive ? styles.active : ''} ${fileName ? styles.filled : ''}`}
                >
                    <input {...getInputProps()} />
                    {loading ? (
                        <div className={styles.state}>
                            <span className={styles.spinner} />
                            <p>Running OCR… {progress}%</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : fileName ? (
                        <div className={styles.state}>
                            <span className={styles.checkIcon}>✅</span>
                            <p className={styles.fileName}>{fileName}</p>
                            <span className={styles.hint}>Drop a new image to replace</span>
                        </div>
                    ) : (
                        <div className={styles.state}>
                            <span className={styles.dropIcon}>{isDragActive ? '📂' : '🖼️'}</span>
                            <p className={styles.primary}>
                                {isDragActive ? 'Drop image here' : 'Drop a job poster or screenshot'}
                            </p>
                            <span className={styles.hint}>PNG, JPG, WEBP · OCR powered by Tesseract.js</span>
                        </div>
                    )}
                </div>
            )}

            {error && <p className={styles.error}>⚠️ {error}</p>}
        </div>
    )
}
