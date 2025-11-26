import type { GamificationData, User, UserSettings } from '../types/gamification'
import { initializeAchievements } from './achievementService'
import { initializeStatistics, initializeStreak } from './statisticsService'
import { calculateLevel } from './levelService'

const STORAGE_KEY_USER = 'expiryguard_user'
const STORAGE_KEY_GAMIFICATION = 'expiryguard_gamification'

export function saveUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
  } catch (error) {
    console.error('Failed to save user data:', error)
    throw new Error('Failed to save user data to local storage')
  }
}

export function loadUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USER)
    if (!stored) return null

    const parsed = JSON.parse(stored)
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      lastLoginAt: new Date(parsed.lastLoginAt)
    }
  } catch (error) {
    console.error('Failed to load user data:', error)
    return null
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_USER)
  } catch (error) {
    console.error('Failed to clear user data:', error)
  }
}

export function saveGamificationData(data: GamificationData): void {
  try {
    const serialized = {
      ...data,
      achievements: data.achievements.map(a => ({
        ...a,
        unlockedAt: a.unlockedAt?.toISOString()
      })),
      streak: {
        ...data.streak,
        lastActivityDate: data.streak.lastActivityDate.toISOString(),
        streakStartDate: data.streak.streakStartDate.toISOString()
      }
    }
    
    localStorage.setItem(STORAGE_KEY_GAMIFICATION, JSON.stringify(serialized))
  } catch (error) {
    console.error('Failed to save gamification data:', error)
    
    // Check if it's a quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Please clear some data.')
    }
    
    throw new Error('Failed to save gamification data to local storage')
  }
}

export function loadGamificationData(userId: string): GamificationData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_GAMIFICATION)
    if (!stored) return null

    const parsed = JSON.parse(stored)
    
    // Validate that the data belongs to the current user
    if (parsed.userId !== userId) {
      console.warn('Gamification data userId mismatch')
      return null
    }

    return {
      ...parsed,
      achievements: parsed.achievements.map((a: any) => ({
        ...a,
        unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined
      })),
      streak: {
        ...parsed.streak,
        lastActivityDate: new Date(parsed.streak.lastActivityDate),
        streakStartDate: new Date(parsed.streak.streakStartDate)
      }
    }
  } catch (error) {
    console.error('Failed to load gamification data:', error)
    return null
  }
}

export function initializeGamificationData(userId: string): GamificationData {
  const defaultSettings: UserSettings = {
    theme: 'light',
    soundEnabled: true,
    animationsEnabled: true,
    voice: {
      enabled: true,
      language: 'en',
      gender: 'female',
      rate: 1.0,
      pitch: 1.0
    },
    notifications: true
  }

  return {
    userId,
    ecoPoints: 0,
    level: calculateLevel(0),
    achievements: initializeAchievements(),
    statistics: initializeStatistics(),
    streak: initializeStreak(),
    settings: defaultSettings
  }
}

export function clearGamificationData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_GAMIFICATION)
  } catch (error) {
    console.error('Failed to clear gamification data:', error)
  }
}

export function updateEcoPoints(
  data: GamificationData,
  points: number
): GamificationData {
  const newPoints = data.ecoPoints + points
  const newLevel = calculateLevel(newPoints)
  
  return {
    ...data,
    ecoPoints: newPoints,
    level: newLevel
  }
}

export function migrateFromV1(): boolean {
  try {
    // Check if V1 products exist
    const v1Products = localStorage.getItem('expiryguard_products')
    if (!v1Products) return false

    // V1 data exists but no user created yet
    const existingUser = loadUser()
    if (existingUser) return false // Already migrated

    console.log('V1 data detected, migration needed')
    return true
  } catch (error) {
    console.error('Failed to check for V1 migration:', error)
    return false
  }
}

export function performV1Migration(userId: string): void {
  try {
    const v1Products = localStorage.getItem('expiryguard_products')
    if (!v1Products) return

    const products = JSON.parse(v1Products)
    
    // Initialize gamification data with retroactive points
    const gamificationData = initializeGamificationData(userId)
    
    // Award retroactive points for existing products
    const retroactivePoints = products.length * 5 // 5 points per product added
    gamificationData.ecoPoints = retroactivePoints
    gamificationData.level = calculateLevel(retroactivePoints)
    gamificationData.statistics.totalProductsAdded = products.length
    
    saveGamificationData(gamificationData)
    
    console.log(`Migration complete: ${products.length} products, ${retroactivePoints} points awarded`)
  } catch (error) {
    console.error('Failed to perform V1 migration:', error)
  }
}
