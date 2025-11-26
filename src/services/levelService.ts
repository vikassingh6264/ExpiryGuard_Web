import type { Level } from '../types/gamification'

export const LEVELS: Level[] = [
  { number: 1, title: 'Waste Rookie', minPoints: 0, maxPoints: 99, color: '#9CA3AF', icon: '🌱' },
  { number: 2, title: 'Smart Saver', minPoints: 100, maxPoints: 499, color: '#60A5FA', icon: '💡' },
  { number: 3, title: 'Waste Warrior', minPoints: 500, maxPoints: 1499, color: '#34D399', icon: '⚔️' },
  { number: 4, title: 'Expiry Master', minPoints: 1500, maxPoints: 2999, color: '#F59E0B', icon: '👑' },
  { number: 5, title: 'Eco Legend', minPoints: 3000, maxPoints: Infinity, color: '#8B5CF6', icon: '🏆' }
]

export function calculateLevel(points: number): Level {
  // Find the level that matches the points range
  for (const level of LEVELS) {
    if (points >= level.minPoints && points <= level.maxPoints) {
      return level
    }
  }
  
  // Fallback to Level 1 if something goes wrong
  return LEVELS[0]
}

export function getNextLevel(currentLevel: Level): Level | null {
  const currentIndex = LEVELS.findIndex(l => l.number === currentLevel.number)
  
  if (currentIndex === -1 || currentIndex === LEVELS.length - 1) {
    return null // Already at max level or invalid level
  }
  
  return LEVELS[currentIndex + 1]
}

export function getProgressToNextLevel(points: number): number {
  const currentLevel = calculateLevel(points)
  const nextLevel = getNextLevel(currentLevel)
  
  if (!nextLevel) {
    return 100 // Already at max level, show 100% progress
  }
  
  const pointsInCurrentLevel = points - currentLevel.minPoints
  const pointsNeededForNextLevel = nextLevel.minPoints - currentLevel.minPoints
  
  const progress = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100
  
  return Math.min(Math.max(progress, 0), 100) // Clamp between 0 and 100
}

export function getPointsToNextLevel(points: number): number {
  const currentLevel = calculateLevel(points)
  const nextLevel = getNextLevel(currentLevel)
  
  if (!nextLevel) {
    return 0 // Already at max level
  }
  
  return nextLevel.minPoints - points
}

export function getLevelByNumber(levelNumber: 1 | 2 | 3 | 4 | 5): Level | undefined {
  return LEVELS.find(l => l.number === levelNumber)
}
