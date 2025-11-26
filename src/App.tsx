import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Product, ProductInput } from './types'
import type { GamificationData, NotificationType, User, Mode } from './types/gamification'
import { loadProducts, saveProducts } from './services/localStorage'
import { checkReminders, logReminders } from './services/reminderService'
import { loadGamificationData, saveGamificationData, initializeGamificationData, updateEcoPoints } from './services/gamificationStorage'
import { calculatePoints } from './services/pointsService'
import { checkAchievements } from './services/achievementService'
import { updateStatistics, updateStreak } from './services/statisticsService'
import { login, signup, logout, getCurrentUser } from './services/userService'
import { playCoinSound, playLevelUpSound, playBadgeUnlockSound } from './services/soundService'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'
import AchievementsPage from './components/AchievementsPage'
import NotificationToast from './components/NotificationToast'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

type View = 'home' | 'dashboard' | 'add' | 'edit' | 'achievements' | 'login' | 'signup'

interface Notification {
  id: string
  type: NotificationType
  message: string
  points?: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentView, setCurrentView] = useState<View>('login')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authError, setAuthError] = useState<string>('')

  // Check for existing user session on mount
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setCurrentView('home')
      loadUserData(user.id)
    }
  }, [])

  const loadUserData = (userId: string) => {
    const loadedProducts = loadProducts()
    setProducts(loadedProducts)

    let gamData = loadGamificationData(userId)
    
    if (!gamData) {
      gamData = initializeGamificationData(userId)
      saveGamificationData(gamData)
    }
    
    setGamificationData(gamData)

    // Check reminders
    const productsNeedingReminder = checkReminders(loadedProducts)
    if (productsNeedingReminder.length > 0) {
      logReminders(productsNeedingReminder)
    }
  }

  // Save products and gamification data to local storage whenever they change
  useEffect(() => {
    if (products.length > 0 || currentView !== 'home') {
      saveProducts(products)
    }
  }, [products, currentView])

  useEffect(() => {
    if (gamificationData) {
      saveGamificationData(gamificationData)
    }
  }, [gamificationData])

  // Check reminders daily
  useEffect(() => {
    const checkDaily = () => {
      const productsNeedingReminder = checkReminders(products)
      if (productsNeedingReminder.length > 0) {
        logReminders(productsNeedingReminder)
      }
    }

    // Check once per day (24 hours)
    const interval = setInterval(checkDaily, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [products])

  const handleAddProduct = (input: ProductInput) => {
    const newProduct: Product = {
      id: uuidv4(),
      name: input.name,
      category: input.category,
      expiryDate: new Date(input.expiryDate),
      quantity: input.quantity,
      notes: input.notes,
      imageUrl: input.imageUrl,
      reminderDays: input.reminderDays,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setProducts(prev => [...prev, newProduct])
    
    // Award points for adding a product
    if (gamificationData) {
      const points = calculatePoints('add_product')
      const updatedData = updateEcoPoints(gamificationData, points)
      
      // Update statistics
      updatedData.statistics = updateStatistics(updatedData.statistics, newProduct, 'added')
      
      // Check for achievements
      const newlyUnlocked = checkAchievements(updatedData)
      
      setGamificationData(updatedData)
      
      // Show notification
      showNotification('points', `Product added!`, points)
      playCoinSound()
      
      // Check for level up
      if (updatedData.level.number > gamificationData.level.number) {
        showNotification('levelup', `Level Up! You're now ${updatedData.level.title}!`)
        playLevelUpSound()
      }
      
      // Show badge notifications
      newlyUnlocked.forEach(achievement => {
        showNotification('badge', `Achievement Unlocked: ${achievement.name}!`)
        playBadgeUnlockSound()
      })
    }
    
    setCurrentView('dashboard')
  }

  const handleEditProduct = (input: ProductInput) => {
    if (!editingProduct) return

    setProducts(prev =>
      prev.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: input.name,
              category: input.category,
              expiryDate: new Date(input.expiryDate),
              quantity: input.quantity,
              notes: input.notes,
              imageUrl: input.imageUrl,
              reminderDays: input.reminderDays,
              updatedAt: new Date()
            }
          : p
      )
    )

    setEditingProduct(null)
    setCurrentView('dashboard')
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleMarkAsUsed = (id: string) => {
    const product = products.find(p => p.id === id)
    if (!product) return
    
    setProducts(prev => prev.filter(p => p.id !== id))
    
    // Award points for marking as used before expiry
    if (gamificationData) {
      const isBeforeExpiry = new Date(product.expiryDate) >= new Date()
      
      if (isBeforeExpiry) {
        const points = calculatePoints('mark_used_before_expiry')
        const updatedData = updateEcoPoints(gamificationData, points)
        
        // Update statistics
        updatedData.statistics = updateStatistics(updatedData.statistics, product, 'saved')
        
        // Update streak
        const hasExpiredProducts = products.some(p => 
          p.id !== id && new Date(p.expiryDate) < new Date()
        )
        updatedData.streak = updateStreak(updatedData.streak, hasExpiredProducts)
        
        // Check for achievements
        const newlyUnlocked = checkAchievements(updatedData)
        
        setGamificationData(updatedData)
        
        // Show notification
        showNotification('points', `Great job! Product saved before expiry!`, points)
        playCoinSound()
        
        // Check for level up
        if (updatedData.level.number > gamificationData.level.number) {
          showNotification('levelup', `Level Up! You're now ${updatedData.level.title}!`)
          playLevelUpSound()
        }
        
        // Show badge notifications
        newlyUnlocked.forEach(achievement => {
          showNotification('badge', `Achievement Unlocked: ${achievement.name}!`)
          playBadgeUnlockSound()
        })
      }
    }
  }

  const handleNavigate = (view: 'home' | 'dashboard') => {
    setCurrentView(view)
    setEditingProduct(null)
  }

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product)
    setCurrentView('edit')
  }

  const showNotification = (type: NotificationType, message: string, points?: number) => {
    const notification: Notification = {
      id: uuidv4(),
      type,
      message,
      points
    }
    setNotifications(prev => [...prev, notification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleLogin = (email: string, password: string) => {
    const user = login(email, password)
    if (user) {
      setCurrentUser(user)
      setAuthError('')
      setCurrentView('home')
      loadUserData(user.id)
    } else {
      setAuthError('Invalid email or password')
    }
  }

  const handleSignup = (username: string, email: string, password: string, mode: Mode) => {
    const user = signup(username, email, password, mode)
    if (user) {
      setCurrentUser(user)
      setAuthError('')
      setCurrentView('home')
      loadUserData(user.id)
      showNotification('success', `Welcome ${username}! Your account has been created.`)
    } else {
      setAuthError('Email already registered or invalid data')
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    setGamificationData(null)
    setProducts([])
    setCurrentView('login')
    setAuthError('')
  }

  // Show login/signup if not authenticated
  if (!currentUser) {
    if (currentView === 'signup') {
      return (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setCurrentView('login')
            setAuthError('')
          }}
          error={authError}
        />
      )
    }
    
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setCurrentView('signup')
          setAuthError('')
        }}
        error={authError}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        gamificationData={gamificationData}
        onViewAchievements={() => setCurrentView('achievements')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      {currentView === 'home' && (
        <HomePage onGetStarted={() => setCurrentView('dashboard')} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          products={products}
          onAddProduct={() => setCurrentView('add')}
          onEditProduct={handleStartEdit}
          onDeleteProduct={handleDeleteProduct}
          onMarkAsUsed={handleMarkAsUsed}
          gamificationData={gamificationData}
        />
      )}

      {currentView === 'add' && (
        <div className="py-8 px-4">
          <AddProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setCurrentView('dashboard')}
          />
        </div>
      )}

      {currentView === 'edit' && editingProduct && (
        <div className="py-8 px-4">
          <EditProductForm
            product={editingProduct}
            onSubmit={handleEditProduct}
            onCancel={() => {
              setEditingProduct(null)
              setCurrentView('dashboard')
            }}
          />
        </div>
      )}

      {currentView === 'achievements' && gamificationData && (
        <AchievementsPage achievements={gamificationData.achievements} />
      )}

      {/* Notifications */}
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          type={notification.type}
          message={notification.message}
          points={notification.points}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

export default App
