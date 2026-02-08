import { useGLTF } from '@react-three/drei'

export function Bushes() {
    const { scene } = useGLTF('/assets/models/bushes/bushesReferences.glb') as any
    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/bushes/bushesReferences.glb')
