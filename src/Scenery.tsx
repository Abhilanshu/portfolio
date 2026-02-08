import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export function Scenery() {
    const { scene } = useGLTF('/assets/models/scenery/scenery.glb') as any

    // Fix white materials by applying proper colors
    useEffect(() => {
        scene.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
                // Apply material based on object properties
                const material = new THREE.MeshStandardMaterial({
                    color: child.material?.color || new THREE.Color('#888888'),
                    roughness: 0.8,
                    metalness: 0.1,
                })
                child.material = material
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene])

    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/scenery/scenery.glb')
