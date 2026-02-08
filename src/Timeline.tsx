import { Text } from '@react-three/drei'
import { useMemo, useState } from 'react'
import * as THREE from 'three'
import { useGameStore } from './store/useGameStore'

interface TimelineEntry {
    year: string
    title: string
    company: string
    description: string
    color: string // Add color for each milestone
}

const timelineData: TimelineEntry[] = [
    {
        year: '2023',
        title: 'B.Tech in CSE (AI & DS)',
        company: 'LNCT, Bhopal',
        description: 'Pursuing degree in Computer Science',
        color: '#9c27b0' // Purple
    },
    {
        year: '2023',
        title: 'Higher Secondary',
        company: 'St. Xavier\'s School, Bhopal',
        description: 'Completed 13 years of schooling',
        color: '#00bcd4' // Cyan
    },
    {
        year: '2022',
        title: 'Web Development Journey',
        company: 'Self-taught',
        description: 'Building with HTML, CSS, JS & React',
        color: '#ff9800' // Orange
    },
]

interface TimelineCardProps {
    entry: TimelineEntry
    position: [number, number, number]
}

function TimelineCard({ entry, position }: TimelineCardProps) {
    const addPoints = useGameStore((state) => state.addPoints)
    const [showPoints, setShowPoints] = useState(false)

    // Create canvas texture for the card
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 384
        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        // Background gradient (like Bruno's cards)
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, entry.color)
        gradient.addColorStop(1, '#1a1a2e')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Border glow
        ctx.strokeStyle = entry.color
        ctx.lineWidth = 8
        ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8)

        // Year (large, top)
        ctx.fillStyle = '#FFD700'
        ctx.font = 'bold 80px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(entry.year, canvas.width / 2, 90)

        // Title
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 36px Arial'
        const titleLines = wrapText(ctx, entry.title, canvas.width - 40)
        titleLines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, 160 + i * 42)
        })

        // Company
        ctx.fillStyle = '#00ffff'
        ctx.font = '28px Arial'
        ctx.fillText(entry.company, canvas.width / 2, 250)

        // Description
        ctx.fillStyle = '#cccccc'
        ctx.font = '22px Arial'
        const descLines = wrapText(ctx, entry.description, canvas.width - 40)
        descLines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, 300 + i * 28)
        })

        const tex = new THREE.CanvasTexture(canvas)
        tex.needsUpdate = true
        return tex
    }, [entry])

    const handleClick = () => {
        addPoints(`timeline-${entry.year}`, 20) // 20 points for timeline items
        setShowPoints(true)
        setTimeout(() => setShowPoints(false), 1000)
    }

    // Helper function to wrap text
    function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
        const words = text.split(' ')
        const lines: string[] = []
        let currentLine = words[0]

        for (let i = 1; i < words.length; i++) {
            const width = ctx.measureText(currentLine + ' ' + words[i]).width
            if (width < maxWidth) {
                currentLine += ' ' + words[i]
            } else {
                lines.push(currentLine)
                currentLine = words[i]
            }
        }
        lines.push(currentLine)
        return lines
    }

    if (!texture) return null

    return (
        <group position={position}>
            {/* Card board (like Bruno's) */}
            <mesh onClick={handleClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'} rotation={[0, 0, 0]}>
                <planeGeometry args={[4, 3]} />
                <meshStandardMaterial
                    map={texture}
                    emissive={entry.color}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Floating Points Feedback */}
            {showPoints && (
                <Text
                    position={[0, 2.5, 0]}
                    fontSize={0.5}
                    color="#FFD700"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    +20 Points!
                </Text>
            )}

            {/* Pole/stand underneath */}
            <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
                <meshStandardMaterial color={entry.color} emissive={entry.color} emissiveIntensity={0.5} />
            </mesh>

            {/* Connecting line point */}
            <mesh position={[0, -0.5, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive={entry.color} emissiveIntensity={1} />
            </mesh>
        </group>
    )
}

export function Timeline() {
    const spacing = 6 // Space between cards

    return (
        <group position={[-24, 0.5, 6]} rotation={[0, 1, 0]}> {/* Second Platform - FAR AWAY from name */}
            {/* Title board */}
            <Text
                position={[-spacing, 4, 0]}
                fontSize={1.2}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#000000"
            >
                CAREER JOURNEY
            </Text>

            {/* Timeline cards */}
            {timelineData.map((entry, index) => {
                const x = -spacing + index * spacing
                return (
                    <TimelineCard
                        key={index}
                        entry={entry}
                        position={[x, 1, 0]}
                    />
                )
            })}

            {/* Connecting line between cards */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[spacing * (timelineData.length - 1), 0.05, 0.05]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}
