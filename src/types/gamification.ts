export interface User {
  id: string
  username: string
  email: string
  profilePicture?: string
  mode: Mode
  createdAt: Date
  lastLoginAt: Date
}

export interface GamificationData {
  userId: string
  ecoPoints: number
  level: Level
  achievements: Achievement[]
  statistics: Statistics
  streak: StreakData
  settings: UserSettings
}

export interface Level {
  number: 1 | 2 | 3 | 4 | 5
  title: 'Waste Rookie' | 'Smart Saver' | 'Waste Warrior' | 'Expiry Master' | 'Eco Legend'
  minPoints: number
  maxPoints: number
  color: string
  icon: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'milestone' | 'streak' | 'category' | 'special'
  requirement: number
  progress: number
  unlocked: boolean
  unlockedAt?: Date
}

export interface Statistics {
  productsSaved: number
  moneySaved: number
  co2Saved: number
  foodItemsSaved: number
  medicineItemsSaved: number
  totalProductsAdded: number
  perfectWeeks: number
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakStartDate: Date
}

export type Mode = 'home' | 'store' | 'restaurant' | 'pharmacy'

export interface ModeConfig {
  mode: Mode
  displayName: string
  icon: string
  categories: string[]
  suggestionTypes: string[]
  dashboardLabels: {
    title: string
    addButton: string
    emptyState: string
  }
}

export interface Suggestion {
  type: 'recipe' | 'usage' | 'donation' | 'storage'
  title: string
  description: string
  icon: string
  actionable: boolean
}

export interface Challenge {
  id: string
  creatorId: string
  opponentId: string
  startDate: Date
  endDate: Date
  status: 'pending' | 'active' | 'completed'
  creatorScore: number
  opponentScore: number
  winnerId?: string
}

export interface LeaderboardUser {
  userId: string
  username: string
  profilePicture?: string
  ecoPoints: number
  rank: number
  level: Level
}

export interface VoiceSettings {
  enabled: boolean
  language: 'en' | 'hi'
  gender: 'male' | 'female'
  rate: number
  pitch: number
}

export interface UserSettings {
  theme: 'light' | 'dark'
  soundEnabled: boolean
  animationsEnabled: boolean
  voice: VoiceSettings
  notifications: boolean
}

export type PointAction = 
  | 'mark_used_before_expiry'
  | 'add_product'
  | 'use_on_reminder_day'
  | 'seven_day_streak'
  | 'perfect_week'

export interface PointTransaction {
  id: string
  userId: string
  action: PointAction
  points: number
  reason: string
  timestamp: Date
}

export type NotificationType = 'points' | 'levelup' | 'badge' | 'success'
