import { Text } from '@react-three/drei'
import { useState } from 'react'

export function Contact() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    const contactInfo = {
        email: 'abhilanshuvittolia22@gmail.com',
        github: 'Abhilanshu',
        linkedin: 'abhilanshu-vittolia-33a161359',
        twitter: 'abhilanshu' // TODO: Update with your Twitter handle if you have one
    }

    return (
        <group position={[-20, 0, -35]}>
            {/* Main Title */}
            <Text
                position={[0, 3, 0]}
                fontSize={0.8}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
            >
                GET IN TOUCH
            </Text>

            {/* Email */}
            <Text
                position={[0, 2, 0]}
                fontSize={0.4}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
            >
                {contactInfo.email}
            </Text>

            {/* Social Links - Minimal geometry for performance */}
            <group position={[0, 0.5, 0]}>
                {/* GitHub Icon */}
                <group position={[-3, 0, 0]}>
                    <mesh
                        onClick={() => window.open(`https://github.com/${contactInfo.github}`, '_blank')}
                        onPointerOver={() => {
                            document.body.style.cursor = 'pointer'
                            setHoveredLink('github')
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto'
                            setHoveredLink(null)
                        }}
                    >
                        <boxGeometry args={[1, 1, 0.2]} />
                        <meshStandardMaterial
                            color={hoveredLink === 'github' ? '#FFD700' : '#333'}
                            emissive={hoveredLink === 'github' ? '#FFD700' : '#000'}
                            emissiveIntensity={hoveredLink === 'github' ? 0.5 : 0}
                        />
                    </mesh>
                    <Text position={[0, 0, 0.15]} fontSize={0.3} color="#FFF" anchorX="center" anchorY="middle">
                        GH
                    </Text>
                    <Text position={[0, -0.8, 0]} fontSize={0.15} color="#AAA" anchorX="center" anchorY="middle">
                        GitHub
                    </Text>
                </group>

                {/* LinkedIn Icon */}
                <group position={[-1, 0, 0]}>
                    <mesh
                        onClick={() => window.open(`https://linkedin.com/in/${contactInfo.linkedin}`, '_blank')}
                        onPointerOver={() => {
                            document.body.style.cursor = 'pointer'
                            setHoveredLink('linkedin')
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto'
                            setHoveredLink(null)
                        }}
                    >
                        <boxGeometry args={[1, 1, 0.2]} />
                        <meshStandardMaterial
                            color={hoveredLink === 'linkedin' ? '#0077B5' : '#0A66C2'}
                            emissive={hoveredLink === 'linkedin' ? '#0077B5' : '#000'}
                            emissiveIntensity={hoveredLink === 'linkedin' ? 0.5 : 0}
                        />
                    </mesh>
                    <Text position={[0, 0, 0.15]} fontSize={0.3} color="#FFF" anchorX="center" anchorY="middle">
                        in
                    </Text>
                    <Text position={[0, -0.8, 0]} fontSize={0.15} color="#AAA" anchorX="center" anchorY="middle">
                        LinkedIn
                    </Text>
                </group>

                {/* Twitter/X Icon */}
                <group position={[1, 0, 0]}>
                    <mesh
                        onClick={() => window.open(`https://twitter.com/${contactInfo.twitter}`, '_blank')}
                        onPointerOver={() => {
                            document.body.style.cursor = 'pointer'
                            setHoveredLink('twitter')
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto'
                            setHoveredLink(null)
                        }}
                    >
                        <boxGeometry args={[1, 1, 0.2]} />
                        <meshStandardMaterial
                            color={hoveredLink === 'twitter' ? '#1DA1F2' : '#14171A'}
                            emissive={hoveredLink === 'twitter' ? '#1DA1F2' : '#000'}
                            emissiveIntensity={hoveredLink === 'twitter' ? 0.5 : 0}
                        />
                    </mesh>
                    <Text position={[0, 0, 0.15]} fontSize={0.3} color="#FFF" anchorX="center" anchorY="middle">
                        𝕏
                    </Text>
                    <Text position={[0, -0.8, 0]} fontSize={0.15} color="#AAA" anchorX="center" anchorY="middle">
                        Twitter
                    </Text>
                </group>

                {/* Email Icon */}
                <group position={[3, 0, 0]}>
                    <mesh
                        onClick={() => window.location.href = `mailto:${contactInfo.email}`}
                        onPointerOver={() => {
                            document.body.style.cursor = 'pointer'
                            setHoveredLink('email')
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto'
                            setHoveredLink(null)
                        }}
                    >
                        <boxGeometry args={[1, 1, 0.2]} />
                        <meshStandardMaterial
                            color={hoveredLink === 'email' ? '#EA4335' : '#444'}
                            emissive={hoveredLink === 'email' ? '#EA4335' : '#000'}
                            emissiveIntensity={hoveredLink === 'email' ? 0.5 : 0}
                        />
                    </mesh>
                    <Text position={[0, 0, 0.15]} fontSize={0.3} color="#FFF" anchorX="center" anchorY="middle">
                        ✉
                    </Text>
                    <Text position={[0, -0.8, 0]} fontSize={0.15} color="#AAA" anchorX="center" anchorY="middle">
                        Email
                    </Text>
                </group>
            </group>

            {/* Base pedestal - single merged geometry for performance */}
            <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[5, 6, 1, 8]} />
                <meshStandardMaterial color="#2C3E50" roughness={0.8} />
            </mesh>
        </group>
    )
}
