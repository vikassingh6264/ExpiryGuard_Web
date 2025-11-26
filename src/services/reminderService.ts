import type { Product } from '../types'
import { calculateDaysRemaining } from './expiryCalculation'

export function shouldTriggerReminder(product: Product): boolean {
  if (!product.reminderDays || product.reminderDays.length === 0) {
    return false
  }

  const daysRemaining = calculateDaysRemaining(product.expiryDate)

  // Check if any of the reminder days match the current days remaining
  return product.reminderDays.includes(daysRemaining)
}

export function checkReminders(products: Product[]): Product[] {
  const productsNeedingReminder: Product[] = []

  products.forEach(product => {
    if (shouldTriggerReminder(product)) {
      productsNeedingReminder.push(product)
    }
  })

  return productsNeedingReminder
}

export function logReminders(products: Product[]): void {
  if (products.length === 0) return

  console.log('=== ExpiryGuard Reminders ===')
  products.forEach(product => {
    const daysRemaining = calculateDaysRemaining(product.expiryDate)
    console.log(`⚠️ Reminder: "${product.name}" expires in ${daysRemaining} day(s)!`)
  })
  console.log('============================')
}
