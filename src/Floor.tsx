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
                    
                    // Road: Red Channel
                    float roadFactor = smoothstep(0.1, 0.3, splat.r);
                    
                    // Curbs: Detect edge of road (0.3 to 0.4 range of splat.r)
                    // Use standard fwidth or just a narrow band
                    float curbFactor = smoothstep(0.05, 0.1, splat.r) - smoothstep(0.1, 0.15, splat.r);
                    
                    // Checkerboard pattern for curbs
                    vec2 uvScaled = vUv * 200.0; // Scale pattern
                    float curbPattern = mod(floor(uvScaled.x) + floor(uvScaled.y), 2.0);
                    vec3 curbColor = mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0), curbPattern);
                    
                    // Apply Road
                    color = mix(color, uColorRoad, roadFactor);
                    
                    // Apply Curbs
                    color = mix(color, curbColor, curbFactor);

                    // Water (Blue Channel) -> Alpha
                    float alpha = 1.0 - smoothstep(0.1, 0.3, splat.b);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            side: THREE.DoubleSide
        })
    }, [splatMap, noiseTexture])

    // slabMaterial removed as it was unused


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
        <>
            {/* Smooth flat collision floor - prevents ball jumping on banking */}
            <RigidBody type="fixed" position={[0, 0, 0]} friction={0.7} restitution={0}>
                <CuboidCollider args={[100, 0.1, 100]} />
            </RigidBody>

            {/* Visual terrain mesh with custom shader */}
            <primitive object={scene} />
        </>
    )
}

useGLTF.preload('/assets/models/terrain/terrain.glb')
