import { useGLTF } from '@react-three/drei'

export function Playground() {
    const { scene } = useGLTF('/assets/models/playground/playgroundVisual.glb') as any
    return <primitive object={scene} position={[-20, 0, -10]} />
}

useGLTF.preload('/assets/models/playground/playgroundVisual.glb')
