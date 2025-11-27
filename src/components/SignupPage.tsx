import { useState } from 'react'
import type { Mode } from '../types/gamification'

interface SignupPageProps {
  onSignup: (username: string, email: string, password: string, mode: Mode) => void
  onSwitchToLogin: () => void
  error?: string
}

export default function SignupPage({ onSignup, onSwitchToLogin, error }: SignupPageProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    setPasswordError('')
    // Default to 'home' mode for simplicity
    onSignup(username, email, password, 'home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="ExpiryGuard" className="w-24 h-24 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join ExpiryGuard</h1>
          <p className="text-gray-600 text-lg">Start tracking and reduce waste! 🌱</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {passwordError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {passwordError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all min-h-[44px] text-lg"
                placeholder="johndoe"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all min-h-[44px] text-lg"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all min-h-[44px] text-lg"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] min-h-[44px]"
            >
              🚀 Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>By signing up, you agree to reduce food waste 🌍</p>
          </div>
        </div>
      </div>
    </div>
  )
}
