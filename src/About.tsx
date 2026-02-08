import { Text } from '@react-three/drei'

export function About() {
    return (
        <group position={[20, 3, -35]}>
            {/* Background panel */}
            {/* Title */}
            <Text
                position={[0, 4, 0]}
                fontSize={0.8}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
            >
                ABOUT ME
            </Text>

            {/* Main display panel */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[8, 4, 0.2]} />
                <meshStandardMaterial color="#2C3E50" metalness={0.3} roughness={0.7} />
            </mesh>

            {/* Name / Title */}
            <Text
                position={[0, 3.5, 0.15]}
                fontSize={0.4}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                maxWidth={7.5}
            >
                Abhilanshu
            </Text>

            {/* Bio text */}
            <Text
                position={[0, 2.5, 0.15]}
                fontSize={0.18}
                color="#ECF0F1"
                anchorX="center"
                anchorY="middle"
                maxWidth={7}
                lineHeight={1.5}
            >
                Creative Developer building{'\n'}
                interactive web experiences.{'\n'}
                Passionate about 3D graphics,{'\n'}
                modern web technologies & AI.
            </Text>

            {/* Interests / Skills highlight */}
            <Text
                position={[0, 0.8, 0.15]}
                fontSize={0.15}
                color="#3498DB"
                anchorX="center"
                anchorY="middle"
                maxWidth={7}
            >
                HTML • CSS • JavaScript • Three.js • React
            </Text>

            {/* Pedestal */}
            <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[5, 6, 1, 8]} />
                <meshStandardMaterial color="#34495E" roughness={0.8} />
            </mesh>
        </group>
    )
}
