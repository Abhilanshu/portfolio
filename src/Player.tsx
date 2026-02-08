import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export const Player = () => {
    const body = useRef<RapierRigidBody>(null)
    const [subscribeKeys, getKeys] = useKeyboardControls()

    // Smooth camera target
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    useFrame((state, delta) => {
        if (!body.current) return

        const { forward, backward, left, right } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta * 60
        const torqueStrength = 0.3 * delta * 60

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (left) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }
        if (right) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse, true)
        body.current.applyTorqueImpulse(torque, true)

        // Limit max velocity
        const velocity = body.current.linvel()
        const maxSpeed = 15
        const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed
            body.current.setLinvel({ x: velocity.x * scale, y: velocity.y, z: velocity.z * scale }, true)
        }

        // Camera Follow
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.x += 15
        cameraPosition.y += 15
        cameraPosition.z += 15

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)
    })

    return (
        <group name="Player">
            <RigidBody
                ref={body}
                canSleep={false}
                colliders="ball"
                restitution={0.05} // Very low bounce - prevent flying
                friction={1}
                linearDamping={0.8} // Increased damping to reduce bouncing
                angularDamping={0.8}
                position={[0, 1, 0]}
                name="PlayerBody"
                onCollisionEnter={(_event) => {
                    // Play collision sound based on impact intensity
                    const velocity = body.current?.linvel()
                    if (velocity) {
                        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)
                        const intensity = Math.min(speed / 10, 1) // Normalize to 0-1
                        if (intensity > 0.1 && (window as any).playCollisionSound) {
                            (window as any).playCollisionSound(intensity)
                        }
                    }
                }}
            >
                <mesh castShadow receiveShadow>
                    <icosahedronGeometry args={[0.3, 1]} />
                    <meshStandardMaterial flatShading color="mediumpurple" />
                </mesh>
            </RigidBody>
        </group>
    )
}
