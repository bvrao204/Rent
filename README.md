# 🛋️ RentEase — Premium Furniture & Appliance Rental Platform

RentEase is a modern, state-of-the-art responsive single-page web application designed for renting premium furniture and household appliances on a flexible monthly budget. Built with **React**, **Vite**, and styled entirely with custom **Vanilla CSS**, the platform delivers a fast, beautiful, and fluid user experience optimized for Indian urban renters.

---

## ✨ Key Features

### 1. Catalog & Inventory System
- **14 Seeded Products**: Categorized under premium designer furniture (beds, sofas, dining tables) and smart appliances (refrigerators, top and front load washing machines, TVs, convection microwaves, split ACs, RO purifiers, and storage geysers).
- **Flexible Tenure Pricing**: Dynamically adjusts the monthly rent based on lease duration:
  - **12+ Months**: Base rent (lowest)
  - **6 Months**: Base rent + 20%
  - **3 Months**: Base rent + 40%
- **Stock Tracking**: Dynamic quantity display (e.g., "Only 2 Left") and clear stock visibility tags.

### 2. Hand-Picked Image Assets
- **Curated Premium Imagery**: Carefully selected, high-resolution product photography that complements the high-end, designer feel of the platform.
- **Accurate Representation**: Every piece of furniture (such as solid oak dining tables and modern sofas) and smart appliance has been individually matched to represent its specific configurations and dimensions.
- **Optimized Performance & Scaling**: Tailored aspect ratios and lightweight configurations ensure swift loading times, crisp display, and responsive grids across all mobile and desktop layouts.
- **Visual Consistency**: Standardized backgrounds and lighting styles across images deliver a clean, professional, and unified digital storefront experience.

### 3. Customer & Admin Portals
- **Interactive Renter Dashboard**:
    - Track active leases and remaining tenure duration.
    - Extend rental duration or schedule return pick-ups.
    - Submit maintenance support tickets (with issue descriptions).
- **Comprehensive Admin Console**:
    - Real-time KPI dashboard tracking total active renters, product utilization, monthly recurring revenue (MRR), and open tickets.
    - Product manager to add, edit, or delete inventory.
    - Delivery planner to schedule arrivals and check-ins.
    - Support ticket resolver to dispatch mechanics (simulated) and resolve customer issues.

---

## 🛠️ Technology Stack
- **Framework**: React (Vite environment)
- **Styling**: Vanilla CSS (Premium Slate/Indigo/Teal palette, glassmorphic filters, and micro-animations)
- **Icons**: Lucide React
- **Data Persistence**: `localStorage` (Mock database for users, products, orders, tickets, and locations)

---

## 💻 Frontend Implementation Details

### 1. Single Page Application (SPA) Routing & Architecture
- **State-Based Routing**: Configured inside [App.jsx](file:///d:/farw/Rent/src/App.jsx) via reactive state variables (`currentView` and `viewParams`). It bypasses full-page reloads to deliver instant, smooth views.
- **Vite Integration**: Provides fast hot module reloading (HMR) and optimized client-side roll-up builds.

### 2. Global State Management (Context API)
- **Session Auth Management**: [AuthContext.jsx](file:///d:/farw/Rent/src/context/AuthContext.jsx) manages customer and administrator login states, registration flows, and user profiles.
- **Inventory & Transaction Context**: [DataContext.jsx](file:///d:/farw/Rent/src/context/DataContext.jsx) holds the central mock databases and provides handlers for cart transactions, product creation, support tickets, and location coverage.
- **Automatic Browser Database Sync**: Leverages `useEffect` state triggers to write data dynamically to `localStorage`, enabling persistency across browser page refreshes.

### 3. Custom Vanilla CSS Styling
- **Design Tokens**: Standardized CSS variables inside [index.css](file:///d:/farw/Rent/src/index.css) define the premium dark/light mode palette (Slate, Indigo, Teal) and typography (Outfit and Inter).
- **Glassmorphic Cards**: Panels use backdrops (`backdrop-filter: blur(16px)`) with thin borders and soft box-shadows.
- **Hover & Spinner Keyframes**: Interactive micro-animations for card lifting, button clicks, and loader spinners (`piSpin`).

### 4. Advanced Frontend Features
- **Dynamic Fallback Image Chains**: [ProductImage.jsx](file:///d:/farw/Rent/src/components/ProductImage.jsx) maps direct Gemini-generated local assets first, and handles network failovers cleanly with sequential fallbacks.
- **Out-of-Stock Overlay**: Automatically renders a dark glassmorphic mask with a tilted `-5deg` red "OUT OF STOCK" stamp on any card when a product's stock is zero.
- **Real-Time Client-Side Aggregation**: Computes key operational statistics (such as Monthly Recurring Revenue, product utilization, and active renters) client-side in real-time.

---

## 📂 Project Directory Structure

```text
Rent/
├── public/                 # Static assets (Favicons, SVG icons)
│   └── images/             # Gemini-generated product PNG assets
├── src/
│   ├── assets/             # Global graphics (hero image, Vite/React SVGs)
│   ├── components/         # Shared React UI components
│   │   ├── Navbar.jsx      # Navigation drawer, theme toggler, and cart counter
│   │   ├── Footer.jsx      # Bottom site directory and service guarantees
│   │   └── ProductImage.jsx# Direct-mapped fallback image component with stock overlays
│   ├── context/            # Shared Context APIs (Simulated Database)
│   │   ├── AuthContext.jsx # Customer & Admin user sessions and login states
│   │   └── DataContext.jsx # Products, orders, tickets, and metrics calculation
│   ├── views/              # Full page views
│   │   ├── HomeView.jsx    # Hero section, city highlights, testimonials
│   │   ├── CatalogView.jsx # Search, sidebar category filters, slider range
│   │   ├── ProductDetailView.jsx # Dynamic spec sheets, tenure calculations
│   │   ├── CartView.jsx    # Item editor, checkout scheduler, payment sandbox
│   │   ├── UserDashboard.jsx # Lease details, returns, maintenance tickets
│   │   └── AdminDashboard.jsx # Real-time MRR analytics, inventory editor
│   ├── App.jsx             # Main Router, theme states, and data version cleaner
│   ├── main.jsx            # Entry mount point
│   └── index.css           # Global custom theme tokens and transition properties
├── index.html              # HTML shell linking Outfit & Inter fonts
├── vite.config.js          # Vite configuration
└── package.json            # Scripts & project dependencies
```

---

## 🚀 How to Run Locally

Follow these simple steps to run the platform on your local machine:

### 1. Clone & Navigate to Folder
```bash
git clone https://github.com/bvrao204/Rent.git
cd Rent
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot up and display the active local URL (usually **`http://localhost:5173/`**). Open it in your web browser.

### 4. Build for Production
To package the app into a production bundle inside the `/dist` directory:
```bash
npm run build
```

---

## 📝 Demo Login Credentials
- **Customer Account**: `user@example.com` (Password: `password`)
- **Administrator Account**: `admin@rentease.com` (Password: `admin`)
