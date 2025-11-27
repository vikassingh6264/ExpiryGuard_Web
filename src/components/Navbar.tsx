import { useState, useEffect, useRef } from 'react'
import type { GamificationData, User } from '../types/gamification'
import EcoPointsDisplay from './EcoPointsDisplay'

interface NavbarProps {
  currentView: 'home' | 'dashboard' | 'add' | 'edit' | 'achievements' | 'login' | 'signup'
  onNavigate: (view: 'home' | 'dashboard') => void
  gamificationData?: GamificationData | null
  onViewAchievements?: () => void
  currentUser?: User | null
  onLogout?: () => void
  onLogin?: () => void
  onSignup?: () => void
}

export default function Navbar({ currentView, onNavigate, gamificationData, onViewAchievements, currentUser, onLogout, onLogin, onSignup }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors"
            >
              🛡️ ExpiryGuard
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-md font-medium transition-colors min-h-[44px] ${
                currentView === 'home'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            
            {/* Show Dashboard only when logged in */}
            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-4 py-2 rounded-md font-medium transition-colors min-h-[44px] ${
                  currentView === 'dashboard' || currentView === 'add' || currentView === 'edit'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
            )}
            
            {/* Show Achievements only when logged in */}
            {currentUser && gamificationData && onViewAchievements && (
              <button
                onClick={onViewAchievements}
                className={`px-4 py-2 rounded-md font-medium transition-colors min-h-[44px] ${
                  currentView === 'achievements'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🏆 Achievements
              </button>
            )}
            
            {/* Gamification Display */}
            {gamificationData && (
              <div className="flex items-center gap-3 ml-4">
                <EcoPointsDisplay points={gamificationData.ecoPoints} />
              </div>
            )}

            {/* Auth Buttons or User Menu */}
            {currentUser && onLogout ? (
              <div className="relative ml-4" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{currentUser.username}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onLogout()
                        setShowUserMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={onLogin}
                  className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors min-h-[44px]"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg min-h-[44px]"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 min-h-[44px] min-w-[44px]"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onNavigate('home')
                  setMobileMenuOpen(false)
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors text-left min-h-[44px] ${
                  currentView === 'home'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              
              {/* Show Dashboard only when logged in */}
              {currentUser && (
                <button
                  onClick={() => {
                    onNavigate('dashboard')
                    setMobileMenuOpen(false)
                  }}
                  className={`px-4 py-2 rounded-md font-medium transition-colors text-left min-h-[44px] ${
                    currentView === 'dashboard' || currentView === 'add' || currentView === 'edit'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
              )}
              
              {/* Show Achievements only when logged in */}
              {currentUser && gamificationData && onViewAchievements && (
                <button
                  onClick={() => {
                    onViewAchievements()
                    setMobileMenuOpen(false)
                  }}
                  className={`px-4 py-2 rounded-md font-medium transition-colors text-left min-h-[44px] ${
                    currentView === 'achievements'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🏆 Achievements
                </button>
              )}
              
              {/* Show Login/Signup when not logged in */}
              {!currentUser && (
                <>
                  <button
                    onClick={() => {
                      onLogin?.()
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 rounded-md font-medium transition-colors text-left min-h-[44px] text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onSignup?.()
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md font-medium transition-colors text-left min-h-[44px]"
                  >
                    Sign Up
                  </button>
                </>
              )}
              
              {/* Show Logout when logged in */}
              {currentUser && onLogout && (
                <button
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-md font-medium transition-colors text-left min-h-[44px] text-red-600 hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
