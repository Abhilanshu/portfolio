import { useGLTF } from '@react-three/drei'

export function PoleLights() {
    const { scene } = useGLTF('/assets/models/poleLights/poleLights.glb') as any
    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/poleLights/poleLights.glb')
