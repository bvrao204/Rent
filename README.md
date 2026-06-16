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

### 2. Premium Image Asset Integration
- **Gemini-Generated Local Assets**: High-resolution, AI-generated images for all appliances are stored locally in the `/public/images/` directory to guarantee instant loading, offline capability, and 100% accurate product representations.
- **User Image Upload Support**: Fully compatible with custom uploaded assets (like our solid oak dining table image).
- **4-Stage Fallback Chain**: Handles image loading robustness with sequential fallbacks on error:
  1. Handpicked direct product mapping (local files or stable Unsplash URLs).
  2. Generic category Unsplash fallback IDs.
  3. Stable, seeded Picsum images.
  4. CSS gradient emoji card placeholder (completely network-independent).
- **CORS Immunity**: Configured without aggressive anonymous restrictions to ensure perfect browser rendering.
- **Glassmorphic Out-of-Stock Overlay**: Out-of-stock items (`stock === 0`) are automatically styled with a dark frosted glass mask and a rotated high-contrast **"OUT OF STOCK"** banner across the image in all lists, detail sheets, and shopping carts.

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
