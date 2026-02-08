import { create } from 'zustand'
import * as THREE from 'three'

interface GameState {
    // Intro state
    introComplete: boolean
    setIntroComplete: (value: boolean) => void

    // Player state
    playerPosition: THREE.Vector3
    setPlayerPosition: (position: THREE.Vector3) => void
    resetPlayer: () => void

    // Score/Game state
    bowlingScore: number
    addBowlingScore: (points: number) => void
    resetBowlingScore: () => void

    // UI state
    showControls: boolean
    toggleControls: () => void
}

export const useGameStore = create<GameState>((set) => ({
    // Intro
    introComplete: false,
    setIntroComplete: (value) => set({ introComplete: value }),

    // Player
    playerPosition: new THREE.Vector3(0, 2, 0),
    setPlayerPosition: (position) => set({ playerPosition: position }),
    resetPlayer: () => set({ playerPosition: new THREE.Vector3(0, 2, 0) }),

    // Score
    bowlingScore: 0,
    addBowlingScore: (points) => set((state) => ({ bowlingScore: state.bowlingScore + points })),
    resetBowlingScore: () => set({ bowlingScore: 0 }),

    // UI
    showControls: true,
    toggleControls: () => set((state) => ({ showControls: !state.showControls })),
}))
