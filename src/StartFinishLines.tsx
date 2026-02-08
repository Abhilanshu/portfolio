import { Text } from '@react-three/drei'

export function StartFinishLines() {
    return (
        <>
            {/* START LINE - At Spawn */}
            <group position={[0, 0, 0]}>
                {/* Banner Poles */}
                <mesh position={[-4, 2, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[4, 2, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4]} />
                    <meshStandardMaterial color="#333" />
                </mesh>

                {/* Banner Board */}
                <mesh position={[0, 3.5, 0]}>
                    <boxGeometry args={[8.2, 1, 0.1]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* START Text */}
                <Text
                    position={[0, 3.5, 0.06]}
                    fontSize={0.6}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                >
                    START
                </Text>
                <Text
                    position={[0, 3.5, -0.06]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.6}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                >
                    START
                </Text>

                {/* Checkered line on ground */}
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[8, 1]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                {/* Black checkers */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[-3.5 + i, 0.03, (i % 2 === 0 ? 0.25 : -0.25)]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[0.5, 0.5]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>
                ))}
            </group>

            {/* FINISH LINE - At end of track (approx position based on world) */}
            <group position={[-20, 0, 35]} rotation={[0, -0.5, 0]}>
                {/* Checkered line on ground */}
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 1.5]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Visual Checkers Pattern (Simplified for performance) */}
                {[...Array(10)].map((_, i) => (
                    <mesh key={i} position={[-4.5 + i, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[0.5, 1.5]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#000000" : "#ffffff"} />
                    </mesh>
                ))}

                {/* Floating Finish Text */}
                <Text
                    position={[0, 2, 0]}
                    fontSize={0.8}
                    color="#87CEEB"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000"
                >
                    FINISH
                </Text>
            </group>
        </>
    )
}
