import { useGLTF } from '@react-three/drei'

export function Scenery() {
    const { scene } = useGLTF('/assets/models/scenery/scenery.glb') as any

    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/scenery/scenery.glb')
