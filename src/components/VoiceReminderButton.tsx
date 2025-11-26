import { useState } from 'react'
import type { Product } from '../types'
import type { VoiceSettings } from '../types/gamification'
import { speak, generateReminderText, stopSpeaking, isSpeaking, isVoiceSupported } from '../services/voiceService'

interface VoiceReminderButtonProps {
  product: Product
  voiceSettings: VoiceSettings
}

export default function VoiceReminderButton({ product, voiceSettings }: VoiceReminderButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!isVoiceSupported()) {
    return null // Don't show button if voice not supported
  }

  const handlePlay = () => {
    if (isPlaying || isSpeaking()) {
      stopSpeaking()
      setIsPlaying(false)
      return
    }

    const reminderText = generateReminderText(product, voiceSettings.language)
    speak(reminderText, voiceSettings)
    setIsPlaying(true)

    // Reset playing state after a delay
    setTimeout(() => {
      setIsPlaying(false)
    }, 5000)
  }

  return (
    <button
      onClick={handlePlay}
      className="flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors min-h-[44px]"
      title="Play voice reminder"
    >
      <span className="text-lg">{isPlaying ? '🔊' : '🔉'}</span>
      <span className="text-sm font-medium">
        {isPlaying ? 'Playing...' : 'Voice Reminder'}
      </span>
    </button>
  )
}
