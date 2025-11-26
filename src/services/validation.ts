import type { ProductInput, ValidationResult } from '../types'

export function validateProductInput(input: ProductInput): ValidationResult {
  const errors: { [fieldName: string]: string } = {}

  // Validate required fields
  const nameError = validateRequiredField(input.name, 'name')
  if (nameError) errors.name = nameError

  const categoryError = validateRequiredField(input.category, 'category')
  if (categoryError) errors.category = categoryError

  const dateError = validateDate(input.expiryDate)
  if (dateError) errors.expiryDate = dateError

  // Validate optional fields
  if (input.quantity !== undefined && input.quantity !== null) {
    if (input.quantity < 0) {
      errors.quantity = 'Quantity must be a positive number'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRequiredField(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
  }
  return null
}

export function validateDate(date: string): string | null {
  if (!date || date.trim() === '') {
    return 'Expiry date is required'
  }

  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return 'Please enter a valid date'
  }

  return null
}
