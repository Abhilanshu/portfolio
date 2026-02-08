import { useGLTF, Instances, Instance } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'
import { mergeBufferGeometries } from 'three-stdlib'

interface TreeGroupProps {
    visualPath: string
    referencePath: string
    leavesColor: string
}

function TreeGroup({ visualPath, referencePath, leavesColor }: TreeGroupProps) {
    const { scene: visualScene } = useGLTF(visualPath) as any
    const { scene: referenceScene } = useGLTF(referencePath) as any

    // 2. Process Reference Model (Positions)
    const instances = useMemo(() => {
        const temp: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 }[] = []
        if (referenceScene) {
            referenceScene.traverse((child: THREE.Object3D) => {
                if (child.parent === referenceScene) {
                    const pos = child.position.clone()
                    pos.y += 0.3 // Slight lift above terrain
                    temp.push({
                        position: pos,
                        rotation: child.rotation.clone(),
                        scale: child.scale.clone()
                    })
                }
            })
        }
        return temp
    }, [referenceScene])

    if (!visualScene) return null

    return (
        <group>
            {instances.map((data, i) => (
                <group key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
                    {/* Render the full visual model directly - No Collision */}
                    <primitive object={visualScene.clone()} />
                </group>
            ))}
        </group>
    )
}

export function Vegetation() {
    return (
        <>
            <TreeGroup
                visualPath="/assets/models/birchTrees/birchTreesVisual.glb"
                referencePath="/assets/models/birchTrees/birchTreesReferences.glb"
                leavesColor="#ff4f2b"
            />
            <TreeGroup
                visualPath="/assets/models/oakTrees/oakTreesVisual.glb"
                referencePath="/assets/models/oakTrees/oakTreesReferences.glb"
                leavesColor="#b4b536"
            />
        </>
    )
}

useGLTF.preload('/assets/models/birchTrees/birchTreesVisual.glb')
useGLTF.preload('/assets/models/birchTrees/birchTreesReferences.glb')
useGLTF.preload('/assets/models/oakTrees/oakTreesVisual.glb')
useGLTF.preload('/assets/models/oakTrees/oakTreesReferences.glb')
