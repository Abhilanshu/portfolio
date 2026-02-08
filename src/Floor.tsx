import { useTexture } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { useMemo } from 'react'

export function Floor() {
    const slabsTexture = useTexture('/assets/models/floor/slabs.png')

    slabsTexture.wrapS = THREE.RepeatWrapping
    slabsTexture.wrapT = THREE.RepeatWrapping
    slabsTexture.repeat.set(40, 40)
    slabsTexture.colorSpace = THREE.SRGBColorSpace

    // Create Asphalt + Curbs Texture
    // We'll create a large texture that includes the road and the curbing
    // For now, let's use a clever shader/material approach on the main mesh
    // Actually, Bruno uses a separate mesh for the road? No, it's splat map.

    // Let's create a "Road" mesh that sits slightly above the floor for the asphalt look
    // The reference image shows:
    // 1. Red/White curbs on edges
    // 2. Dark Grey asphalt in middle
    // 3. Orange slabs outside

    // Road Material
    const roadMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#333333', // Dark asphalt
            roughness: 0.6,
            metalness: 0.1,
        })
    }, [])

    // Curb Material - We can use a striped texture or shader
    const curbMaterial = useMemo(() => {
        // Create red/white stripe texture
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(0, 0, 32, 64)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(32, 0, 32, 64)
        const tex = new THREE.CanvasTexture(canvas)
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(20, 1)

        return new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.5,
        })
    }, [])

    const slabMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: slabsTexture,
            roughness: 0.9,
            metalness: 0,
            color: '#ffcf8b',
        })
    }, [slabsTexture])

    const terrainMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uColorWater: { value: new THREE.Color('#4da8da') },
                uColorSand: { value: new THREE.Color('#ffe8b5') },
                uColorGrass: { value: new THREE.Color('#ffa94e') }, // Orange ground
                uSplatMap: { value: useTexture('/assets/models/terrain/terrain.png') },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColorWater;
                uniform vec3 uColorSand;
                uniform vec3 uColorGrass;
                uniform sampler2D uSplatMap;
                varying vec2 vUv;
                
                void main() {
                    vec4 splat = texture2D(uSplatMap, vUv);
                    vec3 color = mix(uColorSand, uColorGrass, splat.g);
                    color = mix(color, uColorWater, splat.b);
                    
                    // Create holes for water where blue channel is high
                    float alpha = 1.0 - splat.b; 
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
        })
    }, [])

    return (
        <>
            {/* MAIN PHYSICS FLOOR */}
            <RigidBody type="fixed" friction={0.7} restitution={0.1}>
                {/* Central Paved Area */}
                <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={0}>
                    <planeGeometry args={[80, 80]} />
                    <primitive object={slabMaterial} attach="material" />
                </mesh>

                {/* Outer Orange Ground */}
                <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={-0.01}>
                    <ringGeometry args={[40, 500, 64]} />
                    <primitive object={terrainMaterial} attach="material" />
                </mesh>
            </RigidBody>

            {/* DECORATIVE ROADS with Curbs */}
            {/* We'll simulate the "Track" from valid reference images */}

            {/* Large Circular Track */}
            <group position-y={0.01}>
                {/* Asphalt */}
                <mesh rotation-x={-Math.PI / 2}>
                    <ringGeometry args={[50, 65, 128]} />
                    <primitive object={roadMaterial} attach="material" />
                </mesh>

                {/* Inner Curb */}
                <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
                    <ringGeometry args={[49, 50, 128]} />
                    <primitive object={curbMaterial} attach="material" />
                </mesh>

                {/* Outer Curb */}
                <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
                    <ringGeometry args={[65, 66, 128]} />
                    <primitive object={curbMaterial} attach="material" />
                </mesh>
            </group>

            {/* Boundary walls & Safety Net ... same as before */}
            <RigidBody type="fixed">
                <CuboidCollider args={[300, 10, 1]} position={[0, 5, -300]} />
                <CuboidCollider args={[300, 10, 1]} position={[0, 5, 300]} />
                <CuboidCollider args={[1, 10, 300]} position={[300, 5, 0]} />
                <CuboidCollider args={[1, 10, 300]} position={[-300, 5, 0]} />
            </RigidBody>
            <RigidBody type="fixed">
                <mesh rotation-x={-Math.PI / 2} visible={false} position-y={-10}>
                    <planeGeometry args={[800, 800]} />
                </mesh>
            </RigidBody>
        </>
    )
}
