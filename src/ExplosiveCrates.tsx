

interface ExplosiveCrateProps {
    position: [number, number, number]
}



export function ExplosiveCrate({ position }: ExplosiveCrateProps) {
    // Simplified: No manual collision handling needed for now, handled by physics engine naturally

    return (
        <group>
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
