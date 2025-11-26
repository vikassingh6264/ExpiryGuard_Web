import confetti from 'canvas-confetti'

export function playConfetti(element?: HTMLElement) {
  const rect = element?.getBoundingClientRect()
  const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
  const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x, y },
    colors: ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444']
  })
}

export function playSparkle(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  confetti({
    particleCount: 30,
    spread: 40,
    origin: { x, y },
    colors: ['#fbbf24', '#fcd34d'],
    shapes: ['star'],
    scalar: 0.8
  })
}

export function playLevelUpAnimation() {
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}

export function playBadgeUnlockAnimation(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  // Burst effect
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x, y },
    colors: ['#fbbf24', '#f59e0b', '#fcd34d']
  })

  // Follow-up sparkles
  setTimeout(() => {
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { x, y },
      shapes: ['star'],
      colors: ['#fbbf24']
    })
  }, 200)
}
