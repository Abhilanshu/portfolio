import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

export function Minimap() {
    const { scene } = useThree()

    useFrame(() => {
        const canvas = (window as any).minimapCanvas as HTMLCanvasElement
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const player = scene.getObjectByName('PlayerBody')

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const w = canvas.width
        const h = canvas.height
        const scale = 2.5
        const centerX = w / 2
        const centerY = h / 2

        // Background - dark blue/gray
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, w / 2)
        gradient.addColorStop(0, '#2a3f5f')
        gradient.addColorStop(1, '#1a2332')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)

        // Draw water areas (cyan glow)
        const drawWater = (x: number, y: number, width: number, height: number) => {
            ctx.shadowColor = '#00ffff'
            ctx.shadowBlur = 15
            ctx.fillStyle = '#4ecdc4'
            ctx.beginPath()
            ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
        }

        drawWater(centerX + 40, centerY - 30, 35, 25)
        drawWater(centerX - 45, centerY + 35, 30, 20)
        drawWater(centerX + 50, centerY + 40, 28, 22)
        drawWater(centerX - 50, centerY - 40, 25, 20)

        // Grass areas
        const drawGrass = (x: number, y: number, radius: number) => {
            const grassGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
            grassGradient.addColorStop(0, '#7cb342')
            grassGradient.addColorStop(1, '#558b2f')
            ctx.fillStyle = grassGradient
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
        }

        drawGrass(centerX - 55, centerY - 50, 18)
        drawGrass(centerX + 55, centerY - 45, 15)
        drawGrass(centerX - 45, centerY + 45, 20)
        drawGrass(centerX + 50, centerY + 50, 16)

        // Orange platforms
        const drawPlatform = (x: number, y: number, width: number, height: number) => {
            ctx.fillStyle = '#ffab40'
            ctx.fillRect(x - width / 2, y - height / 2, width, height)
            ctx.strokeStyle = '#ff9100'
            ctx.lineWidth = 2
            ctx.strokeRect(x - width / 2, y - height / 2, width, height)
        }

        drawPlatform(centerX + 5, centerY + 10, 40, 30)
        drawPlatform(centerX - 30, centerY - 15, 30, 25)

        // Racing track
        ctx.strokeStyle = '#555555'
        ctx.lineWidth = 25
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(centerX - 60, centerY - 40)
        ctx.lineTo(centerX + 60, centerY - 40)
        ctx.lineTo(centerX + 60, centerY - 10)
        ctx.lineTo(centerX - 20, centerY - 10)
        ctx.lineTo(centerX - 20, centerY + 30)
        ctx.lineTo(centerX - 60, centerY + 30)
        ctx.lineTo(centerX - 60, centerY - 40)
        ctx.stroke()

        ctx.strokeStyle = '#ff3333'
        ctx.lineWidth = 3
        ctx.setLineDash([8, 8])
        ctx.stroke()
        ctx.setLineDash([])

        // Location markers
        const drawMarker = (x: number, y: number, label?: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(Math.PI / 4)
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(-5, -5, 10, 10)
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 1
            ctx.strokeRect(-5, -5, 10, 10)
            ctx.restore()

            if (label) {
                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 8px sans-serif'
                ctx.fillText(label, x + 8, y + 3)
            }
        }

        drawMarker(centerX + 5, centerY + 10, 'Contact')
        drawMarker(centerX - 40, centerY - 50, 'Timeline')
        drawMarker(centerX + 55, centerY + 15, 'Skills')
        drawMarker(centerX + 30, centerY - 50, 'About')

        // Player icon
        if (player) {
            const playerX = centerX + (player.position.x * scale)
            const playerY = centerY - (player.position.z * scale)

            ctx.save()
            ctx.translate(playerX, playerY)

            const carGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8)
            carGradient.addColorStop(0, '#9370db')
            carGradient.addColorStop(1, '#6a4fc3')
            ctx.fillStyle = carGradient
            ctx.fillRect(-6, -8, 12, 16)

            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 2
            ctx.strokeRect(-6, -8, 12, 16)

            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.moveTo(0, -10)
            ctx.lineTo(-3, -6)
            ctx.lineTo(3, -6)
            ctx.closePath()
            ctx.fill()

            ctx.restore()
        }

        // Border
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.strokeRect(2, 2, w - 4, h - 4)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 12px sans-serif'
        ctx.fillText('MAP', 10, 20)
    })

    return null
}

export function MinimapUI() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (canvasRef.current) {
            (window as any).minimapCanvas = canvasRef.current
        }
    }, [])

    return (
        <>
            {/* Map icon button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    background: isOpen ? 'rgba(147, 112, 219, 0.8)' : 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    zIndex: 101,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                }}
            >
                🗺️
            </button>

            {/* Minimap (only visible when open) */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    width: '200px',
                    height: '200px',
                    zIndex: 100,
                    pointerEvents: 'none',
                    animation: 'fadeIn 0.3s ease',
                }}>
                    <canvas
                        ref={canvasRef}
                        width={200}
                        height={200}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '12px',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.6)',
                        }}
                    />
                </div>
            )}

            {/* CSS animation */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </>
    )
}
