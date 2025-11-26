# Design Document

## Overview

ExpiryGuard is a React-based single-page application (SPA) that provides expiry date tracking and reminder functionality. The application follows a component-based architecture with local storage for data persistence in Version 1. The system uses React with Vite for fast development, Tailwind CSS for styling, and implements a clean separation between UI components, business logic, and data management.

The application is designed to be mobile-first, accessible, and intuitive for non-technical users. It provides real-time expiry status calculation, filtering capabilities, and a clean dashboard interface for managing products.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Presentation Layer                       │  │  │
│  │  │  - React Components (UI)                        │  │  │
│  │  │  - Tailwind CSS Styling                         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Business Logic Layer                     │  │  │
│  │  │  - Expiry Calculation                           │  │  │
│  │  │  - Validation Logic                             │  │  │
│  │  │  - Filtering & Search                           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Data Management Layer                    │  │  │
│  │  │  - State Management (React Hooks)               │  │  │
│  │  │  - Local Storage Service                        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Browser Local Storage                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Structure

```
App
├── HomePage
│   ├── HeroSection
│   ├── HowItWorksSection
│   ├── WhoIsItForSection
│   ├── BenefitsSection
│   └── Footer
├── Dashboard
│   ├── Navbar
│   ├── SearchBar
│   ├── FilterControls
│   ├── ProductGrid
│   │   └── ProductCard (multiple)
│   └── AddProductButton
├── AddProductForm
└── EditProductForm
```

## Components and Interfaces

### Core Components

#### 1. App Component
- **Purpose**: Root component managing routing and global state
- **State**: Products array, current view
- **Props**: None
- **Key Methods**: 
  - `loadProducts()`: Load products from local storage on mount
  - `handleViewChange(view)`: Navigate between views

#### 2. HomePage Component
- **Purpose**: Landing page with marketing content and CTA
- **Props**: `onGetStarted: () => void`
- **Sections**: Hero, How It Works, Who Is It For, Benefits, Footer

#### 3. Dashboard Component
- **Purpose**: Main interface for viewing and managing products
- **Props**: 
  - `products: Product[]`
  - `onAddProduct: (product: Product) => void`
  - `onEditProduct: (id: string, product: Product) => void`
  - `onDeleteProduct: (id: string) => void`
  - `onMarkAsUsed: (id: string) => void`
- **State**: 
  - `searchQuery: string`
  - `statusFilter: 'all' | 'safe' | 'expiring-soon' | 'expired'`
  - `categoryFilter: string`

#### 4. ProductCard Component
- **Purpose**: Display individual product with status and actions
- **Props**:
  - `product: Product`
  - `onEdit: () => void`
  - `onDelete: () => void`
  - `onMarkAsUsed: () => void`
- **Visual Elements**: Status badge, days remaining, action buttons

#### 5. AddProductForm Component
- **Purpose**: Form for adding new products
- **Props**: `onSubmit: (product: ProductInput) => void`, `onCancel: () => void`
- **State**: Form fields, validation errors
- **Validation**: Required fields, date validation

#### 6. EditProductForm Component
- **Purpose**: Form for editing existing products
- **Props**: 
  - `product: Product`
  - `onSubmit: (product: ProductInput) => void`
  - `onCancel: () => void`
- **State**: Form fields, validation errors

### Service Interfaces

#### LocalStorageService
```typescript
interface LocalStorageService {
  saveProducts(products: Product[]): void
  loadProducts(): Product[]
  clearProducts(): void
}
```

#### ExpiryCalculationService
```typescript
interface ExpiryCalculationService {
  calculateDaysRemaining(expiryDate: Date): number
  calculateStatus(daysRemaining: number): ExpiryStatus
  getStatusColor(status: ExpiryStatus): string
}
```

#### ValidationService
```typescript
interface ValidationService {
  validateProductInput(input: ProductInput): ValidationResult
  validateRequiredField(value: string, fieldName: string): string | null
  validateDate(date: string): string | null
}
```

## Data Models

### Product
```typescript
interface Product {
  id: string                    // UUID
  name: string                  // Required, non-empty
  category: ProductCategory     // Required
  expiryDate: Date             // Required
  quantity?: number            // Optional
  notes?: string               // Optional
  imageUrl?: string            // Optional
  reminderDays?: number[]      // Optional, e.g., [1, 3, 7]
  createdAt: Date              // Auto-generated
  updatedAt: Date              // Auto-updated
}
```

### ProductCategory
```typescript
type ProductCategory = 
  | 'Food'
  | 'Medicine'
  | 'Household'
  | 'Cosmetic'
  | 'Other'
```

### ExpiryStatus
```typescript
type ExpiryStatus = 
  | 'safe'           // > 7 days remaining
  | 'expiring-soon'  // 1-7 days remaining
  | 'expired'        // <= 0 days remaining
```

### ProductInput
```typescript
interface ProductInput {
  name: string
  category: ProductCategory
  expiryDate: string           // ISO date string
  quantity?: number
  notes?: string
  imageUrl?: string
  reminderDays?: number[]
}
```

### ValidationResult
```typescript
interface ValidationResult {
  isValid: boolean
  errors: {
    [fieldName: string]: string
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Product addition increases inventory
*For any* valid product input (with name, category, and expiry date), adding the product to the system should result in the product list growing by one and the new product being present in the list.
**Validates: Requirements 1.1**

### Property 2: Optional fields are preserved
*For any* product with optional fields (quantity, notes, imageUrl), adding the product and then retrieving it should return a product with all optional fields matching the original values.
**Validates: Requirements 1.2, 1.3, 1.4**

### Property 3: Required field validation prevents submission
*For any* product input missing one or more required fields (name, category, or expiry date), attempting to submit the form should prevent submission and display validation errors for the missing fields.
**Validates: Requirements 1.5**

### Property 4: Status calculation correctness
*For any* expiry date, the calculated status should be "safe" when more than 7 days remain, "expiring-soon" when 1-7 days remain, and "expired" when 0 or fewer days remain.
**Validates: Requirements 2.1, 2.2, 2.3**

### Property 5: Days remaining calculation accuracy
*For any* expiry date, the calculated days remaining should equal the difference between the expiry date and the current date.
**Validates: Requirements 2.5**

### Property 6: Status recalculation with date changes
*For any* product and any two different current dates, calculating the status with each date should produce results consistent with the days remaining on each date.
**Validates: Requirements 2.4**

### Property 7: Custom reminder timing
*For any* product with a custom reminder period of N days, the reminder should trigger when the days remaining equals N.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

### Property 8: Dashboard displays all product information
*For any* product, the dashboard rendering should include the product's name, category, expiry date, days left, and status.
**Validates: Requirements 4.1**

### Property 9: Status filtering correctness
*For any* collection of products and any status filter (safe, expiring-soon, expired), applying the filter should return only products matching that status.
**Validates: Requirements 4.2, 4.3, 4.4**

### Property 10: Category filtering correctness
*For any* collection of products and any category, applying the category filter should return only products with that category.
**Validates: Requirements 4.5**

### Property 11: Search functionality correctness
*For any* collection of products and any search query, the search results should include only products whose names contain the search query (case-insensitive).
**Validates: Requirements 4.6**

### Property 12: Mark as used removes product
*For any* product in the inventory, marking it as used should result in the product no longer appearing in the active inventory.
**Validates: Requirements 5.1**

### Property 13: Delete removes product permanently
*For any* product in the inventory, deleting it should result in the product being removed from both the active list and storage.
**Validates: Requirements 5.2**

### Property 14: Edit form pre-population
*For any* product, opening the edit form should display a form with all fields pre-filled with the product's current values.
**Validates: Requirements 5.3**

### Property 15: Product update persistence
*For any* product and any valid updated values, submitting the edit form should result in the product having the new values in both the display and storage.
**Validates: Requirements 5.4**

### Property 16: Local storage round-trip
*For any* collection of products, saving them to local storage and then loading them should result in an equivalent collection of products with all data preserved.
**Validates: Requirements 6.1, 6.2, 6.3, 6.4**

### Property 17: Responsive layout adaptation
*For any* viewport width, the layout should adapt appropriately with mobile layouts (single column) for widths below 768px and desktop layouts for larger widths.
**Validates: Requirements 8.1**

### Property 18: Touch target sizing
*For any* interactive element (button, input, link), the element should have a minimum touch target size of 44x44 pixels on mobile viewports.
**Validates: Requirements 8.2**

### Property 19: Status color consistency
*For any* product status, the color coding should always be green for "safe", orange for "expiring-soon", and red for "expired".
**Validates: Requirements 9.2**

### Property 20: Action feedback responsiveness
*For any* user action (add, edit, delete, mark as used), the UI should update immediately to reflect the state change.
**Validates: Requirements 9.5**

### Property 21: Past date handling
*For any* expiry date in the past, the product should be accepted during creation and immediately assigned an "expired" status.
**Validates: Requirements 10.4**

### Property 22: Optional field validation
*For any* invalid data in optional fields (e.g., negative quantity), the validation should display appropriate error messages.
**Validates: Requirements 10.5**

## Error Handling

### Input Validation Errors
- **Missing Required Fields**: Display inline error messages below each missing field
- **Invalid Date Format**: Show error message "Please enter a valid date"
- **Invalid Quantity**: Show error message "Quantity must be a positive number"
- **Form Submission**: Prevent submission and focus on first invalid field

### Storage Errors
- **Local Storage Full**: Display toast notification "Storage limit reached. Please delete some products."
- **Corrupted Data**: Log error to console, clear corrupted data, initialize with empty array
- **Parse Errors**: Catch JSON parse errors, return empty array as fallback

### Runtime Errors
- **Image Load Failure**: Display placeholder image instead of broken image
- **Date Calculation Errors**: Use fallback values (0 days remaining, expired status)
- **Unexpected Errors**: Display user-friendly error message "Something went wrong. Please refresh the page."

### Error Boundaries
- Implement React Error Boundary component to catch rendering errors
- Display fallback UI with option to reload application
- Log errors for debugging purposes

## Testing Strategy

### Unit Testing
The application will use **Vitest** as the testing framework with **React Testing Library** for component testing. Unit tests will focus on:

- **Component Rendering**: Verify components render correctly with various props
- **User Interactions**: Test button clicks, form submissions, and input changes
- **Edge Cases**: Empty states, error states, boundary conditions
- **Integration Points**: Component interactions and data flow

Example unit test areas:
- ProductCard renders with correct status colors
- AddProductForm validates required fields
- Dashboard filters products correctly
- LocalStorageService handles corrupted data gracefully

### Property-Based Testing
The application will use **fast-check** for property-based testing. Property tests will verify universal properties across randomly generated inputs:

- **Configuration**: Each property test will run a minimum of 100 iterations
- **Tagging**: Each test will include a comment referencing the design document property
- **Format**: `// Feature: expiry-guard, Property {number}: {property_text}`
- **Coverage**: Each correctness property will be implemented by a single property-based test

Example property test areas:
- Status calculation works correctly for any date
- Filtering returns only matching products for any filter criteria
- Local storage round-trip preserves all data for any product collection
- Search functionality works for any search query and product set

### Test Organization
```
src/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductCard.test.tsx
│   ├── AddProductForm.tsx
│   ├── AddProductForm.test.tsx
│   └── ...
├── services/
│   ├── expiryCalculation.ts
│   ├── expiryCalculation.test.ts
│   ├── localStorage.ts
│   ├── localStorage.test.ts
│   └── ...
└── __tests__/
    └── properties/
        ├── expiryCalculation.property.test.ts
        ├── filtering.property.test.ts
        ├── localStorage.property.test.ts
        └── ...
```

## Implementation Details

### State Management
- Use React's built-in `useState` and `useEffect` hooks for local component state
- Lift shared state (products array) to App component
- Pass state and updater functions via props (prop drilling acceptable for small app)
- Consider Context API if prop drilling becomes unwieldy

### Local Storage Schema
```typescript
// Key: 'expiryguard_products'
// Value: JSON stringified array of Product objects
{
  "products": [
    {
      "id": "uuid-v4",
      "name": "Milk",
      "category": "Food",
      "expiryDate": "2024-12-01T00:00:00.000Z",
      "quantity": 2,
      "notes": "Organic whole milk",
      "imageUrl": null,
      "reminderDays": [1, 3],
      "createdAt": "2024-11-20T10:30:00.000Z",
      "updatedAt": "2024-11-20T10:30:00.000Z"
    }
  ]
}
```

### Date Handling
- Store dates as ISO 8601 strings in local storage
- Convert to Date objects for calculations
- Use `date-fns` library for date manipulation and formatting
- Always calculate days remaining based on start of day (midnight) comparison

### Styling Approach
- Use Tailwind CSS utility classes for all styling
- Define custom colors in `tailwind.config.js`:
  - Safe: `green-500`
  - Expiring Soon: `orange-500`
  - Expired: `red-500`
- Use responsive breakpoints: `sm:`, `md:`, `lg:`
- Implement dark mode support using Tailwind's `dark:` variant (optional for v1)

### Performance Considerations
- Memoize filtered/searched product lists using `useMemo`
- Debounce search input to avoid excessive re-renders
- Lazy load images with loading="lazy" attribute
- Keep local storage operations synchronous (acceptable for small datasets)

### Accessibility
- Use semantic HTML elements (`<button>`, `<form>`, `<nav>`)
- Include ARIA labels for icon-only buttons
- Ensure keyboard navigation works for all interactive elements
- Maintain color contrast ratios (WCAG AA standard)
- Provide focus indicators for all focusable elements

### Browser Compatibility
- Target modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Use ES6+ features (supported by Vite's default config)
- Polyfills not required for target browsers
- Test local storage availability and handle gracefully if unavailable

## Future Enhancements (Out of Scope for V1)

- User authentication and cloud storage
- QR/Barcode scanning for product entry
- Export to Excel/CSV functionality
- Multi-language support
- Dark mode toggle
- Push notifications via service workers
- Batch operations (delete multiple, bulk edit)
- Product templates for frequently added items
- Analytics dashboard (waste reduction metrics)
- Sharing lists with family/team members
