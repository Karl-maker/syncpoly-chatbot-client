'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate: Date | null
  isExpired: boolean
}

export default function CountdownTimer({ targetDate, isExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!targetDate || isExpired) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      return
    }

    const updateTimer = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [targetDate, isExpired])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <div className="flex items-center justify-center gap-2 font-mono">
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-bold tabular-nums">
          {formatTime(timeLeft.hours)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">HOURS</div>
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gray-400 dark:text-gray-600">:</div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-bold tabular-nums">
          {formatTime(timeLeft.minutes)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">MINUTES</div>
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gray-400 dark:text-gray-600">:</div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-bold tabular-nums">
          {formatTime(timeLeft.seconds)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">SECONDS</div>
      </div>
    </div>
  )
}

