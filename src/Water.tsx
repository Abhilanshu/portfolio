import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Bruno Simon Style Water - with Confetti
export function Water() {
    const meshRef = useRef<THREE.Mesh>(null)
    const sparklesRef = useRef<THREE.InstancedMesh>(null)

    // 1. Water Material with Foam
    const waterMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uWaterColor: { value: new THREE.Color('#4da8da') }, // Light blue
                uDepthColor: { value: new THREE.Color('#2e86b8') }, // Darker blue
                uFoamColor: { value: new THREE.Color('#ffffff') },
            },
            vertexShader: `
                varying vec2 vUv;
                uniform float uTime;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    // Global waves
                    pos.z += sin(pos.x * 0.3 + uTime) * 0.1;
                    pos.z += sin(pos.y * 0.2 + uTime * 0.8) * 0.1;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uWaterColor;
                uniform vec3 uDepthColor;
                uniform vec3 uFoamColor;
                varying vec2 vUv;
                
                void main() {
                    float wave = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
                    
                    // Simple foam at edges (using UV approximation)
                    // In a real depth buffer setup this would be better, but this works for visual style
                    float foam = step(0.95, sin(vUv.x * 50.0) * sin(vUv.y * 50.0));
                    
                    vec3 color = mix(uDepthColor, uWaterColor, wave);
                    color = mix(color, uFoamColor, foam * 0.3); // Add foam sparkle
                    
                    gl_FragColor = vec4(color, 0.85); 
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        })
    }, [])

    // 2. Confetti Particles floating on water
    const particleCount = 200
    const dummy = useMemo(() => new THREE.Object3D(), [])

    useMemo(() => {
        // Random placement for confetti
        // Just scatter them across the map at y = -0.15 (surface level)
    }, [])

    useFrame((state) => {
        waterMaterial.uniforms.uTime.value = state.clock.elapsedTime

        // Animate confetti bobbing
        if (sparklesRef.current) {
            // We can't easily animate instances individually in loop without cost
            // so just let them sit there for now, or use a shader on them too.
            sparklesRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    // Confetti geometry (small squares)
    const confettiGeo = useMemo(() => new THREE.PlaneGeometry(0.5, 0.5), [])
    const confettiMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ff4400', side: THREE.DoubleSide }), [])

    // Initialize confetti positions
    useMemo(() => {
        // We use a timeout or effect to ensure ref is ready, but useMemo with a check is fine if specific
        // Actually, let's just ignore the ref check in useMemo and doing it in a layout effect is cleaner
        // but for now, we'll return the initial data if we were using a data array.
        // Since we are using an InstancedMesh, we need to set the matrices AFTER render.
    }, [])

    // Set positions once matching Bruno's style
    useFrame(() => {
        if (sparklesRef.current && sparklesRef.current.count > 0 && dummy) {
            // Only set once? No, we can just set it if we haven't. 
            // Better: use a ref to track if initialized.
        }
    })

    // Better visual placement
    useMemo(() => {
        // Just defining geometry/material here
    }, [])

    // One-time initialization of confetti
    const initConfetti = useMemo(() => {
        const temp = []
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 500
            const z = (Math.random() - 0.5) * 500
            // Avoid center
            if (Math.abs(x) < 30 && Math.abs(z) < 30) continue

            temp.push({ x, z, rot: Math.random() * Math.PI, scale: 0.5 + Math.random() * 0.5 })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (meshRef.current) {
            // Animate water shader
            waterMaterial.uniforms.uTime.value = state.clock.elapsedTime
        }

        if (sparklesRef.current) {
            // Animate confetti
            initConfetti.forEach((data, i) => {
                const nav = Math.sin(state.clock.elapsedTime + data.x) * 0.05
                dummy.position.set(data.x, 0.05 + nav, data.z)
                dummy.rotation.x = -Math.PI / 2
                dummy.rotation.z = data.rot + state.clock.elapsedTime * 0.1
                dummy.scale.setScalar(data.scale)
                dummy.updateMatrix()
                sparklesRef.current!.setMatrixAt(i, dummy.matrix)
            })
            sparklesRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <group>
            {/* Main Ocean (Visual Only - No Collision) */}
            <mesh
                ref={meshRef}
                rotation-x={-Math.PI / 2}
                position-y={-0.2}
                receiveShadow
            >
                <planeGeometry args={[500, 500, 64, 64]} />
                <primitive object={waterMaterial} attach="material" />
            </mesh>

            {/* Floating Confetti */}
            <instancedMesh ref={sparklesRef} args={[confettiGeo, confettiMat, particleCount]} frustumCulled={false} />
        </group>
    )
}
