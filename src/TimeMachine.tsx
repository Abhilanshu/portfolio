import { useGLTF } from '@react-three/drei'

export function TimeMachine() {
    const { scene } = useGLTF('/assets/models/timeMachine/timeMachine.glb') as any

    return (
        <primitive object={scene} position={[-15, 0, -30]} />
    )
}

useGLTF.preload('/assets/models/timeMachine/timeMachine.glb')
