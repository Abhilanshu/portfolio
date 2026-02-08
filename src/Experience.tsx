import { Environment } from '@react-three/drei'
import { EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { Player } from './Player'
import { World } from './World'
import { Floor } from './Floor'
import { NameText } from './NameText'
import { Vegetation } from './Vegetation'
import { Grass } from './Grass'
import { Props } from './Props'
import { Minimap } from './Minimap'
import { Water } from './Water'
import { Projects } from './Projects'
import { Scenery } from './Scenery'
import { Flowers } from './Flowers'
import { Bushes } from './Bushes'
import { PoleLights } from './PoleLights'
import { CherryTrees } from './CherryTrees'
import { Playground } from './Playground'
import { StartFinishLines } from './StartFinishLines'
import { ExplosiveCrates } from './ExplosiveCrates'
import { Timeline } from './Timeline'
import { Contact } from './Contact'
import { Skills } from './Skills'
import { About } from './About'
import { BowlingPins } from './BowlingPins'
import { BrickWall } from './BrickWall'
import { Particles } from './Particles'
import { TireTracks } from './TireTracks'
import { Bridge } from './Bridge'
// import { BoundaryMarkers } from './BoundaryMarkers'

export const Experience = () => {
    return (
        <>
            {/* Bright playful background - warm sky color */}
            <color attach="background" args={['#87CEEB']} />

            {/* Warm atmospheric fog for depth - darker to avoid whiteout */}
            <fog attach="fog" args={['#febd78', 30, 250]} />

            {/* Environment for realistic lighting and reflections */}
            <Environment preset="sunset" background={false} blur={0.5} />

            {/* Warm directional light - golden hour feel */}
            <directionalLight
                position={[10, 15, 10]}
                castShadow
                intensity={0.8}
                color="#fff0dd"
                shadow-bias={-0.00005}
            >
                <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
            </directionalLight>

            {/* Advanced Lighting */}
            <directionalLight
                position={[10, 15, 10]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
            />
            <hemisphereLight intensity={0.4} groundColor="#444444" />
            <ambientLight intensity={0.3} color="#ffe4c4" />

            {/* Secondary fill light from opposite side */}
            <directionalLight
                position={[-8, 8, -8]}
                intensity={0.4}
                color="#b3d9ff"
            />

            <Player />
            <NameText />
            <World />

            {/* Water renders first (below floor) */}
            <Water />

            {/* Floor - Visual rendering (Bruno Simon style) */}
            <Floor />

            {/* Tire tracks render on top of floor */}
            <TireTracks />

            {/* Boundary Markers - Commented out (using invisible walls only) */}
            {/* <BoundaryMarkers /> */}

            <Vegetation />
            <Grass />
            <Props />
            <Bridge />
            <Projects />
            <Scenery />
            <ExplosiveCrates />
            <BowlingPins />
            <BrickWall />
            <Particles />
            <Timeline />
            <StartFinishLines />
            <Contact />
            <Skills />
            <About />
            <Flowers />
            <Bushes />
            <PoleLights />
            <CherryTrees />
            <Playground />

            {/* Minimap tracker */}
            <Minimap />

            <EffectComposer>
                <ToneMapping />
            </EffectComposer>
        </>
    )
}
