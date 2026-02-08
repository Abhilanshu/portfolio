import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './store'
import './IntroScreen.css'

export function IntroScreen() {
    const { introComplete, setIntroComplete } = useGameStore()

    const handleStart = () => {
        setIntroComplete(true)
    }

    return (
        <AnimatePresence>
            {!introComplete && (
                <motion.div
                    className="intro-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="intro-content"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="intro-title">Welcome</h1>
                        <p className="intro-subtitle">
                            Thank you for visiting my portfolio, you sneaky developer!
                        </p>
                        <p className="intro-description">
                            If you are curious about the stack and how I built this project, here’s everything you need to know.
                        </p>
                        <p className="intro-warning">And don't break anything!</p>

                        <motion.button
                            className="start-button"
                            onClick={handleStart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Exploring
                        </motion.button>

                        <div className="controls-hint">
                            <div className="control-group">
                                <div className="keys">
                                    <span className="key">W</span>
                                    <div className="key-row">
                                        <span className="key">A</span>
                                        <span className="key">S</span>
                                        <span className="key">D</span>
                                    </div>
                                </div>
                                <span className="control-label">or Arrow Keys to move</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
