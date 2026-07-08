# 🛋️ RentEase — Furniture & Appliance Rental Platform

**Project Submission for: Unified Mentor / Rent Mojo**

RentEase is a modern, state-of-the-art responsive single-page web application designed for renting premium furniture and household appliances on a flexible monthly budget. Students and working professionals frequently relocate for education or jobs and prefer renting furniture and appliances instead of purchasing them due to high costs, maintenance issues, and relocation challenges. This platform provides a monthly rental solution offering flexibility, affordability, and convenience.

---

## 🎯 Problem Statement
Current challenges faced by renters in urban environments:
- High upfront cost of buying furniture/appliances
- Difficulty in transporting items during relocation
- Lack of flexible rental plans
- Limited local rental options
- Poor maintenance and support services

## 🚀 Objectives
**Primary Objectives:**
- Provide affordable monthly rental options.
- Offer flexible tenure plans.
- Simplify furniture & appliance access for renters.
- Improve urban living convenience.

**Secondary Objectives:**
- Reduce unnecessary purchases.
- Promote sustainable consumption.
- Enable easy relocation support.
- Create a scalable rental ecosystem.

---

## 📋 Scope of Work
**In-Scope:**
- Web-based responsive platform
- Product catalog for furniture & appliances
- Monthly rental plans
- Delivery and pickup scheduling

**Out of Scope:**
- Native mobile applications
- Cross-border rentals
- Advanced AI-based pricing
- Second-hand resale marketplace

---

## ✨ Key Features & Functional Requirements

### User Features
- **User registration & login**: Secure authentication for renters.
- **Browse products by category**:
  - Furniture (bed, sofa, table)
  - Appliances (fridge, washing machine, TV, AC, microwave, geyser, water purifier)
- **View product details**: See the exact rental price, security deposit, and dynamic rental tenure options (3, 6, 12+ months).
- **Add to cart & checkout**: Simple workflow to review cart and choose delivery date and location.
- **Manage active rentals & history**: Dedicated User Dashboard to track current leases and past orders.
- **Request maintenance support**: Submit support tickets directly from the dashboard.

### Admin Features
- **Add & manage product inventory**: Full CRUD capabilities for products.
- **Set rental pricing & tenure**: Manage base rents and security deposits.
- **Manage delivery & pickup schedules**: Monitor and track all customer orders.
- **Track product availability**: Automatic stock decrement upon successful rental.
- **Handle maintenance requests**: View, update, and resolve customer support tickets.
- **Manual Image Management**: All product pictures and assets are uploaded and assigned manually by the admin team (no AI or automated placeholders are used) to guarantee the highest quality visual experience.
- **Generate reports and analytics**: Real-time KPI calculations.
- **Manage service areas**: Add or remove available cities for delivery.

---

## ⚙️ Non-Functional Requirements
- **Performance**: Page load time under 3 seconds (Built as a React Single Page Application for instant transitions).
- **Security**: Secure login and payment readiness built into the checkout flow.
- **Reliability**: Accurate real-time inventory tracking.
- **Usability**: Simple, clean, mobile-first responsive UI.
- **Scalability**: Multi-city expansion support enabled via dynamic service area configurations.

---

## 📈 Key Performance Indicators (KPIs) Captured
The Admin Dashboard actively tracks the following metrics:
- Number of active rentals
- Monthly recurring revenue (MRR)
- Product utilization rate
- Customer retention rate (Total customers)
- Maintenance request resolution time

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Vanilla CSS with Glassmorphism), JavaScript
- **Framework**: React.js / Vite
- **Icons**: Lucide React
- **Data Persistence**: `localStorage` (Acting as the mock backend for user sessions, inventory, and transactions).

---

## 🔄 User Flow (High-Level)
1. User visits the RentEase platform.
2. Browses the catalog for furniture/appliances.
3. Selects a product and chooses a rental plan (tenure).
4. Adds to cart and schedules a delivery date/location.
5. Uses the product during the tenure.
6. Schedules a return, extension, or requests maintenance via the dashboard.

---

## 🌟 Expected Impact
- Affordable living solutions for urban users.
- Reduced financial burden and heavy upfront costs.
- Sustainable product usage and circulation.
- A drastically improved, stress-free rental experience.

## 🔮 Future Enhancements
- Mobile applications (React Native/Flutter).
- Subscription bundles (e.g., "Complete Bedroom Package").
- Online payments & auto-renewals (Stripe integration).
- Smart appliance tracking and IoT connectivity.
- Furniture customization options.

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
Use the following accounts to test the application's roles:

- **Customer Account**: `user@example.com` (Password: `user123`)
- **Administrator Account**: `admin@rentease.com` (Password: `admin123`)
