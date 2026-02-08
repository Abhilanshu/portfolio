import { RigidBody } from '@react-three/rapier'
import { useGLTF } from '@react-three/drei'

// Visual boundary markers to replace invisible walls
export function BoundaryMarkers() {
    return (
        <group>
            {/* North boundary - Fence line */}
            {Array.from({ length: 20 }).map((_, i) => (
                <RigidBody key={`north-${i}`} type="fixed" colliders="cuboid" position={[-50 + i * 5, 0, 55]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.3, 2, 0.3]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.9} />
                    </mesh>
                    {/* Horizontal bar */}
                    <mesh position={[2.5, 1.5, 0]}>
                        <boxGeometry args={[5, 0.2, 0.2]} />
                        <meshStandardMaterial color="#A0522D" roughness={0.9} />
                    </mesh>
                </RigidBody>
            ))}

            {/* South boundary - Fence line */}
            {Array.from({ length: 20 }).map((_, i) => (
                <RigidBody key={`south-${i}`} type="fixed" colliders="cuboid" position={[-50 + i * 5, 0, -55]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.3, 2, 0.3]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.9} />
                    </mesh>
                    <mesh position={[2.5, 1.5, 0]}>
                        <boxGeometry args={[5, 0.2, 0.2]} />
                        <meshStandardMaterial color="#A0522D" roughness={0.9} />
                    </mesh>
                </RigidBody>
            ))}

            {/* East boundary - Rock wall */}
            {Array.from({ length: 15 }).map((_, i) => (
                <RigidBody key={`east-${i}`} type="fixed" colliders="hull" position={[55, 0.5, -45 + i * 6]}>
                    <mesh castShadow receiveShadow>
                        <dodecahedronGeometry args={[1 + Math.random() * 0.5, 0]} />
                        <meshStandardMaterial color="#696969" roughness={1} />
                    </mesh>
                </RigidBody>
            ))}

            {/* West boundary - Rock wall */}
            {Array.from({ length: 15 }).map((_, i) => (
                <RigidBody key={`west-${i}`} type="fixed" colliders="hull" position={[-55, 0.5, -45 + i * 6]}>
                    <mesh castShadow receiveShadow>
                        <dodecahedronGeometry args={[1 + Math.random() * 0.5, 0]} />
                        <meshStandardMaterial color="#696969" roughness={1} />
                    </mesh>
                </RigidBody>
            ))}

            {/* Corner markers - Large decorative stones */}
            <RigidBody type="fixed" colliders="hull" position={[55, 1, 55]}>
                <mesh castShadow receiveShadow>
                    <dodecahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#556B2F" roughness={1} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" colliders="hull" position={[-55, 1, 55]}>
                <mesh castShadow receiveShadow>
                    <dodecahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#556B2F" roughness={1} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" colliders="hull" position={[55, 1, -55]}>
                <mesh castShadow receiveShadow>
                    <dodecahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#556B2F" roughness={1} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" colliders="hull" position={[-55, 1, -55]}>
                <mesh castShadow receiveShadow>
                    <dodecahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#556B2F" roughness={1} />
                </mesh>
            </RigidBody>
        </group>
    )
}
