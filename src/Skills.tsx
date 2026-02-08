import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface Skill {
    name: string
    color: string
    shortName: string
}

const skills: Skill[] = [
    { name: 'React', color: '#61DAFB', shortName: 'React' },
    { name: 'Three.js', color: '#000000', shortName: 'Three' },
    { name: 'TypeScript', color: '#3178C6', shortName: 'TS' },
    { name: 'WebGL', color: '#990000', shortName: 'WebGL' },
    { name: 'R3F', color: '#FF6B6B', shortName: 'R3F' },
    { name: 'GLSL', color: '#5586A4', shortName: 'GLSL' },
    { name: 'Vite', color: '#646CFF', shortName: 'Vite' },
    { name: 'Git', color: '#F05032', shortName: 'Git' },
]

function SkillBadge({ skill, position, index }: { skill: Skill; position: [number, number, number]; index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)

    // Gentle floating animation for performance
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index
        }
    })

    return (
        <group ref={groupRef} position={position}>
            {/* Badge cube - minimal geometry */}
            <mesh ref={meshRef} castShadow>
                <boxGeometry args={[1.2, 1.2, 0.3]} />
                <meshStandardMaterial
                    color={skill.color}
                    metalness={0.3}
                    roughness={0.4}
                    emissive={skill.color}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Skill text */}
            <Text
                position={[0, 0, 0.2]}
                fontSize={0.3}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {skill.shortName}
            </Text>

            {/* Label below */}
            <Text
                position={[0, -0.9, 0]}
                fontSize={0.15}
                color="#CCCCCC"
                anchorX="center"
                anchorY="middle"
            >
                {skill.name}
            </Text>
        </group>
    )
}

export function Skills() {
    // Arrange skills in a circle for visual appeal
    const radius = 8
    const angleStep = (Math.PI * 2) / skills.length

    return (
        <group position={[35, 0, 10]}>
            {/* Title */}
            <Text
                position={[0, 4, 0]}
                fontSize={0.8}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
            >
                TECH STACK
            </Text>

            {/* Skill badges in a circle */}
            {skills.map((skill, index) => {
                const angle = angleStep * index
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                return (
                    <SkillBadge
                        key={skill.name}
                        skill={skill}
                        position={[x, 2, z]}
                        index={index}
                    />
                )
            })}

            {/* Central pedestal - single mesh for performance */}
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[radius * 1.2, radius * 1.3, 0.5, 16]} />
                <meshStandardMaterial color="#34495E" roughness={0.8} />
            </mesh>
        </group>
    )
}
