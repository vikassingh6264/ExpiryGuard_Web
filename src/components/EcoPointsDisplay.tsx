import { useState, useEffect } from 'react'

interface EcoPointsDisplayProps {
  points: number
  animated?: boolean
}

export default function EcoPointsDisplay({ points, animated = true }: EcoPointsDisplayProps) {
  const [displayPoints, setDisplayPoints] = useState(points)

  useEffect(() => {
    if (!animated) {
      setDisplayPoints(points)
      return
    }

    // Animate number change
    const duration = 500
    const steps = 20
    const increment = (points - displayPoints) / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplayPoints(points)
        clearInterval(interval)
      } else {
        setDisplayPoints(prev => prev + increment)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [points, animated, displayPoints])

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
      <span className="text-2xl">⭐</span>
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-90">Eco Points</span>
        <span className="text-lg font-bold">
          {Math.floor(displayPoints).toLocaleString()}
        </span>
      </div>
    </div>
  )
}
