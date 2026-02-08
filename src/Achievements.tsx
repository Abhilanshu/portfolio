import { useGLTF } from '@react-three/drei'

export function Achievements() {
    const { scene } = useGLTF('/assets/models/achievements/achievements.glb') as any
    return <primitive object={scene} position={[10, 0, -20]} />
}

useGLTF.preload('/assets/models/achievements/achievements.glb')
