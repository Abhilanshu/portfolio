import { useEffect, useRef, useState } from 'react'

interface SoundManagerProps {
    enabled?: boolean
}

export function SoundManager({ enabled = true }: SoundManagerProps) {
    const [isReady, setIsReady] = useState(false)
    const audioContextRef = useRef<AudioContext | null>(null)

    // Initialize Web Audio API
    useEffect(() => {
        if (!enabled) return

        // Create audio context (works in all browsers)
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()

        console.log('🔊 Sound system initialized')
        setIsReady(true)

        return () => {
            audioContextRef.current?.close()
        }
    }, [enabled])

    // Placeholder for collision sound
    const playCollision = (intensity: number = 1) => {
        if (!isReady || !audioContextRef.current) return

        const ctx = audioContextRef.current
        const now = ctx.currentTime

        // Create simple collision sound using oscillators
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        // Punchy collision sound
        oscillator.frequency.setValueAtTime(200 * intensity, now)
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1)

        gainNode.gain.setValueAtTime(0.3 * intensity, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2)

        oscillator.start(now)
        oscillator.stop(now + 0.2)
    }

    // Background ambient music
    const playAmbientMusic = () => {
        if (!isReady || !audioContextRef.current) return

        const ctx = audioContextRef.current
        const now = ctx.currentTime

        // Create a simple ambient drone with oscillators
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gainNode = ctx.createGain()

        osc1.connect(gainNode)
        osc2.connect(gainNode)
        gainNode.connect(ctx.destination)

        // Ambient frequencies (C major chord)
        osc1.frequency.setValueAtTime(65.41, now) // C2
        osc2.frequency.setValueAtTime(98.00, now) // G2

        osc1.type = 'sine'
        osc2.type = 'sine'

        // Low volume ambient
        gainNode.gain.setValueAtTime(0.05, now)

        osc1.start(now)
        osc2.start(now)

        // Loop every 8 seconds
        setTimeout(() => {
            osc1.stop()
            osc2.stop()
            if (isReady) playAmbientMusic()
        }, 8000)
    }

    // Start ambient music on first user interaction
    useEffect(() => {
        if (isReady) {
            const startMusic = () => {
                playAmbientMusic()
                document.removeEventListener('click', startMusic)
            }
            document.addEventListener('click', startMusic, { once: true })
        }
    }, [isReady])

    // Expose sound functions globally
    useEffect(() => {
        if (isReady) {
            (window as any).playCollisionSound = playCollision
        }
    }, [isReady])

    return null // This component doesn't render anything
}
