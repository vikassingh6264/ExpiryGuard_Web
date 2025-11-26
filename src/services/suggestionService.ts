import type { Product } from '../types'
import type { Suggestion, Mode } from '../types/gamification'

const RECIPE_SUGGESTIONS: Record<string, string[]> = {
  milk: ['Make Paneer', 'Tea/Coffee', 'Smoothie', 'Yogurt'],
  banana: ['Banana Bread', 'Smoothie', 'Pancakes', 'Ice Cream'],
  bread: ['French Toast', 'Croutons', 'Bread Pudding', 'Sandwiches'],
  eggs: ['Omelette', 'Boiled Eggs', 'Fried Rice', 'Baking'],
  cheese: ['Grilled Cheese', 'Pasta', 'Pizza', 'Cheese Sauce'],
  yogurt: ['Smoothie', 'Parfait', 'Marinade', 'Baking'],
  vegetables: ['Stir Fry', 'Soup', 'Salad', 'Roasted Veggies'],
  chicken: ['Curry', 'Grilled', 'Soup', 'Stir Fry'],
  rice: ['Fried Rice', 'Pulao', 'Risotto', 'Rice Pudding']
}

const STORAGE_TIPS: Record<string, string> = {
  milk: 'Freeze in ice cube trays for 2 months',
  banana: 'Peel and freeze for smoothies',
  bread: 'Freeze slices for up to 3 months',
  vegetables: 'Blanch and freeze for longer storage',
  cheese: 'Wrap tightly in wax paper, then plastic wrap',
  herbs: 'Freeze in olive oil in ice cube trays',
  meat: 'Freeze in portions with proper wrapping',
  fruits: 'Freeze for smoothies or baking',
  medicine: 'Store in cool, dry place away from sunlight',
  cosmetics: 'Keep away from heat and moisture'
}

const USAGE_SUGGESTIONS: Record<string, string[]> = {
  Food: ['Cook a meal', 'Share with neighbors', 'Use in recipes', 'Meal prep'],
  Medicine: ['Check with pharmacist', 'Use as prescribed', 'Dispose properly if expired'],
  Household: ['Use immediately', 'Share with family', 'Check effectiveness'],
  Cosmetic: ['Use daily', 'Gift to friends', 'Check for changes in smell/texture'],
  Groceries: ['Plan meals', 'Cook in bulk', 'Share with community'],
  Beverages: ['Drink soon', 'Use in cooking', 'Share at gatherings'],
  Ingredients: ['Cook today', 'Freeze portions', 'Make sauces']
}

export function generateSuggestions(product: Product, _mode: Mode): Suggestion[] {
  const suggestions: Suggestion[] = []

  // Recipe suggestions for food items
  if (product.category === 'Food') {
    const recipeSuggestions = getRecipeSuggestions(product.name)
    if (recipeSuggestions.length > 0) {
      suggestions.push(...recipeSuggestions)
    }
  }

  // Usage suggestions
  const usageSuggestions = getUsageSuggestions(product)
  suggestions.push(...usageSuggestions)

  // Donation suggestions
  const donationSuggestions = getDonationSuggestions()
  suggestions.push(...donationSuggestions)

  // Storage tips
  const storageTips = getStorageTips(product)
  if (storageTips.length > 0) {
    suggestions.push(...storageTips)
  }

  return suggestions
}

export function getRecipeSuggestions(productName: string): Suggestion[] {
  const normalizedName = productName.toLowerCase()
  
  // Check for exact matches or partial matches
  for (const [key, recipes] of Object.entries(RECIPE_SUGGESTIONS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return recipes.slice(0, 3).map(recipe => ({
        type: 'recipe',
        title: recipe,
        description: `Try making ${recipe} with your ${productName}`,
        icon: '🍳',
        actionable: true
      }))
    }
  }

  // Generic food suggestion
  return [{
    type: 'recipe',
    title: 'Cook a meal',
    description: `Use your ${productName} in a recipe today`,
    icon: '🍳',
    actionable: true
  }]
}

export function getUsageSuggestions(product: Product): Suggestion[] {
  const usageIdeas = USAGE_SUGGESTIONS[product.category] || USAGE_SUGGESTIONS.Food
  
  return usageIdeas.slice(0, 2).map(idea => ({
    type: 'usage',
    title: idea,
    description: `${idea} to avoid waste`,
    icon: '💡',
    actionable: true
  }))
}

export function getDonationSuggestions(_location?: string): Suggestion[] {
  return [
    {
      type: 'donation',
      title: 'Donate to food bank',
      description: 'Find nearby food banks or shelters',
      icon: '🤝',
      actionable: true
    },
    {
      type: 'donation',
      title: 'Share with neighbors',
      description: 'Offer to neighbors or community groups',
      icon: '👥',
      actionable: true
    }
  ]
}

export function getStorageTips(product: Product): Suggestion[] {
  const normalizedName = product.name.toLowerCase()
  
  // Check for storage tips
  for (const [key, tip] of Object.entries(STORAGE_TIPS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return [{
        type: 'storage',
        title: 'Storage Tip',
        description: tip,
        icon: '❄️',
        actionable: false
      }]
    }
  }

  // Category-based storage tips
  if (product.category === 'Food') {
    return [{
      type: 'storage',
      title: 'Freeze for later',
      description: 'Most food items can be frozen to extend shelf life',
      icon: '❄️',
      actionable: false
    }]
  }

  if (product.category === 'Medicine') {
    return [{
      type: 'storage',
      title: 'Proper storage',
      description: STORAGE_TIPS.medicine,
      icon: '🌡️',
      actionable: false
    }]
  }

  return []
}

export function shouldShowSuggestions(product: Product): boolean {
  const daysRemaining = Math.ceil(
    (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  
  // Show suggestions for products expiring in 1-2 days
  return daysRemaining >= 0 && daysRemaining <= 2
}
