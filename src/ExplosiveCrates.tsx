import { useState, useRef } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ExplosiveCrateProps {
    position: [number, number, number]
}

function CratePiece({ position, impulse }: { position: [number, number, number], impulse: THREE.Vector3 }) {
    const ref = useRef<RapierRigidBody>(null)

    // Apply impulse on mount
    useFrame(() => {
        if (ref.current && impulse) {
            ref.current.applyImpulse(impulse, true)
            impulse.set(0, 0, 0) // Only apply once
        }
    })

    return (
        <RigidBody
            ref={ref}
            position={position}
            colliders="cuboid"
            restitution={0.3}
            friction={0.8}
        >
            <mesh castShadow>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </RigidBody>
    )
}

export function ExplosiveCrate({ position }: ExplosiveCrateProps) {
    const [exploded, setExploded] = useState(false)
    const [pieces, setPieces] = useState<Array<{ position: [number, number, number], impulse: THREE.Vector3 }>>([])
    const crateRef = useRef<RapierRigidBody>(null)

    const handleCollision = () => {
        if (exploded || !crateRef.current) return

        // Get velocity to check impact force
        const velocity = crateRef.current.linvel()
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)

        // Explode if hit hard enough
        if (speed > 3) {
            setExploded(true)

            // Create pieces
            const newPieces: Array<{ position: [number, number, number], impulse: THREE.Vector3 }> = []
            const cratePos = crateRef.current.translation()

            for (let i = 0; i < 8; i++) {
                // Random offset from crate center
                const offset = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4
                )

                // Radial impulse outward
                const direction = offset.clone().normalize()
                const force = 5 + Math.random() * 5
                const impulse = direction.multiplyScalar(force)
                impulse.y += 3 // Add upward force

                newPieces.push({
                    position: [
                        cratePos.x + offset.x,
                        cratePos.y + offset.y,
                        cratePos.z + offset.z
                    ],
                    impulse
                })
            }

            setPieces(newPieces)
        }
    }

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
