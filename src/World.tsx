import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

// World component - REMOVED for now to avoid conflicts
// Physics is now handled by Floor.tsx
export function World() {
    // Return empty - all rendering is done by Floor, Water, etc.
    return null
}
