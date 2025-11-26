import { useState } from 'react'
import type { Product } from '../types'
import type { Suggestion } from '../types/gamification'

interface SuggestionCardProps {
  product: Product
  suggestions: Suggestion[]
}

export default function SuggestionCard({ product, suggestions }: SuggestionCardProps) {
  const [expanded, setExpanded] = useState(false)

  if (suggestions.length === 0) return null

  const groupedSuggestions = {
    recipe: suggestions.filter(s => s.type === 'recipe'),
    usage: suggestions.filter(s => s.type === 'usage'),
    donation: suggestions.filter(s => s.type === 'donation'),
    storage: suggestions.filter(s => s.type === 'storage')
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Smart Suggestions
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ways to use your {product.name}
            </p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {/* Quick Preview (always visible) */}
      {!expanded && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              <span>{suggestion.icon}</span>
              <span>{suggestion.title}</span>
            </span>
          ))}
          {suggestions.length > 3 && (
            <span className="inline-flex items-center px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
              +{suggestions.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Expanded View */}
      {expanded && (
        <div className="space-y-4 mt-4">
          {groupedSuggestions.recipe.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                🍳 Recipe Ideas
              </h5>
              <div className="space-y-2">
                {groupedSuggestions.recipe.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {groupedSuggestions.usage.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                💡 Usage Ideas
              </h5>
              <div className="space-y-2">
                {groupedSuggestions.usage.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {groupedSuggestions.donation.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                🤝 Donation Options
              </h5>
              <div className="space-y-2">
                {groupedSuggestions.donation.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {groupedSuggestions.storage.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                ❄️ Storage Tips
              </h5>
              <div className="space-y-2">
                {groupedSuggestions.storage.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
