import type { Achievement, GamificationData } from '../types/gamification'

export const ACHIEVEMENTS: Omit<Achievement, 'progress' | 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first-save',
    name: 'First Save',
    description: 'Saved your first product before expiry',
    icon: '🥇',
    category: 'milestone',
    requirement: 1
  },
  {
    id: 'food-saver',
    name: 'Food Saver',
    description: 'Saved 20 food items before expiry',
    icon: '🥗',
    category: 'category',
    requirement: 20
  },
  {
    id: 'medicine-protector',
    name: 'Medicine Protector',
    description: 'Saved 10 medicine items before expiry',
    icon: '💊',
    category: 'category',
    requirement: 10
  },
  {
    id: 'seven-day-streak',
    name: '7 Day Streak',
    description: 'No product expired for 7 consecutive days',
    icon: '🔥',
    category: 'streak',
    requirement: 7
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Used all items before expiring in a week',
    icon: '👑',
    category: 'special',
    requirement: 1
  }
]

export function getAllAchievements(): Achievement[] {
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    progress: 0,
    unlocked: false
  }))
}

export function initializeAchievements(): Achievement[] {
  return getAllAchievements()
}

export function checkAchievements(
  gamificationData: GamificationData
): Achievement[] {
  const newlyUnlocked: Achievement[] = []
  const { statistics, streak, achievements } = gamificationData

  achievements.forEach(achievement => {
    if (achievement.unlocked) return // Already unlocked

    let currentProgress = 0
    let shouldUnlock = false

    switch (achievement.id) {
      case 'first-save':
        currentProgress = statistics.productsSaved
        shouldUnlock = statistics.productsSaved >= 1
        break

      case 'food-saver':
        currentProgress = statistics.foodItemsSaved
        shouldUnlock = statistics.foodItemsSaved >= 20
        break

      case 'medicine-protector':
        currentProgress = statistics.medicineItemsSaved
        shouldUnlock = statistics.medicineItemsSaved >= 10
        break

      case 'seven-day-streak':
        currentProgress = streak.currentStreak
        shouldUnlock = streak.currentStreak >= 7
        break

      case 'perfect-week':
        currentProgress = statistics.perfectWeeks
        shouldUnlock = statistics.perfectWeeks >= 1
        break
    }

    achievement.progress = currentProgress

    if (shouldUnlock && !achievement.unlocked) {
      achievement.unlocked = true
      achievement.unlockedAt = new Date()
      newlyUnlocked.push(achievement)
    }
  })

  return newlyUnlocked
}

export function unlockAchievement(
  achievementId: string,
  achievements: Achievement[]
): Achievement | null {
  const achievement = achievements.find(a => a.id === achievementId)
  
  if (!achievement) {
    console.error(`Achievement ${achievementId} not found`)
    return null
  }

  if (achievement.unlocked) {
    console.warn(`Achievement ${achievementId} already unlocked`)
    return null
  }

  achievement.unlocked = true
  achievement.unlockedAt = new Date()
  
  return achievement
}

export function getUnlockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(a => a.unlocked)
}

export function getLockedAchievements(achievements: Achievement[]): Achievement[] {
  return achievements.filter(a => !a.unlocked)
}

export function getAchievementProgress(
  achievementId: string,
  achievements: Achievement[]
): number {
  const achievement = achievements.find(a => a.id === achievementId)
  return achievement ? achievement.progress : 0
}

export function getAchievementById(
  achievementId: string,
  achievements: Achievement[]
): Achievement | undefined {
  return achievements.find(a => a.id === achievementId)
}
