import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Lock, X, Plus, Clock, Truck, ShieldCheck, Check, MapPin, Phone, 
  LogOut, Database, Inbox, AlertCircle, TrendingUp, Coins, Search, Send, 
  ChevronRight, Star, Eye, EyeOff, Heart, User, Mail, Calendar, Users, Flame,
  Activity, ArrowLeft, ShoppingBag
} from 'lucide-react';
import { MENU_ITEMS, MOCK_ORDERS, TESTIMONIALS } from './data';
import { MenuItem, MockOrder } from './types';
// @ts-ignore
import brandLogo from './enmlnyxa.png';
// @ts-ignore
import classicFudgyBox from './Classic Pure Fudgy Box.png';
// @ts-ignore
import menuImage1 from './Menu1.png';
// @ts-ignore
import menuImage2 from './Menu2.png';
// @ts-ignore
import menuImage3 from './Menu3.png';
// @ts-ignore
import menuImage4 from './Menu4.png';
// @ts-ignore
import menuImage5 from './Menu5.png';
// @ts-ignore
import menuImage6 from './Menu6.png';
// @ts-ignore
import menuImage7 from './Menu7.png';
// @ts-ignore
import menuImage8 from './Menu8.png';
// @ts-ignore
import menuImage9 from './Menu9.png';
// @ts-ignore
import menuImage10 from './Menu10.png';
// @ts-ignore
import menuImage11 from './Menu11.png';
// @ts-ignore
import capImage1 from './CAP.png';
// @ts-ignore
import capImage2 from './CAP1.png';
// @ts-ignore
import capImage3 from './CAP2.png';
// @ts-ignore
import capImage4 from './CAP3.png';

export default function App() {
  // Storefront state
  const [activeCategory, setActiveCategory] = useState<'all' | 'fudgy' | 'tubs' | 'loaves'>('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const MENU_IMAGE_MAP: Record<string, string> = {
    'fudgy-1': menuImage1,
    'fudgy-2': menuImage2,
    'fudgy-3': menuImage3,
    'fudgy-4': menuImage4,
    'fudgy-5': menuImage5,
    'tub-1': menuImage6,
    'tub-2': menuImage7,
    'loaf-1': menuImage8,
    'loaf-2': menuImage9,
    'loaf-3': menuImage10,
    'loaf-4': menuImage11
  };

  // Customer Session & Tracking states
  interface UserProfile {
    name: string;
    phone: string;
    email: string;
    joinedDate: string;
  }

  interface WhatsAppOrderEntry {
    id: string;
    userName: string;
    userPhone: string;
    userEmail: string;
    productName: string;
    price: number;
    timestamp: string;
  }

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fbb_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('fbb_registered_users');
    if (saved) return JSON.parse(saved);
    const defaults: UserProfile[] = [
      { name: 'Karan Malhotra', email: 'karan@gmail.com', phone: '9876543210', joinedDate: '2026-06-20' },
      { name: 'Sneha Kapoor', email: 'sneha.k@yahoo.com', phone: '9988776655', joinedDate: '2026-06-22' },
      { name: 'Shreya Ghoshal', email: 'shreya@music.com', phone: '9123456789', joinedDate: '2026-06-25' },
      { name: 'Aishwarya Samal', email: 'aishusami1117@gmail.com', phone: '9876543210', joinedDate: '2026-06-26' }
    ];
    localStorage.setItem('fbb_registered_users', JSON.stringify(defaults));
    return defaults;
  });

  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for login/register
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Page tracking states
  const [pageViews, setPageViews] = useState<number>(() => {
    const saved = localStorage.getItem('fbb_page_views');
    if (saved) {
      const newVal = parseInt(saved) + 1;
      localStorage.setItem('fbb_page_views', newVal.toString());
      return newVal;
    }
    const val = Math.floor(1540 + Math.random() * 50);
    localStorage.setItem('fbb_page_views', val.toString());
    return val;
  });

  const [uniqueVisitors, setUniqueVisitors] = useState<number>(() => {
    const saved = localStorage.getItem('fbb_unique_visitors');
    const visitorToken = localStorage.getItem('fbb_visitor_token');
    if (saved) {
      if (!visitorToken) {
        const token = `visitor-${Math.random()}`;
        localStorage.setItem('fbb_visitor_token', token);
        const newVal = parseInt(saved) + 1;
        localStorage.setItem('fbb_unique_visitors', newVal.toString());
        return newVal;
      }
      return parseInt(saved);
    }
    const token = `visitor-${Math.random()}`;
    localStorage.setItem('fbb_visitor_token', token);
    const val = Math.floor(412 + Math.random() * 15);
    localStorage.setItem('fbb_unique_visitors', val.toString());
    return val;
  });

  // Product popularity tracker
  const [productClicks, setProductClicks] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('fbb_product_clicks');
    if (saved) return JSON.parse(saved);
    const defaults: Record<string, number> = {
      'fudgy-1': 142,
      'fudgy-2': 98,
      'fudgy-3': 120,
      'fudgy-4': 64,
      'fudgy-5': 85,
      'tub-1': 110,
      'tub-2': 95,
      'loaf-1': 74,
      'loaf-2': 56,
      'loaf-3': 48,
      'loaf-4': 92
    };
    localStorage.setItem('fbb_product_clicks', JSON.stringify(defaults));
    return defaults;
  });

  const [productLikes, setProductLikes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('fbb_product_likes');
    if (saved) return JSON.parse(saved);
    const defaults: Record<string, number> = {
      'fudgy-1': 54,
      'fudgy-2': 32,
      'fudgy-3': 46,
      'fudgy-4': 18,
      'fudgy-5': 29,
      'tub-1': 42,
      'tub-2': 38,
      'loaf-1': 24,
      'loaf-2': 19,
      'loaf-3': 15,
      'loaf-4': 33
    };
    localStorage.setItem('fbb_product_likes', JSON.stringify(defaults));
    return defaults;
  });

  const [userLikes, setUserLikes] = useState<string[]>(() => {
    const saved = localStorage.getItem('fbb_user_likes');
    return saved ? JSON.parse(saved) : [];
  });

  const [whatsappOrdersLog, setWhatsappOrdersLog] = useState<WhatsAppOrderEntry[]>(() => {
    const saved = localStorage.getItem('fbb_wa_orders_log');
    if (saved) return JSON.parse(saved);
    const defaults: WhatsAppOrderEntry[] = [
      {
        id: 'WA-827419',
        userName: 'Aishwarya Samal',
        userPhone: '+91 98765 43210',
        userEmail: 'aishusami1117@gmail.com',
        productName: 'Triple Chocolate Fudgy Box',
        price: 249,
        timestamp: '2026-06-26 12:45 PM'
      },
      {
        id: 'WA-518290',
        userName: 'Karan Malhotra',
        userPhone: '+91 98765 43210',
        userEmail: 'karan@gmail.com',
        productName: 'Deep-Dish Overloaded Chocolate Tub',
        price: 499,
        timestamp: '2026-06-26 10:15 AM'
      },
      {
        id: 'WA-290184',
        userName: 'Sneha Kapoor',
        userPhone: '+91 99887 76655',
        userEmail: 'sneha.k@yahoo.com',
        productName: 'Oats Honey Almond Loaf',
        price: 349,
        timestamp: '2026-06-25 04:30 PM'
      }
    ];
    localStorage.setItem('fbb_wa_orders_log', JSON.stringify(defaults));
    return defaults;
  });

  // Admin tab layout
  const [adminTab, setAdminTab] = useState<'users' | 'popularity' | 'orders_log' | 'crm'>('users');

  // Trigger toast timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const trackProductClick = (productId: string) => {
    setProductClicks(prev => {
      const updated = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      localStorage.setItem('fbb_product_clicks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLikeProduct = (productId: string) => {
    const isCurrentlyLiked = userLikes.includes(productId);
    let updatedLikesList: string[];
    
    if (isCurrentlyLiked) {
      updatedLikesList = userLikes.filter(id => id !== productId);
      setProductLikes(prev => {
        const updated = { ...prev, [productId]: Math.max(0, (prev[productId] || 0) - 1) };
        localStorage.setItem('fbb_product_likes', JSON.stringify(updated));
        return updated;
      });
      setToastMessage('Item removed from your favorites.');
    } else {
      updatedLikesList = [...userLikes, productId];
      setProductLikes(prev => {
        const updated = { ...prev, [productId]: (prev[productId] || 0) + 1 };
        localStorage.setItem('fbb_product_likes', JSON.stringify(updated));
        return updated;
      });
      setToastMessage('Item added to your favorites!');
    }
    
    setUserLikes(updatedLikesList);
    localStorage.setItem('fbb_user_likes', JSON.stringify(updatedLikesList));
  };

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginPhone.trim() || !loginEmail.trim()) {
      setLoginError('All fields are required to create a profile.');
      return;
    }
    if (loginPhone.replace(/\D/g, '').length < 10) {
      setLoginError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
      setLoginError('Please enter a valid email address.');
      return;
    }

    const profile: UserProfile = {
      name: loginName.trim(),
      phone: loginPhone.trim(),
      email: loginEmail.trim(),
      joinedDate: new Date().toISOString().split('T')[0]
    };

    // Save user profile locally
    setCurrentUser(profile);
    localStorage.setItem('fbb_current_user', JSON.stringify(profile));

    // Add to registered users if not exists
    setRegisteredUsers(prev => {
      const exists = prev.some(u => u.email.toLowerCase() === profile.email.toLowerCase());
      if (exists) return prev;
      const updated = [...prev, profile];
      localStorage.setItem('fbb_registered_users', JSON.stringify(updated));
      return updated;
    });

    setLoginName('');
    setLoginPhone('');
    setLoginEmail('');
    setLoginError('');
    setIsCustomerPortalOpen(false);
    setToastMessage(`Welcome back, ${profile.name}!`);
  };

  const handleCustomerLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fbb_current_user');
    setIsCustomerPortalOpen(false);
    setToastMessage('Logged out successfully.');
  };
  
  // Admin Mode states
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isAdminPasswordModalOpen, setIsAdminPasswordModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [orders, setOrders] = useState<MockOrder[]>(() => {
    const saved = localStorage.getItem('fbb_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'All' | 'Pending' | 'Shipped' | 'Delivered'>('All');

  // Save orders to local storage when changed
  useEffect(() => {
    localStorage.setItem('fbb_orders', JSON.stringify(orders));
  }, [orders]);

  // Direct WhatsApp order redirection & tracking
  const handleOrderWhatsApp = (item: MenuItem) => {
    // 1. Increment click tracking
    trackProductClick(item.id);

    // 2. Add ledger log entry
    const newLogEntry: WhatsAppOrderEntry = {
      id: `WA-${Math.floor(100000 + Math.random() * 900000)}`,
      userName: currentUser ? currentUser.name : 'Anonymous Guest',
      userPhone: currentUser ? currentUser.phone : 'N/A',
      userEmail: currentUser ? currentUser.email : 'N/A',
      productName: item.name,
      price: item.price,
      timestamp: new Date().toLocaleString()
    };

    setWhatsappOrdersLog(prev => {
      const updated = [newLogEntry, ...prev];
      localStorage.setItem('fbb_wa_orders_log', JSON.stringify(updated));
      return updated;
    });

    // 3. Inject to operational orders list for the CRM ledger
    const randomId = `FBB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: MockOrder = {
      id: randomId,
      customerName: currentUser ? currentUser.name : 'Anonymous Guest',
      mobile: currentUser ? currentUser.phone : '9488411471',
      pincode: '560001',
      address: currentUser ? currentUser.email : 'WhatsApp Inquiry Direct',
      items: [{ name: item.name, quantity: 1, price: item.price }],
      totalAmount: item.price,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);

    // 4. Trigger WhatsApp link redirection
    const phoneNumber = '919488411471';
    const msg = `Hello FahisBrownieBee! I would like to order the ${item.name} for ₹${item.price}.${currentUser ? ` My details: ${currentUser.name} (${currentUser.phone})` : ''} Please confirm availability and delivery details.`;
    const encodedMessage = encodeURIComponent(msg);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Admin access handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Fahis@2026') {
      setIsAdminActive(true);
      setIsAdminPasswordModalOpen(false);
      setAdminPassword('');
      setAdminError('');
    } else {
      setAdminError('Invalid boutique access code. Please try again.');
    }
  };

  // Filter products by search and category
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Filter and search orders in the admin dashboard
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                            order.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
                            order.mobile.includes(adminSearch) ||
                            order.pincode.includes(adminSearch);
      
      const matchesStatus = adminStatusFilter === 'All' || order.status === adminStatusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, adminSearch, adminStatusFilter]);

  // Admin dashboard KPI summary
  const adminKPI = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    const activeInquiriesCount = orders.filter(o => o.status === 'Pending').length;
    
    const uniquePincodes = new Set(orders.map(o => o.pincode)).size;

    return {
      revenue: totalRevenue,
      activeInquiries: activeInquiriesCount,
      totalOrdersCount: orders.length,
      pincodes: uniquePincodes
    };
  }, [orders]);

  // Update order status from CRM
  const updateOrderStatus = (orderId: string, newStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Dispatch live WhatsApp update message to client from CRM
  const dispatchWhatsAppUpdate = (order: MockOrder) => {
    let statusMsg = ``;
    if (order.status === 'Pending') {
      statusMsg = `Your boutique batch slot is being prepared! We have received your order reference ${order.id}.`;
    } else if (order.status === 'Shipped') {
      statusMsg = `Exciting news! Your boutique batch has been hand-wrapped and dispatched via our cold-chain express carrier. Trace reference is active.`;
    } else if (order.status === 'Delivered') {
      statusMsg = `Our courier has delivered your premium box! We hope you absolute love your brownies. Taste The Heaven!`;
    } else if (order.status === 'Cancelled') {
      statusMsg = `Your order ${order.id} has been cancelled as requested.`;
    }

    const message = `Hello *${order.customerName}*,\n\nThis is Fahis' Brownie Bee Gourmet Concierge. 🐝✨\n\n*Update on your order ${order.id}:*\n${statusMsg}\n\n*Total Order:* ₹${order.totalAmount}\n\nThank you for choosing Fahis' Patisserie!`;
    window.open(`https://wa.me/91${order.mobile}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-espresso-950 text-amber-50/90 font-sans selection:bg-gold-500 selection:text-espresso-950 relative overflow-x-hidden pb-12">
      {/* Background radial soft lights */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] gold-glow-large -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-[120vh] right-1/4 w-[60vw] h-[60vw] gold-glow-large pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[40vw] h-[40vw] gold-glow pointer-events-none" />

      {/* FIXED LUXURY NAVBAR */}
      <nav id="luxury-navbar" className="fixed top-0 left-0 right-0 z-40 bg-espresso-black/85 backdrop-blur-xl border-b border-gold-500/10 px-4 md:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-md group-hover:scale-125 transition-transform duration-300" />
              <img 
                src={brandLogo} 
                alt="FahisBrownieBee Logo" 
                className="w-10 h-10 rounded-full object-cover border border-gold-300/30 shadow-lg relative z-10" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold tracking-wider text-gold-400">FahisBrownieBee</span>
                <span className="text-[10px] bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded border border-gold-500/20 uppercase tracking-widest hidden sm:inline-block">Elite</span>
              </div>
              <p className="text-[10px] text-amber-100/50 uppercase tracking-[0.25em] font-light font-mono">Taste The Heaven</p>
            </div>
          </a>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#hero" className="text-amber-100/60 hover:text-gold-400 transition-colors">Home</a>
            <a href="#menu-section" className="text-amber-100/60 hover:text-gold-400 transition-colors">The Menu</a>
            <a href="#philosophy" className="text-amber-100/60 hover:text-gold-400 transition-colors">Boutique Secret</a>
            <a href="#testimonials" className="text-amber-100/60 hover:text-gold-400 transition-colors">Reviews</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Customer Portal Action */}
            <button
              id="customer-portal-btn"
              onClick={() => {
                if (isAdminActive) {
                  setIsAdminActive(false);
                }
                setIsCustomerPortalOpen(true);
              }}
              title={currentUser ? "View Your Profile" : "Sign In to Patisserie Club"}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                currentUser
                  ? 'bg-gold-500/10 text-gold-400 border-gold-500/35 hover:bg-gold-500/20'
                  : 'bg-espresso-950/50 text-gold-400/80 border-gold-500/20 hover:border-gold-500/50 hover:bg-espresso-900'
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>
                {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Sign In'}
              </span>
            </button>

            {/* Admin Keyhole Action */}
            <button 
              id="admin-access-btn"
              onClick={() => {
                if (isAdminActive) {
                  // If already logged in, prompt to view or logout
                  setIsAdminActive(false);
                } else {
                  setIsAdminPasswordModalOpen(true);
                }
              }}
              title={isAdminActive ? "Exit Admin Cockpit" : "Secure Concierge Portal"}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                isAdminActive 
                  ? 'bg-gold-500 text-espresso-950 border-gold-400 shadow-md shadow-gold-500/20 hover:bg-gold-400' 
                  : 'bg-espresso-950/50 text-gold-400/80 border-gold-500/20 hover:border-gold-500/50 hover:bg-espresso-900'
              }`}
            >
              {isAdminActive ? <LogOut className="w-4.5 h-4.5" /> : <Lock className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for navbar */}
      <div className="h-16" />

      {/* ADMIN PORTAL SCREEN BANNER */}
      {isAdminActive && (
        <div className="bg-linear-to-r from-gold-600 to-amber-700 text-espresso-black py-2.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2 relative z-30">
          <Database className="w-4 h-4" />
          <span>BOUTIQUE CONTROL MODE ACTIVE: Viewing Concierge CRM Panel.</span>
          <button 
            onClick={() => setIsAdminActive(false)} 
            className="underline ml-2 hover:text-white transition-colors cursor-pointer"
          >
            Switch back to Storefront View
          </button>
        </div>
      )}

      {/* CONDITIONAL ARCHITECTURE: ADMIN LOGISTICS vs CUSTOMER PORTAL vs STOREFRONT */}
      <AnimatePresence mode="wait">
        {isAdminActive ? (
          
          /* ADMINISTRATIVE LOGISTICS PANEL (CRM COCKPIT) */
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 md:px-8 pt-8"
          >
            {/* Cockpit Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gold-500/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Live Operations Core</span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-amber-50">FBB Logistics & Analytics Cockpit</h1>
                <p className="text-xs text-amber-100/50 mt-1">Manage luxury customer inquiries, analyze real-time browsing popularity, and trace client logins.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    // Seed standard mock order
                    const randomId = `FBB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    const names = ['Karan Malhotra', 'Sneha Kapoor', 'Vivek Oberoi', 'Shreya Ghoshal'];
                    const addresses = [
                      'Flat A/12, Hiranandani Gardens, Powai, Mumbai',
                      'Row House 4, Nandi Greens, GK2, New Delhi',
                      'Penthouse 3, UB City Heights, Vittal Mallya Rd, Bangalore',
                      'Villa 19, Jubilee Hills Road No. 4, Hyderabad'
                    ];
                    const randomName = names[Math.floor(Math.random() * names.length)];
                    const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
                    
                    const newOrder: MockOrder = {
                      id: randomId,
                      customerName: randomName,
                      mobile: '9488411471',
                      pincode: '400076',
                      address: randomAddress,
                      items: [{ name: 'Triple Chocolate Fudgy Box', quantity: 2, price: 249 }],
                      totalAmount: 498,
                      status: 'Pending',
                      date: new Date().toISOString().split('T')[0]
                    };
                    setOrders(prev => [newOrder, ...prev]);
                    setToastMessage('Simulated customer order injected successfully.');
                  }}
                  className="bg-espresso-900 border border-gold-500/20 text-gold-400 text-xs py-2 px-4 rounded-lg hover:border-gold-500 hover:bg-espresso-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Simulate Order
                </button>

                <button
                  onClick={() => setIsAdminActive(false)}
                  className="bg-linear-to-r from-gold-500 to-amber-600 text-espresso-black text-xs font-bold py-2 px-4 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Exit Admin
                </button>
              </div>
            </div>

            {/* ADMIN TAB BAR */}
            <div className="flex border-b border-gold-500/10 mb-6 overflow-x-auto gap-2">
              {[
                { id: 'users', label: '👥 User Analytics' },
                { id: 'popularity', label: '❤️ Product Popularity' },
                { id: 'orders_log', label: '💬 WhatsApp Orders Log' },
                { id: 'crm', label: '📦 CRM Logistics Ledger' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`py-3 px-5 text-xs font-mono font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    adminTab === tab.id
                      ? 'border-gold-500 text-gold-400 bg-gold-500/5'
                      : 'border-transparent text-amber-100/40 hover:text-amber-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT A) USER ANALYTICS */}
            {adminTab === 'users' && (
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Total Page Views */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-gold-500/10">
                    <div className="absolute top-4 right-4 text-gold-500/10">
                      <Activity className="w-12 h-12" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-amber-100/40 tracking-widest">Total Page Views</span>
                    <h3 className="text-4xl font-mono font-bold text-gold-400 mt-2">{pageViews}</h3>
                    <p className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+14.2% from previous hour</span>
                    </p>
                  </div>

                  {/* Unique Visitors */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-gold-500/10">
                    <div className="absolute top-4 right-4 text-gold-500/10">
                      <Users className="w-12 h-12" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-amber-100/40 tracking-widest">Unique Visitors</span>
                    <h3 className="text-4xl font-mono font-bold text-gold-300 mt-2">{uniqueVisitors}</h3>
                    <p className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Verified organic browsers</span>
                    </p>
                  </div>

                  {/* Registered Profiles */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-gold-500/10">
                    <div className="absolute top-4 right-4 text-gold-500/10">
                      <User className="w-12 h-12" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-amber-100/40 tracking-widest">Registered Clients</span>
                    <h3 className="text-4xl font-mono font-bold text-gold-500 mt-2">{registeredUsers.length}</h3>
                    <p className="text-[10px] font-mono text-gold-500/70 mt-2">
                      <span>Boutique Elite Club Members</span>
                    </p>
                  </div>
                </div>

                {/* Users Table */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-gold-500/10">
                  <div className="p-5 border-b border-gold-500/10 bg-espresso-black/20">
                    <h3 className="font-serif text-lg text-amber-50">Registered Club Member Profiles</h3>
                    <p className="text-[10px] font-mono text-amber-100/40 uppercase tracking-wider mt-0.5">Direct CRM Profile Registrations</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-espresso-black/40 border-b border-gold-500/15 text-[10px] text-amber-100/50 uppercase tracking-widest font-mono">
                          <th className="p-4 pl-6">Client Name</th>
                          <th className="p-4">Email Address</th>
                          <th className="p-4">Contact Phone</th>
                          <th className="p-4 pr-6 text-right">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/5 text-xs">
                        {registeredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="p-12 text-center text-amber-100/30">
                              <Users className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold-500" />
                              <p className="font-serif text-base italic">No registered client profiles logged in this session.</p>
                            </td>
                          </tr>
                        ) : (
                          registeredUsers.map((user, index) => (
                            <tr key={index} className="hover:bg-espresso-900/30 transition-colors">
                              <td className="p-4 pl-6 font-semibold text-amber-50 flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-mono text-xs uppercase">
                                  {user.name.charAt(0)}
                                </div>
                                <span>{user.name}</span>
                              </td>
                              <td className="p-4 font-mono text-amber-100/80">{user.email}</td>
                              <td className="p-4 font-mono text-gold-400/95">{user.phone}</td>
                              <td className="p-4 pr-6 text-right font-mono text-amber-100/40">{user.joinedDate}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT B) PRODUCT POPULARITY */}
            {adminTab === 'popularity' && (
              <div className="space-y-6">
                <div className="glass-panel p-5 rounded-2xl border border-gold-500/10">
                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-amber-50">Product Popularity Metric Matrix</h3>
                    <p className="text-[10px] font-mono text-amber-100/40 uppercase tracking-widest mt-0.5">Live Clicks & Favorite Hearts Logged in Background</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-espresso-black/40 border-b border-gold-500/15 text-[10px] text-amber-100/50 uppercase tracking-widest font-mono">
                          <th className="p-4 pl-6">Brownie / Loaf Selection</th>
                          <th className="p-4">Category</th>
                          <th className="p-4 text-center">Price</th>
                          <th className="p-4 text-center">💬 Total Clicks/Views</th>
                          <th className="p-4 text-center">❤️ Favorite Hearts</th>
                          <th className="p-4 pr-6">Popularity Index</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/5 text-xs">
                        {MENU_ITEMS.map((item) => {
                          const clicks = productClicks[item.id] || 0;
                          const likes = productLikes[item.id] || 0;
                          // Calculate popularity index out of 100
                          const clickValues = Object.values(productClicks).map(v => Number(v));
                          const maxClicks = Math.max(...clickValues, 1);
                          const percentage = Math.min(100, Math.round((clicks / maxClicks) * 100));

                          return (
                            <tr key={item.id} className="hover:bg-espresso-900/30 transition-colors">
                              <td className="p-4 pl-6 flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-gold-500/10 shrink-0"
                                />
                                <div>
                                  <p className="font-semibold text-amber-50">{item.name}</p>
                                  <p className="text-[10px] text-amber-100/40 truncate max-w-xs">{item.description}</p>
                                </div>
                              </td>
                              <td className="p-4 font-mono uppercase text-[10px]">
                                <span className={`px-2 py-0.5 rounded border ${
                                  item.category === 'fudgy' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                  item.category === 'tubs' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                }`}>
                                  {item.category}
                                </span>
                              </td>
                              <td className="p-4 text-center font-mono font-semibold text-gold-400">₹{item.price}</td>
                              <td className="p-4 text-center font-mono font-bold text-amber-50 text-sm">
                                {clicks}
                              </td>
                              <td className="p-4 text-center font-mono font-bold text-red-400 text-sm">
                                <div className="flex items-center justify-center gap-1">
                                  <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
                                  <span>{likes}</span>
                                </div>
                              </td>
                              <td className="p-4 pr-6">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-espresso-black/50 rounded-full h-1.5 border border-gold-500/5 overflow-hidden">
                                    <div 
                                      className="bg-linear-to-r from-gold-500 to-amber-500 h-full rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="font-mono text-[10px] text-amber-100/40">{percentage}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT C) WHATSAPP ORDERS LOG */}
            {adminTab === 'orders_log' && (
              <div className="space-y-6">
                <div className="glass-panel p-5 rounded-2xl border border-gold-500/10">
                  <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-amber-50">Direct WhatsApp Orders Ledger Log</h3>
                      <p className="text-[10px] font-mono text-amber-100/40 uppercase tracking-widest mt-0.5">Operational Ledger of Clicked Orders and Inquiries</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear the WhatsApp Orders Log?')) {
                          localStorage.removeItem('fbb_wa_orders_log');
                          setWhatsappOrdersLog([]);
                          setToastMessage('Orders ledger cleared.');
                        }
                      }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono py-1.5 px-3.5 rounded hover:bg-red-500/20 transition-all cursor-pointer uppercase tracking-wider self-start"
                    >
                      Clear Log
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-espresso-black/40 border-b border-gold-500/15 text-[10px] text-amber-100/50 uppercase tracking-widest font-mono">
                          <th className="p-4 pl-6">Log ID</th>
                          <th className="p-4">Customer Info</th>
                          <th className="p-4">Item Selected</th>
                          <th className="p-4 text-center">Value</th>
                          <th className="p-4 pr-6 text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/5 text-xs">
                        {whatsappOrdersLog.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-amber-100/30">
                              <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold-500" />
                              <p className="font-serif text-base italic">No direct WhatsApp order actions captured yet.</p>
                            </td>
                          </tr>
                        ) : (
                          whatsappOrdersLog.map((log) => (
                            <tr key={log.id} className="hover:bg-espresso-900/30 transition-colors">
                              <td className="p-4 pl-6 font-mono text-gold-400 font-bold">{log.id}</td>
                              <td className="p-4">
                                <p className="font-semibold text-amber-50">{log.userName}</p>
                                <p className="text-[10px] text-amber-100/50 font-mono mt-0.5">{log.userPhone} • {log.userEmail}</p>
                              </td>
                              <td className="p-4 font-semibold text-amber-200">{log.productName}</td>
                              <td className="p-4 text-center font-mono font-bold text-gold-400">₹{log.price}</td>
                              <td className="p-4 pr-6 text-right font-mono text-amber-100/40">{log.timestamp}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT D) CRM LOGISTICS ORDERS */}
            {adminTab === 'crm' && (
              <div className="space-y-6">
                {/* CRM FILTER BAR */}
                <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-gold-500/10">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-gold-500/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by ID, name, or pincode..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full bg-espresso-black/50 border border-gold-500/10 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-gold-500/40 text-amber-50"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                    <span className="text-[10px] font-mono uppercase text-amber-100/40 mr-2 shrink-0">Filter Status:</span>
                    {(['All', 'Pending', 'Shipped', 'Delivered'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setAdminStatusFilter(status)}
                        className={`text-[11px] font-mono px-3 py-1.5 rounded-md transition-all shrink-0 cursor-pointer ${
                          adminStatusFilter === status
                            ? 'bg-gold-500 text-espresso-black font-semibold'
                            : 'bg-espresso-black/50 text-amber-100/60 hover:text-gold-400 border border-gold-500/5'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ORDERS TABLE */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-gold-500/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-espresso-black/40 border-b border-gold-500/15 text-[10px] text-amber-100/50 uppercase tracking-widest font-mono">
                          <th className="p-4 pl-6">Order ID</th>
                          <th className="p-4">Customer Details</th>
                          <th className="p-4">Chocolate Selection</th>
                          <th className="p-4 font-mono text-right">Total Amount</th>
                          <th className="p-4 text-center">Logistics Status</th>
                          <th className="p-4 pr-6 text-right">Concierge Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/5 text-xs">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-amber-100/30">
                              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold-500" />
                              <p className="font-serif text-base italic">No boutique inquiries found matching current filters.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-espresso-900/30 transition-colors">
                              {/* Order ID */}
                              <td className="p-4 pl-6 font-mono text-gold-400/90 font-bold">
                                {order.id}
                                <div className="text-[10px] text-amber-100/30 font-light font-sans mt-1">{order.date}</div>
                              </td>
                              
                              {/* Customer Details */}
                              <td className="p-4 max-w-xs">
                                <p className="font-semibold text-amber-50">{order.customerName}</p>
                                <div className="flex items-center gap-1 text-amber-100/50 mt-1 font-mono text-[10px]">
                                  <Phone className="w-3 h-3 text-gold-500/50" />
                                  <span>{order.mobile}</span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-100/40 mt-0.5 text-[10px]">
                                  <MapPin className="w-3 h-3 text-gold-500/40 shrink-0" />
                                  <span className="truncate" title={order.address}>{order.pincode} - {order.address}</span>
                                </div>
                              </td>
                              
                              {/* Selection */}
                              <td className="p-4">
                                <ul className="space-y-1">
                                  {order.items.map((item, idx) => (
                                    <li key={idx} className="text-amber-100/80">
                                      <span className="font-mono text-gold-400 font-medium">{item.quantity}x</span> {item.name}
                                    </li>
                                  ))}
                                </ul>
                              </td>

                              {/* Total Amount */}
                              <td className="p-4 font-mono text-right text-gold-300 font-bold text-sm">
                                ₹{order.totalAmount}
                                <div className="text-[10px] text-emerald-400 font-normal mt-0.5 font-sans">Free Shipping</div>
                              </td>

                              {/* Status Select dropdown */}
                              <td className="p-4 text-center">
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                  className={`text-[11px] font-mono font-medium rounded-full px-3 py-1 focus:outline-none border border-gold-500/10 cursor-pointer ${
                                    order.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' :
                                    order.status === 'Shipped' ? 'bg-sky-500/20 text-sky-300' :
                                    order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}
                                >
                                  <option className="bg-espresso-950 text-amber-50" value="Pending">Pending</option>
                                  <option className="bg-espresso-950 text-amber-50" value="Shipped">Shipped</option>
                                  <option className="bg-espresso-950 text-amber-50" value="Delivered">Delivered</option>
                                  <option className="bg-espresso-950 text-amber-50" value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td className="p-4 pr-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => dispatchWhatsAppUpdate(order)}
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-1.5 px-3 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                                    title="Send live WhatsApp status notification"
                                  >
                                    <Send className="w-3 h-3" />
                                    WhatsApp Notify
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-espresso-black/20 p-4 border-t border-gold-500/5 text-center text-[10px] text-amber-100/40 font-mono">
                    Showing {filteredOrders.length} of {orders.length} unique luxury inquiries registered in client local storage database.
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        ) : isCustomerPortalOpen ? (
          
          /* FULL-SCREEN CUSTOMER PORTAL / SIGN-IN PAGE */
          <motion.div
            key="customer-portal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto px-4 pt-12 pb-24"
          >
            {/* Back Header */}
            <div className="flex items-center gap-2.5 mb-8">
              <button
                onClick={() => setIsCustomerPortalOpen(false)}
                className="p-2.5 rounded-full bg-espresso-black/60 border border-gold-500/15 text-gold-400 hover:text-gold-300 hover:border-gold-500/30 transition-all cursor-pointer flex items-center justify-center shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-500">Elite Patisserie Club</span>
                <h1 className="text-xl font-serif font-bold text-amber-50">Customer Concierge Portal</h1>
              </div>
            </div>

            {!currentUser ? (
              /* REGISTRATION / LOGIN GLASSMORPHIC FORM */
              <div className="glass-panel max-w-md mx-auto rounded-3xl overflow-hidden border border-gold-500/15 shadow-2xl relative">
                {/* Visual Glows inside form */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="p-8 border-b border-gold-500/10 bg-espresso-black/40 text-center">
                  <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/25 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <User className="w-6 h-6 text-gold-400 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-amber-50">Create Gourmet Profile</h3>
                  <p className="text-xs text-amber-100/50 mt-1.5 leading-relaxed">
                    Join our exclusive Patisserie Club to receive personalized greetings, bookmark favorites, and trace bespoke deliveries.
                  </p>
                </div>

                <form onSubmit={handleCustomerLogin} className="p-8 space-y-5">
                  {loginError && (
                    <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2.5 px-4 rounded-xl font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </p>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1.5">
                      Client Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gold-500/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        className="w-full bg-espresso-black/50 border border-gold-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold-500/50 text-amber-50 placeholder:text-amber-100/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1.5">
                      Indian Contact Phone (+91) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gold-500/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full bg-espresso-black/50 border border-gold-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold-500/50 text-amber-50 placeholder:text-amber-100/20 transition-all font-mono"
                      />
                    </div>
                    <p className="text-[9px] text-amber-100/30 font-mono mt-1">Used to verify and sync direct WhatsApp orders.</p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gold-500/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="E.g., client@domain.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-espresso-black/50 border border-gold-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold-500/50 text-amber-50 placeholder:text-amber-100/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-gold-500 to-amber-600 text-espresso-black font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Activate Club Account
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCustomerPortalOpen(false)}
                      className="w-full mt-2.5 py-2 text-[10px] text-amber-100/40 uppercase tracking-widest hover:text-gold-400 font-mono"
                    >
                      Browse Storefront Anonymously
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* ALREADY LOGGED IN: VIEW PROFILE DETAIL CARD & FAVORITED LIKED ITEMS */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card Column */}
                <div className="md:col-span-1 space-y-6">
                  <div className="glass-panel p-6 rounded-3xl border border-gold-500/15 relative overflow-hidden shadow-xl text-center bg-espresso-black/20">
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-mono text-2xl uppercase mx-auto mb-4">
                      {currentUser.name.charAt(0)}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-amber-50">{currentUser.name}</h3>
                    <span className="text-[9px] bg-gold-500/10 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono inline-block mt-1">Patisserie Patron</span>

                    <div className="mt-6 space-y-3.5 text-left border-t border-gold-500/10 pt-6 text-xs text-amber-100/70 font-mono">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gold-500/50 shrink-0" />
                        <span className="truncate" title={currentUser.email}>{currentUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gold-500/50 shrink-0" />
                        <span>{currentUser.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-100/40">
                        <Calendar className="w-3.5 h-3.5 text-gold-500/30 shrink-0" />
                        <span>Joined: {currentUser.joinedDate}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold-500/10 mt-6 flex flex-col gap-2">
                      <button
                        onClick={() => setIsCustomerPortalOpen(false)}
                        className="w-full bg-linear-to-r from-gold-500 to-amber-600 text-espresso-black text-xs font-bold py-2.5 px-4 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                      >
                        Browse Storefront
                      </button>

                      <button
                        onClick={handleCustomerLogout}
                        className="w-full bg-espresso-black/50 border border-red-500/20 hover:border-red-500/50 text-red-400 text-xs font-mono py-2 rounded-full transition-all cursor-pointer"
                      >
                        Logout Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* Liked Items Column */}
                <div className="md:col-span-2 space-y-6">
                  <div className="glass-panel p-6 rounded-3xl border border-gold-500/15 min-h-87.5 bg-espresso-black/10">
                    <div className="border-b border-gold-500/10 pb-4 mb-5">
                      <h3 className="font-serif text-lg text-amber-50 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>Your Favorite Selections</span>
                      </h3>
                      <p className="text-[10px] font-mono text-amber-100/40 uppercase tracking-wider mt-0.5">Quick order access to bookmarked items</p>
                    </div>

                    {userLikes.length === 0 ? (
                      <div className="text-center py-12 text-amber-100/30 max-w-sm mx-auto">
                        <Heart className="w-10 h-10 mx-auto mb-3 opacity-20 text-gold-500" />
                        <p className="font-serif text-base italic text-amber-50/70">Your curated favorite list is empty.</p>
                        <p className="text-xs text-amber-100/40 mt-1 leading-relaxed">
                          Browse our slow-baked chocolate menu and tap the Heart icon on any brownie box, tub, or loaf to add it here.
                        </p>
                        <button
                          onClick={() => setIsCustomerPortalOpen(false)}
                          className="mt-5 text-gold-400 hover:text-gold-300 text-xs font-mono border-b border-gold-500/20 pb-0.5"
                        >
                          Discover Signature Creations
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MENU_ITEMS.filter(item => userLikes.includes(item.id)).map(item => (
                          <div 
                            key={item.id} 
                            className="bg-espresso-black/30 border border-gold-500/5 rounded-2xl p-4 flex gap-3 hover:border-gold-500/20 transition-all"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-lg object-cover border border-gold-500/10 shrink-0"
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <h4 className="font-serif font-bold text-sm text-amber-50 truncate">{item.name}</h4>
                                <span className="font-mono text-xs text-gold-400">₹{item.price}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2 mt-2">
                                <button
                                  onClick={() => handleLikeProduct(item.id)}
                                  className="text-[10px] text-red-400 font-mono hover:underline cursor-pointer"
                                >
                                  Remove
                                </button>
                                <button
                                  onClick={() => handleOrderWhatsApp(item)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer"
                                >
                                  Order 💬
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        ) : (
          
          /* LUXURY CUSTOMER-FACING STOREFRONT VIEW */
          <div key="storefront">
            
            {/* HERO MODULE */}
            <header id="hero" className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24 text-center relative">
              {/* Floating aesthetic badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-espresso-black/60 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8 font-mono shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span>100% Eggless • Standalone Boutique Batches</span>
              </motion.div>

              {/* Slogan & Title with dynamic shine */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white mb-6 leading-[1.1]"
              >
                Indulge In The <br/>
                <span className="shimmer-text italic font-normal">Heavenly Chocolate</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl mx-auto text-base md:text-lg text-amber-50/70 font-light leading-relaxed mb-10"
              >
                Welcome to <span className="font-bold text-gold-400">FahisBrownieBee</span>. We slow-bake high-cocoa fudgy boxes, deep-dish chocolate tubs, and therapeutic wellness loaves in artisanal single-batches. Prepared completely fresh and shipped cold-chain across India.
              </motion.p>

              {/* Call to Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <a 
                  href="#menu-section"
                  className="w-full sm:w-auto bg-linear-to-r from-gold-500 via-gold-400 to-amber-600 text-espresso-black font-bold px-8 py-4 rounded-full shadow-xl shadow-gold-500/10 hover:shadow-gold-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
                >
                  Reserve Your Boutique Box
                </a>
                <a 
                  href="#philosophy"
                  className="w-full sm:w-auto bg-espresso-black/50 border border-gold-500/20 text-gold-400 px-8 py-4 rounded-full hover:bg-espresso-900/50 hover:border-gold-500/40 transition-all text-sm tracking-wider uppercase cursor-pointer"
                >
                  Our Secret Process
                </a>
              </motion.div>

              {/* Core luxury values bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 bg-espresso-black/40 backdrop-blur-md rounded-3xl p-6 border border-gold-500/10">
                <div className="flex items-center gap-4 p-4 text-left border-b md:border-b-0 md:border-r border-gold-500/10">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shrink-0 text-gold-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-amber-50 text-sm">100% Eggless Purity</h3>
                    <p className="text-[11px] text-amber-100/50 mt-1">Sake-certified pure vegetarian ingredients without compromise on rich density.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 text-left border-b md:border-b-0 md:border-r border-gold-500/10">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shrink-0 text-gold-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-amber-50 text-sm">Fresh Standalone Batches</h3>
                    <p className="text-[11px] text-amber-100/50 mt-1">Baked strictly on order in micro-baker runs to preserve melting texture.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shrink-0 text-gold-400">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-amber-50 text-sm">Express Pan-India Logistics</h3>
                    <p className="text-[11px] text-amber-100/50 mt-1">Guaranteed temperature-controlled shipping to reach your doorstep moist and perfect.</p>
                  </div>
                </div>
              </div>
            </header>

            {/* PRODUCT CATALOGUE MODULE */}
            <section id="menu-section" className="max-w-7xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">Curated Chocolate Masterpieces</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 mt-2">Explore Our Signature Menu</h2>
                <p className="text-xs text-amber-100/50 mt-2">Every box is hand-wrapped, wax-sealed, and prepared by Fahis with utmost gourmet culinary care.</p>
                
                {/* Search Menu Input */}
                <div className="relative mt-6 max-w-md mx-auto">
                  <Search className="w-4 h-4 text-gold-500/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search brownie signature boxes or loaves..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-espresso-black/60 border border-gold-500/10 focus:border-gold-500/30 rounded-full pl-10 pr-4 py-2.5 text-xs focus:outline-none text-amber-50 transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-100/50 hover:text-gold-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* MENU CATEGORY SWITCHER TABS */}
              <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-4 max-w-2xl mx-auto">
                {[
                  { id: 'all', label: 'All Creations ✨' },
                  { id: 'fudgy', label: 'Signature Fudgy ✨' },
                  { id: 'tubs', label: 'Deep-Dish Tubs 🔥' },
                  { id: 'loaves', label: 'Nutritious Loaves 🌿' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`text-xs font-medium px-5 py-3 rounded-full uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                      activeCategory === tab.id
                        ? 'bg-linear-to-r from-gold-500 to-amber-600 text-espresso-black font-semibold border-gold-400 shadow-md shadow-gold-500/10'
                        : 'bg-espresso-black/40 text-amber-100/60 hover:text-gold-400 border-gold-500/5 hover:border-gold-500/15'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ITEM CATALOGUE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredMenuItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.01] hover:border-gold-500/35 hover:shadow-xl hover:shadow-gold-500/5"
                    >
                      {/* Product Image Box */}
                      <div className="relative h-64 overflow-hidden bg-espresso-black">
                        {item.tag && (
                          <span className="absolute top-4 left-4 z-10 bg-espresso-black/85 backdrop-blur-md text-gold-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-gold-500/25">
                            {item.tag}
                          </span>
                        )}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-4 left-4 h-2.5 w-2.5 rounded-full bg-gold-300/80 blur-sm animate-pulse" />
                          <div className="absolute top-14 right-10 h-2 w-2 rotate-45 rounded-sm bg-amber-200/90 blur-sm" />
                          <div className="absolute bottom-10 left-10 h-2 w-2 rounded-full bg-amber-200/90 blur-sm" />
                          <div className="absolute bottom-16 right-6 h-2 w-2 rotate-45 rounded-sm bg-gold-200/80 blur-sm" />
                          <div className="absolute left-1/2 top-20 h-1.5 w-1.5 rounded-full bg-gold-100/80 blur-sm" />
                        </div>
                        <img
                          src={MENU_IMAGE_MAP[item.id] || item.image}
                          alt={item.name}
                          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay Gradient on Image */}
                        <div className="absolute inset-0 z-20 bg-linear-to-t from-espresso-black via-transparent to-transparent opacity-60" />
                        
                        {/* Elegant Feature Tags on Hover overlay */}
                        <div className="absolute inset-0 bg-espresso-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 text-left">
                          <p className="text-[10px] font-mono text-gold-400 uppercase tracking-widest mb-2">Boutique Highlights</p>
                          <h4 className="font-serif text-lg font-bold text-amber-50 mb-4">{item.name}</h4>
                          <ul className="space-y-2">
                            {item.features.map((feat, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-amber-100/80">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                          <button 
                            onClick={() => {
                              setSelectedProduct(item);
                              trackProductClick(item.id);
                            }}
                            className="mt-6 text-gold-400 hover:text-gold-300 text-xs font-mono flex items-center gap-1 cursor-pointer self-start border-b border-gold-500/20 pb-0.5"
                          >
                            Read complete recipe credentials <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="font-serif text-xl font-bold text-amber-50 group-hover:text-gold-400 transition-colors">
                              {item.name}
                            </h3>
                            <span className="font-mono text-lg font-semibold text-gold-400 tracking-tight shrink-0">
                              ₹{item.price}
                            </span>
                          </div>
                          
                          <p className="text-xs text-amber-100/60 line-clamp-2 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        {/* Actions Row */}
                        <div className="pt-4 border-t border-gold-500/5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                setSelectedProduct(item);
                                trackProductClick(item.id);
                              }}
                              className="text-amber-100/40 hover:text-gold-400 text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                            >
                              Details
                            </button>

                            <button
                              onClick={() => handleLikeProduct(item.id)}
                              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                                userLikes.includes(item.id)
                                  ? 'bg-red-500/20 text-red-500 border-red-500/35 shadow-sm shadow-red-500/10'
                                  : 'text-amber-100/30 hover:text-red-400 border-transparent hover:border-gold-500/10 hover:bg-espresso-900/50'
                              }`}
                              title={userLikes.includes(item.id) ? "Unlike item" : "Like item"}
                            >
                              <Heart className={`w-3.5 h-3.5 ${userLikes.includes(item.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleOrderWhatsApp(item)}
                            className="bg-espresso-950 hover:bg-emerald-600 hover:text-white text-emerald-400 border border-emerald-500/20 hover:border-emerald-500 text-xs py-2 px-4.5 rounded-full font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/20 hover:shadow-emerald-500/20"
                          >
                            Order via WhatsApp 💬
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* ARTISANAL PHILOSOPHY EXPOSE */}
            <section id="philosophy" className="bg-espresso-black/60 border-y border-gold-500/10 py-20 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Visual Representation */}
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-tr from-gold-500/10 to-transparent rounded-3xl" />
                  <img
                    src={classicFudgyBox}
                    alt="Classic Pure Fudgy Box"
                    className="rounded-3xl border border-gold-500/20 object-cover w-full h-100"
                  />
                  {/* Circular Gold Seal Graphic overlay */}
                  <div className="absolute -bottom-6 -right-6 bg-espresso-950 border border-gold-500 p-4 rounded-full shadow-2xl flex flex-col items-center justify-center w-28 h-28">
                    <p className="text-[7px] text-gold-400 uppercase tracking-widest font-mono text-center">Bespoke Gold</p>
                    <p className="font-serif font-black text-amber-50 text-xs">WAX SEAL</p>
                    <p className="text-[7px] text-amber-100/50 uppercase tracking-widest font-mono mt-1">Certified Fresh</p>
                  </div>
                </div>

                {/* Conceptual Scribe */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">Pure Craftsmanship</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 mt-2">Baked Strictly to Order</h2>
                  <p className="text-sm text-amber-100/70 mt-4 leading-relaxed">
                    At FahisBrownieBee, we discard mass production. We believe baking chocolate is a sacred culinary practice. Each Signature Fudgy Box and Deep-Dish Tub is whipped by hand, slow-baked to coordinate the optimal moisture balance, and shipped directly from our isolated boutique kitchen.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="border-l border-gold-500/30 pl-4">
                      <p className="font-serif text-2xl font-bold text-gold-400">74%</p>
                      <p className="text-xs text-amber-100/50 mt-1 uppercase tracking-wider font-mono">Single-Origin Cocoa</p>
                    </div>
                    <div className="border-l border-gold-500/30 pl-4">
                      <p className="font-serif text-2xl font-bold text-gold-400">Zero</p>
                      <p className="text-xs text-amber-100/50 mt-1 uppercase tracking-wider font-mono">Refined White Sugars in Loaves</p>
                    </div>
                    <div className="border-l border-gold-500/30 pl-4">
                      <p className="font-serif text-2xl font-bold text-gold-400">100%</p>
                      <p className="text-xs text-amber-100/50 mt-1 uppercase tracking-wider font-mono">Eggless Vegetarian Purity</p>
                    </div>
                    <div className="border-l border-gold-500/30 pl-4">
                      <p className="font-serif text-2xl font-bold text-gold-400">Express</p>
                      <p className="text-xs text-amber-100/50 mt-1 uppercase tracking-wider font-mono">Pan-India Cold Dispatch</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TESTIMONIAL CAROUSEL */}
            <section id="testimonials" className="max-w-7xl mx-auto px-4 md:px-8 py-24 scroll-mt-20">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">Words of Devotion</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 mt-2">Connoisseur Endorsements</h2>
                <p className="text-xs text-amber-100/50 mt-2">Real testimonials from customers across metropolitan India who have tasted our chocolate heaven.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="glass-panel p-8 rounded-3xl flex flex-col justify-between relative">
                    {/* Stars rating */}
                    <div className="flex items-center gap-1 text-gold-400 mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-sm text-amber-100/80 italic leading-relaxed mb-6 font-serif">
                      "{t.quote}"
                    </blockquote>

                    <div>
                      <h4 className="font-serif font-bold text-amber-50 text-sm">{t.name}</h4>
                      <div className="flex items-center justify-between text-[11px] text-amber-100/40 mt-1 uppercase tracking-wider font-mono">
                        <span>{t.role}</span>
                        <span className="text-gold-500/70">{t.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INSTAGRAM GALLERY SECTION */}
            <section id="instagram-gallery" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-gold-500/10">
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">Sensory Showcase</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-50 mt-2">Captured in the Wild</h2>
                <p className="text-xs text-amber-100/50 mt-2">Follow our sensory dessert chronicle on Instagram <a href="https://instagram.com/FahisBrownieBee" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">@FahisBrownieBee</a></p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    image: capImage1,
                    tag: "#FahisBrownieBee",
                    desc: "Perfect fudgy crinkle-top brownies stacked with gold luster dust"
                  },
                  {
                    image: capImage2,
                    tag: "#TasteTheHeaven",
                    desc: "Sensory warm chocolate lava tub slow-baked with pure cocoa butter"
                  },
                  {
                    image: capImage3,
                    tag: "#EgglessLuxury",
                    desc: "Artisan single-origin dark chocolate bar shards ready for boutique batches"
                  },
                  {
                    image: capImage4,
                    tag: "#BoutiqueBakes",
                    desc: "Velvety liquid chocolate cascade over fresh hand-whipped ragi loaf"
                  }
                ].map((post, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-2xl border border-gold-500/10 aspect-square bg-espresso-black">
                    <img 
                      src={post.image} 
                      alt={post.desc}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-espresso-black via-espresso-black/40 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="text-[10px] font-mono text-gold-400 font-bold">{post.tag}</span>
                      <p className="text-[11px] text-amber-50 mt-1 leading-relaxed font-sans line-clamp-2">{post.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-gold-500/10 mt-24 pt-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={brandLogo} 
                alt="FahisBrownieBee Logo" 
                className="w-10 h-10 rounded-full object-cover border border-gold-300/30 shadow-lg" 
              />
              <span className="font-serif text-xl font-bold tracking-wider text-gold-400">FahisBrownieBee</span>
            </div>
            <p className="text-xs text-amber-100/50 max-w-sm leading-relaxed mb-6">
              The premier online micro-patisserie hand-crafting 100% eggless standalone chocolate brownie boxes, decadent deep-dish tubs, and health-centric Ayurvedic wellness loaves.
            </p>
            <div className="text-xs text-gold-400 font-mono">
              Slogan: <span className="italic font-serif text-amber-100">"Taste The Heaven"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold-400 mb-4">The Patisserie</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu-section" className="text-amber-100/50 hover:text-gold-400 transition-colors">Signature Fudgy Box</a></li>
              <li><a href="#menu-section" className="text-amber-100/50 hover:text-gold-400 transition-colors">Deep-Dish Chocolate Tub</a></li>
              <li><a href="#menu-section" className="text-amber-100/50 hover:text-gold-400 transition-colors">Oats Honey Almond Loaf</a></li>
              <li><a href="#menu-section" className="text-amber-100/50 hover:text-gold-400 transition-colors">Ragi Walnut Country Loaf</a></li>
              <li><a href="#menu-section" className="text-amber-100/50 hover:text-gold-400 transition-colors">Postnatal Lactation Special</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold-400 mb-4">Gourmet Concierge</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2 text-amber-100/60">
                <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>+91 9488411471</span>
              </li>
              <li className="flex items-center gap-2 text-amber-100/60">
                <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>Standalone Boutique, India</span>
              </li>
              <li className="flex items-center gap-2 text-gold-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span className="font-mono text-[10px]">Active baking slots daily</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-gold-500/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-amber-100/30 font-mono">
          <p>© 2026 FahisBrownieBee Patisserie. Shipped freshly baked from boutique ovens across India. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>100% Eggless Certified</span>
            <span>•</span>
            <button 
              onClick={() => setIsAdminPasswordModalOpen(true)}
              className="text-amber-100/40 hover:text-gold-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              Concierge Access
            </button>
          </div>
        </div>
      </footer>








      {/* BOUTIQUE ADMIN PASSWORD MODAL */}
      <AnimatePresence>
        {isAdminPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAdminPasswordModalOpen(false);
                setAdminPassword('');
                setAdminError('');
              }}
              className="absolute inset-0 bg-espresso-black"
            />

            {/* Password Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-espresso-950 border border-gold-500/20 rounded-3xl p-6 shadow-2xl z-10"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-amber-50">Concierge Authentication</h3>
                <p className="text-[10px] text-amber-100/40 uppercase tracking-widest font-mono mt-1">Authorized Patisserie Staff Only</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showAdminPassword ? "text" : "password"}
                    placeholder="Enter boutique access token..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-espresso-black/60 border border-gold-500/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-500 text-amber-50 font-mono text-center tracking-widest placeholder:tracking-normal placeholder:text-amber-100/20"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-100/40 hover:text-gold-400"
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {adminError && (
                  <p className="text-[10px] text-red-400 font-mono text-center flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{adminError}</span>
                  </p>
                )}

                <p className="text-[9px] text-amber-100/30 font-mono text-center">
                  Secret Hint for testing: <span className="text-gold-500/80 underline select-all">Fahis@2026</span>
                </p>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminPasswordModalOpen(false);
                      setAdminPassword('');
                      setAdminError('');
                    }}
                    className="w-1/2 bg-espresso-black/50 border border-gold-500/10 text-amber-100/50 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider hover:text-gold-400 hover:border-gold-500/30 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 bg-linear-to-r from-gold-500 to-amber-600 text-espresso-black font-bold py-2.5 rounded-full text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 shadow-md shadow-gold-500/10 cursor-pointer"
                  >
                    Authorize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* RECIPE DETAIL MODAL DRAWER */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-espresso-black"
            />

            {/* Detail Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-espresso-950 border border-gold-500/20 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left Image Column */}
              <div className="h-64 md:h-full relative bg-espresso-black">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-espresso-950 via-transparent to-transparent opacity-60" />
              </div>

              {/* Right Description Column */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-espresso-black/60 border border-gold-500/15 text-amber-100/60 hover:text-gold-400 transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>

                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-400">Recipe Credentials</span>
                  <h3 className="font-serif text-2xl font-bold text-amber-50 mt-1 mb-3">{selectedProduct.name}</h3>
                  <p className="text-xs text-amber-100/70 leading-relaxed mb-6">{selectedProduct.description}</p>
                  
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2.5">Boutique Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-amber-100/80">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gold-500/10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-mono text-amber-100/40 uppercase tracking-widest">Boutique Price</p>
                    <p className="font-mono text-xl font-bold text-gold-400">₹{selectedProduct.price}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleOrderWhatsApp(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider shadow-md shadow-emerald-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Order via WhatsApp 💬
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
