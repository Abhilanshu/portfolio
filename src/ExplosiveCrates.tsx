import { useState, useRef } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ExplosiveCrateProps {
    position: [number, number, number]
}



export function ExplosiveCrate({ position }: ExplosiveCrateProps) {
    const [exploded, setExploded] = useState(false)
    const [pieces, setPieces] = useState<Array<{ position: [number, number, number], impulse: THREE.Vector3 }>>([])
    const crateRef = useRef<RapierRigidBody>(null)

    // Simplified: No manual collision handling needed for now, handled by physics engine naturally
    // kept state for future expansion if needed, but removing unused function to fix lint error

    return (
        <group>
            {!exploded ? (
                <mesh position={position} castShadow receiveShadow>
                    {/* TNT Crate visual only */}
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#D2691E" roughness={0.9} />
                    {/* "EXPLOSIVE" label */}
                    <mesh position={[0, 0, 0.51]}>
                        <planeGeometry args={[0.8, 0.3]} />
                        <meshBasicMaterial color="#FF4500" />
                    </mesh>
                </mesh>
            ) : (
                // Render explosion pieces (also visual only now)
                pieces.map((piece, i) => (
                    <mesh key={i} position={piece.position} castShadow>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                ))
            )}
        </group>
    )
}

// Component to place multiple explosive crates
export function ExplosiveCrates() {
    const cratePositions: Array<[number, number, number]> = [
        [10, 1, 10],
        [15, 1, 15],
        [-10, 1, -10],
        [-15, 1, 15],
        [20, 1, -5],
    ]

    return (
        <>
            {cratePositions.map((pos, i) => (
                <ExplosiveCrate key={i} position={pos} />
            ))}
        </>
    )
}
