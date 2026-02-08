import { Environment } from '@react-three/drei'
import { EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { Player } from './Player'
import { World } from './World'
import { Floor } from './Floor'
import { Vegetation } from './Vegetation'
import { Grass } from './Grass'
import { Props } from './Props'
import { Water } from './Water'
import { Projects } from './Projects'
import { Scenery } from './Scenery'
import { Flowers } from './Flowers'
import { Bushes } from './Bushes'
import { PoleLights } from './PoleLights'
import { CherryTrees } from './CherryTrees'
import { Playground } from './Playground'
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
import { BoundaryMarkers } from './BoundaryMarkers'

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

            {/* Bright ambient light for overall visibility */}
            <ambientLight intensity={0.5} color="#ffe4c4" />

            {/* Secondary fill light from opposite side */}
            <directionalLight
                position={[-8, 8, -8]}
                intensity={0.4}
                color="#b3d9ff"
            />

            <Player />
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
            {/* TEMPORARILY DISABLED for debugging black screen */}
            {/* <Contact /> */}
            {/* <Skills /> */}
            {/* <About /> */}
            <Flowers />
            <Bushes />
            <PoleLights />
            <CherryTrees />
            <Playground />

            <EffectComposer>
                <ToneMapping />
            </EffectComposer>
        </>
    )
}

