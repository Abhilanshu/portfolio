import { Text3D, Center } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function NameText() {
    const [isHit, setIsHit] = useState(false)
    const groupRef = useRef<any>(null)

    // Rotate continuously
    useFrame((_state, delta) => {
        if (groupRef.current && !isHit) {
            groupRef.current.rotation.y += delta * 0.5 // Slow rotation
        }
    })

    return (
        <group ref={groupRef} position={[0, 3, 5]}> {/* Higher position - visible at top */}
            {/* 3D Text with Physics - falls when hit */}
            <RigidBody
                type={isHit ? 'dynamic' : 'fixed'}
                colliders="cuboid"
                onCollisionEnter={() => setIsHit(true)}
                friction={0.7}
                restitution={0.3}
            >
                <Center>
                    <Text3D
                        font="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_bold.typeface.json"
                        size={1.5}
                        height={0.3}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        ABHILANSHU
                        <meshStandardMaterial
                            color="#FFD700"
                            emissive="#FF6B00"
                            emissiveIntensity={0.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </Text3D>
                </Center>
            </RigidBody>

            {/* Glow light under name */}
            <pointLight
                position={[0, -0.5, 0]}
                color="#FFD700"
                intensity={3}
                distance={10}
            />
        </group>
    )
}
