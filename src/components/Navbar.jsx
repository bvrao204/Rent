import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Sun, 
  Moon, 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Home, 
  ShoppingBag,
  MapPin
} from 'lucide-react';

export const Navbar = ({ currentView, navigate, onSearchChange, searchQuery, darkMode, toggleDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const { cart, serviceAreas } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('catalog');
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('home');
    setShowProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view, params = {}) => {
    navigate(view, params);
    setMobileMenuOpen(false);
    setShowProfileDropdown(false);
  };

  return (
    <header className="glass-header">
      <div className="container flex-between" style={{ height: '100%' }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'Outfit'
          }}>
            RE
          </div>
          <span style={{ 
            fontSize: '1.4rem', 
            fontWeight: '800', 
            fontFamily: 'Outfit',
            background: 'linear-gradient(135deg, var(--text-primary) 50%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            RentEase
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-wrapper" style={{ display: 'none', width: '300px', margin: '0 20px' }}>
          {/* Default responsive toggle: show search on desktop */}
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search furniture & appliances..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ borderRadius: '24px', height: '40px' }}
          />
        </form>

        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 850px) {
            form.search-wrapper { display: flex !important; }
          }
          .nav-links { display: none; gap: 24px; align-items: center; }
          @media (min-width: 850px) {
            .nav-links { display: flex; }
          }
          .nav-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
            cursor: pointer;
            transition: var(--transition-fast);
            padding: 8px 12px;
            border-radius: 6px;
          }
          .nav-btn:hover, .nav-btn.active {
            color: var(--primary);
            background: var(--primary-light);
          }
          .actions-group { display: flex; align-items: center; gap: 12px; }
          .badge-counter {
            position: absolute;
            top: -4px;
            right: -4px;
            background: var(--danger);
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .profile-container { position: relative; }
          .dropdown-menu {
            position: absolute;
            top: 50px;
            right: 0;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            box-shadow: var(--card-shadow);
            width: 220px;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            z-index: 200;
            animation: fadeIn 0.2s ease;
          }
          .dropdown-item {
            padding: 10px 16px;
            font-size: 0.9rem;
            color: var(--text-primary);
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
          }
          .dropdown-item:hover {
            background: var(--primary-light);
            color: var(--primary);
          }
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (min-width: 850px) {
            .mobile-menu-toggle { display: none; }
          }
          .mobile-drawer {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: var(--card-shadow);
            z-index: 99;
          }
        `}} />

        {/* Navigation Links */}
        <nav className="nav-links">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalog')}
          >
            Rent Catalog
          </button>
          
          {/* Service Area Selection */}
          <div style={{ position: 'relative' }}>
            <button 
              className="nav-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setShowCityDropdown(!showCityDropdown)}
            >
              <MapPin size={16} />
              Service Cities
            </button>
            {showCityDropdown && (
              <div className="dropdown-menu" style={{ left: 0, right: 'auto' }}>
                <div style={{ padding: '8px 16px', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Servicing Locations
                </div>
                {serviceAreas.map(city => (
                  <button 
                    key={city} 
                    className="dropdown-item" 
                    onClick={() => {
                      setShowCityDropdown(false);
                      // If search is updated or just alert user
                      alert(`Showing rentals in ${city}`);
                    }}
                  >
                    <MapPin size={14} />
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action icons */}
        <div className="actions-group">
          {/* Theme Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleDarkMode} 
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ width: '36px', height: '36px' }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Icon */}
          <button 
            className="btn-icon" 
            onClick={() => handleNavClick('cart')} 
            style={{ width: '36px', height: '36px', position: 'relative' }}
            title="Cart"
          >
            <ShoppingCart size={18} />
            {cartItemCount > 0 && <span className="badge-counter">{cartItemCount}</span>}
          </button>

          {/* User Profile Control */}
          {currentUser ? (
            <div className="profile-container">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  height: '36px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: 'none'
                }}
              >
                <User size={16} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
              
              {showProfileDropdown && (
                <div className="dropdown-menu">
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>
                    <p style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{currentUser.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                    <span className="badge badge-primary" style={{ fontSize: '0.6rem', marginTop: '4px', padding: '2px 6px' }}>
                      {currentUser.role === 'admin' ? 'Admin Portal' : 'Renter'}
                    </span>
                  </div>
                  {currentUser.role === 'admin' ? (
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleNavClick('admin-dashboard')}
                    >
                      <LayoutDashboard size={16} />
                      Admin Console
                    </button>
                  ) : (
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleNavClick('user-dashboard')}
                    >
                      <LayoutDashboard size={16} />
                      My Dashboard
                    </button>
                  )}
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleNavClick('catalog')}
                  >
                    <ShoppingBag size={16} />
                    Rent Products
                  </button>
                  <button 
                    className="dropdown-item" 
                    onClick={handleLogoutClick} 
                    style={{ color: 'var(--danger)', borderTop: '1px solid var(--border)', marginTop: '4px' }}
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => handleNavClick('user-dashboard')} // take user to login panel on dashboard
              style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', height: '36px' }}
            >
              Sign In
            </button>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="btn-icon mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ width: '36px', height: '36px' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ borderRadius: '24px' }}
            />
          </form>

          {/* Navigation Links */}
          <button 
            className={`sidebar-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} />
            Home
          </button>
          <button 
            className={`sidebar-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalog')}
          >
            <ShoppingBag size={18} />
            Rent Catalog
          </button>

          {/* Role actions inside mobile drawer */}
          {currentUser ? (
            <>
              {currentUser.role === 'admin' ? (
                <button 
                  className={`sidebar-link ${currentView === 'admin-dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('admin-dashboard')}
                >
                  <LayoutDashboard size={18} />
                  Admin Console
                </button>
              ) : (
                <button 
                  className={`sidebar-link ${currentView === 'user-dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('user-dashboard')}
                >
                  <LayoutDashboard size={18} />
                  My Dashboard
                </button>
              )}
              <button 
                className="sidebar-link" 
                onClick={handleLogoutClick}
                style={{ color: 'var(--danger)' }}
              >
                <LogOut size={18} />
                Log Out ({currentUser.name})
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => handleNavClick('user-dashboard')}
              style={{ width: '100%' }}
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
