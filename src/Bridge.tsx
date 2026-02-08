import { useGLTF, Instances, Instance } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'

export function Bridge() {
    // Check if bridge model exists
    const bridgePath = '/assets/models/bridge/bridge.glb'

    let scene
    try {
        const gltf = useGLTF(bridgePath) as any
        scene = gltf.scene
    } catch (e) {
        console.warn('Bridge model not found, skipping bridge rendering')
        return null
    }

    // Extract instances from the scene
    const { instances, geometry, material } = useMemo(() => {
        const instances: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 }[] = []
        let geometry: THREE.BufferGeometry | null = null
        let material: THREE.Material | null = null

        if (scene) {
            scene.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    if (!geometry) {
                        geometry = mesh.geometry
                        material = mesh.material as THREE.Material
                    }

                    const pos = mesh.position.clone()
                    pos.y -= 1.0 // Fix floating height

                    instances.push({
                        position: pos,
                        rotation: mesh.rotation.clone(),
                        scale: mesh.scale.clone()
                    })
                }
            })
        }

        return { instances, geometry, material: material as unknown as THREE.Material }
    }, [scene])

    if (!geometry || !material || instances.length === 0) return null

    return (
        <Instances range={instances.length} geometry={geometry} material={material} castShadow receiveShadow>
            {instances.map((data, i) => (
                <group key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
                    <RigidBody type="fixed" colliders="trimesh">
                        <Instance />
                    </RigidBody>
                </group>
            ))}
        </Instances>
    )
}

// Preload only if the file exists
try {
    useGLTF.preload('/assets/models/bridge/bridge.glb')
} catch (e) {
    // Silent fail if no bridge model
}
