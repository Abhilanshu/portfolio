import { useState } from 'react'

interface Brick {
    position: [number, number, number]
    key: string
}

export function BrickWall() {
    const [bricks] = useState<Brick[]>(() => {
        const brickArray: Brick[] = []
        const wallX = -20
        const wallZ = 10

        // Build a 5-layer wall
        for (let layer = 0; layer < 5; layer++) {
            for (let i = 0; i < 8; i++) {
                const offset = layer % 2 === 0 ? 0 : 0.5
                brickArray.push({
                    position: [wallX + (i + offset) * 1.1, 0.25 + layer * 0.5, wallZ],
                    key: `brick-${layer}-${i}`
                })
            }
        }

        return brickArray
    })

    return (
        <group>
            {bricks.map((brick) => (
                <mesh key={brick.key} position={brick.position} castShadow receiveShadow>
                    <boxGeometry args={[1, 0.4, 0.5]} />
                    <meshStandardMaterial
                        color="#8B4513"
                        roughness={0.9}
                    />
                </mesh>
            ))}
        </group>
    )
}
