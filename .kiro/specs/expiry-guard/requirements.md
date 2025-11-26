# Requirements Document

## Introduction

ExpiryGuard is a single-purpose micro-tool website designed to help users track product expiry dates and receive timely reminders before products expire. The system aims to reduce waste and help users manage inventory across various contexts including households, grocery stores, restaurants, pharmacies, and small businesses. The application will track any product with an expiry date including food items, medicines, cosmetics, cleaning products, and beverages.

## Glossary

- **ExpiryGuard System**: The web-based application that manages product expiry tracking and notifications
- **Product**: Any item with an expiry date that needs to be tracked (food, medicine, cosmetics, etc.)
- **Expiry Status**: The calculated state of a product based on days remaining until expiry (Safe, Expiring Soon, or Expired)
- **User**: A person who uses the ExpiryGuard System to track product expiry dates
- **Dashboard**: The main interface displaying all tracked products with their status
- **Reminder**: A notification sent to users before a product expires
- **Local Storage**: Browser-based data persistence mechanism for storing product information

## Requirements

### Requirement 1

**User Story:** As a user, I want to add products with their expiry information, so that I can track when they will expire.

#### Acceptance Criteria

1. WHEN a user submits a product form with name, category, and expiry date, THEN the ExpiryGuard System SHALL create a new product entry and display it in the dashboard
2. WHEN a user provides optional quantity information, THEN the ExpiryGuard System SHALL store the quantity value with the product
3. WHEN a user provides optional notes, THEN the ExpiryGuard System SHALL store the notes with the product
4. WHEN a user uploads a product image, THEN the ExpiryGuard System SHALL store the image reference with the product
5. WHEN a user attempts to submit a product form without required fields (name, category, expiry date), THEN the ExpiryGuard System SHALL prevent submission and display validation errors

### Requirement 2

**User Story:** As a user, I want the system to automatically calculate and display expiry status, so that I can quickly identify which products need attention.

#### Acceptance Criteria

1. WHEN the ExpiryGuard System calculates days remaining for a product with more than 7 days until expiry, THEN the ExpiryGuard System SHALL assign a "Safe" status with green color coding
2. WHEN the ExpiryGuard System calculates days remaining for a product with 7 days or fewer but more than 0 days until expiry, THEN the ExpiryGuard System SHALL assign an "Expiring Soon" status with orange color coding
3. WHEN the ExpiryGuard System calculates days remaining for a product with 0 or negative days until expiry, THEN the ExpiryGuard System SHALL assign an "Expired" status with red color coding
4. WHEN the current date changes, THEN the ExpiryGuard System SHALL recalculate expiry status for all products automatically
5. WHEN displaying a product, THEN the ExpiryGuard System SHALL show the number of days remaining until expiry

### Requirement 3

**User Story:** As a user, I want to configure reminder preferences for each product, so that I receive notifications at appropriate times before expiry.

#### Acceptance Criteria

1. WHEN a user configures a reminder for 1 day before expiry, THEN the ExpiryGuard System SHALL trigger a notification 1 day before the product expires
2. WHEN a user configures a reminder for 3 days before expiry, THEN the ExpiryGuard System SHALL trigger a notification 3 days before the product expires
3. WHEN a user configures a reminder for 7 days before expiry, THEN the ExpiryGuard System SHALL trigger a notification 7 days before the product expires
4. WHEN a user configures a custom reminder period, THEN the ExpiryGuard System SHALL trigger a notification at the specified number of days before expiry
5. WHEN a reminder is triggered, THEN the ExpiryGuard System SHALL send an email notification to the user
6. WHERE browser notifications are supported, WHEN a reminder is triggered, THEN the ExpiryGuard System SHALL display a browser notification

### Requirement 4

**User Story:** As a user, I want to view all my products in an organized dashboard, so that I can manage my inventory effectively.

#### Acceptance Criteria

1. WHEN a user accesses the dashboard, THEN the ExpiryGuard System SHALL display all products with name, category, expiry date, days left, and status
2. WHEN a user applies a filter for "Expiring Soon", THEN the ExpiryGuard System SHALL display only products with "Expiring Soon" status
3. WHEN a user applies a filter for "Expired", THEN the ExpiryGuard System SHALL display only products with "Expired" status
4. WHEN a user applies a filter for "Safe", THEN the ExpiryGuard System SHALL display only products with "Safe" status
5. WHEN a user applies a category filter, THEN the ExpiryGuard System SHALL display only products matching the selected category
6. WHEN a user enters text in the search bar, THEN the ExpiryGuard System SHALL display only products whose names contain the search text

### Requirement 5

**User Story:** As a user, I want to perform quick actions on products, so that I can efficiently manage my inventory.

#### Acceptance Criteria

1. WHEN a user clicks the "Mark as Used" button on a product, THEN the ExpiryGuard System SHALL remove the product from the active inventory
2. WHEN a user clicks the delete button on a product, THEN the ExpiryGuard System SHALL remove the product permanently from storage
3. WHEN a user clicks the edit button on a product, THEN the ExpiryGuard System SHALL display a form pre-filled with the product's current information
4. WHEN a user submits edited product information, THEN the ExpiryGuard System SHALL update the product with the new information and refresh the display

### Requirement 6

**User Story:** As a user, I want my product data to persist across browser sessions, so that I don't lose my tracked items.

#### Acceptance Criteria

1. WHEN a user adds a product, THEN the ExpiryGuard System SHALL store the product data in browser local storage immediately
2. WHEN a user updates a product, THEN the ExpiryGuard System SHALL update the product data in browser local storage immediately
3. WHEN a user deletes a product, THEN the ExpiryGuard System SHALL remove the product data from browser local storage immediately
4. WHEN a user reopens the application, THEN the ExpiryGuard System SHALL load all previously stored products from local storage
5. WHEN local storage data is corrupted or invalid, THEN the ExpiryGuard System SHALL handle the error gracefully and initialize with an empty product list

### Requirement 7

**User Story:** As a new visitor, I want to understand what ExpiryGuard does and how to use it, so that I can quickly start tracking my products.

#### Acceptance Criteria

1. WHEN a user visits the homepage, THEN the ExpiryGuard System SHALL display a hero section with headline "Never Waste Food or Medicine Again" and a clear call-to-action button
2. WHEN a user views the homepage, THEN the ExpiryGuard System SHALL display a "How It Works" section with three steps: Add product, Set expiry date, Get reminder
3. WHEN a user views the homepage, THEN the ExpiryGuard System SHALL display a "Who is it for" section listing target users (Homes, Stores, Restaurants, Medical shops)
4. WHEN a user views the homepage, THEN the ExpiryGuard System SHALL display a "Benefits" section highlighting waste reduction, money savings, safety, and organization
5. WHEN a user clicks the call-to-action button, THEN the ExpiryGuard System SHALL navigate to the product addition interface

### Requirement 8

**User Story:** As a user, I want the application to work well on mobile devices, so that I can track products on the go.

#### Acceptance Criteria

1. WHEN a user accesses the ExpiryGuard System on a mobile device, THEN the ExpiryGuard System SHALL display a responsive layout optimized for the screen size
2. WHEN a user interacts with forms on a mobile device, THEN the ExpiryGuard System SHALL provide touch-friendly input controls with appropriate sizing
3. WHEN a user views the dashboard on a mobile device, THEN the ExpiryGuard System SHALL display product cards in a single-column layout that fits the screen width
4. WHEN a user navigates the application on a mobile device, THEN the ExpiryGuard System SHALL provide a mobile-optimized navigation menu

### Requirement 9

**User Story:** As a user, I want a clean and intuitive interface, so that I can use the application without confusion.

#### Acceptance Criteria

1. WHEN a user views any interface element, THEN the ExpiryGuard System SHALL use a minimal, clean, and modern design aesthetic
2. WHEN a user views product status indicators, THEN the ExpiryGuard System SHALL use consistent color coding (green for Safe, orange for Expiring Soon, red for Expired)
3. WHEN a user interacts with buttons and cards, THEN the ExpiryGuard System SHALL display rounded corners and appropriate visual feedback
4. WHEN a user views the interface, THEN the ExpiryGuard System SHALL use clear typography and adequate spacing for readability
5. WHEN a user performs an action, THEN the ExpiryGuard System SHALL provide immediate visual feedback confirming the action

### Requirement 10

**User Story:** As a user, I want form validation to prevent errors, so that I can ensure data quality in my product tracking.

#### Acceptance Criteria

1. WHEN a user attempts to submit a form with an empty product name, THEN the ExpiryGuard System SHALL display an error message and prevent submission
2. WHEN a user attempts to submit a form without selecting a category, THEN the ExpiryGuard System SHALL display an error message and prevent submission
3. WHEN a user attempts to submit a form without an expiry date, THEN the ExpiryGuard System SHALL display an error message and prevent submission
4. WHEN a user enters an expiry date in the past during product creation, THEN the ExpiryGuard System SHALL accept the date and mark the product as expired
5. WHEN a user enters invalid data in optional fields, THEN the ExpiryGuard System SHALL display appropriate validation messages
