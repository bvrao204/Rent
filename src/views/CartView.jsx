import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ProductImage } from '../components/ProductImage';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard,
  MapPin, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const CartView = ({ navigate }) => {
  const { cart, serviceAreas, removeFromCart, updateCartQuantity, placeOrder } = useData();
  const { currentUser, login, signup } = useAuth();

  // Checkout Form State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(serviceAreas[0] || 'Bangalore');
  const [zipCode, setZipCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('10 AM - 1 PM');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  
  // Payment Mock State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Auth Form State (for guest checkout / prompt)
  const [authMode, setAuthMode] = useState('login'); // login or signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  // Flow State
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [errors, setErrors] = useState({});

  // Calculations
  const totalMonthlyRent = cart.reduce((acc, item) => acc + (item.monthlyRent * item.quantity), 0);
  const totalDeposit = cart.reduce((acc, item) => acc + (item.product.securityDeposit * item.quantity), 0);
  const totalDueToday = totalMonthlyRent + totalDeposit;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const res = login(email, password);
      if (res.success) {
        setPhone(res.user.phone);
      } else {
        setAuthError(res.message);
      }
    } else {
      const res = signup(name, email, password, 'renter', phone, city);
      if (!res.success) {
        setAuthError(res.message);
      }
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!address.trim()) tempErrors.address = 'Street address is required';
    if (!zipCode.trim() || zipCode.length < 5) tempErrors.zipCode = 'Valid ZIP code is required';
    if (!deliveryDate) tempErrors.deliveryDate = 'Please select a delivery date';
    if (!phone.trim() || phone.length < 10) tempErrors.phone = 'Valid 10-digit phone number is required';
    
    // Credit card mocks
    if (cardNumber.replace(/\s/g, '').length < 16) tempErrors.cardNumber = 'Valid credit card is required';
    if (!cardExpiry.trim()) tempErrors.cardExpiry = 'Expiry date is required';
    if (cardCvv.length < 3) tempErrors.cardCvv = 'CVV is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please sign in or register before checking out.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const res = placeOrder(currentUser, {
      address,
      city,
      zipCode,
      deliveryDate,
      deliverySlot,
      phone
    });

    if (res.success) {
      setPlacedOrders(res.orders);
      setCheckoutSuccess(true);
    } else {
      alert(res.message);
    }
  };

  if (checkoutSuccess) {
    return (
      <div className="container animate-fade">
        <div className="glass-card checkout-success-box animate-slide" style={{ cursor: 'default' }}>
          <div className="checkout-success-icon">
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: 'Outfit' }}>Rental Confirmed!</h2>
          <p className="text-muted" style={{ marginBottom: '30px' }}>
            Thank you for choosing RentEase. We have reserved your items and scheduled the logistics team.
          </p>

          <div style={{
            textAlign: 'left',
            background: 'var(--bg-tertiary)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '30px',
            fontSize: '0.9rem',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Logistics Details:</h4>
            <p style={{ marginBottom: '6px' }}>
              <strong>Delivery Address:</strong> {address}, {city}, {zipCode}
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Scheduled Date:</strong> {deliveryDate} ({deliverySlot})
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Phone Contact:</strong> {phone}
            </p>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '12px', paddingTop: '12px' }}>
              <p><strong>Rented Items:</strong></p>
              {placedOrders.map(ord => (
                <div key={ord.id} className="flex-between" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  <span>{ord.productName} ({ord.tenureMonths} mo)</span>
                  <span>₹{ord.monthlyRent}/mo</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('user-dashboard')}>
              Go to My Dashboard
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('catalog')}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade" style={{ paddingBottom: '80px' }}>
      <div style={{ margin: '30px 0 20px 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit' }}>Shopping Cart</h1>
        <p className="text-muted">Review your custom tenure pricing and configure delivery options.</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        @media (min-width: 900px) {
          .cart-layout {
            grid-template-columns: 1.5fr 1fr;
          }
        }
        .cart-item-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .cart-item-row:last-child {
          border-bottom: none;
        }
        .error-msg {
          color: var(--danger);
          font-size: 0.75rem;
          margin-top: 4px;
        }
      `}} />

      {cart.length > 0 ? (
        <div className="cart-layout">
          {/* Left: Cart Items & Delivery Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Cart list */}
            <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Selected Rentals</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cart.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <ProductImage subCategory={item.product.subCategory} productId={item.product.id} stock={item.product.stock} style={{ height: '70px', padding: '5px' }} />
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {item.product.name}
                      </h4>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                        <span className="badge badge-primary">{item.product.category}</span>
                        <span className="text-muted">Tenure: <strong>{item.tenureMonths} Months</strong></span>
                        <span className="text-muted">Rent: <strong>₹{item.monthlyRent}/mo</strong></span>
                        <span className="text-muted">Deposit: <strong>₹{item.product.securityDeposit}</strong></span>
                      </div>
                    </div>
                    
                    {/* Quantity control & delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                        <button 
                          className="btn-icon" 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          style={{ width: '28px', height: '28px', border: 'none', borderRadius: 0, background: 'none' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ padding: '0 10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button 
                          className="btn-icon" 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          style={{ width: '28px', height: '28px', border: 'none', borderRadius: 0, background: 'none' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button 
                        className="btn-icon" 
                        onClick={() => removeFromCart(item.id)}
                        style={{ width: '32px', height: '32px', border: 'none', color: 'var(--danger)', background: 'var(--danger-light)' }}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Validation OR Form Checkout */}
            {!currentUser ? (
              <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Account Sign In Required</h3>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>Please log in or register a new Renter account to complete checkout.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                  <button 
                    className={`btn ${authMode === 'login' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    onClick={() => setAuthMode('login')}
                  >
                    Log In
                  </button>
                  <button 
                    className={`btn ${authMode === 'signup' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    onClick={() => setAuthMode('signup')}
                  >
                    Register Account
                  </button>
                </div>

                {authError && (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px', margin: '0 auto' }}>
                  {authMode === 'signup' && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Alex Johnson"
                      />
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="renter@example.com"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      required 
                      className="form-control" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ marginTop: '10px' }}>
                    {authMode === 'login' ? 'Log In & Continue' : 'Create Account'}
                  </button>
                </form>
              </div>
            ) : (
              /* Delivery Address Form */
              <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={20} style={{ color: 'var(--primary)' }} />
                  2. Delivery & Logistics Details
                </h3>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Street Address</label>
                    <input 
                      type="text" 
                      placeholder="Flat 4B, MG Road, Indiranagar" 
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <span className="error-msg">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Service City</label>
                      <select 
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        {serviceAreas.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">ZIP Code</label>
                      <input 
                        type="text" 
                        maxLength="6" 
                        placeholder="560001" 
                        className="form-control"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                      {errors.zipCode && <span className="error-msg">{errors.zipCode}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Delivery Date</label>
                      <input 
                        type="date" 
                        className="form-control"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.deliveryDate && <span className="error-msg">{errors.deliveryDate}</span>}
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Preferred Time Slot</label>
                      <select 
                        className="form-control"
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                      >
                        <option value="10 AM - 1 PM">10 AM - 1 PM</option>
                        <option value="2 PM - 5 PM">2 PM - 5 PM</option>
                        <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Contact Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right: Checkout Sidebar summary & credit card */}
          <div>
            <div className="glass-card" style={{ padding: '24px', cursor: 'default', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', fontSize: '0.95rem' }}>
                <div className="flex-between">
                  <span className="text-muted">Total Monthly Rent:</span>
                  <span style={{ fontWeight: '600' }}>₹{totalMonthlyRent}/mo</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Refundable Security Deposit:</span>
                  <span style={{ fontWeight: '600' }}>₹{totalDeposit}</span>
                </div>
                <div className="flex-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                  <h4 style={{ fontSize: '1rem' }}>Total Due Today:</h4>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: '800' }}>
                    ₹{totalDueToday}
                  </h3>
                </div>
              </div>

              {/* Payment Section */}
              {currentUser && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '20px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} style={{ color: 'var(--primary)' }} />
                    3. Payment Information
                  </h4>

                  <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Card Number</label>
                      <input 
                        type="text" 
                        maxLength="19" 
                        placeholder="4111 2222 3333 4444" 
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(v);
                        }}
                      />
                      {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Expiry (MM/YY)</label>
                        <input 
                          type="text" 
                          maxLength="5" 
                          placeholder="12/28" 
                          className="form-control"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                        {errors.cardExpiry && <span className="error-msg">{errors.cardExpiry}</span>}
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">CVV</label>
                        <input 
                          type="password" 
                          maxLength="3" 
                          placeholder="123" 
                          className="form-control"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        />
                        {errors.cardCvv && <span className="error-msg">{errors.cardCvv}</span>}
                      </div>
                    </div>

                    {/* Terms Checklist */}
                    <label style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '10px', alignItems: 'flex-start' }}>
                      <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--primary)' }} />
                      <span>I agree to the RentEase Rental Agreement which details the security deposit returns and fair wear-and-tear policies.</span>
                    </label>

                    <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
                      Authorize Payment & Rent
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', cursor: 'default', maxWidth: '600px', margin: '40px auto' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px', opacity: 0.5 }} />
          <h3>Your Shopping Cart is Empty</h3>
          <p className="text-muted" style={{ margin: '8px auto 24px auto', maxWidth: '400px', fontSize: '0.9rem' }}>
            Browse our categories of essential home furniture and high-quality appliances to build your custom monthly subscription.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('catalog')}>
            Go to Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
