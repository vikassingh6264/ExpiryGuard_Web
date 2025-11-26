import { useState, useMemo } from 'react'
import type { Product, ExpiryStatus } from '../types'
import type { GamificationData } from '../types/gamification'
import { calculateDaysRemaining, calculateStatus } from '../services/expiryCalculation'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import FilterControls from './FilterControls'
import StatsCard from './StatsCard'
import LevelBadge from './LevelBadge'

interface DashboardProps {
  products: Product[]
  onAddProduct: () => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (id: string) => void
  onMarkAsUsed: (id: string) => void
  gamificationData?: GamificationData | null
}

export default function Dashboard({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onMarkAsUsed,
  gamificationData
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ExpiryStatus>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      if (!matchesSearch) return false

      // Status filter
      if (statusFilter !== 'all') {
        const daysRemaining = calculateDaysRemaining(product.expiryDate)
        const status = calculateStatus(daysRemaining)
        if (status !== statusFilter) return false
      }

      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false
      }

      return true
    })
  }, [products, searchQuery, statusFilter, categoryFilter])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gamification Stats */}
        {gamificationData && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Products Saved"
                value={gamificationData.statistics.productsSaved}
                icon="✅"
                color="#10b981"
              />
              <StatsCard
                title="Money Saved"
                value={gamificationData.statistics.moneySaved}
                icon="💰"
                color="#f59e0b"
                suffix="₹"
              />
              <StatsCard
                title="CO₂ Saved"
                value={gamificationData.statistics.co2Saved}
                icon="🌱"
                color="#22c55e"
                suffix="kg"
                decimals={1}
              />
              <StatsCard
                title="Current Streak"
                value={gamificationData.streak.currentStreak}
                icon="🔥"
                color="#ef4444"
                suffix="days"
              />
            </div>
            
            <div className="mb-6">
              <LevelBadge 
                level={gamificationData.level} 
                points={gamificationData.ecoPoints}
                showProgress={true}
              />
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Product Dashboard</h1>
          
          <div className="space-y-4">
            <SearchBar onSearch={setSearchQuery} />
            <FilterControls
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              onStatusFilterChange={setStatusFilter}
              onCategoryFilterChange={setCategoryFilter}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {products.length === 0 ? 'No products yet' : 'No products found'}
            </h3>
            <p className="text-gray-500 mb-6">
              {products.length === 0 
                ? 'Start tracking your products by adding your first item'
                : 'Try adjusting your search or filters'}
            </p>
            {products.length === 0 && (
              <button
                onClick={onAddProduct}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-colors min-h-[44px]"
              >
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => onEditProduct(product)}
                onDelete={() => onDeleteProduct(product.id)}
                onMarkAsUsed={() => onMarkAsUsed(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={onAddProduct}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 min-h-[56px] min-w-[56px] flex items-center justify-center"
        aria-label="Add product"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
