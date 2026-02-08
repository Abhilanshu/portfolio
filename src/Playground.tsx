import { useGLTF } from '@react-three/drei'

export function Playground() {
    const { scene } = useGLTF('/assets/models/playground/playgroundVisual.glb') as any
    // Move playground away from track (if it was at -20, 0, -10)
    // -20, -10 is Radius ~22. It is safe from the track (48-68).
    return <primitive object={scene} position={[-25, 0, -25]} />
}

useGLTF.preload('/assets/models/playground/playgroundVisual.glb')
