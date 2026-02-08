import { useTexture } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { useMemo } from 'react'

export function Floor() {
    const { nodes } = useGLTF('/assets/models/terrain/terrain.glb') as any
    const splatMap = useTexture('/assets/models/terrain/terrain.png')
    const noiseTexture = useTexture('/assets/models/floor/slabs.png') // Reuse slabs as generic noise

    // Configure textures
    splatMap.flipY = false
    splatMap.colorSpace = THREE.SRGBColorSpace
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping
    noiseTexture.repeat.set(80, 80) // High repeat for grain

    const terrainMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uColorWater: { value: new THREE.Color('#4da8da') },
                uColorSand: { value: new THREE.Color('#ffe8b5') },
                uColorGrass: { value: new THREE.Color('#ffa94e') },
                uColorRoad: { value: new THREE.Color('#333333') },
                uSplatMap: { value: splatMap },
                uNoiseMap: { value: noiseTexture },
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
                uniform vec3 uColorRoad;
                uniform sampler2D uSplatMap;
                uniform sampler2D uNoiseMap;
                varying vec2 vUv;
                
                void main() {
                    vec4 splat = texture2D(uSplatMap, vUv);
                    vec4 noise = texture2D(uNoiseMap, vUv * 20.0); // Scale UV for noise
                    
                    // Base Noise impact
                    float noiseStrength = 0.1;
                    vec3 noiseMod = vec3(1.0) - noise.rgb * noiseStrength;

                    // Base: Grass/Sand (Green channel)
                    vec3 color = mix(uColorSand, uColorGrass, splat.g);
                    
                    // Road: Red Channel
                    color = mix(color, uColorRoad, splat.r);
                    
                    // Apply Noise (Multiply)
                    color *= noiseMod;

                    // Water: Blue Channel (make transparent)
                    float alpha = 1.0 - splat.b; 
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
        })
    }, [splatMap, noiseTexture])

    return (
        <RigidBody type="fixed" colliders="trimesh" friction={0.7} restitution={0.1}>
            {/* Use the actual baked terrain mesh */}
            <primitive
                object={nodes.loadedTerrain || nodes.Terrain || nodes.Scene || Object.values(nodes)[0]}
                material={terrainMaterial}
                receiveShadow
                castShadow
            />
        </RigidBody>
    )
}

useGLTF.preload('/assets/models/terrain/terrain.glb')
