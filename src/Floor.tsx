import { useTexture, useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { useMemo } from 'react'

export function Floor() {
    const { scene } = useGLTF('/assets/models/terrain/terrain.glb') as any
    const splatMap = useTexture('/assets/models/terrain/terrain.png')
    const noiseTexture = useTexture('/assets/models/floor/slabs.png')

    // Configure textures
    splatMap.flipY = false
    splatMap.colorSpace = THREE.SRGBColorSpace
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping
    noiseTexture.repeat.set(80, 80)

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
                    
                    // Base: Green Channel (Grass/Sand)
                    // Sharpen the transition using smoothstep
                    float grassFactor = smoothstep(0.1, 0.3, splat.g);
                    vec3 color = mix(uColorSand, uColorGrass, grassFactor);
                    
                    // Mix Road (Red Channel)
                    float roadFactor = smoothstep(0.1, 0.3, splat.r);
                    color = mix(color, uColorRoad, roadFactor);
                    
                    // Water (Blue Channel) -> Alpha
                    // Sharp cutout for water
                    float alpha = 1.0 - smoothstep(0.1, 0.3, splat.b);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            side: THREE.DoubleSide
        })
    }, [splatMap, noiseTexture])

    const slabMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: noiseTexture,
            roughness: 0.9,
            metalness: 0,
            color: '#ffcf8b',
        })
    }, [noiseTexture])

    // Apply material to everything in the scene
    useMemo(() => {
        if (scene) {
            scene.traverse((child: any) => {
                if (child.isMesh) {
                    child.material = terrainMaterial
                    child.receiveShadow = true
                    child.castShadow = true
                }
            })
        }
    }, [scene, terrainMaterial])

    return (
        <RigidBody type="fixed" colliders="trimesh" friction={0.7} restitution={0.1}>
            {/* Terrain Mesh */}
            <primitive object={scene} />

            {/* Central Floor Slab (Restored) */}
            <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0.05, 0]}>
                <circleGeometry args={[45, 64]} />
                <primitive object={slabMaterial} attach="material" />
            </mesh>
        </RigidBody>
    )
}

useGLTF.preload('/assets/models/terrain/terrain.glb')
