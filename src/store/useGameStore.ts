import { create } from 'zustand'

interface GameState {
    score: number
    unlockedItems: Set<string>
    addPoints: (itemId: string, points: number) => void
    resetScore: () => void
}

export const useGameStore = create<GameState>((set) => ({
    score: 0,
    unlockedItems: new Set<string>(),

    addPoints: (itemId: string, points: number) => {
        set((state) => {
            // Prevent double-scoring the same item
            if (state.unlockedItems.has(itemId)) {
                return state
            }

            const newUnlocked = new Set(state.unlockedItems)
            newUnlocked.add(itemId)

            return {
                score: state.score + points,
                unlockedItems: newUnlocked
            }
        })
    },

    resetScore: () => set({ score: 0, unlockedItems: new Set() })
}))
