# Requirements Document - ExpiryGuard Gamified

## Introduction

ExpiryGuard Gamified is an enhanced version of the expiry date tracking tool that transforms waste reduction into an engaging game. Users earn Eco Points, unlock achievements, level up, and compete with friends while managing their products. The system rewards good habits, provides smart suggestions, and makes sustainability fun and rewarding.

## Glossary

- **Eco Points**: Virtual currency earned by users for waste-reducing actions
- **Level**: User's rank based on accumulated Eco Points (Waste Rookie to Eco Legend)
- **Achievement/Badge**: Special rewards unlocked by completing specific milestones
- **Streak**: Consecutive days without any product expiring
- **Mode**: User context (Home, Store, Restaurant, Pharmacy) that customizes the experience
- **Challenge**: Competitive feature where users compete with friends to save more items
- **Leaderboard**: Public ranking of top users by Eco Points
- **Smart Suggestion**: AI-powered recommendations for using products before expiry
- **Voice Reminder**: Audio notification that speaks expiry alerts

## Requirements

### Requirement 1

**User Story:** As a user, I want to earn Eco Points for waste-reducing actions, so that I feel rewarded for managing products responsibly.

#### Acceptance Criteria

1. WHEN a user marks a product as "Used" before expiry, THEN the ExpiryGuard System SHALL award 10 Eco Points
2. WHEN a user adds a new product with all required fields, THEN the ExpiryGuard System SHALL award 5 Eco Points
3. WHEN a user uses an item on the same day as a reminder, THEN the ExpiryGuard System SHALL award 20 Eco Points
4. WHEN a user maintains a 7-day streak without any product expiring, THEN the ExpiryGuard System SHALL award 50 Eco Points
5. WHEN a user has zero expired items for an entire week, THEN the ExpiryGuard System SHALL award 100 Eco Points
6. WHEN Eco Points are awarded, THEN the ExpiryGuard System SHALL display an animated notification showing the points gained
7. WHEN viewing the interface, THEN the ExpiryGuard System SHALL display the current Eco Points total in the top right corner with a star icon

### Requirement 2

**User Story:** As a user, I want to progress through levels based on my Eco Points, so that I can see my growth and feel accomplished.

#### Acceptance Criteria

1. WHEN a user has 0-99 Eco Points, THEN the ExpiryGuard System SHALL assign Level 1 "Waste Rookie"
2. WHEN a user has 100-499 Eco Points, THEN the ExpiryGuard System SHALL assign Level 2 "Smart Saver"
3. WHEN a user has 500-1499 Eco Points, THEN the ExpiryGuard System SHALL assign Level 3 "Waste Warrior"
4. WHEN a user has 1500-2999 Eco Points, THEN the ExpiryGuard System SHALL assign Level 4 "Expiry Master"
5. WHEN a user has 3000+ Eco Points, THEN the ExpiryGuard System SHALL assign Level 5 "Eco Legend"
6. WHEN displaying level information, THEN the ExpiryGuard System SHALL show a progress bar indicating progress to the next level
7. WHEN displaying level information, THEN the ExpiryGuard System SHALL show a badge icon with color coding for the current level
8. WHEN a user levels up, THEN the ExpiryGuard System SHALL display a celebration animation and notification

### Requirement 3

**User Story:** As a user, I want to unlock achievements and badges, so that I can collect rewards and showcase my accomplishments.

#### Acceptance Criteria

1. WHEN a user saves their first product before expiry, THEN the ExpiryGuard System SHALL unlock the "First Save" badge
2. WHEN a user saves 20 food items before expiry, THEN the ExpiryGuard System SHALL unlock the "Food Saver" badge
3. WHEN a user saves 10 medicine items before expiry, THEN the ExpiryGuard System SHALL unlock the "Medicine Protector" badge
4. WHEN a user maintains a 7-day streak without expiration, THEN the ExpiryGuard System SHALL unlock the "7 Day Streak" badge
5. WHEN a user uses all items before expiring in a week, THEN the ExpiryGuard System SHALL unlock the "Perfect Week" badge
6. WHEN viewing achievements, THEN the ExpiryGuard System SHALL display all badges in a beautiful grid layout with locked/unlocked states
7. WHEN a badge is unlocked, THEN the ExpiryGuard System SHALL display a celebration animation with confetti effect

### Requirement 4

**User Story:** As a user, I want to see my waste-saving statistics, so that I can understand my positive impact.

#### Acceptance Criteria

1. WHEN viewing the dashboard, THEN the ExpiryGuard System SHALL display the total number of products saved before expiry
2. WHEN viewing the dashboard, THEN the ExpiryGuard System SHALL calculate and display estimated money saved based on products saved
3. WHEN viewing the dashboard, THEN the ExpiryGuard System SHALL calculate and display estimated CO₂ emissions prevented
4. WHEN viewing the dashboard, THEN the ExpiryGuard System SHALL display the current streak of days without any product expiring
5. WHEN any statistic changes, THEN the ExpiryGuard System SHALL update the display in real-time with smooth animations

### Requirement 5

**User Story:** As a user, I want smart suggestions for products about to expire, so that I can use them creatively instead of wasting them.

#### Acceptance Criteria

1. WHEN a product will expire in 1-2 days, THEN the ExpiryGuard System SHALL display a suggestion card for that product
2. WHEN displaying suggestions for food items, THEN the ExpiryGuard System SHALL provide recipe ideas using that ingredient
3. WHEN displaying suggestions, THEN the ExpiryGuard System SHALL provide usage ideas appropriate for the product category
4. WHEN displaying suggestions, THEN the ExpiryGuard System SHALL provide donation suggestions with nearby options
5. WHEN displaying suggestions, THEN the ExpiryGuard System SHALL provide storage tips to extend shelf life
6. WHEN displaying suggestions, THEN the ExpiryGuard System SHALL show icons and formatting for easy readability

### Requirement 6

**User Story:** As a user, I want voice reminders for expiring products, so that I can receive audio alerts without reading.

#### Acceptance Criteria

1. WHEN viewing a product card for an expiring item, THEN the ExpiryGuard System SHALL display a "Play Reminder" button
2. WHEN a user clicks the "Play Reminder" button, THEN the ExpiryGuard System SHALL use browser speech synthesis to speak the reminder
3. WHEN speaking a reminder, THEN the ExpiryGuard System SHALL include the product name and days until expiry
4. WHEN speaking a reminder, THEN the ExpiryGuard System SHALL suggest actions to avoid waste
5. WHERE voice settings are available, WHEN a user selects voice gender, THEN the ExpiryGuard System SHALL use the selected voice (male/female)
6. WHERE language settings are available, WHEN a user selects language, THEN the ExpiryGuard System SHALL speak in the selected language (English/Hindi)

### Requirement 7

**User Story:** As a user, I want to select a mode that matches my use case, so that the interface is customized for my needs.

#### Acceptance Criteria

1. WHEN a user first accesses the application, THEN the ExpiryGuard System SHALL display a mode selector with four options
2. WHEN a user selects "Home Mode", THEN the ExpiryGuard System SHALL customize categories and suggestions for household items
3. WHEN a user selects "Store Mode", THEN the ExpiryGuard System SHALL customize categories and suggestions for grocery and stock items
4. WHEN a user selects "Restaurant Mode", THEN the ExpiryGuard System SHALL customize categories and suggestions for ingredients and cooked food
5. WHEN a user selects "Pharmacy Mode", THEN the ExpiryGuard System SHALL customize categories and suggestions for medicines and batches
6. WHEN a mode is selected, THEN the ExpiryGuard System SHALL update dashboard labels and default categories accordingly
7. WHEN a user wants to change mode, THEN the ExpiryGuard System SHALL provide an option to switch modes in settings

### Requirement 8

**User Story:** As a user, I want to challenge friends and see leaderboards, so that I can compete and stay motivated.

#### Acceptance Criteria

1. WHEN a user creates a challenge, THEN the ExpiryGuard System SHALL allow them to invite a friend by sharing a challenge link
2. WHEN a challenge is active, THEN the ExpiryGuard System SHALL track both users' saved items for the challenge period
3. WHEN a challenge ends, THEN the ExpiryGuard System SHALL declare a winner and award bonus Eco Points
4. WHEN viewing the leaderboard, THEN the ExpiryGuard System SHALL display the top 5 users by Eco Points
5. WHEN viewing the leaderboard, THEN the ExpiryGuard System SHALL highlight the current user's position
6. WHERE leaderboard is enabled, WHEN the leaderboard updates, THEN the ExpiryGuard System SHALL refresh rankings in real-time

### Requirement 9

**User Story:** As a user, I want engaging animations and sound effects, so that the experience feels rewarding and fun.

#### Acceptance Criteria

1. WHEN Eco Points are awarded, THEN the ExpiryGuard System SHALL display a confetti or spark animation
2. WHEN Eco Points are awarded, THEN the ExpiryGuard System SHALL play a coin sound effect
3. WHEN a user levels up, THEN the ExpiryGuard System SHALL display a celebration animation with level-up sound
4. WHEN a badge is unlocked, THEN the ExpiryGuard System SHALL display a badge reveal animation with unlock sound
5. WHEN statistics update, THEN the ExpiryGuard System SHALL animate the number changes with smooth transitions
6. WHERE sound is enabled, WHEN any reward is earned, THEN the ExpiryGuard System SHALL play appropriate audio feedback

### Requirement 10

**User Story:** As a user, I want a beautiful modern interface with dark mode, so that the app is pleasant to use at any time.

#### Acceptance Criteria

1. WHEN viewing the interface, THEN the ExpiryGuard System SHALL use gradient cards for visual appeal
2. WHEN viewing badges and achievements, THEN the ExpiryGuard System SHALL apply glassmorphism effects
3. WHEN a user toggles dark mode, THEN the ExpiryGuard System SHALL switch to a dark color scheme with appropriate contrast
4. WHEN a user toggles light mode, THEN the ExpiryGuard System SHALL switch to a light color scheme
5. WHEN the theme changes, THEN the ExpiryGuard System SHALL persist the user's preference in local storage
6. WHEN displaying progress bars, THEN the ExpiryGuard System SHALL use animated gradients and smooth transitions

### Requirement 11

**User Story:** As a user, I want to log in and log out, so that my data and progress are secure and personalized.

#### Acceptance Criteria

1. WHEN a new user visits the application, THEN the ExpiryGuard System SHALL display a login/signup screen
2. WHEN a user creates an account, THEN the ExpiryGuard System SHALL store their credentials securely
3. WHEN a user logs in successfully, THEN the ExpiryGuard System SHALL load their personal data, Eco Points, and achievements
4. WHEN a user logs out, THEN the ExpiryGuard System SHALL clear the session and return to the login screen
5. WHEN a user is logged in, THEN the ExpiryGuard System SHALL display their username and profile picture in the navbar
6. WHEN user data is stored, THEN the ExpiryGuard System SHALL associate all products, points, and achievements with the user account

### Requirement 12

**User Story:** As a user, I want my gamification data to persist, so that I don't lose my progress when I close the app.

#### Acceptance Criteria

1. WHEN Eco Points are earned, THEN the ExpiryGuard System SHALL save the updated total to local storage immediately
2. WHEN a level changes, THEN the ExpiryGuard System SHALL save the new level to local storage immediately
3. WHEN a badge is unlocked, THEN the ExpiryGuard System SHALL save the achievement to local storage immediately
4. WHEN statistics update, THEN the ExpiryGuard System SHALL save all counters to local storage immediately
5. WHEN a user reopens the application, THEN the ExpiryGuard System SHALL restore all gamification data from local storage
6. WHEN calculating streaks, THEN the ExpiryGuard System SHALL track the last activity date to maintain accurate streak counts
