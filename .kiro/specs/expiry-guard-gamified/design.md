# Design Document - ExpiryGuard Gamified

## Overview

ExpiryGuard Gamified transforms the existing expiry tracking tool into an engaging gamification platform. The system introduces Eco Points, levels, achievements, smart suggestions, voice reminders, mode selection, social challenges, and a polished UI with animations and sound effects. The architecture extends the existing codebase with new services for gamification logic, achievement tracking, and user management.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Presentation Layer                       │  │  │
│  │  │  - Gamification Components                      │  │  │
│  │  │  - Animation & Sound Effects                    │  │  │
│  │  │  - Dark/Light Mode Theming                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Gamification Logic Layer                 │  │  │
│  │  │  - Points Calculation                           │  │  │
│  │  │  - Level Management                             │  │  │
│  │  │  - Achievement System                           │  │  │
│  │  │  - Streak Tracking                              │  │  │
│  │  │  - Smart Suggestions Engine                     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Data Management Layer                    │  │  │
│  │  │  - User State Management                        │  │  │
│  │  │  - Gamification Storage                         │  │  │
│  │  │  - Challenge Management                         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Browser APIs                                   │  │
│  │  - Local Storage                                      │  │
│  │  - Speech Synthesis API                               │  │
│  │  - Audio API                                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Structure

```
App
├── AuthWrapper
│   ├── LoginPage
│   └── SignupPage
├── ModeSelector
├── Navbar (Enhanced)
│   ├── EcoPointsDisplay
│   ├── LevelBadge
│   └── UserProfile
├── Dashboard (Enhanced)
│   ├── StatsCards
│   │   ├── ProductsSavedCard
│   │   ├── MoneySavedCard
│   │   ├── CO2SavedCard
│   │   └── StreakCard
│   ├── ProductGrid
│   │   └── ProductCard (Enhanced)
│   │       ├── SuggestionCard
│   │       └── VoiceReminderButton
│   └── FloatingAddButton
├── AchievementsPage
│   └── BadgeGrid
│       └── BadgeCard
├── LeaderboardPage
│   ├── ChallengeSection
│   └── TopUsersRanking
├── SettingsPage
│   ├── ThemeToggle
│   ├── VoiceSettings
│   └── ModeSelector
└── NotificationSystem
    ├── PointsNotification
    ├── LevelUpNotification
    └── BadgeUnlockNotification
```

## Components and Interfaces

### New Core Components

#### 1. EcoPointsDisplay Component
- **Purpose**: Shows current Eco Points in navbar
- **Props**: `points: number`, `animated: boolean`
- **Features**: Animated counter, star icon, gradient styling

#### 2. LevelBadge Component
- **Purpose**: Displays current level with progress bar
- **Props**: `level: Level`, `points: number`, `nextLevelPoints: number`
- **Features**: Progress bar, badge icon, color coding, tooltip

#### 3. StatsCard Component
- **Purpose**: Displays individual statistics with icons
- **Props**: `title: string`, `value: number`, `icon: string`, `color: string`
- **Features**: Animated numbers, gradient backgrounds, glassmorphism

#### 4. BadgeCard Component
- **Purpose**: Shows achievement badge with lock/unlock state
- **Props**: `badge: Achievement`, `unlocked: boolean`
- **Features**: Glassmorphism, unlock animation, tooltip

#### 5. SuggestionCard Component
- **Purpose**: Displays smart suggestions for expiring products
- **Props**: `product: Product`, `suggestions: Suggestion[]`
- **Features**: Recipe ideas, usage tips, donation options, storage advice

#### 6. VoiceReminderButton Component
- **Purpose**: Plays audio reminder for product
- **Props**: `product: Product`, `voice: VoiceSettings`
- **Features**: Speech synthesis, language selection, voice gender

#### 7. ModeSelector Component
- **Purpose**: Allows user to select their use case mode
- **Props**: `onModeSelect: (mode: Mode) => void`
- **Features**: Four mode cards with icons, descriptions

#### 8. ChallengeCard Component
- **Purpose**: Displays active challenge with friend
- **Props**: `challenge: Challenge`
- **Features**: Progress comparison, countdown timer, winner declaration

#### 9. LeaderboardTable Component
- **Purpose**: Shows top users ranking
- **Props**: `users: LeaderboardUser[]`, `currentUserId: string`
- **Features**: Animated rankings, highlight current user, medals for top 3

#### 10. NotificationToast Component
- **Purpose**: Shows animated notifications for rewards
- **Props**: `type: NotificationType`, `message: string`, `points?: number`
- **Features**: Confetti animation, sound effects, auto-dismiss

### Enhanced Existing Components

#### ProductCard (Enhanced)
- Add suggestion card when expiring soon
- Add voice reminder button
- Add points indicator for marking as used
- Enhanced animations on actions

#### Dashboard (Enhanced)
- Add stats cards section at top
- Add level progress indicator
- Add quick access to achievements
- Enhanced filtering with mode-specific categories

#### Navbar (Enhanced)
- Add Eco Points display
- Add level badge
- Add user profile dropdown
- Add achievements quick view

## Data Models

### User
```typescript
interface User {
  id: string
  username: string
  email: string
  profilePicture?: string
  mode: Mode
  createdAt: Date
  lastLoginAt: Date
}
```

### GamificationData
```typescript
interface GamificationData {
  userId: string
  ecoPoints: number
  level: Level
  achievements: Achievement[]
  statistics: Statistics
  streak: StreakData
  settings: UserSettings
}
```

### Level
```typescript
interface Level {
  number: 1 | 2 | 3 | 4 | 5
  title: 'Waste Rookie' | 'Smart Saver' | 'Waste Warrior' | 'Expiry Master' | 'Eco Legend'
  minPoints: number
  maxPoints: number
  color: string
  icon: string
}
```

### Achievement
```typescript
interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'milestone' | 'streak' | 'category' | 'special'
  requirement: number
  progress: number
  unlocked: boolean
  unlockedAt?: Date
}
```

### Statistics
```typescript
interface Statistics {
  productsSaved: number
  moneySaved: number  // in currency
  co2Saved: number    // in kg
  foodItemsSaved: number
  medicineItemsSaved: number
  totalProductsAdded: number
  perfectWeeks: number
}
```

### StreakData
```typescript
interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakStartDate: Date
}
```

### Mode
```typescript
type Mode = 'home' | 'store' | 'restaurant' | 'pharmacy'

interface ModeConfig {
  mode: Mode
  displayName: string
  icon: string
  categories: ProductCategory[]
  suggestionTypes: string[]
  dashboardLabels: {
    title: string
    addButton: string
    emptyState: string
  }
}
```

### Suggestion
```typescript
interface Suggestion {
  type: 'recipe' | 'usage' | 'donation' | 'storage'
  title: string
  description: string
  icon: string
  actionable: boolean
}
```

### Challenge
```typescript
interface Challenge {
  id: string
  creatorId: string
  opponentId: string
  startDate: Date
  endDate: Date
  status: 'pending' | 'active' | 'completed'
  creatorScore: number
  opponentScore: number
  winnerId?: string
}
```

### LeaderboardUser
```typescript
interface LeaderboardUser {
  userId: string
  username: string
  profilePicture?: string
  ecoPoints: number
  rank: number
  level: Level
}
```

### VoiceSettings
```typescript
interface VoiceSettings {
  enabled: boolean
  language: 'en' | 'hi'
  gender: 'male' | 'female'
  rate: number
  pitch: number
}
```

### UserSettings
```typescript
interface UserSettings {
  theme: 'light' | 'dark'
  soundEnabled: boolean
  animationsEnabled: boolean
  voice: VoiceSettings
  notifications: boolean
}
```

## Service Interfaces

### PointsService
```typescript
interface PointsService {
  calculatePoints(action: PointAction): number
  awardPoints(userId: string, points: number, reason: string): void
  getPointsHistory(userId: string): PointTransaction[]
}

type PointAction = 
  | 'mark_used_before_expiry'
  | 'add_product'
  | 'use_on_reminder_day'
  | 'seven_day_streak'
  | 'perfect_week'
```

### LevelService
```typescript
interface LevelService {
  calculateLevel(points: number): Level
  getNextLevel(currentLevel: Level): Level | null
  getProgressToNextLevel(points: number): number
}
```

### AchievementService
```typescript
interface AchievementService {
  checkAchievements(userId: string, gamificationData: GamificationData): Achievement[]
  unlockAchievement(userId: string, achievementId: string): void
  getUnlockedAchievements(userId: string): Achievement[]
  getAllAchievements(): Achievement[]
}
```

### SuggestionService
```typescript
interface SuggestionService {
  generateSuggestions(product: Product, mode: Mode): Suggestion[]
  getRecipeSuggestions(productName: string): Suggestion[]
  getUsageSuggestions(product: Product): Suggestion[]
  getDonationSuggestions(location?: string): Suggestion[]
  getStorageTips(product: Product): Suggestion[]
}
```

### VoiceService
```typescript
interface VoiceService {
  speak(text: string, settings: VoiceSettings): void
  generateReminderText(product: Product, language: 'en' | 'hi'): string
  getAvailableVoices(): SpeechSynthesisVoice[]
  stopSpeaking(): void
}
```

### ChallengeService
```typescript
interface ChallengeService {
  createChallenge(creatorId: string, opponentId: string, duration: number): Challenge
  acceptChallenge(challengeId: string): void
  updateChallengeScore(challengeId: string, userId: string, score: number): void
  endChallenge(challengeId: string): Challenge
  getActiveChallenges(userId: string): Challenge[]
}
```

### LeaderboardService
```typescript
interface LeaderboardService {
  getTopUsers(limit: number): LeaderboardUser[]
  getUserRank(userId: string): number
  updateLeaderboard(userId: string, points: number): void
}
```

### AnimationService
```typescript
interface AnimationService {
  playConfetti(element: HTMLElement): void
  playSparkle(element: HTMLElement): void
  animateNumber(from: number, to: number, duration: number): void
  playLevelUpAnimation(): void
  playBadgeUnlockAnimation(badge: Achievement): void
}
```

### SoundService
```typescript
interface SoundService {
  playCoinSound(): void
  playLevelUpSound(): void
  playBadgeUnlockSound(): void
  playSuccessSound(): void
  setVolume(volume: number): void
  mute(): void
  unmute(): void
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Points awarded for marking product as used
*For any* product marked as "Used" before its expiry date, the system should award exactly 10 Eco Points to the user.
**Validates: Requirements 1.1**

### Property 2: Points awarded for adding product
*For any* valid product added with all required fields, the system should award exactly 5 Eco Points to the user.
**Validates: Requirements 1.2**

### Property 3: Bonus points for reminder day usage
*For any* product used on the same day as a configured reminder, the system should award exactly 20 Eco Points to the user.
**Validates: Requirements 1.3**

### Property 4: Streak bonus calculation
*For any* user with a 7-day streak of no product expirations, the system should award exactly 50 Eco Points.
**Validates: Requirements 1.4**

### Property 5: Perfect week bonus
*For any* user with zero expired items for an entire week, the system should award exactly 100 Eco Points.
**Validates: Requirements 1.5**

### Property 6: Level calculation correctness
*For any* Eco Points total, the calculated level should match the defined point ranges: 0-99 (Level 1), 100-499 (Level 2), 500-1499 (Level 3), 1500-2999 (Level 4), 3000+ (Level 5).
**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 7: Progress bar accuracy
*For any* current points and level, the progress bar percentage should equal (points - levelMinPoints) / (levelMaxPoints - levelMinPoints) * 100.
**Validates: Requirements 2.6**

### Property 8: Level badge color consistency
*For any* level, the badge color should consistently match the level's assigned color across all UI components.
**Validates: Requirements 2.7**

### Property 9: Achievement unlock conditions
*For any* achievement, it should only be unlocked when its specific requirement is met (e.g., "First Save" unlocks after first product saved, "Food Saver" after 20 food items saved).
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 10: Statistics calculation accuracy
*For any* set of user actions, the calculated statistics (products saved, money saved, CO₂ saved, streak) should accurately reflect the actual data.
**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 11: Statistics update reactivity
*For any* change in underlying data, all displayed statistics should update to reflect the new values.
**Validates: Requirements 4.5**

### Property 12: Suggestion generation appropriateness
*For any* product expiring in 1-2 days, the generated suggestions should be relevant to the product's category and include at least one suggestion of each type (recipe/usage, donation, storage).
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

### Property 13: Voice reminder text generation
*For any* product, the generated voice reminder text should include the product name, days until expiry, and actionable suggestions.
**Validates: Requirements 6.2, 6.3, 6.4**

### Property 14: Voice settings application
*For any* voice settings (language, gender), the speech synthesis should use the selected voice and language.
**Validates: Requirements 6.5, 6.6**

### Property 15: Mode configuration consistency
*For any* selected mode, all mode-specific configurations (categories, suggestions, labels) should be consistently applied throughout the interface.
**Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.6**

### Property 16: Challenge score tracking
*For any* active challenge, both participants' scores should accurately reflect their saved items during the challenge period.
**Validates: Requirements 8.2**

### Property 17: Leaderboard ranking accuracy
*For any* set of users, the leaderboard rankings should be ordered by Eco Points in descending order with correct rank numbers.
**Validates: Requirements 8.4, 8.5**

### Property 18: Theme persistence
*For any* theme selection (light/dark), the preference should be saved to local storage and restored on next session.
**Validates: Requirements 10.3, 10.4, 10.5**

### Property 19: Authentication data association
*For any* logged-in user, all products, points, achievements, and statistics should be associated with their user ID.
**Validates: Requirements 11.3, 11.6**

### Property 20: Gamification data round-trip
*For any* gamification data (points, level, achievements, statistics, streak), saving to local storage and then loading should produce equivalent data.
**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**

## Error Handling

### Points Calculation Errors
- **Invalid Action**: Log error, do not award points
- **Negative Points**: Prevent negative point values, minimum 0
- **Overflow**: Cap points at reasonable maximum (e.g., 999,999)

### Level Calculation Errors
- **Invalid Points**: Default to Level 1
- **Missing Level Data**: Use fallback level configuration

### Achievement Errors
- **Duplicate Unlock**: Prevent re-unlocking same achievement
- **Invalid Progress**: Reset progress to 0 if corrupted
- **Missing Achievement Data**: Load default achievement set

### Voice Synthesis Errors
- **API Not Available**: Display message "Voice reminders not supported in this browser"
- **Speech Failure**: Catch error, log, show fallback text notification
- **No Voices Available**: Disable voice feature gracefully

### Challenge Errors
- **Invalid Opponent**: Show error "User not found"
- **Expired Challenge**: Auto-complete and declare winner
- **Network Failure**: Queue challenge updates for retry

### Storage Errors
- **Quota Exceeded**: Show warning, suggest clearing old data
- **Corrupted Data**: Reset to defaults, notify user
- **Parse Errors**: Use fallback values, log error

## Testing Strategy

### Unit Testing
The application will use **Vitest** with **React Testing Library**. Unit tests will focus on:

- **Gamification Logic**: Points calculation, level determination, achievement unlocking
- **Statistics Calculations**: Money saved, CO₂ saved, streak tracking
- **Suggestion Generation**: Recipe matching, usage tips, storage advice
- **Voice Text Generation**: Reminder message formatting in multiple languages
- **Challenge Logic**: Score tracking, winner determination
- **Component Rendering**: All new gamification components
- **Theme Switching**: Dark/light mode transitions
- **Authentication Flow**: Login, logout, session management

### Property-Based Testing
The application will use **fast-check** for property-based testing:

- **Configuration**: Each property test will run a minimum of 100 iterations
- **Tagging**: Each test will include a comment: `// Feature: expiry-guard-gamified, Property {number}: {property_text}`
- **Coverage**: Each correctness property will be implemented by a single property-based test

Example property test areas:
- Points calculation works correctly for any valid action
- Level calculation is accurate for any point value
- Achievement unlock conditions work for any user data
- Statistics calculations are accurate for any set of actions
- Suggestion generation produces valid suggestions for any product
- Leaderboard rankings are correct for any user set

## Implementation Details

### Points System

**Point Values:**
```typescript
const POINT_VALUES = {
  MARK_USED_BEFORE_EXPIRY: 10,
  ADD_PRODUCT: 5,
  USE_ON_REMINDER_DAY: 20,
  SEVEN_DAY_STREAK: 50,
  PERFECT_WEEK: 100
}
```

**Level Thresholds:**
```typescript
const LEVELS: Level[] = [
  { number: 1, title: 'Waste Rookie', minPoints: 0, maxPoints: 99, color: '#9CA3AF', icon: '🌱' },
  { number: 2, title: 'Smart Saver', minPoints: 100, maxPoints: 499, color: '#60A5FA', icon: '💡' },
  { number: 3, title: 'Waste Warrior', minPoints: 500, maxPoints: 1499, color: '#34D399', icon: '⚔️' },
  { number: 4, title: 'Expiry Master', minPoints: 1500, maxPoints: 2999, color: '#F59E0B', icon: '👑' },
  { number: 5, title: 'Eco Legend', minPoints: 3000, maxPoints: Infinity, color: '#8B5CF6', icon: '🏆' }
]
```

### Achievement Definitions

```typescript
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-save',
    name: 'First Save',
    description: 'Saved your first product before expiry',
    icon: '🥇',
    category: 'milestone',
    requirement: 1
  },
  {
    id: 'food-saver',
    name: 'Food Saver',
    description: 'Saved 20 food items before expiry',
    icon: '🥗',
    category: 'category',
    requirement: 20
  },
  {
    id: 'medicine-protector',
    name: 'Medicine Protector',
    description: 'Saved 10 medicine items before expiry',
    icon: '💊',
    category: 'category',
    requirement: 10
  },
  {
    id: 'seven-day-streak',
    name: '7 Day Streak',
    description: 'No product expired for 7 consecutive days',
    icon: '🔥',
    category: 'streak',
    requirement: 7
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Used all items before expiring in a week',
    icon: '👑',
    category: 'special',
    requirement: 1
  }
]
```

### Mode Configurations

```typescript
const MODE_CONFIGS: Record<Mode, ModeConfig> = {
  home: {
    mode: 'home',
    displayName: 'Home Mode',
    icon: '🏠',
    categories: ['Food', 'Medicine', 'Household', 'Cosmetic', 'Other'],
    suggestionTypes: ['recipe', 'usage', 'donation', 'storage'],
    dashboardLabels: {
      title: 'My Products',
      addButton: 'Add Product',
      emptyState: 'No products yet. Start tracking your household items!'
    }
  },
  store: {
    mode: 'store',
    displayName: 'Store Mode',
    icon: '🏪',
    categories: ['Groceries', 'Beverages', 'Snacks', 'Dairy', 'Frozen', 'Other'],
    suggestionTypes: ['discount', 'bundle', 'donation', 'storage'],
    dashboardLabels: {
      title: 'Store Inventory',
      addButton: 'Add Stock',
      emptyState: 'No stock items. Start tracking your inventory!'
    }
  },
  restaurant: {
    mode: 'restaurant',
    displayName: 'Restaurant Mode',
    icon: '🍴',
    categories: ['Ingredients', 'Cooked Food', 'Beverages', 'Dairy', 'Meat', 'Vegetables'],
    suggestionTypes: ['recipe', 'menu', 'donation', 'storage'],
    dashboardLabels: {
      title: 'Kitchen Inventory',
      addButton: 'Add Ingredient',
      emptyState: 'No ingredients tracked. Start managing your kitchen!'
    }
  },
  pharmacy: {
    mode: 'pharmacy',
    displayName: 'Pharmacy Mode',
    icon: '💊',
    categories: ['Medicines', 'Supplements', 'Medical Supplies', 'Vaccines', 'Other'],
    suggestionTypes: ['usage', 'donation', 'disposal', 'storage'],
    dashboardLabels: {
      title: 'Pharmacy Stock',
      addButton: 'Add Medicine',
      emptyState: 'No medicines tracked. Start managing your pharmacy!'
    }
  }
}
```

### Statistics Calculations

**Money Saved Estimation:**
```typescript
// Average product values by category
const PRODUCT_VALUES = {
  Food: 50,
  Medicine: 100,
  Household: 75,
  Cosmetic: 150,
  Groceries: 40,
  Beverages: 30,
  Ingredients: 60,
  Other: 50
}

function calculateMoneySaved(productsSaved: Product[]): number {
  return productsSaved.reduce((total, product) => {
    const value = PRODUCT_VALUES[product.category] || 50
    const quantity = product.quantity || 1
    return total + (value * quantity)
  }, 0)
}
```

**CO₂ Saved Estimation:**
```typescript
// Average CO₂ emissions per kg of food waste
const CO2_PER_KG = 2.5 // kg CO₂

// Average weight by category (kg)
const PRODUCT_WEIGHTS = {
  Food: 0.5,
  Groceries: 0.5,
  Ingredients: 0.3,
  Beverages: 0.5,
  Other: 0.2
}

function calculateCO2Saved(productsSaved: Product[]): number {
  return productsSaved.reduce((total, product) => {
    const weight = PRODUCT_WEIGHTS[product.category] || 0.3
    const quantity = product.quantity || 1
    return total + (weight * quantity * CO2_PER_KG)
  }, 0)
}
```

### Suggestion Generation

```typescript
const RECIPE_SUGGESTIONS = {
  'milk': ['Make Paneer', 'Tea/Coffee', 'Smoothie', 'Yogurt'],
  'banana': ['Banana Bread', 'Smoothie', 'Pancakes', 'Ice Cream'],
  'bread': ['French Toast', 'Croutons', 'Bread Pudding', 'Sandwiches'],
  'eggs': ['Omelette', 'Boiled Eggs', 'Fried Rice', 'Baking']
}

const STORAGE_TIPS = {
  'milk': 'Freeze in ice cube trays for 2 months',
  'banana': 'Peel and freeze for smoothies',
  'bread': 'Freeze slices for up to 3 months',
  'vegetables': 'Blanch and freeze for longer storage'
}
```

### Voice Reminder Templates

```typescript
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
```

### Animation & Sound

**Confetti Animation:**
- Use canvas-confetti library
- Trigger on: points earned, level up, badge unlock
- Duration: 2-3 seconds
- Colors: Match theme colors

**Sound Effects:**
- Coin sound: Short "ding" (100ms)
- Level up: Triumphant fanfare (1s)
- Badge unlock: Achievement chime (500ms)
- Success: Positive beep (200ms)

**Number Animation:**
- Use react-spring or framer-motion
- Animate from old value to new value
- Duration: 500ms
- Easing: ease-out

### Dark Mode Implementation

**Color Scheme:**
```css
/* Light Mode */
--bg-primary: #FFFFFF
--bg-secondary: #F3F4F6
--text-primary: #111827
--text-secondary: #6B7280

/* Dark Mode */
--bg-primary: #1F2937
--bg-secondary: #111827
--text-primary: #F9FAFB
--text-secondary: #D1D5DB
```

**Glassmorphism:**
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Local Storage Schema

```typescript
// Key: 'expiryguard_user'
{
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "mode": "home"
  }
}

// Key: 'expiryguard_gamification'
{
  "ecoPoints": 2480,
  "level": {
    "number": 3,
    "title": "Waste Warrior"
  },
  "achievements": [
    {
      "id": "first-save",
      "unlocked": true,
      "unlockedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "statistics": {
    "productsSaved": 23,
    "moneySaved": 850,
    "co2Saved": 4.7,
    "foodItemsSaved": 15,
    "medicineItemsSaved": 3
  },
  "streak": {
    "currentStreak": 5,
    "longestStreak": 12,
    "lastActivityDate": "2024-01-20T00:00:00Z"
  },
  "settings": {
    "theme": "dark",
    "soundEnabled": true,
    "voice": {
      "language": "en",
      "gender": "female"
    }
  }
}
```

## Future Enhancements (Out of Scope for V2)

- Real backend with user authentication
- Real-time multiplayer challenges
- Social sharing of achievements
- Integration with grocery store APIs
- Barcode scanning for quick product entry
- Push notifications via service workers
- Mobile app versions (iOS/Android)
- AI-powered recipe generation
- Community recipe sharing
- Donation platform integration
- Carbon footprint tracking dashboard
- Monthly/yearly reports and insights
