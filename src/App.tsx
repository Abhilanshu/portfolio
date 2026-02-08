import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Experience } from './Experience'
import { KeyboardControls } from '@react-three/drei'
import { EffectComposer, TiltShift2, Vignette, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { IntroScreen } from './IntroScreen'
import { UI } from './UI'

export default function App() {
  const map = [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  return (
    <>
      <IntroScreen />
      <UI />
      <KeyboardControls map={map}>
        <Canvas
          shadows
          camera={{ position: [15, 15, 15], fov: 25 }}
          style={{ background: '#87CEEB' }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Physics debug={false} gravity={[0, -9.81, 0]}>
              <Experience />
            </Physics>
            <EffectComposer>
              <TiltShift2 blur={0.15} />
              <Vignette eskil={false} offset={0.1} darkness={0.4} />
              <Bloom luminanceThreshold={0.9} intensity={0.2} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}
