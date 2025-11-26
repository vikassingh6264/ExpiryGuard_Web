export type ProductCategory = 
  | 'Food'
  | 'Medicine'
  | 'Household'
  | 'Cosmetic'
  | 'Other'

export type ExpiryStatus = 
  | 'safe'
  | 'expiring-soon'
  | 'expired'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  expiryDate: Date
  quantity?: number
  notes?: string
  imageUrl?: string
  reminderDays?: number[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductInput {
  name: string
  category: ProductCategory
  expiryDate: string
  quantity?: number
  notes?: string
  imageUrl?: string
  reminderDays?: number[]
}

export interface ValidationResult {
  isValid: boolean
  errors: {
    [fieldName: string]: string
  }
}
