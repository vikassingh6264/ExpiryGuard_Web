import { useState } from 'react'
import type { ProductInput, ProductCategory } from '../types'
import { validateProductInput } from '../services/validation'

interface BulkAddProductFormProps {
  onSubmit: (product: ProductInput) => void
  onCancel: () => void
}

const categories: ProductCategory[] = ['Food', 'Medicine', 'Household', 'Cosmetic', 'Other']

const categoryEmojis: Record<ProductCategory, string> = {
  Food: '🍎',
  Medicine: '💊',
  Household: '🏠',
  Cosmetic: '💄',
  Other: '📦'
}

const quickReminderPresets = [
  { label: '1 day', days: [1] },
  { label: '3 days', days: [3] },
  { label: '1 week', days: [7] },
  { label: 'Smart (1,3,7)', days: [1, 3, 7] }
]

export default function BulkAddProductForm({ onSubmit, onCancel }: BulkAddProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    category: 'Food',
    expiryDate: '',
    quantity: undefined,
    notes: '',
    imageUrl: '',
    reminderDays: [3, 7]
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [selectedReminderPreset, setSelectedReminderPreset] = useState(3)
  const [addAnother, setAddAnother] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value === '' ? undefined : Number(value)) : value
    }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleReminderPresetChange = (index: number) => {
    setSelectedReminderPreset(index)
    setFormData(prev => ({
      ...prev,
      reminderDays: quickReminderPresets[index].days
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateProductInput(formData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      const firstErrorField = Object.keys(validation.errors)[0]
      document.getElementsByName(firstErrorField)[0]?.focus()
      return
    }

    onSubmit(formData)

    if (addAnother) {
      // Reset form but keep category and reminder settings
      setFormData(prev => ({
        name: '',
        category: prev.category,
        expiryDate: '',
        quantity: undefined,
        notes: '',
        imageUrl: '',
        reminderDays: prev.reminderDays
      }))
      setErrors({})
      // Focus on name field
      setTimeout(() => {
        document.getElementById('name')?.focus()
      }, 100)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border border-green-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span>📦</span> Add Product
            </h2>
            <p className="text-gray-600 mt-1">Quick and easy product tracking</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-lg ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
              }`}
              placeholder="e.g., Fresh Milk, Aspirin, Shampoo..."
              autoFocus
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Category Selection - Visual Cards */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category *
            </label>
            <div className="grid grid-cols-5 gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                  className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    formData.category === cat
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{categoryEmojis[cat]}</div>
                  <div className="text-xs font-medium text-gray-700">{cat}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Expiry Date and Quantity - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity (Optional)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity ?? ''}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                placeholder="e.g., 2"
              />
            </div>
          </div>

          {/* Quick Reminder Presets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Reminder Settings
            </label>
            <div className="grid grid-cols-4 gap-3">
              {quickReminderPresets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleReminderPresetChange(index)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedReminderPreset === index
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-700">{preset.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes - Collapsible */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors flex items-center gap-2">
              <span>📝</span> Add Notes (Optional)
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
              placeholder="Any additional information..."
            />
          </details>

          {/* Add Another Checkbox */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={addAnother}
                onChange={(e) => setAddAnother(e.target.checked)}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <div>
                <span className="font-medium text-gray-700">Add another product after this</span>
                <p className="text-sm text-gray-500">Keep the form open to quickly add multiple products</p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>✓</span> Add Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
