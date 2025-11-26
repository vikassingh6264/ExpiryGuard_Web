import { useEffect } from 'react'
import type { NotificationType } from '../types/gamification'
import { playConfetti } from '../utils/animations'

interface NotificationToastProps {
  type: NotificationType
  message: string
  points?: number
  onClose: () => void
  duration?: number
}

export default function NotificationToast({
  type,
  message,
  points,
  onClose,
  duration = 3000
}: NotificationToastProps) {
  useEffect(() => {
    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    // Play confetti for certain types
    if (type === 'levelup' || type === 'badge') {
      playConfetti()
    }

    return () => clearTimeout(timer)
  }, [duration, onClose, type])

  const getIcon = () => {
    switch (type) {
      case 'points':
        return '⭐'
      case 'levelup':
        return '🎉'
      case 'badge':
        return '🏆'
      case 'success':
        return '✅'
      default:
        return '✨'
    }
  }

  const getColors = () => {
    switch (type) {
      case 'points':
        return 'from-yellow-400 to-orange-500'
      case 'levelup':
        return 'from-purple-400 to-pink-500'
      case 'badge':
        return 'from-blue-400 to-indigo-500'
      case 'success':
        return 'from-green-400 to-emerald-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div
      className={`fixed top-20 right-4 z-50 animate-slide-in-right max-w-sm`}
      role="alert"
    >
      <div
        className={`bg-gradient-to-r ${getColors()} text-white rounded-lg shadow-2xl p-4 flex items-center gap-3`}
      >
        <div className="text-3xl">{getIcon()}</div>
        <div className="flex-1">
          <p className="font-semibold">{message}</p>
          {points !== undefined && (
            <p className="text-sm opacity-90">+{points} Eco Points</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
