import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as pdfjsLib from 'pdfjs-dist'
import styles from './Dropzone.module.css'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        text += content.items.map(item => item.str).join(' ') + '\n'
    }
    return text.trim()
}

export default function ResumeDropzone({ onText }) {
    const [fileName, setFileName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onDrop = useCallback(async (accepted) => {
        const file = accepted[0]
        if (!file) return
        setFileName(file.name)
        setError(null)
        setLoading(true)
        try {
            let text = ''
            if (file.type === 'application/pdf') {
                text = await extractTextFromPDF(file)
            } else {
                text = await file.text()
            }
            if (!text.trim()) throw new Error('Could not extract text from this file.')
            onText(text)
        } catch (e) {
            setError(e.message || 'Failed to read file.')
        } finally {
            setLoading(false)
        }
    }, [onText])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        multiple: false,
    })

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                <span className={styles.labelIcon}>📄</span> Resume
            </label>
            <div
                {...getRootProps()}
                className={`${styles.zone} ${isDragActive ? styles.active : ''} ${fileName ? styles.filled : ''}`}
            >
                <input {...getInputProps()} />
                {loading ? (
                    <div className={styles.state}>
                        <span className={styles.spinner} />
                        <p>Extracting text…</p>
                    </div>
                ) : fileName ? (
                    <div className={styles.state}>
                        <span className={styles.checkIcon}>✅</span>
                        <p className={styles.fileName}>{fileName}</p>
                        <span className={styles.hint}>Drop a new file to replace</span>
                    </div>
                ) : (
                    <div className={styles.state}>
                        <span className={styles.dropIcon}>{isDragActive ? '📂' : '📁'}</span>
                        <p className={styles.primary}>
                            {isDragActive ? 'Drop it here' : 'Drop your resume here'}
                        </p>
                        <span className={styles.hint}>PDF, DOCX or TXT · or click to browse</span>
                    </div>
                )}
            </div>
            {error && <p className={styles.error}>⚠️ {error}</p>}
        </div>
    )
}
