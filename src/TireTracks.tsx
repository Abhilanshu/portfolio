import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

// Simple Dynamic Tire Tracks using InstancedMesh
// This creates a trail behind the player
export function TireTracks() {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const [count, setCount] = useState(0)

    // Dummy object for positioning
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const lastPos = useRef(new THREE.Vector3())
    const index = useRef(0)
    const MAX_TRACKS = 500

    useFrame((state) => {
        // Find player object in scene
        const player = state.scene.getObjectByName('Player')
        if (!player || !meshRef.current) return

        const pos = player.position

        // Spawn track if moved enough
        if (pos.distanceTo(lastPos.current) > 0.8) {
            lastPos.current.copy(pos)

            // Position track segment
            dummy.position.copy(pos)
            dummy.position.y = 0.02 // Slightly above ground
            dummy.rotation.x = -Math.PI / 2
            dummy.rotation.z = player.rotation.y // Match player rotation roughly

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(index.current, dummy.matrix)

            // Advance index (circular buffer)
            index.current = (index.current + 1) % MAX_TRACKS
            meshRef.current.instanceMatrix.needsUpdate = true

            // Increase visible count until full
            if (count < MAX_TRACKS) setCount(count + 1)
        }
    })

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, MAX_TRACKS]}
            count={MAX_TRACKS} // Always render all, but initialize them invisible (scale 0) if needed
        // Actually just rendering garbage at 0,0,0 is fine initially
        >
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial color="#5C3317" transparent opacity={0.5} />
        </instancedMesh>
    )
}
