import type { Level } from '../types/gamification'
import { getProgressToNextLevel, getPointsToNextLevel } from '../services/levelService'

interface LevelBadgeProps {
  level: Level
  points: number
  showProgress?: boolean
}

export default function LevelBadge({ level, points, showProgress = true }: LevelBadgeProps) {
  const progress = getProgressToNextLevel(points)
  const pointsToNext = getPointsToNextLevel(points)
  const isMaxLevel = level.number === 5

  return (
    <div className="flex flex-col gap-2">
      <div 
        className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-md"
        style={{ 
          background: `linear-gradient(135deg, ${level.color}20, ${level.color}40)`,
          borderLeft: `4px solid ${level.color}`
        }}
      >
        <span className="text-3xl">{level.icon}</span>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Level {level.number}
          </span>
          <span className="text-sm font-bold" style={{ color: level.color }}>
            {level.title}
          </span>
        </div>
      </div>

      {showProgress && !isMaxLevel && (
        <div className="px-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>{Math.floor(progress)}% to next level</span>
            <span>{pointsToNext} points needed</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${level.color}, ${level.color}dd)`
              }}
            />
          </div>
        </div>
      )}

      {showProgress && isMaxLevel && (
        <div className="px-2 text-center">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
            🏆 Maximum Level Reached!
          </span>
        </div>
      )}
    </div>
  )
}
