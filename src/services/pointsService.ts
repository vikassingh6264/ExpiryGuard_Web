import type { PointAction, PointTransaction } from '../types/gamification'

export const POINT_VALUES: Record<PointAction, number> = {
  mark_used_before_expiry: 10,
  add_product: 5,
  use_on_reminder_day: 20,
  seven_day_streak: 50,
  perfect_week: 100
}

export function calculatePoints(action: PointAction): number {
  return POINT_VALUES[action] || 0
}

export function awardPoints(
  userId: string,
  points: number,
  reason: string
): PointTransaction {
  const transaction: PointTransaction = {
    id: crypto.randomUUID(),
    userId,
    action: reason as PointAction,
    points,
    reason,
    timestamp: new Date()
  }

  // Store transaction in history
  const history = getPointsHistory(userId)
  history.push(transaction)
  savePointsHistory(userId, history)

  return transaction
}

export function getPointsHistory(userId: string): PointTransaction[] {
  try {
    const stored = localStorage.getItem(`expiryguard_points_${userId}`)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    return parsed.map((t: any) => ({
      ...t,
      timestamp: new Date(t.timestamp)
    }))
  } catch (error) {
    console.error('Failed to load points history:', error)
    return []
  }
}

function savePointsHistory(userId: string, history: PointTransaction[]): void {
  try {
    localStorage.setItem(`expiryguard_points_${userId}`, JSON.stringify(history))
  } catch (error) {
    console.error('Failed to save points history:', error)
  }
}

export function getTotalPoints(userId: string): number {
  const history = getPointsHistory(userId)
  return history.reduce((total, transaction) => total + transaction.points, 0)
}

export function getRecentPointGains(userId: string, limit: number = 5): PointTransaction[] {
  const history = getPointsHistory(userId)
  return history.slice(-limit).reverse()
}
