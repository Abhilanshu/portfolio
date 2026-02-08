import { useGLTF } from '@react-three/drei'

export function Flowers() {
    const { scene } = useGLTF('/assets/models/flowers/flowersReferences.glb') as any
    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/flowers/flowersReferences.glb')
