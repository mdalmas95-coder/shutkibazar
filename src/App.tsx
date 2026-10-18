/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { MerchantDashboard } from './components/MerchantDashboard';
import { WebsiteOwnerDashboard } from './components/WebsiteOwnerDashboard';
import { AuthModal } from './components/AuthModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { MerchantChatModal } from './components/MerchantChatModal';
import { ChatbotOrderAssistant } from './components/ChatbotOrderAssistant';
import { QuickPhoneOrderModal } from './components/QuickPhoneOrderModal';
import { BlogRecipeSection } from './components/BlogRecipeSection';
import { LabCertificateModal } from './components/LabCertificateModal';
import { CustomBoxBuilderModal } from './components/CustomBoxBuilderModal';
import { ShelfLifeCalculatorModal } from './components/ShelfLifeCalculatorModal';
import { SolarWeatherTracker } from './components/SolarWeatherTracker';
import { FishermenFundSection } from './components/FishermenFundSection';
import { InvoiceModal } from './components/InvoiceModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { GoogleSearchModal } from './components/GoogleSearchModal';
import { Footer } from './components/Footer';
import { Product, Fisherman, UserRole } from './types';
import { 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  MessageSquare, 
  Crown, 
  Fish, 
  Gift, 
  Microscope, 
  Clock, 
  Sun,
  Flame,
  Award
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    language,
    products,
    fishermen,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedOrigin,
    setSelectedOrigin,
    currentUser,
    selectedOrderForInvoice,
    setSelectedOrderForInvoice,
  } = useStore();

  const isBn = language === 'bn';

  // Modal & Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isPhoneOrderOpen, setIsPhoneOrderOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCustomBoxOpen, setIsCustomBoxOpen] = useState(false);
  const [isLabCertOpen, setIsLabCertOpen] = useState(false);
  const [isShelfLifeOpen, setIsShelfLifeOpen] = useState(false);
  const [isGoogleSeoOpen, setIsGoogleSeoOpen] = useState(false);

  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('customer');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [certProduct, setCertProduct] = useState<Product | null>(null);
  const [selectedChatFisherman, setSelectedChatFisherman] = useState<Fisherman | null>(null);

  // Additional Filter Toggles
  const [onlyChemicalFree, setOnlyChemicalFree] = useState(false);
  const [onlySaltFree, setOnlySaltFree] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameBn = p.nameBn.toLowerCase().includes(q);
      const matchNameEn = p.name.toLowerCase().includes(q);
      const matchOrigin = p.origin.toLowerCase().includes(q) || p.originBn.toLowerCase().includes(q);
      const matchFisher = p.fishermanName.toLowerCase().includes(q);
      if (!matchNameBn && !matchNameEn && !matchOrigin && !matchFisher) return false;
    }

    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    if (selectedOrigin !== 'all') {
      if (!p.origin.toLowerCase().includes(selectedOrigin.toLowerCase()) && 
          !p.originBn.toLowerCase().includes(selectedOrigin.toLowerCase())) {
        return false;
      }
    }

    if (onlySaltFree && !p.isSaltFree) {
      return false;
    }

    if (onlyChemicalFree && !p.isChemicalFree) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerKg - b.pricePerKg;
    if (sortBy === 'price-desc') return b.pricePerKg - a.pricePerKg;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  const handleOpenChatWithFisherman = (fisherman: Fisherman) => {
    setSelectedChatFisherman(fisherman);
    setIsChatOpen(true);
  };

  const handleOpenRoleLogin = (role: UserRole) => {
    setAuthDefaultRole(role);
    setIsAuthOpen(true);
  };

  const handleOpenCertModal = (prod: Product) => {
    setCertProduct(prod);
    setIsLabCertOpen(true);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRecipes = () => {
    const el = document.getElementById('recipe-blog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800">
      {/* Top Navbar */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenPhoneOrder={() => setIsPhoneOrderOpen(true)}
        onOpenChat={() => {
          setSelectedChatFisherman(fishermen[0]);
          setIsChatOpen(true);
        }}
        onOpenAuth={(role) => {
          if (role) setAuthDefaultRole(role);
          setIsAuthOpen(true);
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenGoogleSeo={() => setIsGoogleSeoOpen(true)}
      />

      {/* Main View Router */}
      {activeView === 'owner' ? (
        <main className="flex-1">
          <WebsiteOwnerDashboard />
        </main>
      ) : activeView === 'merchant' ? (
        <main className="flex-1">
          <MerchantDashboard />
        </main>
      ) : (
        <main className="flex-1">
          {/* Coastal Hero Banner */}
          <HeroBanner
            onOpenPhoneOrder={() => setIsPhoneOrderOpen(true)}
            onScrollToRecipes={scrollToRecipes}
            onScrollToProducts={scrollToProducts}
          />

          {/* Flash Sale Banner with Live Countdown Timer & Instant Deals */}
          <FlashSaleBanner
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenCart={() => setIsCartOpen(true)}
          />

          {/* Coastal Solar Drying Live Weather Feed */}
          <SolarWeatherTracker />

          {/* High-Value Interactive Service Bar: Custom Box, Lab Cert, Shelf Life */}
          <section className="bg-white border-b border-slate-200 py-3 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* 3 Innovative Feature Launcher Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Custom Box Builder */}
                  <button
                    onClick={() => setIsCustomBoxOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isBn ? '🎁 নিজের শুটকি বক্স নিজে সাজান (১০% ছাড়)' : 'Build Custom Box (10% Off)'}</span>
                  </button>

                  {/* Lab Test Certificate */}
                  <button
                    onClick={() => handleOpenCertModal(products[0])}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Microscope className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isBn ? '🔬 ল্যাব টেস্ট ও বিএসটিআই সনদ' : 'BCSIR Lab Test Certificate'}</span>
                  </button>

                  {/* Shelf Life & Storage Guide */}
                  <button
                    onClick={() => setIsShelfLifeOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 text-blue-700" />
                    <span>{isBn ? '⏱️ সংরক্ষণ ও ফ্রেশনেস গাইড' : 'Storage & Freshness Guide'}</span>
                  </button>
                </div>

                {/* Account Switchers */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    {isBn ? 'লগইন:' : 'Portal:'}
                  </span>
                  <button
                    onClick={() => handleOpenRoleLogin('customer')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                  >
                    {isBn ? 'কাস্টমার' : 'Customer'}
                  </button>
                  <button
                    onClick={() => handleOpenRoleLogin('merchant')}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-[11px]"
                  >
                    {isBn ? 'মার্চেন্ট' : 'Merchant'}
                  </button>
                  <button
                    onClick={() => handleOpenRoleLogin('owner')}
                    className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold text-[11px]"
                  >
                    {isBn ? 'মালিক' : 'Owner'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sourcing Regions Quick Bar */}
          <section className="bg-slate-50 border-b border-slate-200 py-3 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4 overflow-x-auto text-xs">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>{isBn ? 'সংগ্রহ কেন্দ্র:' : 'Sourcing Hubs:'}</span>
                </span>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', labelBn: 'সকল অঞ্চল', labelEn: 'All Regions' },
                    { id: 'Nazirtek', labelBn: 'কক্সবাজার নাজিরারটেক', labelEn: "Cox's Bazar" },
                    { id: 'Dublar Char', labelBn: 'দুবলার চর (সুন্দরবন)', labelEn: 'Dublar Char' },
                    { id: 'Saint Martin', labelBn: 'সেন্টমার্টিন দ্বীপ', labelEn: "Saint Martin" },
                    { id: 'Sunamganj', labelBn: 'সুনামগঞ্জ টাঙ্গুয়ার হাওর', labelEn: 'Sunamganj Haor' },
                    { id: 'Kuakata', labelBn: 'কুয়াকাটা উপকূল', labelEn: 'Kuakata' },
                  ].map((origin) => (
                    <button
                      key={origin.id}
                      onClick={() => setSelectedOrigin(origin.id)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                        selectedOrigin === origin.id
                          ? 'bg-amber-700 text-white shadow-xs font-bold'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isBn ? origin.labelBn : origin.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Products Catalog Section */}
          <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            {/* Catalog Controls & Filters Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-[#f85606] text-xl">●</span>
                    <span>{isBn ? 'শুধু আপনার জন্য (Just For You)' : 'Just For You'}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn 
                      ? 'দারাজ স্টাইলে সরাসরি উপকূলের ঘাট থেকে বাছাইকৃত ১০০% বিষমুক্ত ও খাঁটি শুটকি।'
                      : 'Hand-picked 100% chemical-free sun-dried fish direct from coastal harbors.'}
                  </p>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">{isBn ? 'সাজান:' : 'Sort by:'}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-2 border border-slate-300 rounded-xl bg-white font-semibold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="popularity">{isBn ? 'সর্বাধিক বিক্রিত (জনপ্রিয়)' : 'Most Popular'}</option>
                    <option value="rating">{isBn ? 'সর্বোচ্চ রেটিং' : 'Highest Rated'}</option>
                    <option value="price-asc">{isBn ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
                    <option value="price-desc">{isBn ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Chips & Quality Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', labelBn: 'সব শুটকি', labelEn: 'All Dried Fish' },
                    { id: 'sea', labelBn: 'সামুদ্রিক শুটকি', labelEn: 'Marine Fish' },
                    { id: 'haor', labelBn: 'মিঠাপানির হাওর', labelEn: 'Haor Freshwater' },
                    { id: 'fermented', labelBn: 'চ্যাপা / সিদল', labelEn: 'Fermented Chepa' },
                    { id: 'balachao', labelBn: 'বালাচাও', labelEn: 'Balachao' },
                    { id: 'special', labelBn: 'স্পেশাল কম্বো', labelEn: 'Special Combos' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {isBn ? cat.labelBn : cat.labelEn}
                    </button>
                  ))}
                </div>

                {/* Filter switches: Salt-free & Chemical-free */}
                <div className="flex items-center gap-3 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 select-none">
                    <input
                      type="checkbox"
                      checked={onlyChemicalFree}
                      onChange={(e) => setOnlyChemicalFree(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{isBn ? 'শুধুমাত্র বিষমুক্ত' : 'Chemical-Free Only'}</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 select-none">
                    <input
                      type="checkbox"
                      checked={onlySaltFree}
                      onChange={(e) => setOnlySaltFree(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{isBn ? 'লবণ ছাড়া' : 'Salt-Free'}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-slate-200 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-3xl">
                  🔍
                </div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  {isBn ? 'কোনো শুটকি পাওয়া যায়নি' : 'No dried fish matched your filter'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isBn
                    ? 'অনুগ্রহ করে অন্য কোনো কি-ওয়ার্ড দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।'
                    : 'Try searching with different terms or reset your active filters.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedOrigin('all');
                    setOnlyChemicalFree(false);
                    setOnlySaltFree(false);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  {isBn ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onOpenChatWithFisherman={handleOpenChatWithFisherman}
                    onViewCertificate={handleOpenCertModal}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Artisanal Fishermen Provenance Spotlight */}
          <section className="bg-white border-y border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isBn ? 'প্রান্তিক জেলেদের ক্ষমতায়ন' : 'Meet the Fishermen'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isBn ? 'আমাদের উপকূলীয় কারিগর ও প্রস্তুতকারক জেলেরা' : 'Our Verified Artisan Fishermen'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {isBn 
                      ? 'যাঁদের অক্লান্ত পরিশ্রমে খাঁটি সামুদ্রিক ও হাওর শুটকি বিষমুক্তভাবে আপনার ঘরে পৌঁছাচ্ছে।'
                      : 'Connecting you with 3rd-generation coastal fishing families across Bangladesh.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedChatFisherman(fishermen[0]);
                    setIsChatOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>{isBn ? 'জেলেদের সাথে সরাসরি চ্যাট' : 'Chat with Fishermen'}</span>
                </button>
              </div>

              {/* Fishermen Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {fishermen.map((f) => (
                  <div
                    key={f.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{isBn ? 'যাচাইকৃত প্রস্তুতকারক' : 'Verified'}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-tight mt-0.5">
                          {isBn ? f.nameBn : f.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{isBn ? f.locationBn : f.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {f.bio}
                    </p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {f.experienceYears}+ {isBn ? 'বছরের অভিজ্ঞতা' : 'yrs exp'}
                      </span>
                      <button
                        onClick={() => handleOpenChatWithFisherman(f)}
                        className="font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কথা বলুন' : 'Chat'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Traditional Recipes & Educational Blog Section with 1-Click Recipe-to-Cart */}
          <BlogRecipeSection
            onSelectRecipeProduct={(pId) => {
              const found = products.find((p) => p.id === pId);
              if (found) setSelectedProduct(found);
            }}
          />

          {/* Social Impact & Fishermen Welfare Fund Tracker */}
          <FishermenFundSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenPhoneOrder={() => setIsPhoneOrderOpen(true)}
        onOpenChat={() => {
          setSelectedChatFisherman(fishermen[0]);
          setIsChatOpen(true);
        }}
        onScrollToRecipes={scrollToRecipes}
        onOpenGoogleSeo={() => setIsGoogleSeoOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenChatWithFisherman={handleOpenChatWithFisherman}
          onOpenCheckoutDirect={() => setIsCheckoutOpen(true)}
          onOpenPhoneOrder={() => setIsPhoneOrderOpen(true)}
          onViewCertificate={handleOpenCertModal}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => {}}
      />

      {/* Customer Orders History Modal */}
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        onContinueShopping={() => setIsOrdersOpen(false)}
      />

      {/* Quick Phone Order Modal */}
      <QuickPhoneOrderModal
        isOpen={isPhoneOrderOpen}
        onClose={() => setIsPhoneOrderOpen(false)}
      />

      {/* Direct Customer-to-Merchant Chat Modal */}
      <MerchantChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        fisherman={selectedChatFisherman}
      />

      {/* Auth Modal (Customer, Merchant, Owner Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultRole={authDefaultRole}
      />

      {/* Customer Profile Modal */}
      <CustomerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Custom Box Builder Modal */}
      <CustomBoxBuilderModal
        isOpen={isCustomBoxOpen}
        onClose={() => setIsCustomBoxOpen(false)}
        onBoxAddedToCart={() => setIsCartOpen(true)}
      />

      {/* Lab Test Certificate Modal */}
      <LabCertificateModal
        isOpen={isLabCertOpen}
        onClose={() => setIsLabCertOpen(false)}
        product={certProduct}
      />

      {/* Shelf Life & Storage Guide Modal */}
      <ShelfLifeCalculatorModal
        isOpen={isShelfLifeOpen}
        onClose={() => setIsShelfLifeOpen(false)}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onOpenProductDetail={(p) => setSelectedProduct(p)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Official Cash Memo & Invoice Generator Modal (Print / PDF) */}
      {selectedOrderForInvoice && (
        <InvoiceModal
          order={selectedOrderForInvoice}
          onClose={() => setSelectedOrderForInvoice(null)}
        />
      )}

      {/* Google Search & SEO Simulator Modal */}
      <GoogleSearchModal
        isOpen={isGoogleSeoOpen}
        onClose={() => setIsGoogleSeoOpen(false)}
      />

      {/* Floating Smart AI Chatbot Order Assistant */}
      <ChatbotOrderAssistant
        onOpenPhoneOrder={() => setIsPhoneOrderOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
