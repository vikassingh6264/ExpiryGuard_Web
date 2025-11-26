# 🛡️ ExpiryGuard - Gamified Expiry Tracking System

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-cyan.svg)](https://tailwindcss.com/)

A modern, gamified web application for tracking product expiry dates with an engaging reward system. Never waste food, medicine, or household items again!

## ✨ Features

### 🎮 Gamification System
- **Eco Points**: Earn points for every waste-reducing action
- **5 Levels**: Progress from "Waste Rookie" to "Eco Legend"
- **Achievements**: Unlock 5+ badges for milestones
- **Streaks**: Maintain daily streaks for bonus points
- **Statistics**: Track money saved, CO₂ reduced, and products saved

### 📦 Product Management
- Add products with expiry dates, categories, and quantities
- Smart filtering by status (Safe, Expiring Soon, Expired)
- Search functionality
- Edit and delete products
- Mark products as used before expiry

### 🔔 Smart Reminders
- Customizable reminder days (1, 3, 7 days or custom)
- Voice reminders with text-to-speech
- Smart suggestions for expiring products
- Recipe ideas and storage tips

### 👤 User Authentication
- Secure login/signup system
- User profiles with avatars
- Session persistence
- Multiple user support

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Responsive mobile-first layout
- Smooth animations and transitions
- Confetti celebrations for achievements
- Dark mode ready

### 🏪 Multiple Modes
- **Home Mode**: For households
- **Store Mode**: For grocery stores
- **Restaurant Mode**: For kitchens
- **Pharmacy Mode**: For medical shops

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vikassingh6264/ExpiryGuard_Web.git

# Navigate to project directory
cd ExpiryGuard_Web

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

1. **Sign Up**: Create an account and choose your mode
2. **Add Products**: Enter product details with expiry dates
3. **Earn Points**: Get +5 points for adding, +10 for using before expiry
4. **Level Up**: Reach 100 points to become a "Smart Saver"
5. **Unlock Badges**: Complete challenges to earn achievements
6. **Track Impact**: See your money saved and CO₂ reduced

## 🏗️ Project Structure

```
expiry-guard/
├── .kiro/                    # Spec-driven development docs
│   └── specs/
│       ├── expiry-guard/     # Base feature specs
│       └── expiry-guard-gamified/  # Gamification specs
├── src/
│   ├── components/           # React components
│   │   ├── AchievementsPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── ...
│   ├── services/            # Business logic
│   │   ├── achievementService.ts
│   │   ├── levelService.ts
│   │   ├── pointsService.ts
│   │   ├── userService.ts
│   │   └── ...
│   ├── types/               # TypeScript types
│   │   ├── index.ts
│   │   └── gamification.ts
│   └── utils/               # Utilities
│       └── animations.ts
├── public/                  # Static assets
└── package.json
```

## 🎯 Gamification System

### Points System
| Action | Points |
|--------|--------|
| Add Product | +5 |
| Mark as Used (before expiry) | +10 |
| Use on Reminder Day | +20 |
| 7-Day Streak | +50 |
| Perfect Week | +100 |

### Levels
1. **Waste Rookie** (0-99 points) 🌱
2. **Smart Saver** (100-499 points) 💡
3. **Waste Warrior** (500-1499 points) ⚔️
4. **Expiry Master** (1500-2999 points) 👑
5. **Eco Legend** (3000+ points) 🏆

### Achievements
- 🥇 **First Save**: Save your first product
- 🥗 **Food Saver**: Save 20 food items
- 💊 **Medicine Protector**: Save 10 medicines
- 🔥 **7 Day Streak**: No expiration for 7 days
- 👑 **Perfect Week**: Use all items before expiring

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + TypeScript
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Animations**: canvas-confetti, react-spring
- **Audio**: Howler.js
- **Testing**: Vitest, fast-check (PBT)
- **Date Handling**: date-fns
- **Storage**: LocalStorage (browser-based)

## 📊 Statistics Tracking

The app calculates:
- **Products Saved**: Count of items used before expiry
- **Money Saved**: Estimated value based on category
- **CO₂ Saved**: Environmental impact in kg
- **Current Streak**: Consecutive days without waste

## 🎨 Design Philosophy

Built using **Spec-Driven Development** methodology:
1. **Requirements**: EARS-compliant acceptance criteria
2. **Design**: Comprehensive architecture and correctness properties
3. **Implementation**: Task-based incremental development
4. **Testing**: Property-based testing for correctness

All specs are included in the `.kiro/specs/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vikas Singh**
- GitHub: [@vikassingh6264](https://github.com/vikassingh6264)

## 🙏 Acknowledgments

- Built with ❤️ using React and TypeScript
- Gamification inspired by sustainability goals
- UI/UX designed for maximum engagement

---

**Start your journey to zero waste today! 🌱**
