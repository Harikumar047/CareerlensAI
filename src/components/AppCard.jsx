import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import ResumeDropzone from './ResumeDropzone'
import JobDropzone from './JobDropzone'
import AnalyzeButton from './AnalyzeButton'
import ResultsCard from './ResultsCard'
import styles from './AppCard.module.css'

export default function AppCard() {
    const [resumeText, setResumeText] = useState('')
    const [jobText, setJobText] = useState('')
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState(null)

    const handleAnalyze = () => {
        if (!resumeText || !jobText) return

        setAnalyzing(true)
        // Simulate analysis
        setTimeout(() => {
            // Simple keyword matching for a slightly "real" feel
            const jobKeywords = jobText.toLowerCase().split(/\W+/).filter(w => w.length > 3)
            const resumeKeywords = resumeText.toLowerCase()

            const matched = jobKeywords.filter(k => resumeKeywords.includes(k))
            const uniqueMatched = [...new Set(matched)].slice(0, 5)
            const missing = [...new Set(jobKeywords.filter(k => !resumeKeywords.includes(k)))].slice(0, 3)

            const score = Math.min(100, Math.max(30, Math.floor((uniqueMatched.length / 5) * 100)))

            const mockResult = {
                score: score,
                found: uniqueMatched.length > 0 ? uniqueMatched : ['Communication', 'Teamwork'],
                partial: ['Technical Documentation'],
                missing: missing.length > 0 ? missing : ['Leadership', 'Specific Industry Tool'],
                summary: score > 70
                    ? 'Excellent alignment! Your experience closely matches the core requirements of this role.'
                    : score > 40
                        ? 'Good foundation. You have many relevant skills, but some key areas could be strengthened.'
                        : 'Potential match. There are some significant gaps between your profile and this specific job description.'
            }
            setResult(mockResult)
            setAnalyzing(false)

            // Scroll to results
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 1500)
    }

    return (
        <div className={styles.container}>
            <div className={styles.bgBlobs}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
            </div>

            <motion.div
                className={styles.hero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className={styles.title}>Land Your Dream Role</h1>
                <p className={styles.subtitle}>Upload your resume and the job description to see how well you match.</p>
            </motion.div>

            <motion.div
                className={styles.grid}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <ResumeDropzone onText={setResumeText} />
                <JobDropzone onText={setJobText} />
            </motion.div>

            <motion.div
                className={styles.action}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <AnalyzeButton
                    onClick={handleAnalyze}
                    loading={analyzing}
                    disabled={!resumeText || !jobText}
                />
            </motion.div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        id="results"
                        className={styles.resultsReveal}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResultsCard result={result} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
