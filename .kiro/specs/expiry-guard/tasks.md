# Implementation Plan

- [x] 1. Set up project structure and dependencies



  - Initialize Vite + React + TypeScript project
  - Install and configure Tailwind CSS
  - Install dependencies: date-fns, uuid, fast-check, vitest, @testing-library/react
  - Create folder structure: components/, services/, types/, __tests__/properties/
  - Configure Vitest for testing
  - _Requirements: All_

- [x] 2. Implement core data types and models


  - Create TypeScript interfaces for Product, ProductInput, ProductCategory, ExpiryStatus
  - Create ValidationResult interface
  - Export all types from types/index.ts
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Implement expiry calculation service


  - Create expiryCalculation.ts service
  - Implement calculateDaysRemaining(expiryDate: Date): number
  - Implement calculateStatus(daysRemaining: number): ExpiryStatus
  - Implement getStatusColor(status: ExpiryStatus): string
  - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [ ]* 3.1 Write property test for status calculation
  - **Property 4: Status calculation correctness**
  - **Validates: Requirements 2.1, 2.2, 2.3**

- [ ]* 3.2 Write property test for days remaining calculation
  - **Property 5: Days remaining calculation accuracy**
  - **Validates: Requirements 2.5**

- [ ]* 3.3 Write property test for status recalculation
  - **Property 6: Status recalculation with date changes**
  - **Validates: Requirements 2.4**

- [x] 4. Implement local storage service


  - Create localStorage.ts service
  - Implement saveProducts(products: Product[]): void
  - Implement loadProducts(): Product[]
  - Implement clearProducts(): void
  - Handle corrupted data and parse errors gracefully
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 4.1 Write property test for local storage round-trip
  - **Property 16: Local storage round-trip**
  - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

- [ ]* 4.2 Write unit test for corrupted data handling
  - Test that corrupted local storage data is handled gracefully
  - _Requirements: 6.5_

- [x] 5. Implement validation service


  - Create validation.ts service
  - Implement validateProductInput(input: ProductInput): ValidationResult
  - Implement validateRequiredField(value: string, fieldName: string): string | null
  - Implement validateDate(date: string): string | null
  - Validate optional fields (quantity must be positive if provided)
  - _Requirements: 1.5, 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 5.1 Write property test for required field validation
  - **Property 3: Required field validation prevents submission**
  - **Validates: Requirements 1.5**

- [ ]* 5.2 Write property test for optional field validation
  - **Property 22: Optional field validation**
  - **Validates: Requirements 10.5**

- [ ]* 5.3 Write property test for past date handling
  - **Property 21: Past date handling**
  - **Validates: Requirements 10.4**

- [x] 6. Create ProductCard component


  - Build ProductCard component with props: product, onEdit, onDelete, onMarkAsUsed
  - Display product name, category, expiry date, days remaining, status badge
  - Implement status color coding (green/orange/red)
  - Add action buttons: Edit, Delete, Mark as Used
  - Style with Tailwind CSS (rounded cards, responsive)
  - _Requirements: 4.1, 9.2, 9.5_

- [ ]* 6.1 Write property test for status color consistency
  - **Property 19: Status color consistency**
  - **Validates: Requirements 9.2**

- [ ]* 6.2 Write unit test for ProductCard rendering
  - Test that all product information is displayed
  - Test that action buttons trigger correct callbacks
  - _Requirements: 4.1_



- [x] 7. Create AddProductForm component
  - Build form with inputs: name, category (dropdown), expiry date, quantity, notes, imageUrl
  - Implement form state management with useState
  - Integrate validation service for real-time validation
  - Display validation errors inline
  - Handle form submission with onSubmit callback
  - Add Cancel button with onCancel callback
  - Style with Tailwind CSS (mobile-friendly inputs)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.2_

- [ ]* 7.1 Write property test for product addition
  - **Property 1: Product addition increases inventory**
  - **Validates: Requirements 1.1**

- [ ]* 7.2 Write property test for optional fields preservation
  - **Property 2: Optional fields are preserved**
  - **Validates: Requirements 1.2, 1.3, 1.4**

- [ ]* 7.3 Write unit test for form validation
  - Test that empty required fields show errors
  - Test that form submission is prevented when invalid
  - _Requirements: 1.5_

- [x] 8. Create EditProductForm component
  - Build form similar to AddProductForm but pre-filled with product data
  - Accept product prop to pre-populate fields
  - Implement form state management
  - Integrate validation service
  - Handle form submission with onSubmit callback
  - Style consistently with AddProductForm
  - _Requirements: 5.3, 5.4_

- [ ]* 8.1 Write property test for edit form pre-population
  - **Property 14: Edit form pre-population**
  - **Validates: Requirements 5.3**

- [ ]* 8.2 Write property test for product update persistence
  - **Property 15: Product update persistence**
  - **Validates: Requirements 5.4**

- [x] 9. Create SearchBar component


  - Build search input with icon
  - Implement debounced search (300ms delay)
  - Accept onSearch callback prop
  - Style with Tailwind CSS (rounded, with icon)
  - _Requirements: 4.6_

- [x] 10. Create FilterControls component
  - Build filter UI with status filters (All, Safe, Expiring Soon, Expired)
  - Add category filter dropdown
  - Accept onFilterChange callback prop
  - Highlight active filters
  - Style with Tailwind CSS (button group or tabs)
  - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ]* 10.1 Write property test for status filtering
  - **Property 9: Status filtering correctness**
  - **Validates: Requirements 4.2, 4.3, 4.4**

- [ ]* 10.2 Write property test for category filtering
  - **Property 10: Category filtering correctness**
  - **Validates: Requirements 4.5**

- [ ]* 10.3 Write property test for search functionality
  - **Property 11: Search functionality correctness**
  - **Validates: Requirements 4.6**

- [x] 11. Create Dashboard component
  - Build main dashboard layout with SearchBar, FilterControls, and ProductGrid
  - Implement filtering logic using useMemo
  - Implement search logic (case-insensitive name matching)
  - Display filtered products in grid layout
  - Handle empty states (no products, no search results)
  - Add floating "Add Product" button
  - Wire up all callbacks (onEdit, onDelete, onMarkAsUsed)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2_

- [ ]* 11.1 Write property test for mark as used
  - **Property 12: Mark as used removes product**
  - **Validates: Requirements 5.1**

- [ ]* 11.2 Write property test for delete
  - **Property 13: Delete removes product permanently**
  - **Validates: Requirements 5.2**

- [ ]* 11.3 Write property test for dashboard display
  - **Property 8: Dashboard displays all product information**
  - **Validates: Requirements 4.1**

- [x] 12. Create HomePage component

  - Build HeroSection with headline, subtext, and CTA button
  - Create HowItWorksSection with 3 steps (icons + text)
  - Create WhoIsItForSection with target user list
  - Create BenefitsSection with 4 benefits
  - Create Footer with links
  - Style with Tailwind CSS (centered content, good spacing)
  - Wire up CTA button to navigate to dashboard
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 12.1 Write unit tests for homepage content
  - Test that hero section displays correct headline
  - Test that How It Works section has 3 steps
  - Test that CTA button navigates correctly
  - _Requirements: 7.1, 7.2, 7.5_

- [x] 13. Create Navbar component


  - Build navigation bar with app logo/name
  - Add navigation links (Home, Dashboard)
  - Implement mobile hamburger menu
  - Style with Tailwind CSS (sticky header, responsive)
  - _Requirements: 8.4_

- [x] 14. Implement App component with routing


  - Set up React state for products array
  - Implement useEffect to load products from local storage on mount
  - Create handler functions: addProduct, editProduct, deleteProduct, markAsUsed
  - Implement simple routing (useState for current view: 'home' | 'dashboard' | 'add' | 'edit')
  - Wire up all components with state and handlers
  - Ensure all CRUD operations update local storage immediately
  - _Requirements: 1.1, 5.1, 5.2, 5.4, 6.1, 6.2, 6.3, 6.4_

- [ ]* 14.1 Write property test for action feedback responsiveness
  - **Property 20: Action feedback responsiveness**
  - **Validates: Requirements 9.5**

- [x] 15. Implement responsive design and mobile optimization


  - Add Tailwind responsive breakpoints to all components
  - Ensure single-column layout on mobile (< 768px)
  - Verify touch target sizes (minimum 44x44px)
  - Test on various screen sizes
  - Optimize form inputs for mobile
  - _Requirements: 8.1, 8.2, 8.3_

- [ ]* 15.1 Write property test for responsive layout
  - **Property 17: Responsive layout adaptation**
  - **Validates: Requirements 8.1**

- [ ]* 15.2 Write property test for touch target sizing
  - **Property 18: Touch target sizing**
  - **Validates: Requirements 8.2**

- [x] 16. Implement reminder system (basic version)


  - Add reminderDays field to product form (checkboxes for 1, 3, 7 days + custom input)
  - Create reminder checking logic in useEffect (runs on mount and daily)
  - Implement shouldTriggerReminder(product: Product, currentDate: Date): boolean
  - Log reminders to console (email/browser notifications are future enhancements)
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 16.1 Write property test for reminder timing
  - **Property 7: Custom reminder timing**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

- [x] 17. Add error boundaries and error handling


  - Create ErrorBoundary component
  - Wrap App in ErrorBoundary
  - Add try-catch blocks for local storage operations
  - Display user-friendly error messages
  - Handle image load failures with placeholder
  - _Requirements: 6.5_

- [x] 18. Polish UI and accessibility


  - Add loading states where appropriate
  - Implement focus management (focus first error on validation)
  - Add ARIA labels to icon buttons
  - Ensure keyboard navigation works throughout
  - Test color contrast ratios
  - Add smooth transitions for status changes
  - _Requirements: 9.1, 9.3, 9.4, 9.5_

- [x] 19. Create README and documentation


  - Write README.md with project description
  - Document installation steps (npm install)
  - Document how to run development server (npm run dev)
  - Document how to run tests (npm test)
  - Document how to build for production (npm run build)
  - Add screenshots of the application
  - List technologies used
  - _Requirements: All_

- [x] 20. Final testing and bug fixes



  - Run all unit tests and property tests
  - Manually test all user flows
  - Test on different browsers (Chrome, Firefox, Safari, Edge)
  - Test on mobile devices
  - Fix any discovered bugs
  - Ensure all tests pass
  - _Requirements: All_
