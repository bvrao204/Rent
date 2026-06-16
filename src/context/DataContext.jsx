import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'SleepWell Double Bed',
    category: 'furniture',
    subCategory: 'bed',
    baseRent: 2499,
    securityDeposit: 7999,
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
    baseRent: 1999,
    securityDeposit: 5999,
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
    baseRent: 1299,
    securityDeposit: 3999,
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
    baseRent: 2999,
    securityDeposit: 9999,
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
    baseRent: 2299,
    securityDeposit: 7499,
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
    baseRent: 1799,
    securityDeposit: 5499,
    rating: 4.8,
    reviewsCount: 41,
    stock: 15,
    features: ['Ultra HD 4K resolution', 'Dolby Digital audio quality', 'Built-in Netflix/YouTube/Prime Video', '3x HDMI, 2x USB ports'],
    description: 'Experience immersive entertainment from the comfort of your rented home. With stellar 4K resolution, deep contrast levels, and seamless smart-TV interfaces, casting and streaming your favorite shows has never been simpler.'
  },
  {
    id: 'prod-7',
    name: 'Samsung 28L Convection Microwave Oven',
    category: 'appliance',
    subCategory: 'microwave',
    baseRent: 999,
    securityDeposit: 2999,
    rating: 4.7,
    reviewsCount: 28,
    stock: 14,
    features: ['28L large capacity', 'Convection + Grill + Microwave modes', '900W power output', 'Auto-cook menu with 150 presets', 'Child safety lock'],
    description: 'Cook, grill, and bake with one smart appliance. The Samsung 28L Convection Microwave brings versatile cooking modes to your rental kitchen. Features auto-cook programs, a ceramic enamel interior for easy cleaning, and an eco mode for energy savings.'
  },
  {
    id: 'prod-8',
    name: 'Voltas 1.5 Ton 5-Star Inverter Split AC',
    category: 'appliance',
    subCategory: 'ac',
    baseRent: 3499,
    securityDeposit: 12999,
    rating: 4.9,
    reviewsCount: 56,
    stock: 9,
    features: ['1.5 Ton capacity for rooms up to 180 sq ft', '5-Star BEE energy rating', 'Inverter compressor (saves 50% power)', 'Auto-clean + Wi-Fi control', 'Turbo cool in 60 seconds'],
    description: 'Beat the Indian summer heat without the burden of owning an AC. This Voltas inverter split AC cools your room rapidly, adapts power automatically to save electricity, and self-cleans its filters — all managed remotely via the SmartDiagnosis app.'
  },
  {
    id: 'prod-9',
    name: 'Kent Grand+ RO+UV Water Purifier (8L)',
    category: 'appliance',
    subCategory: 'water-purifier',
    baseRent: 799,
    securityDeposit: 1999,
    rating: 4.8,
    reviewsCount: 67,
    stock: 20,
    features: ['Multi-stage RO+UV+UF+TDS control', '8L storage tank', 'Purification rate: 20L per hour', 'Mineral ROTO Technology', 'Zero water wastage model'],
    description: 'Drink safe, mineral-rich water every day. The Kent Grand+ uses multi-stage purification with RO, UV, and UF filtration to remove bacteria, viruses, dissolved salts, and heavy metals. Perfect for Indian municipal and borewell water sources.'
  },
  {
    id: 'prod-10',
    name: 'Havells Adonia 15L Storage Geyser',
    category: 'appliance',
    subCategory: 'geyser',
    baseRent: 599,
    securityDeposit: 1499,
    rating: 4.6,
    reviewsCount: 33,
    stock: 18,
    features: ['15L storage capacity', '5-Star BEE rating', 'PUF insulation — stays hot for 24 hrs', 'Thermostat with overheat protection', 'Anti-siphon valve for safety'],
    description: 'Never run out of hot water again. The Havells Adonia 15L storage geyser heats water quickly and retains temperature for up to 24 hours, making it energy-efficient. Built with a corrosion-proof inner tank and multi-level safety protection for worry-free use.'
  },
  {
    id: 'prod-11',
    name: 'IFB 20L Solo Microwave Oven (20S1)',
    category: 'appliance',
    subCategory: 'microwave',
    baseRent: 599,
    securityDeposit: 1499,
    rating: 4.6,
    reviewsCount: 18,
    stock: 10,
    features: ['20L capacity perfect for small families', 'Solo Microwave mode for reheating/defrosting', '800W power output', '5 power levels', 'Jog dial controls for durability'],
    description: 'A compact, highly reliable microwave oven from IFB. Ideal for simple reheating, defrosting, and quick cooking in bachelor pads or compact kitchens.'
  },
  {
    id: 'prod-12',
    name: 'LG 1.5 Ton 5-Star Dual Inverter Split AC',
    category: 'appliance',
    subCategory: 'ac',
    baseRent: 3999,
    securityDeposit: 14999,
    rating: 4.9,
    reviewsCount: 42,
    stock: 8,
    features: ['1.5 Ton capacity', '5-Star BEE energy efficiency', 'Dual inverter compressor with AI Convertible 6-in-1 cooling', 'ADC sensors for safety', 'HD filter with anti-virus protection'],
    description: 'Beat the heat with LG\'s high-end Dual Inverter AC. The 6-in-1 convertible cooling modes allow you to adjust the cooling capacity as per your room occupancy and save electricity.'
  },
  {
    id: 'prod-13',
    name: 'Aquaguard Ritz RO+UV+Active Copper Water Purifier',
    category: 'appliance',
    subCategory: 'water-purifier',
    baseRent: 899,
    securityDeposit: 2499,
    rating: 4.7,
    reviewsCount: 29,
    stock: 12,
    features: ['RO+UV purification technology', 'Active Copper Zinc Booster technology', 'Stainless steel storage tank (5.5L)', 'Saves up to 60% water', 'LED indicators for purification status'],
    description: 'Experience the goodness of copper and zinc in pure drinking water. The Aquaguard Ritz features a durable stainless steel tank and advanced purification stages that ensure your family gets healthy, mineral-rich water.'
  },
  {
    id: 'prod-14',
    name: 'Bajaj New Shakti Neo 15L Storage Geyser',
    category: 'appliance',
    subCategory: 'geyser',
    baseRent: 499,
    securityDeposit: 1199,
    rating: 4.5,
    reviewsCount: 21,
    stock: 15,
    features: ['15L storage capacity', 'Titanium Armour technology inner tank', 'Swirl Flow technology for 20% more hot water', 'Multiple safety systems', 'BEE 4-Star energy efficiency rating'],
    description: 'A highly dependable and budget-friendly water heater from Bajaj. Features Titanium Armour coating to prevent rust and corrosion in hard water areas.'
  },
  {
    id: 'prod-15',
    name: 'LG 260L 3-Star Double Door Refrigerator',
    category: 'appliance',
    subCategory: 'fridge',
    baseRent: 2699,
    securityDeposit: 7999,
    rating: 4.8,
    reviewsCount: 19,
    stock: 0,
    features: ['Smart Inverter Compressor', 'Multi Air Flow', 'Auto Smart Connect', 'Toughened Glass Shelves', 'Moist \'N\' Fresh lattice pattern box'],
    description: 'Perfect for medium-sized families. The LG Double Door Refrigerator keeps your food fresh and drinks chilled with maximum energy efficiency.'
  },
  {
    id: 'prod-16',
    name: 'Samsung 7kg Fully Automatic Top Load Washing Machine',
    category: 'appliance',
    subCategory: 'washing-machine',
    baseRent: 1699,
    securityDeposit: 4999,
    rating: 4.7,
    reviewsCount: 31,
    stock: 0,
    features: ['Eco Bubble technology', 'Digital Inverter motor', 'Magic Filter for lint removal', 'Quick Wash program', 'Diamond drum design'],
    description: 'Make laundry effortless. This Samsung top load washer delivers a powerful wash performance while saving energy and water.'
  },
  {
    id: 'prod-17',
    name: 'OnePlus 32-inch Y Series HD Smart LED TV',
    category: 'appliance',
    subCategory: 'tv',
    baseRent: 999,
    securityDeposit: 2999,
    rating: 4.6,
    reviewsCount: 55,
    stock: 12,
    features: ['HD Resolution (1366x768)', 'Dolby Audio (20W output)', 'OxygenPlay content platform', 'Bezel-less design', 'Chromecast built-in'],
    description: 'A perfect compact television for your bedroom or studio apartment. Delivers crisp audio-visual clarity and smart connectivity.'
  },
  {
    id: 'prod-18',
    name: 'Sony Bravia 55-inch 4K Ultra HD Smart LED Google TV',
    category: 'appliance',
    subCategory: 'tv',
    baseRent: 3499,
    securityDeposit: 11999,
    rating: 4.9,
    reviewsCount: 73,
    stock: 0,
    features: ['4K Ultra HD (3840x2160)', 'X1 4K Processor', 'Google TV interface', 'Dolby Audio + Bass Reflex speaker', 'Apple AirPlay support'],
    description: 'Immerse yourself in cinematic home entertainment. Sony\'s premium 4K TV brings exceptional color depth, smart voice control, and powerful speakers.'
  }
];

const INITIAL_SERVICE_AREAS = [
  'Bangalore',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Jaipur',
  'Ahmedabad',
  'Surat',
  'Kochi',
  'Chandigarh',
  'Indore',
  'Nagpur'
];

const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    userId: 'user-renter',
    userName: 'Alex Johnson',
    userEmail: 'user@example.com',
    userPhone: '+91 98765 43210',
    productId: 'prod-2',
    productName: 'Urban Comfort 3-Seater Sofa',
    productCategory: 'furniture',
    productSubCategory: 'sofa',
    monthlyRent: 2399,
    securityDeposit: 5999,
    tenureMonths: 6,
    status: 'active',
    deliveryDate: '2026-06-01',
    deliverySlot: '10 AM - 1 PM',
    address: '14, MG Road, Apt 4B',
    city: 'Bangalore',
    zipCode: '560001',
    startDate: '2026-06-01',
    endDate: '2026-12-01',
    createdAt: '2026-05-28T14:30:00.000Z'
  },
  {
    id: 'ord-102',
    userId: 'user-renter',
    userName: 'Alex Johnson',
    userEmail: 'user@example.com',
    userPhone: '+91 98765 43210',
    productId: 'prod-4',
    productName: 'FrostFree Double Door Refrigerator (240L)',
    productCategory: 'appliance',
    productSubCategory: 'fridge',
    monthlyRent: 2999,
    securityDeposit: 9999,
    tenureMonths: 12,
    status: 'pending-delivery',
    deliveryDate: '2026-06-20',
    deliverySlot: '2 PM - 5 PM',
    address: '14, MG Road, Apt 4B',
    city: 'Bangalore',
    zipCode: '560001',
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
