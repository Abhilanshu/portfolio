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

    const treeData = useMemo(() => {
        const instances: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 }[] = []
        let leavesMat: THREE.Material | undefined
        let bodyMat: THREE.Material | undefined
        let bodyGeo: THREE.BufferGeometry | undefined
        let mergedLeavesGeo: THREE.BufferGeometry | undefined

        // 1. Process Visual Model (Geometry & Materials)
        const leavesGeos: THREE.BufferGeometry[] = []
        if (visualScene) {
            visualScene.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    if (mesh.name.startsWith('treeLeaves')) {
                        leavesGeos.push(mesh.geometry.clone())
                        if (!leavesMat) {
                            leavesMat = new THREE.MeshStandardMaterial({
                                color: leavesColor,
                                side: THREE.DoubleSide
                            })
                        }
                    } else if (mesh.name.startsWith('treeBody')) {
                        bodyGeo = mesh.geometry
                        bodyMat = mesh.material as THREE.Material
                    }
                }
            })
        }

        if (leavesGeos.length > 0) {
            mergedLeavesGeo = mergeBufferGeometries(leavesGeos) || undefined
        }

        // 2. Process Reference Model (Positions)
        if (referenceScene) {
            referenceScene.traverse((child: THREE.Object3D) => {
                // In Bruno's source, children of the scene are the instances
                if (child.parent === referenceScene) {
                    const pos = child.position.clone()
                    const radius = Math.sqrt(pos.x * pos.x + pos.z * pos.z)

                    // Filter out trees on the track (Radius 48 - 68)
                    if (radius < 48 || radius > 68) {
                        instances.push({
                            position: pos,
                            rotation: child.rotation.clone(),
                            scale: child.scale.clone()
                        })
                    }
                }
            })
        }

        return { instances, bodyGeo, bodyMat, mergedLeavesGeo, leavesMat }
    }, [visualScene, referenceScene, leavesColor])

    if (!treeData.bodyGeo || !treeData.bodyMat || !treeData.mergedLeavesGeo || !treeData.leavesMat) {
        return null
    }

    return (
        <group>
            {/* Bodies with Colliders */}
            <Instances
                range={treeData.instances.length}
                geometry={treeData.bodyGeo}
                material={treeData.bodyMat}
                castShadow
                receiveShadow
            >
                {treeData.instances.map((data, i) => (
                    <group key={`body-${i}`} position={data.position} rotation={data.rotation} scale={data.scale}>
                        <Instance />
                        <RigidBody type="fixed" colliders={false}>
                            <CuboidCollider args={[0.2, 1, 0.2]} position={[0, 1, 0]} />
                        </RigidBody>
                    </group>
                ))}
            </Instances>

            {/* Leaves (Visual Only) */}
            <Instances
                range={treeData.instances.length}
                geometry={treeData.mergedLeavesGeo}
                material={treeData.leavesMat}
                castShadow
                receiveShadow
            >
                {treeData.instances.map((data, i) => (
                    <group key={`leaves-${i}`} position={data.position} rotation={data.rotation} scale={data.scale}>
                        <Instance />
                    </group>
                ))}
            </Instances>
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
