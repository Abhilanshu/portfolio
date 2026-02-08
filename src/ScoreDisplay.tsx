import { useGameStore } from './store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'


export function ScoreDisplay() {
    const score = useGameStore((state) => state.score)

    // Only show if score > 0
    if (score === 0) return null

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            pointerEvents: 'none',
        }}>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={score}
                    initial={{ scale: 1.2, color: '#ffff00' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: '2px solid #FFD700',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                    }}
                >
                    <span style={{ fontSize: '28px' }}>🏆</span>
                    <span>{score} Points</span>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
