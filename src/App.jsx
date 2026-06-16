import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './views/HomeView';
import CatalogView from './views/CatalogView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import UserDashboard from './views/UserDashboard';
import AdminDashboard from './views/AdminDashboard';

const APP_DATA_VERSION = 'v4-new-appliances';

// Clear stale localStorage data when app version changes
if (localStorage.getItem('rentease_data_version') !== APP_DATA_VERSION) {
  ['rentease_products', 'rentease_service_areas', 'rentease_orders',
   'rentease_tickets', 'rentease_users'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('rentease_data_version', APP_DATA_VERSION);
}

const MainAppContent = () => {
  // Routing State
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Dark Mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('rentease_theme');
    return saved === 'dark';
  });

  // Sync dark mode class with state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('rentease_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('rentease_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // State-based router navigation function
  const navigate = (viewName, params = {}) => {
    setCurrentView(viewName);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView navigate={navigate} />;
      case 'catalog':
        return (
          <CatalogView 
            navigate={navigate} 
            initialFilters={viewParams} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailView 
            navigate={navigate} 
            productId={viewParams.productId} 
          />
        );
      case 'cart':
        return <CartView navigate={navigate} />;
      case 'user-dashboard':
        return <UserDashboard navigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard navigate={navigate} />;
      default:
        return <HomeView navigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        currentView={currentView} 
        navigate={navigate} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="main-content flex-grow">
        {renderView()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <MainAppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
