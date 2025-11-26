import { useState } from 'react'
import type { Achievement } from '../types/gamification'
import BadgeCard from './BadgeCard'

interface AchievementsPageProps {
  achievements: Achievement[]
}

export default function AchievementsPage({ achievements }: AchievementsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          🏆 Achievements
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
          Unlock badges by completing challenges and saving products
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {unlockedCount} / {totalCount} Unlocked
          </div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden max-w-xs">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
            filter === 'unlocked'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Unlocked ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
            filter === 'locked'
              ? 'bg-gray-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Locked ({totalCount - unlockedCount})
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAchievements.map(achievement => (
          <BadgeCard key={achievement.id} badge={achievement} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No achievements found
          </p>
        </div>
      )}
    </div>
  )
}
