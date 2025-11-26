import type { Mode, ModeConfig } from '../types/gamification'

export const MODE_CONFIGS: Record<Mode, ModeConfig> = {
  home: {
    mode: 'home',
    displayName: 'Home Mode',
    icon: '🏠',
    categories: ['Food', 'Medicine', 'Household', 'Cosmetic', 'Other'],
    suggestionTypes: ['recipe', 'usage', 'donation', 'storage'],
    dashboardLabels: {
      title: 'My Products',
      addButton: 'Add Product',
      emptyState: 'No products yet. Start tracking your household items!'
    }
  },
  store: {
    mode: 'store',
    displayName: 'Store Mode',
    icon: '🏪',
    categories: ['Groceries', 'Beverages', 'Snacks', 'Dairy', 'Frozen', 'Other'],
    suggestionTypes: ['discount', 'bundle', 'donation', 'storage'],
    dashboardLabels: {
      title: 'Store Inventory',
      addButton: 'Add Stock',
      emptyState: 'No stock items. Start tracking your inventory!'
    }
  },
  restaurant: {
    mode: 'restaurant',
    displayName: 'Restaurant Mode',
    icon: '🍴',
    categories: ['Ingredients', 'Cooked Food', 'Beverages', 'Dairy', 'Meat', 'Vegetables'],
    suggestionTypes: ['recipe', 'menu', 'donation', 'storage'],
    dashboardLabels: {
      title: 'Kitchen Inventory',
      addButton: 'Add Ingredient',
      emptyState: 'No ingredients tracked. Start managing your kitchen!'
    }
  },
  pharmacy: {
    mode: 'pharmacy',
    displayName: 'Pharmacy Mode',
    icon: '💊',
    categories: ['Medicines', 'Supplements', 'Medical Supplies', 'Vaccines', 'Other'],
    suggestionTypes: ['usage', 'donation', 'disposal', 'storage'],
    dashboardLabels: {
      title: 'Pharmacy Stock',
      addButton: 'Add Medicine',
      emptyState: 'No medicines tracked. Start managing your pharmacy!'
    }
  }
}

export function getModeConfig(mode: Mode): ModeConfig {
  return MODE_CONFIGS[mode]
}

export function getAllModes(): ModeConfig[] {
  return Object.values(MODE_CONFIGS)
}

export function getModeByName(modeName: string): Mode | null {
  const normalizedName = modeName.toLowerCase()
  const modes: Mode[] = ['home', 'store', 'restaurant', 'pharmacy']
  
  return modes.find(mode => mode === normalizedName) || null
}

export function getDefaultMode(): Mode {
  return 'home'
}

export function applyModeSettings(mode: Mode): {
  categories: string[]
  labels: ModeConfig['dashboardLabels']
  suggestionTypes: string[]
} {
  const config = getModeConfig(mode)
  
  return {
    categories: config.categories,
    labels: config.dashboardLabels,
    suggestionTypes: config.suggestionTypes
  }
}

export function isCategoryValidForMode(category: string, mode: Mode): boolean {
  const config = getModeConfig(mode)
  return config.categories.includes(category)
}
