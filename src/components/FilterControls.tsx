import type { ExpiryStatus, ProductCategory } from '../types'

interface FilterControlsProps {
  statusFilter: 'all' | ExpiryStatus
  categoryFilter: string
  onStatusFilterChange: (filter: 'all' | ExpiryStatus) => void
  onCategoryFilterChange: (category: string) => void
}

const categories: ProductCategory[] = ['Food', 'Medicine', 'Household', 'Cosmetic', 'Other']

export default function FilterControls({
  statusFilter,
  categoryFilter,
  onStatusFilterChange,
  onCategoryFilterChange
}: FilterControlsProps) {
  const statusFilters: Array<{ value: 'all' | ExpiryStatus; label: string; color: string }> = [
    { value: 'all', label: 'All', color: 'bg-gray-200 text-gray-800 hover:bg-gray-300' },
    { value: 'safe', label: 'Safe', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { value: 'expiring-soon', label: 'Expiring Soon', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
    { value: 'expired', label: 'Expired', color: 'bg-red-100 text-red-800 hover:bg-red-200' }
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => onStatusFilterChange(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
                statusFilter === filter.value
                  ? `${filter.color} ring-2 ring-offset-2 ring-blue-500`
                  : filter.color
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
