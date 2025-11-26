import type { Product } from '../types'
import type { Statistics, StreakData } from '../types/gamification'

// Average product values by category (in currency units)
const PRODUCT_VALUES: Record<string, number> = {
  Food: 50,
  Medicine: 100,
  Household: 75,
  Cosmetic: 150,
  Groceries: 40,
  Beverages: 30,
  Ingredients: 60,
  Other: 50
}

// Average CO₂ emissions per kg of food waste
const CO2_PER_KG = 2.5 // kg CO₂

// Average weight by category (kg)
const PRODUCT_WEIGHTS: Record<string, number> = {
  Food: 0.5,
  Groceries: 0.5,
  Ingredients: 0.3,
  Beverages: 0.5,
  Medicine: 0.2,
  Household: 0.3,
  Cosmetic: 0.2,
  Other: 0.2
}

export function calculateMoneySaved(productsSaved: Product[]): number {
  return productsSaved.reduce((total, product) => {
    const value = PRODUCT_VALUES[product.category] || 50
    const quantity = product.quantity || 1
    return total + (value * quantity)
  }, 0)
}

export function calculateCO2Saved(productsSaved: Product[]): number {
  return productsSaved.reduce((total, product) => {
    const weight = PRODUCT_WEIGHTS[product.category] || 0.3
    const quantity = product.quantity || 1
    return total + (weight * quantity * CO2_PER_KG)
  }, 0)
}

export function updateStatistics(
  currentStats: Statistics,
  product: Product,
  action: 'saved' | 'added'
): Statistics {
  const updated = { ...currentStats }

  if (action === 'saved') {
    updated.productsSaved += 1
    
    // Update category-specific counters
    if (product.category === 'Food') {
      updated.foodItemsSaved += 1
    } else if (product.category === 'Medicine') {
      updated.medicineItemsSaved += 1
    }
  } else if (action === 'added') {
    updated.totalProductsAdded += 1
  }

  return updated
}

export function recalculateAllStatistics(
  allProducts: Product[],
  savedProducts: Product[]
): Statistics {
  const foodItemsSaved = savedProducts.filter(p => p.category === 'Food').length
  const medicineItemsSaved = savedProducts.filter(p => p.category === 'Medicine').length

  return {
    productsSaved: savedProducts.length,
    moneySaved: calculateMoneySaved(savedProducts),
    co2Saved: calculateCO2Saved(savedProducts),
    foodItemsSaved,
    medicineItemsSaved,
    totalProductsAdded: allProducts.length,
    perfectWeeks: 0 // This needs to be tracked separately
  }
}

export function updateStreak(
  currentStreak: StreakData,
  hasExpiredProducts: boolean
): StreakData {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = new Date(currentStreak.lastActivityDate)
  lastActivity.setHours(0, 0, 0, 0)

  const daysSinceLastActivity = Math.floor(
    (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (hasExpiredProducts) {
    // Streak broken
    return {
      currentStreak: 0,
      longestStreak: Math.max(currentStreak.longestStreak, currentStreak.currentStreak),
      lastActivityDate: today,
      streakStartDate: today
    }
  }

  if (daysSinceLastActivity === 0) {
    // Same day, no change
    return currentStreak
  }

  if (daysSinceLastActivity === 1) {
    // Consecutive day, increment streak
    const newStreak = currentStreak.currentStreak + 1
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(currentStreak.longestStreak, newStreak),
      lastActivityDate: today,
      streakStartDate: currentStreak.streakStartDate
    }
  }

  // Gap in activity, reset streak
  return {
    currentStreak: 1,
    longestStreak: Math.max(currentStreak.longestStreak, currentStreak.currentStreak),
    lastActivityDate: today,
    streakStartDate: today
  }
}

export function checkPerfectWeek(
  products: Product[],
  weekStartDate: Date
): boolean {
  const weekEndDate = new Date(weekStartDate)
  weekEndDate.setDate(weekEndDate.getDate() + 7)

  // Check if any product expired during the week
  const expiredInWeek = products.some(product => {
    const expiryDate = new Date(product.expiryDate)
    return expiryDate >= weekStartDate && 
           expiryDate < weekEndDate && 
           expiryDate < new Date()
  })

  return !expiredInWeek
}

export function initializeStatistics(): Statistics {
  return {
    productsSaved: 0,
    moneySaved: 0,
    co2Saved: 0,
    foodItemsSaved: 0,
    medicineItemsSaved: 0,
    totalProductsAdded: 0,
    perfectWeeks: 0
  }
}

export function initializeStreak(): StreakData {
  const today = new Date()
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: today,
    streakStartDate: today
  }
}
