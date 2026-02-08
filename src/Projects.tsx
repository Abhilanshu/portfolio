import { useTexture, Text } from '@react-three/drei'
import { projects } from './data/projects'
import { useGameStore } from './store/useGameStore'
import { useState } from 'react'

interface ProjectBoardProps {
    project: typeof projects[0]
    position: [number, number, number]
    rotation?: [number, number, number]
}

function ProjectBoard({ project, position, rotation = [0, 0, 0] }: ProjectBoardProps) {
    // Load texture
    const texture = useTexture(`/assets/models/projects/images/${project.image}`)
    const addPoints = useGameStore((state) => state.addPoints)
    const [showPoints, setShowPoints] = useState(false)

    const handleBoardClick = () => {
        // Award points (10 per billboard)
        addPoints(`project-${project.title}`, 10)

        // Show floating text
        setShowPoints(true)
        setTimeout(() => setShowPoints(false), 1000)

        // Open project URL
        window.open(project.url, '_blank')
    }

    return (
        <group position={position} rotation={rotation}>
            {/* Board Frame - Visual Only */}
            <mesh position={[0, 1.5, 0]} onClick={handleBoardClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
                <boxGeometry args={[4, 2.5, 0.2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Posts */}
            <mesh position={[-1.8, 0.75, 0]}>
                <boxGeometry args={[0.2, 1.5, 0.2]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[1.8, 0.75, 0]}>
                <boxGeometry args={[0.2, 1.5, 0.2]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            {/* Image */}
            <mesh position={[0, 1.5, 0.11]} onClick={handleBoardClick}>
                <planeGeometry args={[3.8, 2.3]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>


            {/* Title Text */}
            <Text
                position={[0, 2.9, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {project.title}
            </Text>

            {/* Floating Points Feedback */}
            {showPoints && (
                <Text
                    position={[0, 3.5, 0]}
                    fontSize={0.5}
                    color="#FFD700"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    +10 Points!
                </Text>
            )}
        </group>
    )
}

export function Projects() {
    return (
        <>
            {projects.map((project, index) => {
                // Spread them to DIFFERENT empty areas - one on orange platform shown by user
                const positions = [
                    [5, 0.5, 11],      // Billboard 1: Orange platform location (from user screenshot)
                    [-25, 0.5, -30],   // Billboard 2: Far left grass area
                    [25, 0.5, -15],    // Billboard 3: Far right grass area
                    [-15, 0.5, 25],    // Billboard 4: Back left empty space
                    [20, 0.5, 30],     // Billboard 5: Back right empty corner
                ]

                const rotations = [
                    [0, 0.2, 0],       // Face slightly inward
                    [0, -0.5, 0],      // Face inward
                    [0, 0.5, 0],       // Face inward
                    [0, -0.3, 0],      // Slight angle
                    [0, 0.4, 0],       // Face inward
                ]

                const [x, y, z] = positions[index] || [5, 0.5, 11]
                const rotation = rotations[index] || [0, 0, 0]

                return (
                    <ProjectBoard
                        key={index}
                        project={project}
                        position={[x, y, z] as [number, number, number]}
                        rotation={rotation as [number, number, number]}
                    />
                )
            })}
        </>
    )
}
