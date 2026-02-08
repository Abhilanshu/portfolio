import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface TimelineEntry {
    year: string
    title: string
    company: string
    description: string
}

const timelineData: TimelineEntry[] = [
    {
        year: '2023',
        title: 'B.Tech in CSE (AI & DS)',
        company: 'LNCT, Bhopal',
        description: 'Pursuing degree in Computer Science with specialization in AI & Data Science'
    },
    {
        year: '2023',
        title: 'Higher Secondary',
        company: 'St. Xavier\'s School, Bhopal',
        description: 'Completed 13 years of schooling'
    },
    {
        year: '2022',
        title: 'Web Development Journey',
        company: 'Self-taught',
        description: 'Started building projects with HTML, CSS, JavaScript & React'
    },
]

// Vibrant colors like Bruno Simon's
const colors = ['#00ffff', '#ff00ff', '#ffaa00', '#00ff88']

function TimelineItem({ entry, position, index }: { entry: TimelineEntry, position: [number, number, number], index: number }) {
    const color = colors[index % colors.length]

    return (
        <group position={position}>
            {/* Glowing cube - emissive like Bruno's */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    metalness={0.2}
                    roughness={0.3}
                />
            </mesh>

            {/* Point light for glow effect */}
            <pointLight position={[0, 0.5, 0]} color={color} intensity={2} distance={5} />

            {/* Connecting line to text (perspective line) */}
            <mesh position={[0, 1.5, 2]} rotation={[Math.PI / 6, 0, 0]}>
                <boxGeometry args={[0.05, 3, 0.05]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Text panel */}
            <group position={[0, 3, 2]}>
                {/* Year (Large, bright) */}
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.4}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {entry.year}
                </Text>

                {/* Title */}
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.2}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3}
                >
                    {entry.title}
                </Text>

                {/* Company */}
                <Text
                    position={[0, -0.3, 0]}
                    fontSize={0.15}
                    color="#AAAAAA"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3}
                >
                    {entry.company}
                </Text>
            </group>
        </group>
    )
}

export function Timeline() {
    const spacing = 5

    return (
        <group>
            {/* Connecting line between all milestones - neon glow */}
            {timelineData.map((_, index) => {
                if (index === timelineData.length - 1) return null
                const x1 = -30 + index * spacing
                const x2 = -30 + (index + 1) * spacing
                const lineLength = spacing

                return (
                    <mesh
                        key={`line-${index}`}
                        position={[(x1 + x2) / 2, 0.5, -15]}
                        rotation={[0, 0, 0]}
                    >
                        <boxGeometry args={[lineLength, 0.1, 0.1]} />
                        <meshStandardMaterial
                            color={colors[index % colors.length]}
                            emissive={colors[index % colors.length]}
                            emissiveIntensity={0.6}
                        />
                    </mesh>
                )
            })}

            {/* Timeline Items */}
            {timelineData.map((entry, index) => (
                <TimelineItem
                    key={index}
                    entry={entry}
                    position={[-30 + index * spacing, 0, 15]}
                    index={index}
                />
            ))}

            {/* Title sign with neon effect */}
            <group position={[-30, 0, 20]}>
                <mesh position={[0, 2, 0]} castShadow>
                    <boxGeometry args={[4, 1, 0.2]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        emissive="#00ffff"
                        emissiveIntensity={0.3}
                    />
                </mesh>
                <Text
                    position={[0, 2, 0.15]}
                    fontSize={0.4}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    CAREER JOURNEY
                </Text>
                <pointLight position={[0, 2, 0.5]} color="#00ffff" intensity={1} distance={3} />
            </group>
        </group>
    )
}
