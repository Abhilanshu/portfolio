import { useGLTF } from '@react-three/drei'

export function CherryTrees() {
    const { scene } = useGLTF('/assets/models/cherryTrees/cherryTreesVisual.glb') as any
    return <primitive object={scene} />
}

useGLTF.preload('/assets/models/cherryTrees/cherryTreesVisual.glb')
