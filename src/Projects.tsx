import { useTexture, Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { projects } from './data/projects'
import * as THREE from 'three'

interface ProjectBoardProps {
    project: typeof projects[0]
    position: [number, number, number]
    rotation?: [number, number, number]
}

function ProjectBoard({ project, position, rotation = [0, 0, 0] }: ProjectBoardProps) {
    // Load texture
    const texture = useTexture(`/assets/models/projects/images/${project.image}`)
    // texture.encoding = THREE.sRGBEncoding // handled auto in newer three/r3f

    const handleBoardClick = () => {
        window.open(project.url, '_blank')
    }

    return (
        <group position={position} rotation={rotation}>
            {/* Board Frame */}
            <RigidBody type="fixed" colliders="hull">
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
            </RigidBody>

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
        </group>
    )
}

export function Projects() {
    return (
        <>
            {projects.map((project, index) => {
                // Place them along the negative Z axis (the road)
                // Stagger them left and right? Or just on one side?
                // Let's alternate sides: Left (-6), Right (6)
                const z = -20 - (index * 15) // Start at -20, space by 15
                // This is placing them on the central road (which is safe) taking them away from the ring track.
                // Wait, user said "tracks is not round tracks... see the tracks direction like bruno simon"
                // Bruno's track is the RED channel roughly. 
                // The user might be referring to the central straight road vs the outer ring.

                // Leave projects as is for now, they are on the central slab area.
                const x = index % 2 === 0 ? -6 : 6
                const rotY = index % 2 === 0 ? 0.3 : -0.3 // Tilt towards road

                return (
                    <ProjectBoard
                        key={index}
                        project={project}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                    />
                )
            })}
        </>
    )
}
