'use client'

import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function SparklesBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Generate sparkles
    const generateSparkles = () => {
      const count = 30 // Number of sparkles
      const newSparkles: Sparkle[] = []
      
      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100, // Percentage from left
          y: Math.random() * 100, // Percentage from top
          size: Math.random() * 4 + 2, // Size between 2-6px
          duration: Math.random() * 3 + 2, // Duration between 2-5s
          delay: Math.random() * 2, // Delay between 0-2s
        })
      }
      
      setSparkles(newSparkles)
    }

    generateSparkles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-gradient-to-br from-violet-400/60 via-purple-400/60 to-fuchsia-400/60 dark:from-violet-500/40 dark:via-purple-500/40 dark:to-fuchsia-500/40 animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: `0 0 ${sparkle.size * 2}px rgba(139, 92, 246, 0.5)`,
          }}
        />
      ))}
    </div>
  )
}

