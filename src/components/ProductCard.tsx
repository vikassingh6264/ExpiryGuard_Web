import type { Product } from '../types'
import { calculateDaysRemaining, calculateStatus } from '../services/expiryCalculation'
import { format } from 'date-fns'

interface ProductCardProps {
  product: Product
  onEdit: () => void
  onDelete: () => void
  onMarkAsUsed: () => void
}

export default function ProductCard({ product, onEdit, onDelete, onMarkAsUsed }: ProductCardProps) {
  const daysRemaining = calculateDaysRemaining(product.expiryDate)
  const status = calculateStatus(daysRemaining)

  const statusLabels = {
    'safe': 'Safe',
    'expiring-soon': 'Expiring Soon',
    'expired': 'Expired'
  }

  const statusBgColors = {
    'safe': 'bg-green-100 text-green-800',
    'expiring-soon': 'bg-orange-100 text-orange-800',
    'expired': 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-3"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image'
          }}
        />
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBgColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <p><span className="font-medium">Category:</span> {product.category}</p>
        <p><span className="font-medium">Expires:</span> {format(product.expiryDate, 'MMM dd, yyyy')}</p>
        <p><span className="font-medium">Days left:</span> {daysRemaining > 0 ? daysRemaining : 0}</p>
        {product.quantity && <p><span className="font-medium">Quantity:</span> {product.quantity}</p>}
        {product.notes && <p className="text-xs italic mt-2">{product.notes}</p>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onMarkAsUsed}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors min-h-[44px]"
        >
          Mark as Used
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
          aria-label="Edit product"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors min-h-[44px] min-w-[44px]"
          aria-label="Delete product"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
