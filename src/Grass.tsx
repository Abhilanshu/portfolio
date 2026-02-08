import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

// Bruno Simon Style Grass - Dense Instanced Mesh
export function Grass() {
    const meshRef = useRef<THREE.InstancedMesh>(null)

    // Load splat map to place grass only on "grass" areas (green channel)
    const splatMap = useTexture('/assets/models/terrain/terrain.png')

    const count = 100000 // Very dense lush grass

    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate positions based on Splat Map
    // Since we can't read pixels easily in React without a canvas, 
    // we'll use a random distribution but filter by a simple radius logic for now
    // or assume the outer ring (radius > 40) is grass.

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            // Random position in donut shape
            const angle = Math.random() * Math.PI * 2
            // Start AFTER the track (Radius > 70)
            const radius = 70 + Math.random() * 200
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            // Random rotation
            const rot = Math.random() * Math.PI

            // Scale
            const scale = 0.5 + Math.random() * 0.5

            temp.push({ x, z, rot, scale })
        }
        return temp
    }, [])

    useMemo(() => {
        if (meshRef.current) {
            particles.forEach((p, i) => {
                dummy.position.set(p.x, 0, p.z)
                dummy.rotation.y = p.rot
                dummy.scale.setScalar(p.scale)
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [particles])

    // Custom Shader for swaying
    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#8faa4e') }, // Light green
            uColor2: { value: new THREE.Color('#4c6b2f') }, // Dark green
        },
        vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vY;
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Swaying tip
                float sway = sin(uTime + instanceMatrix[3][0] * 0.5) * 0.2; // Use x pos as seed
                pos.x += sway * uv.y * 0.5;
                
                gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
                vY = pos.y;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            varying float vY;
            
            void main() {
                vec3 color = mix(uColor2, uColor1, vUv.y);
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.DoubleSide
    }), [])

    useFrame((state) => {
        if (material.uniforms) {
            material.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position-y={-0.02}>
            <planeGeometry args={[0.3, 0.8, 1, 4]} />
            <primitive object={material} attach="material" />
        </instancedMesh>
    )
}
