import { useState } from 'react'
import type { Product, ProductInput, ProductCategory } from '../types'
import { validateProductInput } from '../services/validation'
import { format } from 'date-fns'

interface EditProductFormProps {
  product: Product
  onSubmit: (product: ProductInput) => void
  onCancel: () => void
}

const categories: ProductCategory[] = ['Food', 'Medicine', 'Household', 'Cosmetic', 'Other']

export default function EditProductForm({ product, onSubmit, onCancel }: EditProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: product.name,
    category: product.category,
    expiryDate: format(product.expiryDate, 'yyyy-MM-dd'),
    quantity: product.quantity,
    notes: product.notes || '',
    imageUrl: product.imageUrl || '',
    reminderDays: product.reminderDays || []
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [reminderOptions, setReminderOptions] = useState({
    day1: product.reminderDays?.includes(1) || false,
    day3: product.reminderDays?.includes(3) || false,
    day7: product.reminderDays?.includes(7) || false,
    custom: product.reminderDays?.some(d => ![1, 3, 7].includes(d)) || false
  })
  const [customDays, setCustomDays] = useState(
    product.reminderDays?.find(d => ![1, 3, 7].includes(d))?.toString() || ''
  )

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

  const handleReminderChange = (option: keyof typeof reminderOptions) => {
    setReminderOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const reminderDays: number[] = []
    if (reminderOptions.day1) reminderDays.push(1)
    if (reminderOptions.day3) reminderDays.push(3)
    if (reminderOptions.day7) reminderDays.push(7)
    if (reminderOptions.custom && customDays) {
      const customValue = Number(customDays)
      if (!isNaN(customValue) && customValue > 0) {
        reminderDays.push(customValue)
      }
    }

    const productInput = {
      ...formData,
      reminderDays: reminderDays.length > 0 ? reminderDays : undefined
    }

    const validation = validateProductInput(productInput)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      const firstErrorField = Object.keys(validation.errors)[0]
      document.getElementsByName(firstErrorField)[0]?.focus()
      return
    }

    onSubmit(productInput)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date *
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (Optional)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity ?? ''}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reminder (Optional)
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={reminderOptions.day1}
                onChange={() => handleReminderChange('day1')}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm">1 day before expiry</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={reminderOptions.day3}
                onChange={() => handleReminderChange('day3')}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm">3 days before expiry</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={reminderOptions.day7}
                onChange={() => handleReminderChange('day7')}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm">7 days before expiry</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={reminderOptions.custom}
                onChange={() => handleReminderChange('custom')}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm">Custom:</span>
              <input
                type="number"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                disabled={!reminderOptions.custom}
                min="1"
                className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded-md disabled:bg-gray-100"
                placeholder="days"
              />
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors min-h-[44px]"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md font-medium transition-colors min-h-[44px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
