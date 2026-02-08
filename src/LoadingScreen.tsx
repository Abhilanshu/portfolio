import { Html, useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
    const { progress, active } = useProgress()
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Keep showing for smooth transition even after loading
        if (progress === 100) {
            setTimeout(() => setShow(false), 500)
        }
    }, [progress])

    if (!show) return null

    return (
        <Html center>
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontFamily: 'Inter, system-ui, sans-serif',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999,
                transition: 'opacity 0.5s ease',
                opacity: progress === 100 ? 0 : 1,
                pointerEvents: progress === 100 ? 'none' : 'all'
            }}>
                {/* Animated logo */}
                <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem',
                    animation: 'pulse 2s infinite',
                    textShadow: '0 0 20px rgba(255,255,255,0.5)'
                }}>
                    🌐 Portfolio
                </div>

                {/* Progress bar container */}
                <div style={{
                    width: '300px',
                    height: '8px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}>
                    {/* Progress fill */}
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                        borderRadius: '10px',
                        transition: 'width 0.3s ease',
                        boxShadow: '0 0 10px rgba(255,215,0,0.8)'
                    }} />
                </div>

                {/* Percentage text */}
                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    opacity: 0.9
                }}>
                    {progress.toFixed(0)}%
                </div>

                {/* Loading hint */}
                <div style={{
                    marginTop: '2rem',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    textAlign: 'center'
                }}>
                    {progress < 30 && 'Loading assets...'}
                    {progress >= 30 && progress < 70 && 'Building world...'}
                    {progress >= 70 && progress < 100 && 'Almost ready...'}
                    {progress === 100 && 'All set!'}
                </div>

                {/* CSS Animation */}
                <style>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                `}</style>
            </div>
        </Html>
    )
}
