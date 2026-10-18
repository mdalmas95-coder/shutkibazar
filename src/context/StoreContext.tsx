import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Fisherman, ChatMessage, Recipe, Language, Review, AppUser, UserRole } from '../types';
import { INITIAL_PRODUCTS, INITIAL_FISHERMEN, RECIPES_DATA } from '../data/mockData';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  products: Product[];
  fishermen: Fisherman[];
  cart: CartItem[];
  orders: Order[];
  recipes: Recipe[];
  
  // Auth & Roles
  currentUser: AppUser | null;
  users: AppUser[];
  activeView: 'store' | 'merchant' | 'owner';
  setActiveView: (view: 'store' | 'merchant' | 'owner') => void;
  login: (email: string, password?: string, designatedRole?: UserRole) => { success: boolean; message?: string };
  signup: (user: Omit<AppUser, 'id' | 'joinedDate'>, password?: string) => boolean;
  logout: () => void;
  quickSwitchRole: (role: UserRole) => void;
  updateUserProfile: (updated: Partial<AppUser>) => void;
  
  // Active Merchant
  currentMerchantId: string;
  setCurrentMerchantId: (id: string) => void;
  
  // Chat
  activeChatFisherman: Fisherman | null;
  setActiveChatFisherman: (fisherman: Fisherman | null) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, fishermanId?: string) => void;
  
  // Cart & Orders
  addToCart: (product: Product, weightGrams: number, quantity?: number) => void;
  removeFromCart: (productId: string, weightGrams: number) => void;
  updateCartQty: (productId: string, weightGrams: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => Order;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'verifiedPurchase'>) => void;
  
  // Wishlist & Promo
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: string;
  setAppliedCoupon: (coupon: string) => void;

  // Invoice & Memo
  selectedOrderForInvoice: Order | null;
  setSelectedOrderForInvoice: (order: Order | null) => void;

  // Merchant Tools
  addProductByMerchant: (newProduct: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => void;
  updateProductStock: (productId: string, newStockKg: number, newPriceKg?: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNum?: string) => void;
  registerFisherman: (fishermanData: Omit<Fisherman, 'id' | 'verified'>) => string;
  
  // Owner Platform Management Tools
  platformCommissionPercent: number;
  setPlatformCommissionPercent: (rate: number) => void;
  approveMerchant: (fishermanId: string) => void;
  deleteProductByOwner: (productId: string) => void;

  // Recipe
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'shutki_bazar_products_v3',
  ORDERS: 'shutki_bazar_orders_v3',
  CART: 'shutki_bazar_cart_v3',
  LANG: 'shutki_bazar_lang',
  CHAT: 'shutki_bazar_chat_v3',
  FISHERMEN: 'shutki_bazar_fishermen_v3',
  RECIPES: 'shutki_bazar_recipes_v3',
  USERS: 'shutki_bazar_users_v3',
  CURRENT_USER: 'shutki_bazar_current_user_v3',
  ACTIVE_VIEW: 'shutki_bazar_active_view_v3',
  COMMISSION: 'shutki_bazar_commission_v3',
  WISHLIST: 'shutki_bazar_wishlist_v3',
};

export const DEFAULT_USERS: AppUser[] = [
  {
    id: 'user-owner',
    email: 'admin@shutkibazar.com',
    name: 'Mohammad Almas',
    nameBn: 'মোহাম্মদ আলমাস (ওয়েবসাইট মালিক)',
    phone: '01700-748854',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2025-01-01',
    address: 'Shutki Bazar HQ, Tejgaon Commercial Area, Dhaka',
    district: 'Dhaka',
  },
  {
    id: 'user-merchant-1',
    email: 'jalal@shutkibazar.com',
    name: 'Jalal Uddin Majhi',
    nameBn: 'জালাল উদ্দিন মাঝি (মার্চেন্ট ও জেলে)',
    phone: '01711223344',
    role: 'merchant',
    merchantId: 'fish-1',
    businessName: "নাজিরারটেক ড্রাই ফিশ প্রসেসিং",
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2025-04-12',
    address: 'Nazirtek Ghat, Cox\'s Bazar Sadar',
    district: "Cox's Bazar",
  },
  {
    id: 'user-customer-1',
    email: 'rafiq@gmail.com',
    name: 'Rafiqul Islam',
    nameBn: 'রফিকুল ইসলাম (সম্মানিত কাস্টমার)',
    phone: '01712345678',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    joinedDate: '2026-02-15',
    address: 'House 42, Road 11, Block C, Banani, Dhaka-1213',
    district: 'Dhaka',
    totalOrders: 3,
    totalSpent: 4250,
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'bn';
  });

  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // Current logged in user (defaults to Customer Rafiqul Islam for instant browsing, can be switched or logged out)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : DEFAULT_USERS[2]; // Default to Customer
    } catch {
      return DEFAULT_USERS[2];
    }
  });

  // Active View: 'store' | 'merchant' | 'owner'
  const [activeView, setActiveView] = useState<'store' | 'merchant' | 'owner'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW);
      return (saved as any) || 'store';
    } catch {
      return 'store';
    }
  });

  const [platformCommissionPercent, setPlatformCommissionPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMISSION);
      return saved ? Number(saved) : 5; // 5% fair-trade platform commission
    } catch {
      return 5;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [fishermen, setFishermen] = useState<Fisherman[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FISHERMEN);
      return saved ? JSON.parse(saved) : INITIAL_FISHERMEN;
    } catch {
      return INITIAL_FISHERMEN;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'SB-88291',
          customerName: 'Rafiqul Islam',
          customerPhone: '01712345678',
          district: 'Dhaka',
          fullAddress: 'House 42, Road 11, Banani, Dhaka-1213',
          items: [
            {
              product: INITIAL_PRODUCTS[0],
              selectedWeight: 500,
              quantity: 1,
              price: 640,
            },
            {
              product: INITIAL_PRODUCTS[1],
              selectedWeight: 250,
              quantity: 1,
              price: 480,
            },
          ],
          subtotal: 1120,
          deliveryFee: 60,
          discount: 0,
          total: 1180,
          paymentMethod: 'bkash',
          paymentTrxId: 'BK9A72L91X',
          status: 'dispatched',
          createdAt: '2026-10-15T11:20:00Z',
          estimatedDelivery: '2026-10-18',
          courierName: 'Steadfast Courier',
          trackingNumber: 'SF-BD-99412',
        },
      ];
    } catch {
      return [];
    }
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECIPES);
      return saved ? JSON.parse(saved) : RECIPES_DATA;
    } catch {
      return RECIPES_DATA;
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'm-1',
          sender: 'fisherman',
          senderName: 'Jalal Uddin Majhi (নাজিরারটেক, কক্সবাজার)',
          text: 'আসসালামু আলাইকুম ভাই! আমাদের কক্সবাজার নাজিরারটেকের তাজা রোদে শুকানো লইট্টা ও ছুরি শুটকি গতকালই নতুন ব্যাচ নেমেছে। ১০০% বিষমুক্ত। কোনো প্রশ্ন থাকলে সরাসরি বলুন।',
          timestamp: '10:30 AM',
          fishermanId: 'fish-1',
        },
      ];
    } catch {
      return [];
    }
  });

  const [currentMerchantId, setCurrentMerchantId] = useState<string>('fish-1');
  const [activeChatFisherman, setActiveChatFisherman] = useState<Fisherman | null>(null);

  // Wishlist, Coupon, and Invoice states
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['p-1', 'p-3']; // Default sample favorites (Loitta & Rupchanda)
    } catch {
      return ['p-1', 'p-3'];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FISHERMEN, JSON.stringify(fishermen));
  }, [fishermen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMISSION, String(platformCommissionPercent));
  }, [platformCommissionPercent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth Operations
  const login = (email: string, _password?: string, designatedRole?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && (!designatedRole || u.role === designatedRole)
    );

    if (existing) {
      setCurrentUser(existing);
      if (existing.role === 'owner') {
        setActiveView('owner');
      } else if (existing.role === 'merchant') {
        setActiveView('merchant');
        if (existing.merchantId) setCurrentMerchantId(existing.merchantId);
      } else {
        setActiveView('store');
      }
      return { success: true };
    }

    // If email doesn't exist, allow quick guest creation based on designatedRole
    const fallbackUser: AppUser = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      nameBn: cleanEmail.split('@')[0],
      phone: '01710000000',
      role: designatedRole || 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
      district: 'Dhaka',
    };

    setUsers((prev) => [...prev, fallbackUser]);
    setCurrentUser(fallbackUser);
    if (fallbackUser.role === 'owner') setActiveView('owner');
    else if (fallbackUser.role === 'merchant') setActiveView('merchant');
    else setActiveView('store');

    return { success: true };
  };

  const signup = (user: Omit<AppUser, 'id' | 'joinedDate'>) => {
    const newUser: AppUser = {
      ...user,
      id: `user-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    if (newUser.role === 'merchant') {
      // Auto register a fisherman profile if not already exists
      const newFisherId = `fish-${Date.now()}`;
      const newFisher: Fisherman = {
        id: newFisherId,
        name: newUser.name,
        nameBn: newUser.nameBn,
        location: newUser.district || "Cox's Bazar",
        locationBn: newUser.district || 'কক্সবাজার',
        avatar: newUser.avatar,
        experienceYears: 5,
        specialty: 'Fresh sun-dried fish',
        bio: 'Verified artisan merchant on Shutki Bazar.',
        phone: newUser.phone,
        verified: true,
      };
      setFishermen((prev) => [...prev, newFisher]);
      setCurrentMerchantId(newFisherId);
      setActiveView('merchant');
    } else if (newUser.role === 'owner') {
      setActiveView('owner');
    } else {
      setActiveView('store');
    }

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('store');
  };

  const quickSwitchRole = (role: UserRole) => {
    const userForRole = users.find((u) => u.role === role) || DEFAULT_USERS.find((u) => u.role === role);
    if (userForRole) {
      setCurrentUser(userForRole);
      if (role === 'owner') {
        setActiveView('owner');
      } else if (role === 'merchant') {
        setActiveView('merchant');
        if (userForRole.merchantId) setCurrentMerchantId(userForRole.merchantId);
      } else {
        setActiveView('store');
      }
    }
  };

  const updateUserProfile = (updated: Partial<AppUser>) => {
    if (!currentUser) return;
    const nextUser = { ...currentUser, ...updated };
    setCurrentUser(nextUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? nextUser : u)));
  };

  // Cart Management
  const addToCart = (product: Product, weightGrams: number, quantity = 1) => {
    const weightOption = product.availableWeights.find((w) => w.weight === weightGrams);
    const unitPrice = weightOption ? weightOption.price : Math.round((product.pricePerKg * weightGrams) / 1000);

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weightGrams
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedWeight: weightGrams,
          quantity,
          price: unitPrice,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, weightGrams: number) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedWeight === weightGrams)));
  };

  const updateCartQty = (productId: string, weightGrams: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedWeight === weightGrams) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Order Placement
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>): Order => {
    const newId = `SB-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(now.getDate() + (orderData.district.toLowerCase().includes('dhaka') ? 2 : 4));

    const newOrder: Order = {
      ...orderData,
      id: newId,
      status: 'pending',
      createdAt: now.toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      courierName: 'Steadfast Logistics (সারা বাংলাদেশ ডেলিভারি)',
      trackingNumber: `BD-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = orderData.items.find((item) => item.product.id === p.id);
        if (orderedItem) {
          const orderedKg = (orderedItem.selectedWeight * orderedItem.quantity) / 1000;
          return {
            ...p,
            stockKg: Math.max(0, p.stockKg - orderedKg),
          };
        }
        return p;
      })
    );

    // Update customer stats
    if (currentUser) {
      updateUserProfile({
        totalOrders: (currentUser.totalOrders || 0) + 1,
        totalSpent: (currentUser.totalSpent || 0) + orderData.total,
      });
    }

    return newOrder;
  };

  // Reviews
  const addReview = (productId: string, review: Omit<Review, 'id' | 'date' | 'verifiedPurchase'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvg = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: parseFloat(newAvg),
          };
        }
        return p;
      })
    );
  };

  // Merchant Tools
  const addProductByMerchant = (newProd: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => {
    const created: Product = {
      ...newProd,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          userName: 'শুটকি বাজার কোয়ালিটি টিম',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'উপকূলীয় কোয়ালিটি কন্ট্রোল দ্বারা সরাসরি পরীক্ষিত ও বিষমুক্ত প্রত্যয়নকৃত।',
          location: newProd.origin,
          verifiedPurchase: true,
        },
      ],
    };
    setProducts((prev) => [created, ...prev]);
  };

  const updateProductStock = (productId: string, newStockKg: number, newPriceKg?: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedWeights = newPriceKg
            ? p.availableWeights.map((w) => ({
                ...w,
                price: Math.round((newPriceKg * w.weight) / 1000),
              }))
            : p.availableWeights;
          return {
            ...p,
            stockKg: newStockKg,
            pricePerKg: newPriceKg || p.pricePerKg,
            availableWeights: updatedWeights,
          };
        }
        return p;
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNum?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            trackingNumber: trackingNum || o.trackingNumber,
          };
        }
        return o;
      })
    );
  };

  const registerFisherman = (fishermanData: Omit<Fisherman, 'id' | 'verified'>): string => {
    const newId = `fish-${Date.now()}`;
    const newFisherman: Fisherman = {
      ...fishermanData,
      id: newId,
      verified: true,
    };
    setFishermen((prev) => [...prev, newFisherman]);
    setCurrentMerchantId(newId);
    return newId;
  };

  // Website Owner Tools
  const approveMerchant = (fishermanId: string) => {
    setFishermen((prev) =>
      prev.map((f) => (f.id === fishermanId ? { ...f, verified: true } : f))
    );
  };

  const deleteProductByOwner = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: `rec-${Date.now()}`,
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  // Chat Messenger
  const sendChatMessage = (text: string, fishermanId = 'fish-1') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: currentUser ? currentUser.nameBn : 'You (গ্রাহক)',
      text,
      timestamp: timeStr,
      fishermanId,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    const targetFisherman = fishermen.find((f) => f.id === fishermanId) || fishermen[0];
    setTimeout(() => {
      let reply = `জি ভাই, আমাদের ${targetFisherman.locationBn} থেকে সরাসরি পাঠানো হবে। কোনো ফরমালিন বা কীটনাশক নেই, প্রাকৃতিক রোদে শুকানো।`;
      const lower = text.toLowerCase();
      if (lower.includes('লবণ') || lower.includes('salt')) {
        reply = 'ভাই আমাদের লইট্টা, রূপচাঁদা ও কাঁচকি শুটকি সম্পূর্ণ লবণ ছাড়া রোদে শুকানো। রান্নার সময় স্বাভাবিক লবণ দিলেই চলবে।';
      } else if (lower.includes('গন্ধ') || lower.includes('স্মেল') || lower.includes('smell') || lower.includes('odor')) {
        reply = 'আমরা ৩ স্তরের ফুড-গ্রেড ভ্যাকুয়াম সিল পাউচ ব্যবহার করি। কুরিয়ারে বা বাসায় রাখার সময় এক ফোঁটাও গন্ধ বাইরে ছড়াবে না ইনশাল্লাহ!';
      } else if (lower.includes('কবে পাব') || lower.includes('ডেলিভারি') || lower.includes('delivery')) {
        reply = 'ঢাকা শহরের ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সারা বাংলাদেশে ৪৮-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি পৌঁছে যাবে।';
      } else if (lower.includes('বিকাশ') || lower.includes('payment') || lower.includes('টাকা')) {
        reply = 'আপনি সরাসরি বিকাশ, নগদ অথবা পার্সেল হাতে পেয়ে ক্যাশ অন ডেলিভারিতে টাকা দিতে পারবেন। কোনো ঝুঁকি নেই!';
      }

      const fisherMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'fisherman',
        senderName: `${targetFisherman.nameBn} (${targetFisherman.locationBn})`,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fishermanId,
      };
      setChatMessages((prev) => [...prev, fisherMsg]);
    }, 1000);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        products,
        fishermen,
        cart,
        orders,
        recipes,
        currentUser,
        users,
        activeView,
        setActiveView,
        login,
        signup,
        logout,
        quickSwitchRole,
        updateUserProfile,
        currentMerchantId,
        setCurrentMerchantId,
        activeChatFisherman,
        setActiveChatFisherman,
        chatMessages,
        sendChatMessage,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        addReview,
        addProductByMerchant,
        updateProductStock,
        updateOrderStatus,
        registerFisherman,
        platformCommissionPercent,
        setPlatformCommissionPercent,
        approveMerchant,
        deleteProductByOwner,
        addRecipe,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        setAppliedCoupon,
        selectedOrderForInvoice,
        setSelectedOrderForInvoice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedOrigin,
        setSelectedOrigin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
