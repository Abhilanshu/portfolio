import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles() {
    const particlesRef = useRef<THREE.Points>(null)
    const count = 1000

    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const velocities = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Random positions across the map
            positions[i * 3] = (Math.random() - 0.5) * 100
            positions[i * 3 + 1] = Math.random() * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100

            // Falling velocities
            velocities[i * 3] = (Math.random() - 0.5) * 0.1
            velocities[i * 3 + 1] = -Math.random() * 0.5 - 0.1
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
        }

        return { positions, velocities }
    }, [count])

    useFrame((_state, delta) => {
        if (!particlesRef.current) return

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            // Update positions
            positions[i * 3] += velocities[i * 3] * delta * 60
            positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60
            positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60

            // Reset if below ground
            if (positions[i * 3 + 1] < 0) {
                positions[i * 3 + 1] = 20
                positions[i * 3] = (Math.random() - 0.5) * 100
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#FFD700"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}
