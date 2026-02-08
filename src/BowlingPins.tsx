import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

// Bowling pins arranged in standard formation
export function BowlingPins() {
    const pinPositions: Array<[number, number, number]> = [
        // Front pin
        [20, 0.5, 20],
        // Second row
        [19.5, 0.5, 21],
        [20.5, 0.5, 21],
        // Third row
        [19, 0.5, 22],
        [20, 0.5, 22],
        [21, 0.5, 22],
        // Fourth row
        [18.5, 0.5, 23],
        [19.5, 0.5, 23],
        [20.5, 0.5, 23],
        [21.5, 0.5, 23],
    ]

    return (
        <group>
            {pinPositions.map((pos, i) => (
                <RigidBody
                    key={i}
                    position={pos}
                    colliders="hull"
                    restitution={0.3}
                    friction={0.8}
                    mass={1}
                >
                    {/* Bowling pin shape */}
                    <group>
                        {/* Bottom cylinder */}
                        <mesh position={[0, 0.3, 0]} castShadow>
                            <cylinderGeometry args={[0.15, 0.2, 0.6, 8]} />
                            <meshStandardMaterial color="#f0f0f0" />
                        </mesh>
                        {/* Top sphere */}
                        <mesh position={[0, 0.7, 0]} castShadow>
                            <sphereGeometry args={[0.12, 8, 8]} />
                            <meshStandardMaterial color="#f0f0f0" />
                        </mesh>
                        {/* Red stripe */}
                        <mesh position={[0, 0.5, 0]}>
                            <cylinderGeometry args={[0.16, 0.16, 0.1, 8]} />
                            <meshStandardMaterial color="#ff0000" />
                        </mesh>
                    </group>
                </RigidBody>
            ))}
        </group>
    )
}
