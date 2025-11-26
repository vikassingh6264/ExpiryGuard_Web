import { differenceInDays, startOfDay } from 'date-fns'
import type { ExpiryStatus } from '../types'

export function calculateDaysRemaining(expiryDate: Date): number {
  const today = startOfDay(new Date())
  const expiry = startOfDay(expiryDate)
  return differenceInDays(expiry, today)
}

export function calculateStatus(daysRemaining: number): ExpiryStatus {
  if (daysRemaining > 7) {
    return 'safe'
  } else if (daysRemaining > 0) {
    return 'expiring-soon'
  } else {
    return 'expired'
  }
}

export function getStatusColor(status: ExpiryStatus): string {
  switch (status) {
    case 'safe':
      return 'status-safe'
    case 'expiring-soon':
      return 'status-expiring'
    case 'expired':
      return 'status-expired'
  }
}
