import { useState, useEffect } from 'react'

export function MobileControls() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Detect if mobile device
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                || window.innerWidth < 768
            setIsMobile(mobile)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (!isMobile) return null

    const handleDirection = (direction: string) => {
        // Simulate keyboard events
        const event = new KeyboardEvent('keydown', { key: direction })
        window.dispatchEvent(event)

        setTimeout(() => {
            const upEvent = new KeyboardEvent('keyup', { key: direction })
            window.dispatchEvent(upEvent)
        }, 100)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 1000,
        }}>
            {/* D-Pad Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '5px' }}>
                <div />
                <button
                    onTouchStart={() => handleDirection('w')}
                    style={buttonStyle}
                >
                    ↑
                </button>
                <div />
                <button
                    onTouchStart={() => handleDirection('a')}
                    style={buttonStyle}
                >
                    ←
                </button>
                <div />
                <button
                    onTouchStart={() => handleDirection('d')}
                    style={buttonStyle}
                >
                    →
                </button>
                <div />
                <button
                    onTouchStart={() => handleDirection('s')}
                    style={buttonStyle}
                >
                    ↓
                </button>
            </div>

            {/* Jump Button */}
            <button
                onTouchStart={() => handleDirection(' ')}
                style={{ ...buttonStyle, width: '80px' }}
            >
                JUMP
            </button>
        </div>
    )
}

const buttonStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    background: 'rgba(0,0,0,0.5)',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    touchAction: 'manipulation',
    userSelect: 'none',
}
