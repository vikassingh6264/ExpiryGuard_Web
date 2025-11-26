# Implementation Plan - ExpiryGuard Gamified

- [x] 1. Set up gamification infrastructure
  - Install additional dependencies: canvas-confetti, react-spring, howler (for sounds)
  - Create gamification types and interfaces
  - Set up sound assets folder
  - Create animation utilities
  - _Requirements: All_

- [x] 2. Implement Points Service
  - Create pointsService.ts with point calculation logic
  - Implement calculatePoints() for different actions
  - Implement awardPoints() with transaction logging
  - Add point value constants
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 2.1 Write property test for points calculation
  - **Property 1: Points awarded for marking product as used**
  - **Property 2: Points awarded for adding product**
  - **Property 3: Bonus points for reminder day usage**
  - **Validates: Requirements 1.1, 1.2, 1.3**

- [x] 3. Implement Level Service


  - Create levelService.ts with level calculation logic
  - Implement calculateLevel() based on points
  - Implement getNextLevel() and progress calculation
  - Add level configuration constants
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ]* 3.1 Write property test for level calculation
  - **Property 6: Level calculation correctness**
  - **Property 7: Progress bar accuracy**
  - **Validates: Requirements 2.1-2.6**



- [ ] 4. Implement Achievement Service
  - Create achievementService.ts with achievement logic
  - Define all achievement configurations
  - Implement checkAchievements() to evaluate unlock conditions
  - Implement unlockAchievement() with persistence
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x]* 4.1 Write property test for achievement unlocking


  - **Property 9: Achievement unlock conditions**
  - **Validates: Requirements 3.1-3.5**

- [ ] 5. Implement Statistics Service
  - Create statisticsService.ts for calculations
  - Implement calculateMoneySaved() with category-based values
  - Implement calculateCO2Saved() with weight estimates
  - Implement streak tracking logic
  - _Requirements: 4.1, 4.2, 4.3, 4.4_




- [ ]* 5.1 Write property test for statistics calculations
  - **Property 10: Statistics calculation accuracy**
  - **Validates: Requirements 4.1-4.4**

- [ ] 6. Implement Gamification Storage Service
  - Create gamificationStorage.ts for local storage operations
  - Implement saveGamificationData()


  - Implement loadGamificationData()
  - Handle data migration from V1
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 6.1 Write property test for gamification data persistence
  - **Property 20: Gamification data round-trip**
  - **Validates: Requirements 12.1-12.5**

- [ ] 7. Implement Suggestion Service
  - Create suggestionService.ts for smart suggestions


  - Implement generateSuggestions() based on product and mode
  - Add recipe suggestion database
  - Add storage tips database
  - Add donation suggestions
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 7.1 Write property test for suggestion generation
  - **Property 12: Suggestion generation appropriateness**
  - **Validates: Requirements 5.1-5.5**

- [x] 8. Implement Voice Service


  - Create voiceService.ts using Web Speech API
  - Implement speak() with voice settings
  - Implement generateReminderText() for EN and HI
  - Add voice selection logic
  - Handle browser compatibility
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ]* 8.1 Write property test for voice text generation
  - **Property 13: Voice reminder text generation**
  - **Property 14: Voice settings application**
  - **Validates: Requirements 6.2-6.6**

- [ ] 9. Implement Mode Service
  - Create modeService.ts with mode configurations
  - Define all mode configs (home, store, restaurant, pharmacy)
  - Implement getModeConfig()
  - Implement applyModeSettings()
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_



- [ ]* 9.1 Write property test for mode configuration
  - **Property 15: Mode configuration consistency**
  - **Validates: Requirements 7.2-7.6**

- [x] 10. Implement Animation Service
  - Create animationService.ts for visual effects


  - Implement playConfetti() using canvas-confetti
  - Implement playSparkle() effect
  - Implement animateNumber() with react-spring
  - Implement playLevelUpAnimation()
  - Implement playBadgeUnlockAnimation()


  - _Requirements: 9.1, 9.3, 9.4_

- [ ] 11. Implement Sound Service
  - Create soundService.ts using Howler.js
  - Add sound effect files (coin, levelup, badge, success)
  - Implement playCoinSound()


  - Implement playLevelUpSound()
  - Implement playBadgeUnlockSound()
  - Add volume control and mute functionality
  - _Requirements: 9.2, 9.6_

- [ ] 12. Create EcoPointsDisplay component
  - Build component showing points with star icon
  - Add animated counter using react-spring
  - Style with gradient and glassmorphism
  - Add tooltip showing recent point gains
  - _Requirements: 1.7_

- [ ] 13. Create LevelBadge component
  - Build component showing current level
  - Add progress bar to next level
  - Add badge icon with color coding
  - Add level-up animation trigger
  - Style with gradients
  - _Requirements: 2.6, 2.7, 2.8_

- [ ] 14. Create StatsCard component
  - Build reusable card for statistics
  - Add animated number display
  - Add icon and color customization
  - Apply glassmorphism styling
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 15. Create BadgeCard component


  - Build component for individual achievement badge
  - Add locked/unlocked states
  - Add unlock animation
  - Apply glassmorphism effect
  - Add tooltip with description
  - _Requirements: 3.6, 3.7_

- [x] 16. Create AchievementsPage component


  - Build page layout with badge grid
  - Display all achievements with progress
  - Add filter for locked/unlocked
  - Add celebration animations
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 17. Create SuggestionCard component


  - Build card showing smart suggestions
  - Add icons for each suggestion type
  - Add expandable sections
  - Style with colors and borders
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 18. Create VoiceReminderButton component


  - Build play button for voice reminders
  - Integrate with voiceService
  - Add loading/playing states
  - Add voice settings dropdown
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 19. Create ModeSelector component


  - Build mode selection interface
  - Create four mode cards with icons
  - Add descriptions for each mode
  - Add selection animation
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 20. Create NotificationToast component



  - Build toast notification system
  - Add different types (points, levelup, badge)
  - Integrate confetti animation
  - Add auto-dismiss timer
  - Add sound effect triggers
  - _Requirements: 1.6, 2.8, 3.7, 9.1, 9.2_

- [x] 21. Create LoginPage component


  - Build login form with email/password
  - Add form validation
  - Add "Remember me" checkbox
  - Add link to signup page
  - Style with gradients and glassmorphism
  - _Requirements: 11.1, 11.3_

- [x] 22. Create SignupPage component



  - Build signup form with username, email, password
  - Add password strength indicator
  - Add form validation
  - Add mode selection during signup
  - _Requirements: 11.2_

- [x] 23. Implement User Service


  - Create userService.ts for authentication
  - Implement signup() with validation
  - Implement login() with session management
  - Implement logout()
  - Store user data in local storage
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ]* 23.1 Write property test for authentication
  - **Property 19: Authentication data association**
  - **Validates: Requirements 11.3, 11.6**

- [ ] 24. Enhance ProductCard component
  - Add SuggestionCard for expiring products
  - Add VoiceReminderButton
  - Add points indicator on "Mark as Used"
  - Add animation on action completion
  - _Requirements: 1.1, 5.1, 6.1_

- [ ] 25. Enhance Dashboard component
  - Add StatsCards section at top
  - Add quick access to achievements
  - Update filtering for mode-specific categories
  - Add level progress indicator
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.6_

- [ ] 26. Enhance Navbar component
  - Add EcoPointsDisplay in top right
  - Add LevelBadge next to points
  - Add user profile dropdown
  - Add achievements quick view
  - Add logout button
  - _Requirements: 1.7, 2.6, 2.7, 11.4, 11.5_

- [ ] 27. Implement Challenge Service
  - Create challengeService.ts for friend challenges
  - Implement createChallenge()
  - Implement acceptChallenge()
  - Implement updateChallengeScore()
  - Implement endChallenge() with winner logic
  - _Requirements: 8.1, 8.2, 8.3_

- [ ]* 27.1 Write property test for challenge tracking
  - **Property 16: Challenge score tracking**
  - **Validates: Requirements 8.2**

- [ ] 28. Implement Leaderboard Service
  - Create leaderboardService.ts
  - Implement getTopUsers() with dummy data
  - Implement getUserRank()
  - Implement updateLeaderboard()
  - _Requirements: 8.4, 8.5, 8.6_

- [ ]* 28.1 Write property test for leaderboard ranking
  - **Property 17: Leaderboard ranking accuracy**
  - **Validates: Requirements 8.4, 8.5**

- [ ] 29. Create ChallengeCard component
  - Build card showing active challenge
  - Add progress bars for both users
  - Add countdown timer
  - Add winner declaration
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 30. Create LeaderboardPage component
  - Build leaderboard table
  - Display top 5 users with medals
  - Highlight current user
  - Add challenge creation section
  - _Requirements: 8.4, 8.5, 8.6_

- [ ] 31. Implement Theme Service
  - Create themeService.ts for dark/light mode
  - Implement toggleTheme()
  - Implement applyTheme() with CSS variables
  - Persist theme preference
  - _Requirements: 10.3, 10.4, 10.5_

- [ ]* 31.1 Write property test for theme persistence
  - **Property 18: Theme persistence**
  - **Validates: Requirements 10.3, 10.4, 10.5**

- [ ] 32. Create ThemeToggle component
  - Build toggle switch for dark/light mode
  - Add sun/moon icons
  - Add smooth transition animation
  - _Requirements: 10.3, 10.4_

- [ ] 33. Create SettingsPage component
  - Build settings interface
  - Add theme toggle
  - Add voice settings (language, gender)
  - Add sound toggle
  - Add animation toggle
  - Add mode selector
  - _Requirements: 7.7, 10.3, 10.4, 6.5, 6.6_

- [x] 34. Update App component with gamification



  - Add authentication wrapper
  - Add mode selector on first login
  - Integrate points service with product actions
  - Integrate achievement checking
  - Add notification system
  - Track statistics on all actions
  - _Requirements: 1.1, 1.2, 1.3, 3.1-3.5, 4.1-4.4, 11.3_

- [ ] 35. Implement streak tracking logic
  - Add daily check for streak maintenance
  - Award streak bonuses
  - Reset streak on expiration
  - Update last activity date
  - _Requirements: 1.4, 4.4, 12.6_

- [ ]* 35.1 Write property test for streak bonuses
  - **Property 4: Streak bonus calculation**
  - **Property 5: Perfect week bonus**
  - **Validates: Requirements 1.4, 1.5**

- [ ] 36. Add gradient and glassmorphism styles
  - Update Tailwind config with gradient utilities
  - Create glassmorphism CSS classes
  - Apply to badges, cards, and modals
  - Add gradient backgrounds
  - _Requirements: 10.1, 10.2_

- [ ] 37. Implement responsive animations
  - Add entrance animations for components
  - Add hover effects on interactive elements
  - Add loading skeletons
  - Add page transitions
  - _Requirements: 9.1, 9.3, 9.4, 9.5_

- [ ] 38. Add sound effect assets
  - Create or source coin sound effect
  - Create or source level-up sound
  - Create or source badge unlock sound
  - Create or source success sound
  - Optimize file sizes
  - _Requirements: 9.2, 9.6_

- [ ] 39. Implement data migration from V1
  - Create migration utility
  - Convert existing products to new schema
  - Initialize gamification data for existing users
  - Award retroactive points for saved products
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 40. Add onboarding flow
  - Create welcome screen
  - Add mode selection tutorial
  - Add gamification explanation
  - Add interactive walkthrough
  - _Requirements: 7.1, 11.1_

- [ ] 41. Implement perfect week detection
  - Add weekly tracking logic
  - Check for zero expirations
  - Award 100 point bonus
  - Unlock Perfect Week badge
  - _Requirements: 1.5, 3.5_

- [ ] 42. Add accessibility improvements
  - Add ARIA labels to all new components
  - Ensure keyboard navigation works
  - Add screen reader announcements for points
  - Test color contrast in both themes
  - _Requirements: All_

- [ ] 43. Optimize performance
  - Memoize expensive calculations
  - Lazy load achievement images
  - Debounce animation triggers
  - Optimize re-renders
  - _Requirements: All_

- [ ] 44. Update README with gamification features
  - Document new features
  - Add screenshots of gamification UI
  - Update installation instructions
  - Add gamification API documentation
  - _Requirements: All_

- [ ] 45. Final testing and polish
  - Test all gamification flows
  - Test on multiple browsers
  - Test dark/light mode transitions
  - Test voice reminders in different browsers
  - Test animations and sounds
  - Fix any discovered bugs
  - _Requirements: All_
