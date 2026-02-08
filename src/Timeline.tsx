import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface TimelineEntry {
    year: string
    title: string
    company: string
    description: string
}

const timelineData: TimelineEntry[] = [
    {
        year: '2024',
        title: 'Senior Developer',
        company: 'Tech Company',
        description: 'Leading development team'
    },
    {
        year: '2022',
        title: 'Full Stack Developer',
        company: 'Startup Inc',
        description: 'Built scalable web applications'
    },
    {
        year: '2020',
        title: 'Junior Developer',
        company: 'First Job',
        description: 'Started career in web development'
    },
]

function TimelineItem({ entry, position }: { entry: TimelineEntry, position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Pedestal - Visual Only */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.8, 1, 1, 8]} />
                <meshStandardMaterial color="#8B7355" roughness={0.8} />
            </mesh>

            {/* Display Panel */}
            <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                <boxGeometry args={[2, 1.5, 0.1]} />
                <meshStandardMaterial color="#2C3E50" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Year (Large) */}
            <Text
                position={[0, 2, 0.06]}
                rotation={[0, Math.PI / 4, 0]}
                fontSize={0.3}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
            >
                {entry.year}
            </Text>

            {/* Title */}
            <Text
                position={[0, 1.7, 0.06]}
                rotation={[0, Math.PI / 4, 0]}
                fontSize={0.15}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.8}
            >
                {entry.title}
            </Text>

            {/* Company */}
            <Text
                position={[0, 1.5, 0.06]}
                rotation={[0, Math.PI / 4, 0]}
                fontSize={0.12}
                color="#3498DB"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.8}
            >
                {entry.company}
            </Text>

            {/* Description */}
            <Text
                position={[0, 1.3, 0.06]}
                rotation={[0, Math.PI / 4, 0]}
                fontSize={0.08}
                color="#BDC3C7"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.8}
            >
                {entry.description}
            </Text>

            {/* Glowing orb on top */}
            <mesh position={[0, 2.5, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFD700"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
        </group>
    )
}

export function Timeline() {
    // Place timeline items in a path
    const spacing = 5

    return (
        <group>
            {/* Title Sign - Visual Only */}
            <group position={[-15, 0, -20]}>
                <mesh position={[0, 2, 0]} castShadow>
                    <boxGeometry args={[4, 1, 0.2]} />
                    <meshStandardMaterial color="#34495E" />
                </mesh>
                <Text
                    position={[0, 2, 0.15]}
                    fontSize={0.4}
                    color="#ECF0F1"
                    anchorX="center"
                    anchorY="middle"
                >
                    CAREER JOURNEY
                </Text>
            </group>

            {/* Timeline Items */}
            {timelineData.map((entry, index) => (
                <TimelineItem
                    key={index}
                    entry={entry}
                    position={[-15 + index * spacing, 0, -15]}
                />
            ))}

            {/* Connecting path/line */}
            <mesh position={[-15 + (timelineData.length - 1) * spacing / 2, 0.01, -15]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[timelineData.length * spacing, 1]} />
                <meshStandardMaterial color="#95A5A6" opacity={0.5} transparent />
            </mesh>
        </group>
    )
}
