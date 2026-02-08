import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
    const { progress, active } = useProgress()
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        if (progress === 100) {
            // Add a small delay for smooth transition
            setTimeout(() => setFinished(true), 500)
        }
    }, [progress])

    if (finished) return null

    return (
        <div className="loading-screen" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#111',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.5s ease-out',
            opacity: progress === 100 ? 0 : 1,
            pointerEvents: progress === 100 ? 'none' : 'auto'
        }}>
            <div style={{
                fontSize: '40px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '20px',
                fontFamily: 'Inter, sans-serif'
            }}>
                Loading
            </div>

            {/* Progress Bar Container */}
            <div style={{
                width: '200px',
                height: '4px',
                background: '#333',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                {/* Progress Bar Fill */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#FFD700', // Gold color
                    transition: 'width 0.2s ease-out'
                }} />
            </div>

            <div style={{
                marginTop: '10px',
                color: '#666',
                fontSize: '14px',
                fontFamily: 'monospace'
            }}>
                {Math.round(progress)}%
            </div>
        </div>
    )
}
