import { useGLTF } from '@react-three/drei'

export function Intro() {
    const { scene } = useGLTF('/assets/models/intro/intro.glb') as any

    return (
        <primitive object={scene} position={[0, 0, 10]} />
    )
}

useGLTF.preload('/assets/models/intro/intro.glb')
