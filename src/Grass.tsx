import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export function Grass() {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const splatMap = useTexture('/assets/models/terrain/terrain.png')
    splatMap.flipY = false

    const count = 100000 // Lush grass

    // Generate particles in a large grid
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 120
            const z = (Math.random() - 0.5) * 120
            const rot = Math.random() * Math.PI
            const scale = 0.5 + Math.random() * 0.5
            temp.push({ x, z, rot, scale })
        }
        return temp
    }, [])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useMemo(() => {
        if (meshRef.current) {
            particles.forEach((p, i) => {
                dummy.position.set(p.x, 0, p.z)
                dummy.rotation.y = p.rot
                dummy.scale.setScalar(p.scale)
                dummy.updateMatrix()
                meshRef.current!.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [particles, dummy])

    // Custom Shader with masking
    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#8faa4e') },
            uColor2: { value: new THREE.Color('#4c6b2f') },
            uSplatMap: { value: splatMap },
        },
        vertexShader: `
            uniform float uTime;
            uniform sampler2D uSplatMap;
            varying vec2 vUv;
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Read instance position from matrix
                vec3 instancePos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
                
                // Map world position to UV (60x60 world centered at 0)
                vec2 worldUv = (instancePos.xz / 60.0) + 0.5;
                
                // Sample splat map
                vec4 splat = texture2D(uSplatMap, worldUv);
                
                // If not green (grass), scale to 0
                float scale = 1.0;
                if (splat.g < 0.5) scale = 0.0;
                
                // Swaying
                float sway = sin(uTime + instancePos.x * 0.5) * 0.2;
                pos.x += sway * uv.y * 0.5;
                
                pos *= scale;

                gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            
            void main() {
                vec3 color = mix(uColor2, uColor1, vUv.y);
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.DoubleSide
    }), [splatMap])

    useFrame((state) => {
        if (material.uniforms) {
            material.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position-y={0.3}>
            <planeGeometry args={[0.3, 0.8, 1, 4]} />
            <primitive object={material} attach="material" />
        </instancedMesh>
    )
}
