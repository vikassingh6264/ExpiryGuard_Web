import type { Product } from '../types'

const STORAGE_KEY = 'expiryguard_products'

export function saveProducts(products: Product[]): void {
  try {
    const serialized = JSON.stringify(products)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.error('Failed to save products to local storage:', error)
    throw new Error('Storage limit reached. Please delete some products.')
  }
}

export function loadProducts(): Product[] {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) {
      return []
    }
    
    const parsed = JSON.parse(serialized)
    
    // Convert date strings back to Date objects
    return parsed.map((product: any) => ({
      ...product,
      expiryDate: new Date(product.expiryDate),
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    }))
  } catch (error) {
    console.error('Failed to load products from local storage:', error)
    // Return empty array if data is corrupted
    return []
  }
}

export function clearProducts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear products from local storage:', error)
  }
}
