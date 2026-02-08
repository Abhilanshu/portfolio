import { useGLTF, Instances, Instance } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'

interface PropGroupProps {
    name: string
    modelPath: string
    scale?: number
    collider?: 'box' | 'hull' | 'trimesh'
    type?: 'fixed' | 'dynamic'
    mass?: number
    offset?: [number, number, number]
}

function PropGroup({ modelPath, scale = 1, collider = 'trimesh', type = 'fixed', mass = 1, offset = [0, 0, 0] }: PropGroupProps) {
    const { scene } = useGLTF(modelPath) as any

    // Extract instances from the scene children
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
                    // Apply extra offset
                    const pos = mesh.position.clone().add(new THREE.Vector3(...offset))

                    // Filter out props on the track (Radius 48 - 68)
                    const radius = Math.sqrt(pos.x * pos.x + pos.z * pos.z)
                    if (radius < 48 || radius > 68) {
                        instances.push({
                            position: pos,
                            rotation: mesh.rotation.clone(),
                            scale: mesh.scale.clone().multiplyScalar(scale)
                        })
                    }
                }
            })
        }

        return { instances, geometry, material: material as unknown as THREE.Material }
    }, [scene, scale, offset])

    if (!geometry || !material) return null

    return (
        <Instances range={instances.length} geometry={geometry} material={material} castShadow receiveShadow>
            {instances.map((data, i) => (
                <group key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
                    {/* Use trimesh for static objects for perfect collision, box for dynamic */}
                    <RigidBody type={type} colliders={collider === 'box' ? false : collider} mass={mass} position={[0, 0, 0]}>
                        <Instance />
                        {collider === 'box' && <CuboidCollider args={[0.5, 0.5, 0.5]} position={[0, 0.5, 0]} />}
                    </RigidBody>
                </group>
            ))}
        </Instances>
    )
}

export function Props() {
    return (
        <>
            {/* Original Items */}
            <PropGroup name="fences" modelPath="/assets/models/fences/fences.glb" collider="trimesh" type="fixed" />
            <PropGroup name="benches" modelPath="/assets/models/benches/benches.glb" collider="trimesh" type="fixed" />
            <PropGroup name="lanterns" modelPath="/assets/models/lanterns/lanterns.glb" collider="trimesh" scale={1} type="fixed" />

            {/* Extra Density */}
            <PropGroup name="fences_extra" modelPath="/assets/models/fences/fences.glb" collider="trimesh" type="fixed" offset={[40, 0, 40]} />
            <PropGroup name="benches_extra" modelPath="/assets/models/benches/benches.glb" collider="trimesh" type="fixed" offset={[-40, 0, -40]} />
            <PropGroup name="lanterns_extra" modelPath="/assets/models/lanterns/lanterns.glb" collider="trimesh" scale={1} type="fixed" offset={[20, 0, -20]} />
        </>
    )
}

useGLTF.preload('/assets/models/fences/fences.glb')
useGLTF.preload('/assets/models/benches/benches.glb')
useGLTF.preload('/assets/models/lanterns/lanterns.glb')
useGLTF.preload('/assets/models/bricks/bricks.glb')
useGLTF.preload('/assets/models/explosiveCrates/explosiveCrates.glb')
