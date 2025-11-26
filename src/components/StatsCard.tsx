import { useState, useEffect } from 'react'

interface StatsCardProps {
  title: string
  value: number
  icon: string
  color: string
  suffix?: string
  decimals?: number
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  color, 
  suffix = '',
  decimals = 0
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Animate number from 0 to value
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(prev => Math.min(prev + increment, value))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [value])

  return (
    <div 
      className="relative overflow-hidden rounded-xl p-6 shadow-lg backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}25)`,
        border: `1px solid ${color}30`
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold" style={{ color }}>
            {displayValue.toFixed(decimals)}
            {suffix && <span className="text-xl ml-1">{suffix}</span>}
          </p>
        </div>
        <div 
          className="text-4xl opacity-20"
          style={{ filter: 'grayscale(0%)' }}
        >
          {icon}
        </div>
      </div>
      
      {/* Glassmorphism effect overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`
        }}
      />
    </div>
  )
}
