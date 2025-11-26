import type { Product } from '../types'
import type { VoiceSettings } from '../types/gamification'

const VOICE_TEMPLATES = {
  en: {
    expiring_tomorrow: 'Alert! Your {product} will expire tomorrow. Please use it or donate it to avoid waste.',
    expiring_today: 'Urgent! Your {product} expires today. Use it immediately or consider donating.',
    expiring_soon: 'Reminder! Your {product} will expire in {days} days. Plan to use it soon.'
  },
  hi: {
    expiring_tomorrow: 'चेतावनी! आपका {product} कल समाप्त हो जाएगा। कृपया इसका उपयोग करें या दान करें।',
    expiring_today: 'तत्काल! आपका {product} आज समाप्त हो रहा है। तुरंत उपयोग करें।',
    expiring_soon: 'याद दिलाना! आपका {product} {days} दिनों में समाप्त हो जाएगा।'
  }
}

export function speak(text: string, settings: VoiceSettings): void {
  if (!settings.enabled) {
    console.log('Voice is disabled')
    return
  }

  // Check if speech synthesis is supported
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser')
    return
  }

  // Stop any ongoing speech
  stopSpeaking()

  try {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.lang = settings.language === 'hi' ? 'hi-IN' : 'en-US'

    // Try to find a voice matching the settings
    const voices = getAvailableVoices()
    const matchingVoice = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase()
      const targetLang = settings.language === 'hi' ? 'hi' : 'en'
      const genderMatch = settings.gender === 'female' 
        ? voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman')
        : voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man')
      
      return voiceLang.includes(targetLang) && (genderMatch || true) // Fallback to any voice if gender not found
    })

    if (matchingVoice) {
      utterance.voice = matchingVoice
    }

    window.speechSynthesis.speak(utterance)
  } catch (error) {
    console.error('Failed to speak:', error)
  }
}

export function generateReminderText(product: Product, language: 'en' | 'hi'): string {
  const daysRemaining = Math.ceil(
    (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  const templates = VOICE_TEMPLATES[language]
  let template: string

  if (daysRemaining === 0) {
    template = templates.expiring_today
  } else if (daysRemaining === 1) {
    template = templates.expiring_tomorrow
  } else {
    template = templates.expiring_soon
  }

  return template
    .replace('{product}', product.name)
    .replace('{days}', daysRemaining.toString())
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) {
    return []
  }

  return window.speechSynthesis.getVoices()
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function isSpeaking(): boolean {
  if (!('speechSynthesis' in window)) {
    return false
  }

  return window.speechSynthesis.speaking
}

// Load voices (they may not be available immediately)
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([])
      return
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    // Voices may load asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices())
    }

    // Timeout after 2 seconds
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices())
    }, 2000)
  })
}

export function isVoiceSupported(): boolean {
  return 'speechSynthesis' in window
}
