import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Phone, 
  Search, 
  UserCheck, 
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
  ChevronDown,
  Heart
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenPhoneOrder: () => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenOrders,
  onOpenPhoneOrder,
  onOpenChat,
  onOpenAuth,
  onOpenProfile,
  onOpenWishlist,
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
    quickSwitchRole,
    wishlist,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification & Hotline Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-100 border border-amber-400/30">
              <ShieldCheck className="w-3 h-3 mr-1 text-amber-300" />
              {isBn ? '১০০% বিষমুক্ত ও খাঁটি' : '100% Chemical-Free'}
            </span>
            <span className="hidden md:inline text-amber-200">|</span>
            <span className="hidden md:inline">
              {isBn 
                ? 'সরাসরি উপকূলের জেলেদের কাছ থেকে সংগৃহীত রোদে শুকানো শুটকি' 
                : 'Directly sourced from coastal artisanal fishermen in Bangladesh'}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onOpenPhoneOrder}
              className="flex items-center gap-1.5 hover:text-white font-medium text-amber-100 bg-amber-800/80 hover:bg-amber-700/80 px-2.5 py-0.5 rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{isBn ? 'ফোনে অর্ডার:' : 'Phone Order:'} 01700-748854</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-amber-950/40 rounded-md p-0.5 border border-amber-600/30">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 text-xs rounded transition-colors font-semibold ${
                  isBn ? 'bg-amber-500 text-slate-900 shadow-xs' : 'text-amber-200 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs rounded transition-colors font-semibold ${
                  !isBn ? 'bg-amber-500 text-slate-900 shadow-xs' : 'text-amber-200 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('store')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                <span className="text-2xl">🐟</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                  শুটকি<span className="text-amber-700">বাজার</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                  {isBn ? 'উপকূলীয় খাঁটি শুটকির হাট' : 'ShutkiBazar • Pure Coastal Dry Fish'}
                </span>
              </div>
            </button>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-2">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBn
                    ? 'লইট্টা, চিংড়ি, রূপচাঁদা, চ্যাপা খুঁজুন...'
                    : 'Search Loitta, Shrimp, Chepa...'
                }
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-full pl-10 pr-4 py-2 border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 3-Way Dedicated Portal Switcher Tabs (Desktop) */}
          <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveView('store')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'store'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-700" />
              <span>{isBn ? 'ক্রেতা স্টোর' : 'Store'}</span>
            </button>

            <button
              onClick={() => {
                if (currentUser?.role !== 'merchant' && currentUser?.role !== 'owner') {
                  quickSwitchRole('merchant');
                }
                setActiveView('merchant');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'merchant'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Fish className="w-3.5 h-3.5" />
              <span>{isBn ? 'মার্চেন্ট পোর্টাল' : 'Merchant'}</span>
            </button>

            <button
              onClick={() => {
                if (currentUser?.role !== 'owner') {
                  quickSwitchRole('owner');
                }
                setActiveView('owner');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'owner'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{isBn ? 'মালিক প্যানেল' : 'Owner'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* User Profile / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    if (currentUser.role === 'customer') {
                      onOpenProfile();
                    } else if (currentUser.role === 'merchant') {
                      setActiveView('merchant');
                    } else {
                      setActiveView('owner');
                    }
                  }}
                  className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
                    currentUser.role === 'owner'
                      ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                      : currentUser.role === 'merchant'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                  }`}
                  title={isBn ? 'প্রোফাইল দেখুন' : 'My Account'}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border"
                  />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="leading-tight truncate max-w-[100px]">
                      {isBn ? currentUser.nameBn.split(' ')[0] : currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold opacity-75">
                      {currentUser.role === 'owner'
                        ? isBn ? 'মালিক' : 'Owner'
                        : currentUser.role === 'merchant'
                        ? isBn ? 'মার্চেন্ট' : 'Merchant'
                        : isBn ? 'কাস্টমার' : 'Customer'}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-700" />
                <span>{isBn ? 'লগইন' : 'Sign In'}</span>
              </button>
            )}

            {/* Direct Chat with Fisherman */}
            <button
              onClick={onOpenChat}
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 flex items-center gap-1.5 text-xs font-semibold transition-all"
              title={isBn ? 'মার্চেন্টের সাথে লাইভ চ্যাট' : 'Chat with Fishermen'}
            >
              <MessageSquareText className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">{isBn ? 'জেলে চ্যাট' : 'Chat'}</span>
            </button>

            {/* Order History */}
            <button
              onClick={onOpenOrders}
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-xs font-semibold transition-all"
              title={isBn ? 'আমার অর্ডার সমূহ' : 'My Orders'}
            >
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">{isBn ? 'অর্ডার' : 'Orders'}</span>
              {orders.length > 0 && (
                <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {orders.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 flex items-center gap-1.5 text-xs font-semibold transition-all relative"
              title={isBn ? 'পছন্দের তালিকা (উইশলিস্ট)' : 'My Wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              <span className="hidden md:inline">{isBn ? 'উইশলিস্ট' : 'Wishlist'}</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-600/20 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{isBn ? 'ব্যাগ' : 'Cart'}</span>
              <span className="bg-white text-amber-800 text-xs px-2 py-0.5 rounded-full font-extrabold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'লইট্টা, চিংড়ি, রূপচাঁদা খুঁজুন...' : 'Search dry fish...'}
                className="w-full bg-slate-100 text-slate-800 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile 3-way Role switcher */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => {
                  setActiveView('store');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold border ${
                  activeView === 'store'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {isBn ? 'ক্রেতা স্টোর' : 'Store'}
              </button>

              <button
                onClick={() => {
                  quickSwitchRole('merchant');
                  setActiveView('merchant');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold border ${
                  activeView === 'merchant'
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {isBn ? 'মার্চেন্ট হাব' : 'Merchant'}
              </button>

              <button
                onClick={() => {
                  quickSwitchRole('owner');
                  setActiveView('owner');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold border ${
                  activeView === 'owner'
                    ? 'bg-purple-700 text-white border-purple-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {isBn ? 'মালিক প্যানেল' : 'Owner'}
              </button>
            </div>

            {/* Mobile Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
              <button
                onClick={() => {
                  onOpenWishlist();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-rose-200"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>{isBn ? `উইশলিস্ট (${wishlist.length})` : `Wishlist (${wishlist.length})`}</span>
              </button>

              <button
                onClick={() => {
                  onOpenOrders();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200"
              >
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>{isBn ? `অর্ডার ট্র্যাকিং (${orders.length})` : `Orders (${orders.length})`}</span>
              </button>
            </div>

            <div className="flex gap-2 pt-1 border-t border-slate-200">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg text-center"
              >
                {isBn ? 'লগইন / অ্যাকাউন্ট পরিবর্তন' : 'Login / Switch Account'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
