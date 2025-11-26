# ExpiryGuard – Smart Expiry Date Reminder

![ExpiryGuard Logo](https://via.placeholder.com/800x200?text=ExpiryGuard+-+Never+Waste+Food+or+Medicine+Again)

## 🎯 Overview

ExpiryGuard is a single-purpose micro-tool website that helps people track product expiry dates and reminds them before products expire. Reduce waste, save money, and stay safe by never consuming expired products again!

## ✨ Features

### Core Features
- **Add Products**: Track any product with an expiry date (food, medicine, cosmetics, etc.)
- **Automatic Status Calculation**: Visual indicators for Safe (green), Expiring Soon (orange), and Expired (red)
- **Smart Reminders**: Get notified 1, 3, 7 days before expiry or set custom reminder periods
- **Product Dashboard**: View all products with filtering and search capabilities
- **Quick Actions**: Mark as used, edit, or delete products with one click

### Additional Features
- **Local Storage**: All data persists in your browser
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Clean UI**: Minimal, modern design that's easy to use
- **Accessibility**: WCAG AA compliant with keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- npm (v11+)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expiry-guard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174
```

## 📦 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement.

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Test
```bash
npm test
```
Runs the test suite in watch mode.

```bash
npm run test:run
```
Runs the test suite once.

```bash
npm run test:ui
```
Opens the Vitest UI for interactive testing.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality.

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Libraries
- **date-fns** - Date manipulation and formatting
- **uuid** - Unique ID generation

### Testing
- **Vitest** - Unit testing framework
- **@testing-library/react** - React component testing
- **fast-check** - Property-based testing
- **happy-dom** - DOM implementation for testing

## 📁 Project Structure

```
expiry-guard/
├── src/
│   ├── components/          # React components
│   │   ├── AddProductForm.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EditProductForm.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FilterControls.tsx
│   │   ├── HomePage.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── SearchBar.tsx
│   ├── services/            # Business logic
│   │   ├── expiryCalculation.ts
│   │   ├── localStorage.ts
│   │   ├── reminderService.ts
│   │   └── validation.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── __tests__/           # Test files
│   │   └── properties/      # Property-based tests
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .kiro/                   # Kiro spec files
│   └── specs/
│       └── expiry-guard/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Usage Guide

### Adding a Product
1. Click "Add Your First Product" or the floating + button
2. Fill in the product details:
   - Name (required)
   - Category (required)
   - Expiry Date (required)
   - Quantity (optional)
   - Notes (optional)
   - Image URL (optional)
3. Set reminder preferences (optional)
4. Click "Add Product"

### Managing Products
- **Search**: Use the search bar to find products by name
- **Filter**: Filter by status (All, Safe, Expiring Soon, Expired) or category
- **Edit**: Click the ✏️ button to modify product details
- **Delete**: Click the 🗑️ button to remove a product
- **Mark as Used**: Click "Mark as Used" to remove from inventory

### Understanding Status Colors
- 🟢 **Green (Safe)**: More than 7 days until expiry
- 🟠 **Orange (Expiring Soon)**: 1-7 days until expiry
- 🔴 **Red (Expired)**: Product has expired

## 🌐 Deployment

### Deploy to Netlify
1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
```bash
netlify deploy --prod --dir=dist
```

### Deploy to AWS S3
1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your S3 bucket
3. Enable static website hosting
4. Configure CloudFront for CDN (optional)

## 👥 Who Is It For?

- 🏠 **Households**: Track food and medicine expiry dates
- 🏪 **Grocery Stores**: Manage inventory and reduce waste
- 🍽️ **Restaurants & Cafes**: Monitor ingredient freshness
- 💊 **Pharmacies**: Track medicine expiration
- 🏢 **Small Businesses**: Organize product inventory
- 🏨 **Hostels & PGs**: Manage shared supplies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ for reducing waste
- Inspired by the need to prevent food and medicine waste
- Thanks to all contributors and users

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for a sustainable future**
