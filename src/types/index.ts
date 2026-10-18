export type Language = 'en' | 'bn';
export type UserRole = 'customer' | 'merchant' | 'owner';

export interface AppUser {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  address?: string;
  district?: string;
  merchantId?: string; // links to fisherman id if merchant
  businessName?: string;
  joinedDate: string;
  totalOrders?: number;
  totalSpent?: number;
}


export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  verifiedPurchase: boolean;
}

export interface Fisherman {
  id: string;
  name: string;
  nameBn: string;
  location: string;
  locationBn: string;
  avatar: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  boatName?: string;
  verified: boolean;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'sea' | 'haor' | 'fermented' | 'balachao' | 'special';
  categoryLabelBn: string;
  categoryLabelEn: string;
  pricePerKg: number;
  availableWeights: { weight: number; label: string; price: number }[]; // in grams (100g, 250g, 500g, 1000g)
  image: string;
  gallery?: string[];
  origin: string;
  originBn: string;
  fishermanId: string;
  fishermanName: string;
  fishermanLocation: string;
  rating: number;
  reviewsCount: number;
  stockKg: number;
  isChemicalFree: boolean;
  isSaltFree: boolean;
  isBestSeller?: boolean;
  isOdorSealed: boolean;
  description: string;
  descriptionBn: string;
  nutrition: {
    protein: string;
    calcium: string;
    iron: string;
    calories: string;
  };
  cookingTips: string[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedWeight: number; // in grams
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  district: string;
  fullAddress: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cod' | 'card';
  paymentTrxId?: string;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  courierName?: string;
  trackingNumber?: string;
}

export interface Recipe {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Expert';
  spiceLevel: 'Mild' | 'Medium' | 'Extra Spicy';
  image: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
  chefNotes: string;
  relatedProductId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleBn: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  summaryBn: string;
  content: string[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'fisherman' | 'system' | 'bot';
  senderName: string;
  text: string;
  timestamp: string;
  fishermanId?: string;
}
