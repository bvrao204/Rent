import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Package, 
  Truck, 
  Wrench, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Activity,
  Users
} from 'lucide-react';

export const AdminDashboard = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { 
    products, 
    orders, 
    tickets, 
    serviceAreas, 
    addProduct, 
    deleteProduct, 
    editProduct,
    updateOrderStatus, 
    updateTicketStatus,
    addServiceArea,
    removeServiceArea,
    getKPIs
  } = useData();

  // Active sub-view tab
  const [activeTab, setActiveTab] = useState('analytics');

  // Form States for adding new product
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('furniture');
  const [prodSubCategory, setProdSubCategory] = useState('bed');
  const [prodBaseRent, setProdBaseRent] = useState('');
  const [prodDeposit, setProdDeposit] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [addProdSuccess, setAddProdSuccess] = useState(false);

  // Service Areas State
  const [newCity, setNewCity] = useState('');

  // Maintenance dispatch ticket note states
  const [ticketRemarks, setTicketRemarks] = useState({});

  // Auth Guard
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="container text-center animate-fade" style={{ padding: '80px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--danger)', marginBottom: '16px' }}>
          <AlertCircle size={48} />
        </div>
        <h2>Access Denied</h2>
        <p className="text-muted">You do not have the admin permissions required to view this dashboard.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('home')}>
          Return Home
        </button>
      </div>
    );
  }

  // Calculate dynamic KPIs
  const kpi = getKPIs();

  // Handlers
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!prodName || !prodBaseRent || !prodDeposit || !prodStock) {
      alert('Please fill out all fields.');
      return;
    }

    const featuresArray = prodFeatures
      ? prodFeatures.split(',').map(tag => tag.trim()).filter(Boolean)
      : ['Certified Quality Check', 'Free Assembly'];

    addProduct({
      name: prodName,
      category: prodCategory,
      subCategory: prodSubCategory,
      baseRent: Number(prodBaseRent),
      securityDeposit: Number(prodDeposit),
      stock: Number(prodStock),
      description: prodDesc || `${prodName} premium catalog addition. Built for durability and style.`,
      features: featuresArray
    });

    setAddProdSuccess(true);
    setProdName('');
    setProdBaseRent('');
    setProdDeposit('');
    setProdStock('');
    setProdDesc('');
    setProdFeatures('');

    setTimeout(() => setAddProdSuccess(false), 3000);
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCity.trim()) return;
    const res = addServiceArea(newCity.trim());
    if (res.success) {
      setNewCity('');
    } else {
      alert(res.message);
    }
  };

  const handleUpdateTicket = (ticketId, status) => {
    const remarks = ticketRemarks[ticketId] || '';
    updateTicketStatus(ticketId, status, remarks || (status === 'resolved' ? 'Issue resolved by site mechanic.' : 'Mechanic dispatched to address physical logs.'));
    // clear remarks state for this ticket
    setTicketRemarks(prev => {
      const copy = { ...prev };
      delete copy[ticketId];
      return copy;
    });
  };

  return (
    <div className="container animate-fade" style={{ minHeight: '80vh', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ margin: '30px 0 20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <span className="badge badge-accent" style={{ marginBottom: '6px' }}>System Administrator Console</span>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'Outfit' }}>RentEase Business Console</h1>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Monitor active rentals, inventory levels, maintenance requests, and analytics logs.</p>
      </div>

      <div className="dashboard-grid">
        {/* Navigation Sidebar */}
        <aside>
          <div className="glass-card" style={{ padding: '16px', cursor: 'default' }}>
            <nav className="sidebar-nav">
              <button 
                className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 size={18} />
                Analytics & KPIs
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                <Package size={18} />
                Manage Inventory ({products.length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'schedules' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedules')}
              >
                <Truck size={18} />
                Deliveries & Pickups ({orders.filter(o => ['pending-delivery', 'pending-pickup'].includes(o.status)).length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'tickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('tickets')}
              >
                <Wrench size={18} />
                Support Desk ({tickets.filter(t => t.status !== 'resolved').length})
              </button>
              <button 
                className={`sidebar-link ${activeTab === 'areas' ? 'active' : ''}`}
                onClick={() => setActiveTab('areas')}
              >
                <MapPin size={18} />
                Service Coverage
              </button>
            </nav>
          </div>
        </aside>

        {/* Dynamic Panels */}
        <main>
          {/* Tab 1: Analytics / KPIs */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Core Performance Metrics</h3>
              
              <div className="kpi-grid">
                {/* Active Rentals */}
                <div className="glass-card kpi-card" style={{ cursor: 'default' }}>
                  <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                    <Activity size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Leases</h5>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{kpi.activeRentals}</h2>
                  </div>
                </div>

                {/* MRR */}
                <div className="glass-card kpi-card" style={{ cursor: 'default' }}>
                  <div className="kpi-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Monthly Revenue (MRR)</h5>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>₹{kpi.monthlyRecurringRevenue}</h2>
                  </div>
                </div>

                {/* Utilization Rate */}
                <div className="glass-card kpi-card" style={{ cursor: 'default' }}>
                  <div className="kpi-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Asset Utilization</h5>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{kpi.productUtilizationRate}%</h2>
                  </div>
                </div>

                {/* Total Customers */}
                <div className="glass-card kpi-card" style={{ cursor: 'default' }}>
                  <div className="kpi-icon" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Renters</h5>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{kpi.totalCustomers}</h2>
                  </div>
                </div>
              </div>

              {/* Maintenance & Schedules Status Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Logistics Queue</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    <div className="flex-between">
                      <span className="text-muted">Pending Deliveries:</span>
                      <span className="badge badge-primary">{kpi.pendingDeliveries} orders</span>
                    </div>
                    <div className="flex-between">
                      <span className="text-muted">Pending Returns:</span>
                      <span className="badge badge-warning">{kpi.pendingPickups} pickups</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Service Desk Status</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    <div className="flex-between">
                      <span className="text-muted">Unresolved Tickets:</span>
                      <span className="badge badge-danger">{tickets.filter(t => t.status !== 'resolved').length} open</span>
                    </div>
                    <div className="flex-between">
                      <span className="text-muted">Service Resolution Rate:</span>
                      <span className="badge badge-success">{kpi.ticketResolutionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Inventory Manager */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Add Product Form */}
              <div className="glass-card" style={{ padding: '24px', cursor: 'default' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'Outfit' }}>Add New Product Model</h3>
                
                {addProdSuccess && (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                    <CheckCircle size={16} />
                    <span>Product registered successfully and added to catalog!</span>
                  </div>
                )}

                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Product Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required
                        placeholder="SleepWell Double Bed" 
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Category</label>
                      <select 
                        className="form-control" 
                        value={prodCategory}
                        onChange={(e) => {
                          setProdCategory(e.target.value);
                          setProdSubCategory(e.target.value === 'furniture' ? 'bed' : 'fridge');
                        }}
                      >
                        <option value="furniture">Furniture</option>
                        <option value="appliance">Appliance</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Sub-Category</label>
                      <select 
                        className="form-control" 
                        value={prodSubCategory}
                        onChange={(e) => setProdSubCategory(e.target.value)}
                      >
                        {prodCategory === 'furniture' ? (
                          <>
                            <option value="bed">Bed</option>
                            <option value="sofa">Sofa</option>
                            <option value="table">Table</option>
                          </>
                        ) : (
                          <>
                            <option value="fridge">Fridge / Refrigerator</option>
                            <option value="washing-machine">Washing Machine</option>
                            <option value="tv">TV / Television</option>
                            <option value="microwave">Microwave Oven</option>
                            <option value="ac">Air Conditioner (AC)</option>
                            <option value="water-purifier">Water Purifier (RO)</option>
                            <option value="geyser">Water Heater / Geyser</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Monthly Base Rent (₹)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required
                        placeholder="29" 
                        value={prodBaseRent}
                        onChange={(e) => setProdBaseRent(e.target.value)}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Security Deposit (₹)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required
                        placeholder="99" 
                        value={prodDeposit}
                        onChange={(e) => setProdDeposit(e.target.value)}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Initial Stock Count</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required
                        placeholder="10" 
                        value={prodStock}
                        onChange={(e) => setProdStock(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Specs & Features (Comma separated list)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Solid Oak frame, Memory Foam Mattress, Easy Assembly" 
                      value={prodFeatures}
                      onChange={(e) => setProdFeatures(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Product Description</label>
                    <textarea 
                      rows="2" 
                      className="form-control"
                      placeholder="Provide full description of dimensions, materials, or energy ratings..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
                    <Plus size={16} />
                    Register Product Model
                  </button>
                </form>
              </div>

              {/* Product inventory list */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'Outfit' }}>Current Inventory Models</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Base Rent</th>
                        <th>Deposit</th>
                        <th>Stock Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(prod => (
                        <tr key={prod.id}>
                          <td><code>{prod.id}</code></td>
                          <td><strong>{prod.name}</strong></td>
                          <td>
                            <span className="badge badge-primary">{prod.category}</span>
                            <span className="badge badge-accent" style={{ marginLeft: '4px', fontSize: '0.6rem' }}>{prod.subCategory}</span>
                          </td>
                          <td>₹{prod.baseRent}/mo</td>
                          <td>₹{prod.securityDeposit}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="number" 
                                className="form-control"
                                style={{ width: '60px', padding: '4px', height: '28px', textAlign: 'center', fontSize: '0.8rem' }}
                                value={prod.stock}
                                onChange={(e) => editProduct(prod.id, { stock: Number(e.target.value) })}
                              />
                              {prod.stock === 0 && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: '600' }}>Out</span>}
                            </div>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm" 
                              onClick={() => {
                                if (confirm(`Delete product model "${prod.name}"? This removes it completely from catalog.`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              style={{ padding: '4px 8px' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Logistics Queue */}
          {activeTab === 'schedules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Scheduled Logistics Deliveries & Returns</h3>
              
              {orders.filter(o => ['pending-delivery', 'pending-pickup'].includes(o.status)).length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Renter</th>
                        <th>Product</th>
                        <th>Date & Time Slot</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.filter(o => ['pending-delivery', 'pending-pickup'].includes(o.status)).map(order => (
                        <tr key={order.id}>
                          <td><strong>#{order.id}</strong></td>
                          <td>
                            <div>
                              <p style={{ fontWeight: '600', margin: 0 }}>{order.userName}</p>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{order.userPhone}</p>
                            </div>
                          </td>
                          <td>{order.productName}</td>
                          <td>
                            <p style={{ margin: 0, fontWeight: '500' }}>{order.deliveryDate}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.deliverySlot}</span>
                          </td>
                          <td>
                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{order.address}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.city}, {order.zipCode}</span>
                          </td>
                          <td>
                            <span className={`badge ${order.status === 'pending-delivery' ? 'badge-primary' : 'badge-warning'}`}>
                              {order.status === 'pending-delivery' ? 'Delivery' : 'Pickup'}
                            </span>
                          </td>
                          <td>
                            {order.status === 'pending-delivery' ? (
                              <button 
                                className="btn btn-accent btn-sm"
                                onClick={() => updateOrderStatus(order.id, 'active')}
                              >
                                Mark Delivered
                              </button>
                            ) : (
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                              >
                                Complete Return
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', cursor: 'default' }}>
                  <p className="text-muted">No pending deliveries or return pickups scheduled in the system queue.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Service / Maintenance Desk */}
          {activeTab === 'tickets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Active Maintenance Support Tickets</h3>

              {tickets.filter(t => t.status !== 'resolved').length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {tickets.filter(t => t.status !== 'resolved').map(ticket => (
                    <div key={ticket.id} className="glass-card" style={{ cursor: 'default', padding: '20px' }}>
                      <div className="flex-between" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Ticket #{ticket.id}</span>
                          <span className="badge badge-danger" style={{ marginLeft: '8px', fontSize: '0.65rem' }}>{ticket.issueType}</span>
                        </div>
                        <span className={`badge ${ticket.status === 'assigned' ? 'badge-primary' : 'badge-warning'}`}>
                          {ticket.status}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.85rem', marginBottom: '12px' }}>
                        <p><strong>Customer:</strong> {ticket.userName}</p>
                        <p><strong>Product:</strong> {ticket.productName}</p>
                        <p><strong>Pref. Service Date:</strong> {ticket.preferredDate}</p>
                        <p><strong>Date Filed:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      </div>

                      <p style={{ fontSize: '0.9rem', background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>
                        <strong>Description:</strong> "{ticket.description}"
                      </p>

                      {/* Admin action inputs */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input 
                          type="text" 
                          placeholder="Add mechanic remarks / updates..." 
                          className="form-control"
                          style={{ flex: 1, height: '36px', fontSize: '0.85rem', padding: '6px 12px' }}
                          value={ticketRemarks[ticket.id] || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTicketRemarks(prev => ({ ...prev, [ticket.id]: val }));
                          }}
                        />
                        {ticket.status === 'pending' ? (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleUpdateTicket(ticket.id, 'assigned')}
                          >
                            Assign Dispatcher
                          </button>
                        ) : (
                          <button 
                            className="btn btn-accent btn-sm"
                            onClick={() => handleUpdateTicket(ticket.id, 'resolved')}
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', cursor: 'default' }}>
                  <p className="text-muted">No unresolved service tickets at this time. All caught up!</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Service Coverage Areas */}
          {activeTab === 'areas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Manage Service Areas</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
                {/* Cities List */}
                <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Active Serviced Cities</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {serviceAreas.map(city => (
                      <div key={city} className="flex-between" style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: '500' }}>{city}</span>
                        <button 
                          className="btn-icon" 
                          onClick={() => {
                            if (confirm(`Remove coverage from "${city}"? Existing orders in this city will not be deleted.`)) {
                              removeServiceArea(city);
                            }
                          }}
                          style={{ width: '28px', height: '28px', border: 'none', background: 'none', color: 'var(--danger)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add City Form */}
                <div className="glass-card" style={{ padding: '20px', cursor: 'default', height: 'fit-content' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px' }}>Add Coverage Area</h4>
                  <form onSubmit={handleAddCity} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">City Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Mysuru or Vizag" 
                        className="form-control"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                      Add City to Map
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
