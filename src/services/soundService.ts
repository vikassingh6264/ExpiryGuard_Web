import { Howl } from 'howler'

// Sound instances
let coinSound: Howl | null = null
let levelUpSound: Howl | null = null
let badgeUnlockSound: Howl | null = null
let successSound: Howl | null = null

let isMuted = false
let globalVolume = 0.7

// Initialize sounds with fallback to simple beeps if files don't exist
function initializeSounds() {
  try {
    // Try to load sound files
    coinSound = new Howl({
      src: ['/sounds/coin.mp3', '/sounds/coin.wav'],
      volume: globalVolume,
      onloaderror: () => {
        console.warn('Coin sound file not found, using fallback')
        coinSound = null
      }
    })

    levelUpSound = new Howl({
      src: ['/sounds/levelup.mp3', '/sounds/levelup.wav'],
      volume: globalVolume,
      onloaderror: () => {
        console.warn('Level up sound file not found, using fallback')
        levelUpSound = null
      }
    })

    badgeUnlockSound = new Howl({
      src: ['/sounds/badge.mp3', '/sounds/badge.wav'],
      volume: globalVolume,
      onloaderror: () => {
        console.warn('Badge sound file not found, using fallback')
        badgeUnlockSound = null
      }
    })

    successSound = new Howl({
      src: ['/sounds/success.mp3', '/sounds/success.wav'],
      volume: globalVolume,
      onloaderror: () => {
        console.warn('Success sound file not found, using fallback')
        successSound = null
      }
    })
  } catch (error) {
    console.error('Failed to initialize sounds:', error)
  }
}

// Initialize on module load
initializeSounds()

// Fallback beep function using Web Audio API
function playBeep(frequency: number, duration: number) {
  if (isMuted) return

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(globalVolume * 0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch (error) {
    console.error('Failed to play beep:', error)
  }
}

export function playCoinSound(): void {
  if (isMuted) return

  if (coinSound) {
    coinSound.play()
  } else {
    // Fallback: short high-pitched beep
    playBeep(800, 0.1)
  }
}

export function playLevelUpSound(): void {
  if (isMuted) return

  if (levelUpSound) {
    levelUpSound.play()
  } else {
    // Fallback: ascending tones
    playBeep(523, 0.15) // C
    setTimeout(() => playBeep(659, 0.15), 150) // E
    setTimeout(() => playBeep(784, 0.3), 300) // G
  }
}

export function playBadgeUnlockSound(): void {
  if (isMuted) return

  if (badgeUnlockSound) {
    badgeUnlockSound.play()
  } else {
    // Fallback: triumphant beep
    playBeep(659, 0.2)
    setTimeout(() => playBeep(784, 0.3), 200)
  }
}

export function playSuccessSound(): void {
  if (isMuted) return

  if (successSound) {
    successSound.play()
  } else {
    // Fallback: simple positive beep
    playBeep(600, 0.2)
  }
}

export function setVolume(volume: number): void {
  globalVolume = Math.max(0, Math.min(1, volume))

  if (coinSound) coinSound.volume(globalVolume)
  if (levelUpSound) levelUpSound.volume(globalVolume)
  if (badgeUnlockSound) badgeUnlockSound.volume(globalVolume)
  if (successSound) successSound.volume(globalVolume)
}

export function mute(): void {
  isMuted = true
  if (coinSound) coinSound.mute(true)
  if (levelUpSound) levelUpSound.mute(true)
  if (badgeUnlockSound) badgeUnlockSound.mute(true)
  if (successSound) successSound.mute(true)
}

export function unmute(): void {
  isMuted = false
  if (coinSound) coinSound.mute(false)
  if (levelUpSound) levelUpSound.mute(false)
  if (badgeUnlockSound) badgeUnlockSound.mute(false)
  if (successSound) successSound.mute(false)
}

export function toggleMute(): boolean {
  if (isMuted) {
    unmute()
  } else {
    mute()
  }
  return isMuted
}

export function isSoundMuted(): boolean {
  return isMuted
}

export function getVolume(): number {
  return globalVolume
}
