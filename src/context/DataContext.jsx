import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'SleepWell Double Bed',
    category: 'furniture',
    subCategory: 'bed',
    baseRent: 29, // for 12+ months
    securityDeposit: 99,
    rating: 4.8,
    reviewsCount: 24,
    stock: 12,
    features: ['Solid wood frame', 'Premium memory foam mattress included', 'Under-bed storage drawers', 'Easy assembly design'],
    description: 'Enjoy a restful night sleep with the SleepWell Double Bed. Crafted from durable engineered wood with a sleek walnut finish, this bed features a supportive orthopaedic mattress and spacious compartments underneath to store bedding essentials out of sight.'
  },
  {
    id: 'prod-2',
    name: 'Urban Comfort 3-Seater Sofa',
    category: 'furniture',
    subCategory: 'sofa',
    baseRent: 24,
    securityDeposit: 79,
    rating: 4.6,
    reviewsCount: 18,
    stock: 8,
    features: ['High-density foam cushions', 'Stain-resistant fabric', 'Solid eucalyptus wood legs', 'Includes two accent pillows'],
    description: 'Transform your living room into a cozy retreat. The Urban Comfort Sofa combines style and utility. Wrapped in premium, breathable fabric, it resists spills and stains, making it ideal for daily use by active families and pet owners.'
  },
  {
    id: 'prod-3',
    name: 'Nordic Solid Wood Dining Table',
    category: 'furniture',
    subCategory: 'table',
    baseRent: 15,
    securityDeposit: 50,
    rating: 4.7,
    reviewsCount: 12,
    stock: 5,
    features: ['Seats up to 4 people comfortably', 'Solid oak top', 'Scratch-resistant sealant', 'Compact footprint for apartments'],
    description: 'Bring clean, Scandinavian styling to your meals. Designed with small spaces in mind, this solid oak table offers plenty of legroom and a robust finish that is easy to wipe clean after family dinners or work-from-home sessions.'
  },
  {
    id: 'prod-4',
    name: 'FrostFree Double Door Refrigerator (240L)',
    category: 'appliance',
    subCategory: 'fridge',
    baseRent: 35,
    securityDeposit: 120,
    rating: 4.9,
    reviewsCount: 32,
    stock: 10,
    features: ['Smart inverter compressor', '3-Star energy rating', 'Convertible freezer zone', 'Built-in stabilizer'],
    description: 'Keep food fresh and drinks chilled with minimal electricity. This advanced refrigerator features auto-defrost, adjustable shelves, and moisture-controlled vegetable crisper sections to prolong the shelf life of fresh produce.'
  },
  {
    id: 'prod-5',
    name: 'TurboClean Front Load Washing Machine (7kg)',
    category: 'appliance',
    subCategory: 'washing-machine',
    baseRent: 29,
    securityDeposit: 100,
    rating: 4.5,
    reviewsCount: 15,
    stock: 7,
    features: ['1400 RPM spin speed', 'Steam hygienic cycle', 'Eco-Inverter motor (quiet)', '15-minute quick wash mode'],
    description: 'Make laundry day effortless. The TurboClean washing machine features dynamic drum motions and an allergen-busting steam mode that sanitizes fabrics. Smart sensor technology automatically adjusts water usage based on the load size.'
  },
  {
    id: 'prod-6',
    name: 'SmartVision 4K Ultra HD LED TV (43")',
    category: 'appliance',
    subCategory: 'tv',
    baseRent: 19,
    securityDeposit: 75,
    rating: 4.8,
    reviewsCount: 41,
    stock: 15,
    features: ['Ultra HD 4K resolution', 'Dolby Digital audio quality', 'Built-in Netflix/YouTube/Prime Video', '3x HDMI, 2x USB ports'],
    description: 'Experience immersive entertainment from the comfort of your rented home. With stellar 4K resolution, deep contrast levels, and seamless smart-TV interfaces, casting and streaming your favorite shows has never been simpler.'
  }
];

const INITIAL_SERVICE_AREAS = [
  'New York',
  'Los Angeles',
  'Chicago',
  'San Francisco',
  'Seattle',
  'Boston'
];

const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    userId: 'user-renter',
    userName: 'Alex Johnson',
    userEmail: 'user@example.com',
    userPhone: '+1 (555) 014-9821',
    productId: 'prod-2',
    productName: 'Urban Comfort 3-Seater Sofa',
    productCategory: 'furniture',
    productSubCategory: 'sofa',
    monthlyRent: 29, // 6 months option (base 24 + premium)
    securityDeposit: 79,
    tenureMonths: 6,
    status: 'active',
    deliveryDate: '2026-06-01',
    deliverySlot: '10 AM - 1 PM',
    address: '102 Greene St, Apt 4B',
    city: 'New York',
    zipCode: '10012',
    startDate: '2026-06-01',
    endDate: '2026-12-01',
    createdAt: '2026-05-28T14:30:00.000Z'
  },
  {
    id: 'ord-102',
    userId: 'user-renter',
    userName: 'Alex Johnson',
    userEmail: 'user@example.com',
    userPhone: '+1 (555) 014-9821',
    productId: 'prod-4',
    productName: 'FrostFree Double Door Refrigerator (240L)',
    productCategory: 'appliance',
    productSubCategory: 'fridge',
    monthlyRent: 35, // 12 months option (base 35)
    securityDeposit: 120,
    tenureMonths: 12,
    status: 'pending-delivery',
    deliveryDate: '2026-06-20',
    deliverySlot: '2 PM - 5 PM',
    address: '102 Greene St, Apt 4B',
    city: 'New York',
    zipCode: '10012',
    startDate: '2026-06-20',
    endDate: '2027-06-20',
    createdAt: '2026-06-12T09:15:00.000Z'
  }
];

const INITIAL_TICKETS = [
  {
    id: 'tkt-1',
    orderId: 'ord-101',
    productId: 'prod-2',
    productName: 'Urban Comfort 3-Seater Sofa',
    userId: 'user-renter',
    userName: 'Alex Johnson',
    issueType: 'damage',
    description: 'The front-left sofa leg seems slightly wobbly. Needs tightening or replacement.',
    preferredDate: '2026-06-18',
    status: 'pending',
    notes: '',
    createdAt: '2026-06-14T10:00:00.000Z'
  }
];

export const DataProvider = ({ children }) => {
  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('rentease_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Service Areas
  const [serviceAreas, setServiceAreas] = useState(() => {
    const saved = localStorage.getItem('rentease_service_areas');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_AREAS;
  });

  // Orders / Rentals
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('rentease_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Maintenance tickets
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('rentease_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  // Cart (session style, stored in localstorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('rentease_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rentease_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rentease_service_areas', JSON.stringify(serviceAreas));
  }, [serviceAreas]);

  useEffect(() => {
    localStorage.setItem('rentease_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rentease_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('rentease_cart', JSON.stringify(cart));
  }, [cart]);

  // Product actions
  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      ...productData
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const editProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart actions
  const addToCart = (product, tenureMonths) => {
    // Calculate rent based on tenure:
    // 12 months = base rent
    // 6 months = base rent * 1.2 (rounded)
    // 3 months = base rent * 1.4 (rounded)
    let rentMultiplier = 1.0;
    if (tenureMonths === 6) rentMultiplier = 1.2;
    else if (tenureMonths === 3) rentMultiplier = 1.4;

    const monthlyRent = Math.round(product.baseRent * rentMultiplier);

    const cartId = `${product.id}-${tenureMonths}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartId);
      if (existing) {
        return prev.map(item => item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: cartId,
        product,
        tenureMonths,
        monthlyRent,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.id !== cartId));
  };

  const updateCartQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout and Order actions
  const placeOrder = (user, shippingDetails) => {
    if (cart.length === 0) return { success: false, message: 'Cart is empty' };

    const newOrders = cart.map(item => {
      const start = new Date(shippingDetails.deliveryDate);
      const end = new Date(shippingDetails.deliveryDate);
      end.setMonth(start.getMonth() + item.tenureMonths);

      return {
        id: `ord-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone || shippingDetails.phone,
        productId: item.product.id,
        productName: item.product.name,
        productCategory: item.product.category,
        productSubCategory: item.product.subCategory,
        monthlyRent: item.monthlyRent,
        securityDeposit: item.product.securityDeposit,
        tenureMonths: item.tenureMonths,
        status: 'pending-delivery',
        deliveryDate: shippingDetails.deliveryDate,
        deliverySlot: shippingDetails.deliverySlot,
        address: shippingDetails.address,
        city: shippingDetails.city,
        zipCode: shippingDetails.zipCode,
        startDate: shippingDetails.deliveryDate,
        endDate: end.toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
    });

    // Reduce inventory stocks
    setProducts(prev => {
      return prev.map(p => {
        const cartItemsForProduct = cart.filter(item => item.product.id === p.id);
        const qtyToDeduct = cartItemsForProduct.reduce((total, item) => total + item.quantity, 0);
        return {
          ...p,
          stock: Math.max(0, p.stock - qtyToDeduct)
        };
      });
    });

    setOrders(prev => [...newOrders, ...prev]);
    clearCart();
    return { success: true, orders: newOrders };
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // Return product to stock
        setProducts(currProds => currProds.map(p => p.id === o.productId ? { ...p, stock: p.stock + 1 } : p));
        return { ...o, status: 'cancelled' };
      }
      return o;
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        let update = { status: newStatus };
        if (newStatus === 'active' && o.status === 'pending-delivery') {
          update.startDate = new Date().toISOString().split('T')[0];
        }
        return { ...o, ...update };
      }
      return o;
    }));
  };

  const extendRental = (orderId, extraMonths) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const currentEnd = new Date(o.endDate);
        currentEnd.setMonth(currentEnd.getMonth() + extraMonths);
        return {
          ...o,
          tenureMonths: o.tenureMonths + extraMonths,
          endDate: currentEnd.toISOString().split('T')[0]
        };
      }
      return o;
    }));
  };

  const schedulePickup = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'pending-pickup' } : o));
  };

  // Maintenance tickets actions
  const raiseTicket = (orderId, issueType, description, preferredDate) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    const newTicket = {
      id: `tkt-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId,
      productId: order.productId,
      productName: order.productName,
      userId: order.userId,
      userName: order.userName,
      issueType,
      description,
      preferredDate,
      status: 'pending',
      notes: '',
      createdAt: new Date().toISOString()
    };

    setTickets(prev => [newTicket, ...prev]);
    return { success: true, ticket: newTicket };
  };

  const updateTicketStatus = (ticketId, status, notes = '') => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, notes } : t));
  };

  // Service area actions
  const addServiceArea = (cityName) => {
    if (serviceAreas.some(area => area.toLowerCase() === cityName.toLowerCase())) {
      return { success: false, message: 'City already added' };
    }
    setServiceAreas(prev => [...prev, cityName]);
    return { success: true };
  };

  const removeServiceArea = (cityName) => {
    setServiceAreas(prev => prev.filter(area => area !== cityName));
  };

  // KPI calculations
  const getKPIs = () => {
    const active = orders.filter(o => o.status === 'active');
    const totalUtilization = products.reduce((acc, p) => acc + p.stock, 0);
    const initialTotal = INITIAL_PRODUCTS.reduce((acc, p) => acc + p.stock, 0); // rough base
    
    // MRR = sum of monthly rent of active orders
    const mrr = active.reduce((acc, o) => acc + o.monthlyRent, 0);

    // Maintenance ticket resolution rate
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    const totalTickets = tickets.length;
    const resolutionRate = totalTickets > 0 ? Math.round((resolved / totalTickets) * 100) : 100;

    return {
      activeRentals: active.length,
      pendingDeliveries: orders.filter(o => o.status === 'pending-delivery').length,
      pendingPickups: orders.filter(o => o.status === 'pending-pickup').length,
      monthlyRecurringRevenue: mrr,
      productUtilizationRate: Math.max(0, Math.min(100, Math.round(((initialTotal - totalUtilization) / initialTotal) * 100))),
      ticketResolutionRate: resolutionRate,
      totalCustomers: new Set(orders.map(o => o.userId)).size
    };
  };

  return (
    <DataContext.Provider value={{
      products,
      serviceAreas,
      orders,
      tickets,
      cart,
      addProduct,
      editProduct,
      deleteProduct,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      cancelOrder,
      updateOrderStatus,
      extendRental,
      schedulePickup,
      raiseTicket,
      updateTicketStatus,
      addServiceArea,
      removeServiceArea,
      getKPIs
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
