import type { Achievement } from '../types/gamification'

interface BadgeCardProps {
  badge: Achievement
  onUnlock?: () => void
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  const progressPercentage = badge.unlocked 
    ? 100 
    : Math.min((badge.progress / badge.requirement) * 100, 100)

  return (
    <div 
      className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
        badge.unlocked 
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg scale-100 hover:scale-105' 
          : 'bg-gray-100 dark:bg-gray-800 opacity-60 hover:opacity-80'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        border: badge.unlocked ? '2px solid #fbbf24' : '1px solid #e5e7eb'
      }}
    >
      {/* Badge Icon */}
      <div className="flex flex-col items-center text-center">
        <div 
          className={`text-6xl mb-3 transition-all duration-300 ${
            badge.unlocked ? 'filter-none' : 'grayscale opacity-40'
          }`}
        >
          {badge.icon}
        </div>

        {/* Badge Name */}
        <h3 className={`text-lg font-bold mb-2 ${
          badge.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {badge.name}
        </h3>

        {/* Badge Description */}
        <p className={`text-sm mb-3 ${
          badge.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
        }`}>
          {badge.description}
        </p>

        {/* Progress Bar (for locked badges) */}
        {!badge.unlocked && (
          <div className="w-full mt-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{badge.progress} / {badge.requirement}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Unlocked Date */}
        {badge.unlocked && badge.unlockedAt && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
          </div>
        )}

        {/* Lock Icon for locked badges */}
        {!badge.unlocked && (
          <div className="absolute top-3 right-3 text-gray-400 dark:text-gray-600">
            🔒
          </div>
        )}

        {/* Shine effect for unlocked badges */}
        {badge.unlocked && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, #fbbf24, transparent)'
            }}
          />
        )}
      </div>
    </div>
  )
}
