import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Phone, 
  Search, 
  Store, 
  Clock, 
  MessageSquareText, 
  ShieldCheck, 
  Menu, 
  X,
  Crown,
  Fish,
  User,
  LogIn,
  Heart,
  Truck,
  HelpCircle,
  Smartphone,
  ChevronDown,
  Gift,
  Flame,
  Award,
  Globe
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenPhoneOrder: () => void;
  onOpenChat: () => void;
  onOpenAuth: (role?: UserRole) => void;
  onOpenProfile: () => void;
  onOpenWishlist: () => void;
  onOpenGoogleSeo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenOrders,
  onOpenPhoneOrder,
  onOpenChat,
  onOpenAuth,
  onOpenProfile,
  onOpenWishlist,
  onOpenGoogleSeo,
}) => {
  const {
    language,
    setLanguage,
    cartCount,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    orders,
    currentUser,
    wishlist,
    logout,
    setSelectedCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Contextual Mode Notification Banner when in Admin or Seller View */}
      {activeView === 'owner' ? (
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-purple-100 text-xs py-2 px-4 border-b border-purple-800/80 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="font-black text-white flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-300" />
                {isBn ? 'সুপার অ্যাডমিন প্যানেল' : 'Super Admin Console'}:
              </span>
              <span className="text-purple-200 font-semibold">{currentUser?.nameBn || 'মোহাম্মদ আলমাস (ওয়েবসাইট মালিক)'}</span>
              <span className="text-purple-300/80 hidden sm:inline">• {isBn ? 'প্ল্যাটফর্ম কেন্দ্রীয় রাজস্ব ও সেলার ম্যানেজমেন্ট' : 'Full Platform Governance'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('store')}
                className="px-3 py-1 bg-white text-slate-900 rounded-lg font-black text-xs hover:bg-purple-100 shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Store className="w-3.5 h-3.5 text-purple-900" />
                <span>{isBn ? 'দারাজ-স্টোর ভিউ দেখুন' : 'View Storefront'}</span>
              </button>
              <button
                onClick={() => logout()}
                className="px-2.5 py-1 bg-purple-900/80 hover:bg-rose-900 text-white rounded-lg font-bold text-xs border border-purple-700/50 transition-colors"
              >
                {isBn ? 'লগআউট' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      ) : activeView === 'merchant' ? (
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-100 text-xs py-2 px-4 border-b border-amber-800/80 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-black text-white flex items-center gap-1.5">
                <Fish className="w-4 h-4 text-amber-300" />
                {isBn ? 'সেলার / আড়তদার ড্যাশবোর্ড' : 'Seller Dashboard'}:
              </span>
              <span className="text-amber-200 font-semibold">{currentUser?.businessName || 'নাজিরারটেক ড্রাই ফিশ আড়ত'}</span>
              <span className="text-amber-300/80 hidden sm:inline">• {isBn ? 'কক্সবাজার সদর' : 'Cox\'s Bazar'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('store')}
                className="px-3 py-1 bg-white text-slate-900 rounded-lg font-black text-xs hover:bg-amber-100 shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Store className="w-3.5 h-3.5 text-amber-800" />
                <span>{isBn ? 'দারাজ-স্টোর ভিউ দেখুন' : 'View Storefront'}</span>
              </button>
              <button
                onClick={() => logout()}
                className="px-2.5 py-1 bg-amber-900/80 hover:bg-rose-900 text-white rounded-lg font-bold text-xs border border-amber-700/50 transition-colors"
              >
                {isBn ? 'লগআউট' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Top Daraz Utility Bar (Dark Slate / Gray with white text) */}
      <div className="bg-[#f5f5f5] text-slate-600 text-[11px] py-1 px-4 border-b border-slate-200 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hover:text-[#f85606] cursor-pointer flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#f85606]" />
              {isBn ? 'অ্যাপে আরও সাশ্রয় করুন' : 'SAVE MORE ON APP'}
            </span>
            <span>|</span>
            <button
              onClick={() => {
                if (currentUser?.role === 'merchant') setActiveView('merchant');
                else onOpenAuth('merchant');
              }}
              className="hover:text-[#f85606] font-semibold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <Fish className="w-3.5 h-3.5 text-[#f85606]" />
              <span>{isBn ? 'শুটকি বাজারে বিক্রি করুন (সেলার হন)' : 'Sell on Shutki Bazar'}</span>
            </button>
            <span>|</span>
            <button
              onClick={() => {
                if (currentUser?.role === 'owner') setActiveView('owner');
                else onOpenAuth('owner');
              }}
              className="hover:text-[#f85606] font-semibold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-purple-700" />
              <span>{isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
            </button>
            {onOpenGoogleSeo && (
              <>
                <span>|</span>
                <button
                  onClick={onOpenGoogleSeo}
                  className="hover:text-blue-600 font-bold text-blue-700 flex items-center gap-1 transition-colors bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60"
                  title={isBn ? 'গুগল সার্চ ও এসইও প্রস্তুতি দেখুন' : 'View Google Search & SEO status'}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isBn ? 'গুগল সার্চ ও এসইও' : 'Google SEO'}</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPhoneOrder}
              className="hover:text-[#f85606] flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#f85606]" />
              <span>{isBn ? 'গ্রাহক সেবা:' : 'Help:'} 01700-748854</span>
            </button>
            <span>|</span>
            <button
              onClick={onOpenOrders}
              className="hover:text-[#f85606] flex items-center gap-1 transition-colors"
            >
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track My Order'}</span>
            </button>
            <span>|</span>
            {/* Language Switcher */}
            <div className="flex items-center gap-1 font-bold">
              <button
                onClick={() => setLanguage('bn')}
                className={`hover:text-[#f85606] ${isBn ? 'text-[#f85606] font-black' : 'text-slate-500'}`}
              >
                বাংলা
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`hover:text-[#f85606] ${!isBn ? 'text-[#f85606] font-black' : 'text-slate-500'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Daraz Header (White background, Large Central Search Bar, Daraz Orange Accents) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Daraz-Style Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveView('store')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f85606] flex items-center justify-center text-white text-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span>🐟</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-black text-2xl tracking-tighter text-slate-900">
                    শুটকি<span className="text-[#f85606]">বাজার</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold ml-0.5">.com.bd</span>
                </div>
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                  {isBn ? 'বাংলাদেশের #১ খাঁটি শুটকি মল' : 'Daraz-Style Dried Fish Mall'}
                </span>
              </div>
            </button>
          </div>

          {/* Daraz Big Iconic Search Bar */}
          <div className="flex-1 max-w-2xl mx-1 sm:mx-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBn
                    ? 'শুটকি বাজারে খুঁজুন... (লইট্টা, রূপচাঁদা, ছুরি, কাঁচকি, চ্যাপা)'
                    : 'Search in Shutki Bazar... (Loitta, Rupchanda, Churi, Chepa)'
                }
                className="w-full bg-[#f5f5f5] hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-4 pr-12 py-2.5 sm:py-2.5 rounded-lg border border-slate-200 focus:border-[#f85606] focus:outline-none focus:ring-1 focus:ring-[#f85606] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  ✕
                </button>
              )}
              {/* Daraz Solid Orange Search Button */}
              <button
                type="submit"
                className="absolute right-1 bg-[#f85606] hover:bg-[#d94803] text-white p-2 sm:px-3 sm:py-2 rounded-md transition-colors flex items-center justify-center shadow-xs"
                title="Search"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* User Account / Login & Cart Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* User Login / Profile */}
            {currentUser ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'customer') onOpenProfile();
                  else if (currentUser.role === 'merchant') setActiveView('merchant');
                  else setActiveView('owner');
                }}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors text-left"
                title={isBn ? 'প্রোফাইল দেখুন' : 'My Account'}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300"
                />
                <div className="hidden xl:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[85px]">
                    {isBn ? currentUser.nameBn.split(' ')[0] : currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-[#f85606] font-semibold">
                    {currentUser.role === 'owner' ? (isBn ? 'মালিক' : 'Owner') : currentUser.role === 'merchant' ? (isBn ? 'সেলার' : 'Seller') : (isBn ? 'গ্রাহক' : 'Customer')}
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <button
                  onClick={() => onOpenAuth('customer')}
                  className="flex items-center gap-1 text-slate-700 hover:text-[#f85606] py-1 px-2 rounded hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-[#f85606]" />
                  <span>{isBn ? 'লগইন' : 'LOGIN'}</span>
                </button>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <button
                  onClick={() => onOpenAuth('customer')}
                  className="text-slate-700 hover:text-[#f85606] py-1 px-2 rounded hover:bg-slate-50 transition-colors hidden sm:inline"
                >
                  <span>{isBn ? 'সাইন আপ' : 'SIGN UP'}</span>
                </button>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-600 hover:text-[#f85606] hover:bg-orange-50 rounded-lg transition-colors"
              title={isBn ? 'পছন্দের তালিকা' : 'Wishlist'}
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Daraz Big Cart Icon with Orange Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-700 hover:text-[#f85606] hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
              title={isBn ? 'শপিং কার্ট' : 'Cart'}
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-slate-800" />
                <span className="absolute -top-1.5 -right-2 bg-[#f85606] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Daraz Sub-Category Bar (Categories, Flash Sale, Shutki Mall, Best Sellers, Combos) */}
      <div className="bg-white border-t border-slate-100 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveView('store');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 text-slate-900 hover:text-[#f85606] flex items-center gap-1.5 border-b-2 border-transparent hover:border-[#f85606] transition-all"
              >
                <Menu className="w-4 h-4 text-[#f85606]" />
                <span>{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('flash-sale-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] flex items-center gap-1.5 text-[#f85606] transition-colors"
              >
                <Flame className="w-4 h-4 text-[#f85606] fill-[#f85606]" />
                <span>{isBn ? 'ফ্ল্যাশ সেল (Flash Sale)' : 'Flash Sale'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('sea');
                  setActiveView('store');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] transition-colors"
              >
                <span>{isBn ? 'সামুদ্রিক শুটকি' : 'Marine Shutki'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('haor');
                  setActiveView('store');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] transition-colors"
              >
                <span>{isBn ? 'মিঠাপানির হাওর' : 'Haor Freshwater'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('fermented');
                  setActiveView('store');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] transition-colors"
              >
                <span>{isBn ? 'ঐতিহ্যবাহী চ্যাপা' : 'Chepa & Sidal'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('special');
                  setActiveView('store');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] flex items-center gap-1 transition-colors"
              >
                <Gift className="w-3.5 h-3.5 text-[#f85606]" />
                <span>{isBn ? 'গিফট ও কম্বো বক্স' : 'Combos & Gift Box'}</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('recipe-blog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#f85606] transition-colors"
              >
                <span>{isBn ? 'রেসিপি ও টিপস' : 'Recipes'}</span>
              </button>
            </div>

            {/* Quick 3-Portal Switcher links in Sub-Bar */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (currentUser?.role === 'merchant') setActiveView('merchant');
                  else onOpenAuth('merchant');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  activeView === 'merchant'
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Fish className="w-3.5 h-3.5 text-amber-600" />
                <span>{isBn ? 'সেলার হাব' : 'Seller Panel'}</span>
              </button>

              <button
                onClick={() => {
                  if (currentUser?.role === 'owner') setActiveView('owner');
                  else onOpenAuth('owner');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  activeView === 'owner'
                    ? 'bg-purple-900 text-white'
                    : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-purple-700" />
                <span>{isBn ? 'অ্যাডমিন হাব' : 'Admin Panel'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white border-t border-slate-200 space-y-3 animate-in fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'শুটকি বাজারে খুঁজুন...' : 'Search Shutki Bazar...'}
              className="w-full p-2.5 pl-9 rounded-lg border border-slate-300 text-xs bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Mobile Role Switcher */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => {
                setActiveView('store');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-center rounded-lg text-xs font-bold border ${
                activeView === 'store' ? 'bg-[#f85606] text-white border-[#f85606]' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isBn ? 'ক্রেতা স্টোর' : 'Store'}
            </button>
            <button
              onClick={() => {
                if (currentUser?.role === 'merchant') setActiveView('merchant');
                else onOpenAuth('merchant');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-center rounded-lg text-xs font-bold border ${
                activeView === 'merchant' ? 'bg-amber-700 text-white border-amber-700' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isBn ? 'সেলার প্যানেল' : 'Seller'}
            </button>
            <button
              onClick={() => {
                if (currentUser?.role === 'owner') setActiveView('owner');
                else onOpenAuth('owner');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-center rounded-lg text-xs font-bold border ${
                activeView === 'owner' ? 'bg-purple-900 text-white border-purple-900' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isBn ? 'অ্যাডমিন' : 'Admin'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                onOpenWishlist();
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{isBn ? `উইশলিস্ট (${wishlist.length})` : `Wishlist (${wishlist.length})`}</span>
            </button>
            <button
              onClick={() => {
                onOpenOrders();
                setMobileMenuOpen(false);
              }}
              className="p-2 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
            >
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>{isBn ? `অর্ডার (${orders.length})` : `Orders (${orders.length})`}</span>
            </button>
          </div>

          <button
            onClick={() => {
              onOpenAuth('customer');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 bg-[#f85606] text-white text-xs font-bold rounded-lg text-center"
          >
            {currentUser ? (isBn ? `লগইন: ${currentUser.nameBn.split(' ')[0]}` : `Logged in: ${currentUser.name}`) : (isBn ? 'লগইন / সাইন আপ' : 'Login / Register')}
          </button>
        </div>
      )}
    </header>
  );
};
