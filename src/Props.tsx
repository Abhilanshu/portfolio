import { useGLTF, Instances, Instance } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

interface PropGroupProps {
    name: string
    modelPath: string
    scale?: number
    offset?: [number, number, number]
}

function PropGroup({ modelPath, scale = 1, offset = [0, 0, 0] }: PropGroupProps) {
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

                    // Lift props above terrain
                    pos.y += 0.5

                    // Trust reference/manual positions - NO FILTERING
                    instances.push({
                        position: pos,
                        rotation: mesh.rotation.clone(),
                        scale: mesh.scale.clone().multiplyScalar(scale)
                    })
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
                    {/* Visual only - No collision to prevent ball jumping */}
                    <Instance />
                </group>
            ))}
        </Instances>
    )
}

export function Props() {
    return (
        <>
            {/* Original Items */}
            <PropGroup name="fences" modelPath="/assets/models/fences/fences.glb" />
            <PropGroup name="benches" modelPath="/assets/models/benches/benches.glb" />
            <PropGroup name="lanterns" modelPath="/assets/models/lanterns/lanterns.glb" scale={1} />

            {/* Extra Density */}
            <PropGroup name="fences_extra" modelPath="/assets/models/fences/fences.glb" offset={[40, 0, 40]} />
            <PropGroup name="benches_extra" modelPath="/assets/models/benches/benches.glb" offset={[-40, 0, -40]} />
            <PropGroup name="lanterns_extra" modelPath="/assets/models/lanterns/lanterns.glb" scale={1} offset={[20, 0, -20]} />
        </>
    )
}

useGLTF.preload('/assets/models/fences/fences.glb')
useGLTF.preload('/assets/models/benches/benches.glb')
useGLTF.preload('/assets/models/lanterns/lanterns.glb')
useGLTF.preload('/assets/models/bricks/bricks.glb')
useGLTF.preload('/assets/models/explosiveCrates/explosiveCrates.glb')
