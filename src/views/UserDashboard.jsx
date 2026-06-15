import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ProductImage } from '../components/ProductImage';
import { 
  User, 
  Calendar, 
  Wrench, 
  History, 
  Settings, 
  Plus, 
  LogOut, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';

export const UserDashboard = ({ navigate }) => {
  const { currentUser, login, signup, logout, updateUserProfile } = useAuth();
  const { orders, tickets, raiseTicket, extendRental, schedulePickup, cancelOrder } = useData();

  // Authentication states
  const [authTab, setAuthTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [authError, setAuthError] = useState('');

  // Active view tab inside dashboard
  const [activeTab, setActiveTab] = useState('rentals');

  // Support ticket form state
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [issueType, setIssueType] = useState('functional');
  const [issueDesc, setIssueDesc] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Extend tenure modal/control states
  const [extendingOrderId, setExtendingOrderId] = useState('');
  const [extensionMonths, setExtensionMonths] = useState(3);

  // Profile Edit states
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileCity, setProfileCity] = useState(currentUser?.city || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Form handlers
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (authTab === 'login') {
      const res = login(email, password);
      if (!res.success) {
        setAuthError(res.message);
      }
    } else {
      const res = signup(name, email, password, 'renter', phone, city);
      if (!res.success) {
        setAuthError(res.message);
      }
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrderId) {
      alert('Please select an active rental product.');
      return;
    }
    const res = raiseTicket(selectedOrderId, issueType, issueDesc, preferredDate);
    if (res.success) {
      setTicketSuccess(true);
      setIssueDesc('');
      setSelectedOrderId('');
      setPreferredDate('');
      setTimeout(() => setTicketSuccess(false), 4000);
    } else {
      alert(res.message);
    }
  };

  const handleExtensionSubmit = (e) => {
    e.preventDefault();
    extendRental(extendingOrderId, Number(extensionMonths));
    setExtendingOrderId('');
    alert(`Rental tenure successfully extended by ${extensionMonths} months!`);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      phone: profilePhone,
      city: profileCity
    });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Filter current user orders
  const userOrders = orders.filter(o => o.userId === currentUser?.id);
  const activeRentals = userOrders.filter(o => ['active', 'pending-delivery', 'pending-pickup'].includes(o.status));
  const pastRentals = userOrders.filter(o => ['completed', 'cancelled'].includes(o.status));
  const userTickets = tickets.filter(t => t.userId === currentUser?.id);

  // Unauthenticated State View
  if (!currentUser) {
    return (
      <div className="container animate-fade" style={{ maxWidth: '480px', padding: '60px 20px' }}>
        <div className="glass-card" style={{ padding: '30px', cursor: 'default' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: 'var(--text-primary)' }}>Renter Dashboard</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Access active subscriptions, schedule pickups, and file support tickets.</p>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
            <button 
              className="tab-btn" 
              onClick={() => { setAuthTab('login'); setAuthError(''); }}
              style={{ flex: 1, padding: '10px' }}
              className={authTab === 'login' ? 'tab-btn active' : 'tab-btn'}
            >
              Sign In
            </button>
            <button 
              className="tab-btn" 
              onClick={() => { setAuthTab('signup'); setAuthError(''); }}
              style={{ flex: 1, padding: '10px' }}
              className={authTab === 'signup' ? 'tab-btn active' : 'tab-btn'}
            >
              Create Account
            </button>
          </div>

          {authError && (
            <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {authTab === 'signup' && (
              <>
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
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="form-control" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+1 (555) 012-3456"
                  />
                </div>
              </>
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

            <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
              {authTab === 'login' ? 'Sign In' : 'Create Renter Account'}
            </button>
          </form>

          {/* Quick info toggle for admin testing */}
          <div style={{ background: 'var(--primary-light)', borderRadius: '6px', padding: '12px', marginTop: '24px', fontSize: '0.75rem' }}>
            <p style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>Demo Accounts Available:</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Renter: <strong>user@example.com</strong> / user123</span>
              <button className="btn-link" style={{ fontSize: '0.75rem' }} onClick={() => { setEmail('user@example.com'); setPassword('user123'); setAuthTab('login'); }}>Fill</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Admin: <strong>admin@rentease.com</strong> / admin123</span>
              <button className="btn-link" style={{ fontSize: '0.75rem' }} onClick={() => { setEmail('admin@rentease.com'); setPassword('admin123'); setAuthTab('login'); }}>Fill</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade" style={{ minHeight: '80vh', paddingBottom: '60px' }}>
      <div className="flex-between" style={{ margin: '30px 0 20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Welcome Back</span>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit' }}>{currentUser.name}</h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>City: {currentUser.city} • Contact: {currentUser.phone || 'Not added'}</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={logout}>
          <LogOut size={14} />
          Log Out
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Navigation Sidebar */}
        <aside>
          <div className="glass-card" style={{ padding: '16px', cursor: 'default' }}>
            <nav className="sidebar-nav">
              <button 
                className={`sidebar-link ${activeTab === 'rentals' ? 'active' : ''}`}
                onClick={() => setActiveTab('rentals')}
              >
                <Calendar size={18} />
                Active Rentals ({activeRentals.length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'tickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('tickets')}
              >
                <Wrench size={18} />
                Maintenance ({userTickets.length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={18} />
                Rental History
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('profile');
                  setProfileName(currentUser.name);
                  setProfilePhone(currentUser.phone || '');
                  setProfileCity(currentUser.city || '');
                }}
              >
                <Settings size={18} />
                Profile Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Dynamic Panels */}
        <main>
          {/* 1. Active Rentals Panel */}
          {activeTab === 'rentals' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Active & Scheduled Rentals</h3>

              {activeRentals.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {activeRentals.map(rental => (
                    <div key={rental.id} className="glass-card" style={{ cursor: 'default', padding: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '20px', alignItems: 'center' }}>
                        <ProductImage subCategory={rental.productSubCategory} productId={rental.productId} style={{ height: '70px', padding: '4px' }} />
                        
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{rental.productName}</h4>
                            <span className={`badge ${
                              rental.status === 'active' ? 'badge-success' : 
                              rental.status === 'pending-delivery' ? 'badge-primary' : 'badge-warning'
                            }`}>
                              {rental.status.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>Monthly Rent: <strong>₹{rental.monthlyRent}/mo</strong></span>
                            <span>Security Deposit: <strong>₹{rental.securityDeposit}</strong></span>
                            <span>Scheduled Delivery: <strong>{rental.deliveryDate} ({rental.deliverySlot})</strong></span>
                            <span>Contract Ends: <strong>{rental.endDate} ({rental.tenureMonths} mo)</strong></span>
                          </div>
                        </div>

                        {/* Rental Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '150px' }}>
                          {rental.status === 'pending-delivery' && (
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to cancel this scheduled rental? Refund will credit immediately.')) {
                                  cancelOrder(rental.id);
                                }
                              }}
                            >
                              Cancel Booking
                            </button>
                          )}
                          {rental.status === 'active' && (
                            <>
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => setExtendingOrderId(rental.id)}
                              >
                                Extend Tenure
                              </button>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  if (confirm('Schedule early return pickup? The deposit will credit upon item condition inspection.')) {
                                    schedulePickup(rental.id);
                                  }
                                }}
                              >
                                Schedule Return
                              </button>
                            </>
                          )}
                          {rental.status === 'pending-pickup' && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 'bold', textAlign: 'center', background: 'var(--warning-light)', padding: '6px', borderRadius: '4px' }}>
                              Pickup Scheduled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', cursor: 'default' }}>
                  <p className="text-muted" style={{ marginBottom: '16px' }}>You do not have any active or scheduled rentals currently.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('catalog')}>
                    Explore catalog
                  </button>
                </div>
              )}

              {/* Extend Tenure Modal (simple inline overlay or view form) */}
              {extendingOrderId && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'Outfit' }}>Extend Rental Duration</h3>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
                      Extend your monthly rental agreement. Locking in extensions keeps your original rates active.
                    </p>
                    
                    <form onSubmit={handleExtensionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Extension Period</label>
                        <select 
                          className="form-control"
                          value={extensionMonths}
                          onChange={(e) => setExtensionMonths(Number(e.target.value))}
                        >
                          <option value="3">3 Months Extension</option>
                          <option value="6">6 Months Extension</option>
                          <option value="12">12 Months Extension</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                        <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>Confirm</button>
                        <button className="btn btn-secondary" type="button" style={{ flex: 1 }} onClick={() => setExtendingOrderId('')}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Maintenance / Support Ticketing Panel */}
          {activeTab === 'tickets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Form to raise ticket */}
              <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'Outfit' }}>File Maintenance Service Ticket</h3>
                
                {ticketSuccess && (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                    <CheckCircle size={16} />
                    <span>Ticket created! An admin will assign a mechanic and post remarks.</span>
                  </div>
                )}

                {activeRentals.filter(r => r.status === 'active').length === 0 ? (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--warning-light)', color: 'var(--warning)', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <Info size={16} style={{ flexShrink: 0 }} />
                    <span>You must have active, delivered rentals to file service tickets. Scheduled items cannot be repaired yet.</span>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Select Rental Product</label>
                        <select 
                          className="form-control"
                          value={selectedOrderId}
                          onChange={(e) => setSelectedOrderId(e.target.value)}
                          required
                        >
                          <option value="">-- Select Product --</option>
                          {activeRentals.filter(r => r.status === 'active').map(r => (
                            <option key={r.id} value={r.id}>{r.productName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Issue Classification</label>
                        <select 
                          className="form-control"
                          value={issueType}
                          onChange={(e) => setIssueType(e.target.value)}
                        >
                          <option value="functional">Functional Fault / Malfunction</option>
                          <option value="damage">Physical Damage / Wear</option>
                          <option value="installation">Installation Setup Help</option>
                          <option value="other">Other / Support Request</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Preferred Date for Visit</label>
                        <input 
                          type="date" 
                          className="form-control"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Description of Problem</label>
                      <textarea 
                        rows="3" 
                        className="form-control" 
                        required
                        placeholder="Please provide details (e.g. freezer door doesn't seal, sofa springs wobbly)"
                        value={issueDesc}
                        onChange={(e) => setIssueDesc(e.target.value)}
                      ></textarea>
                    </div>

                    <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
                      Submit Service Ticket
                    </button>
                  </form>
                )}
              </div>

              {/* Tickets List */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'Outfit' }}>Your Service History</h3>
                {userTickets.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {userTickets.map(ticket => (
                      <div key={ticket.id} className="glass-card" style={{ cursor: 'default', padding: '16px' }}>
                        <div className="flex-between" style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>Ticket #{ticket.id}</span>
                            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{ticket.issueType}</span>
                          </div>
                          <span className={`badge ${
                            ticket.status === 'resolved' ? 'badge-success' : 
                            ticket.status === 'assigned' ? 'badge-primary' : 'badge-warning'
                          }`} style={{ fontSize: '0.7rem' }}>
                            {ticket.status}
                          </span>
                        </div>
                        
                        <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>Product: {ticket.productName}</p>
                        <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>"{ticket.description}"</p>
                        
                        <div style={{ 
                          fontSize: '0.75rem', 
                          borderTop: '1px solid var(--border)', 
                          paddingTop: '10px', 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px',
                          color: 'var(--text-secondary)'
                        }}>
                          <span>Requested Date: <strong>{ticket.preferredDate}</strong></span>
                          <span>Admin Remarks: <strong style={{ color: 'var(--primary)' }}>{ticket.notes || 'Awaiting assignment'}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '30px', textAlign: 'center', cursor: 'default' }}>
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>No maintenance or service tickets raised.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. History Panel */}
          {activeTab === 'history' && (
            <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'Outfit' }}>Billing & Completed Rentals</h3>
              
              {pastRentals.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Tenure</th>
                        <th>Rent</th>
                        <th>Status</th>
                        <th>Ended Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastRentals.map(ord => (
                        <tr key={ord.id}>
                          <td><strong>#{ord.id}</strong></td>
                          <td>{ord.productName}</td>
                          <td>{ord.tenureMonths} mo</td>
                          <td>₹{ord.monthlyRent}/mo</td>
                          <td>
                            <span className={`badge ${ord.status === 'completed' ? 'badge-success' : 'badge-danger'}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td>{ord.endDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>No historical orders found. Active rentals will display here once closed.</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Profile Settings Panel */}
          {activeTab === 'profile' && (
            <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', fontFamily: 'Outfit' }}>Account Details</h3>

              {profileSuccess && (
                <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <CheckCircle size={16} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address (Cannot change)</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    disabled 
                    value={currentUser.email}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    required 
                    value={profilePhone} 
                    onChange={(e) => setProfilePhone(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Registered City Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={profileCity} 
                    onChange={(e) => setProfileCity(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
