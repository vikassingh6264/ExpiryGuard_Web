import type { User, Mode } from '../types/gamification'

const STORAGE_KEY_USERS = 'expiryguard_users'
const STORAGE_KEY_CURRENT_USER = 'expiryguard_current_user'

interface StoredUser extends User {
  password: string
}

export function signup(username: string, email: string, password: string, mode: Mode): User | null {
  try {
    // Validate inputs
    if (!username || !email || !password) {
      throw new Error('All fields are required')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    // Check if user already exists
    const users = getAllUsers()
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered')
    }

    // Create new user
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      username,
      email,
      mode,
      password, // In production, this should be hashed!
      createdAt: new Date(),
      lastLoginAt: new Date()
    }

    // Save user
    users.push(newUser)
    saveAllUsers(users)

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    return userWithoutPassword
  } catch (error) {
    console.error('Signup error:', error)
    return null
  }
}

export function login(email: string, password: string): User | null {
  try {
    const users = getAllUsers()
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Update last login
    user.lastLoginAt = new Date()
    saveAllUsers(users)

    // Save current user session
    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY_CURRENT_USER)
}

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CURRENT_USER)
    if (!stored) return null

    const user = JSON.parse(stored)
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      lastLoginAt: new Date(user.lastLoginAt)
    }
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null
}

function getAllUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USERS)
    if (!stored) return []

    const users = JSON.parse(stored)
    return users.map((u: any) => ({
      ...u,
      createdAt: new Date(u.createdAt),
      lastLoginAt: new Date(u.lastLoginAt)
    }))
  } catch (error) {
    console.error('Failed to load users:', error)
    return []
  }
}

function saveAllUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))
  } catch (error) {
    console.error('Failed to save users:', error)
  }
}

export function updateUserMode(userId: string, mode: Mode): boolean {
  try {
    const users = getAllUsers()
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) return false

    users[userIndex].mode = mode
    saveAllUsers(users)

    // Update current user session if it's the same user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      currentUser.mode = mode
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser))
    }

    return true
  } catch (error) {
    console.error('Failed to update user mode:', error)
    return false
  }
}
