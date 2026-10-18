import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Crown, 
  Fish, 
  User, 
  KeyRound, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Check,
  Building2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Smartphone
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'customer',
}) => {
  const { language, login, signup, quickSwitchRole, setActiveView } = useStore();
  const isBn = language === 'bn';

  // Selected portal: customer vs merchant vs owner
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Customer Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');

  // Seller Form Fields
  const [businessName, setBusinessName] = useState('');
  const [harborLocation, setHarborLocation] = useState("Cox's Bazar Nazirtek");
  const [tradeLicense, setTradeLicense] = useState('');

  // Admin Security Pin
  const [adminPin, setAdminPin] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [successRole, setSuccessRole] = useState<UserRole>('customer');

  // Update selectedRole when defaultRole changes
  useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
      if (defaultRole === 'owner') {
        setEmail('admin@shutkibazar.com');
      } else if (defaultRole === 'merchant') {
        setEmail('jalal@shutkibazar.com');
      } else {
        setEmail('rafiq@gmail.com');
      }
    }
  }, [defaultRole, isOpen]);

  if (!isOpen) return null;

  const handlePortalSwitch = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'owner') {
      setEmail('admin@shutkibazar.com');
    } else if (role === 'merchant') {
      setEmail('jalal@shutkibazar.com');
    } else {
      setEmail('rafiq@gmail.com');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) return;

    const res = login(email, password, selectedRole);
    if (res.success) {
      setSuccessRole(selectedRole);
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        onClose();
        if (selectedRole === 'owner') setActiveView('owner');
        else if (selectedRole === 'merchant') setActiveView('merchant');
        else setActiveView('store');
      }, 700);
    } else {
      setErrorMessage(res.message || 'Login failed');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !name) return;

    const res = signup({
      email,
      name,
      nameBn: name,
      phone: phone || '01710000000',
      role: selectedRole,
      avatar: selectedRole === 'merchant'
        ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'
        : selectedRole === 'owner'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      district: selectedRole === 'merchant' ? harborLocation : district,
      address,
      businessName: selectedRole === 'merchant' ? (businessName || 'উপকূলীয় ড্রাই ফিশ আড়ত') : undefined,
    });

    if (res) {
      setSuccessRole(selectedRole);
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        onClose();
        if (selectedRole === 'owner') setActiveView('owner');
        else if (selectedRole === 'merchant') setActiveView('merchant');
        else setActiveView('store');
      }, 700);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    quickSwitchRole(role);
    setSuccessRole(role);
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      onClose();
      if (role === 'owner') setActiveView('owner');
      else if (role === 'merchant') setActiveView('merchant');
      else setActiveView('store');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Header Based on Selected Portal */}
        <div className={`p-5 sm:p-6 text-white flex items-center justify-between border-b transition-colors ${
          selectedRole === 'owner'
            ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 border-purple-800'
            : selectedRole === 'merchant'
            ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border-amber-800'
            : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-900 border-emerald-800'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border ${
              selectedRole === 'owner'
                ? 'bg-purple-600/40 border-purple-400/40 text-amber-300'
                : selectedRole === 'merchant'
                ? 'bg-amber-600/40 border-amber-400/40 text-amber-300'
                : 'bg-emerald-600/40 border-emerald-400/40 text-emerald-300'
            }`}>
              {selectedRole === 'owner' ? (
                <Crown className="w-6 h-6" />
              ) : selectedRole === 'merchant' ? (
                <Fish className="w-6 h-6" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                  selectedRole === 'owner'
                    ? 'bg-purple-500/20 text-purple-200 border-purple-400/30'
                    : selectedRole === 'merchant'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                    : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                }`}>
                  {selectedRole === 'owner'
                    ? isBn ? 'অ্যাডমিন প্যানেল এক্সেস' : 'Admin Panel Access'
                    : selectedRole === 'merchant'
                    ? isBn ? 'সেলার ও আড়তদার পোর্টাল' : 'Seller / Merchant Portal'
                    : isBn ? 'সম্মানিত ক্রেতা পোর্টাল' : 'Customer Account'}
                </span>
              </div>
              <h3 className="font-black text-lg sm:text-xl leading-tight mt-0.5">
                {selectedRole === 'owner'
                  ? isBn ? '🛡️ সুপার অ্যাডমিন কন্ট্রোল সেন্টার' : 'Super Admin Master Console'
                  : selectedRole === 'merchant'
                  ? isBn ? '🏪 শুটকি বিক্রেতা ও আড়তদার লগইন' : 'Dried Fish Merchant Login'
                  : isBn ? '🛒 গ্রাহক লগইন ও সাইনআপ' : 'Customer Sign In & Rewards'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedRole === 'owner'
                  ? isBn ? 'প্ল্যাটফর্ম সার্বিক রাজস্ব, পণ্য অনুমোদন ও সিস্টেম ম্যানেজমেন্ট' : 'Platform Governance, Revenue & Approvals'
                  : selectedRole === 'merchant'
                  ? isBn ? 'পণ্য স্টক নিয়ন্ত্রণ, অর্ডার প্রসেসিং ও বিকাশ পেআউট' : 'Manage Stock, Courier Orders & Payouts'
                  : isBn ? 'অর্ডার হিস্ট্রি, ক্যাশ মেমো ডাউনলোড ও উইশলিস্ট এক্সেস' : 'Track Deliveries, Wishlist & Instant Checkout'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dedicated Separate Portal Tabs Selector */}
        <div className="bg-slate-100 p-2 border-b border-slate-200">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* Customer Portal Tab */}
            <button
              type="button"
              onClick={() => handlePortalSwitch('customer')}
              className={`py-2.5 px-2 rounded-xl text-xs font-black flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'customer'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-[1.02]'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{isBn ? 'গ্রাহক পোর্টাল' : 'Customer'}</span>
            </button>

            {/* Merchant Portal Tab */}
            <button
              type="button"
              onClick={() => handlePortalSwitch('merchant')}
              className={`py-2.5 px-2 rounded-xl text-xs font-black flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'merchant'
                  ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200'
              }`}
            >
              <Fish className="w-4 h-4" />
              <span>{isBn ? 'সেলার পোর্টাল' : 'Seller Panel'}</span>
            </button>

            {/* Admin Portal Tab */}
            <button
              type="button"
              onClick={() => handlePortalSwitch('owner')}
              className={`py-2.5 px-2 rounded-xl text-xs font-black flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'owner'
                  ? 'bg-purple-900 text-white shadow-md shadow-purple-950/20 scale-[1.02]'
                  : 'bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-800 border border-slate-200'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>{isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Fast Verified Demo Access Box (Specific to the active portal) */}
        <div className={`p-3.5 border-b flex flex-wrap items-center justify-between gap-2.5 ${
          selectedRole === 'owner'
            ? 'bg-purple-50/90 border-purple-200'
            : selectedRole === 'merchant'
            ? 'bg-amber-50/90 border-amber-200'
            : 'bg-emerald-50/90 border-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${
              selectedRole === 'owner' ? 'text-purple-700' : selectedRole === 'merchant' ? 'text-amber-700' : 'text-emerald-700'
            }`} />
            <div>
              <div className="font-extrabold text-xs text-slate-900">
                {selectedRole === 'owner'
                  ? isBn ? '১-ক্লিকে সুপার অ্যাডমিন ডেমো এক্সেস' : '1-Click Super Admin Demo Login'
                  : selectedRole === 'merchant'
                  ? isBn ? '১-ক্লিকে কক্সবাজার আড়তদার ডেমো এক্সেস' : '1-Click Verified Seller Demo Login'
                  : isBn ? '১-ক্লিকে কাস্টমার ডেমো এক্সেস' : '1-Click Customer Demo Login'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {selectedRole === 'owner'
                  ? 'মোহাম্মদ আলমাস (admin@shutkibazar.com)'
                  : selectedRole === 'merchant'
                  ? 'জালাল উদ্দিন মাঝি • নাজিরারটেক ড্রাই ফিশ প্রসেসিং (কক্সবাজার)'
                  : 'রফিকুল ইসলাম • বনানী, ঢাকা (rafiq@gmail.com)'}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleDemoLogin(selectedRole)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs text-white shadow-xs active:scale-95 transition-all flex items-center gap-1.5 ${
              selectedRole === 'owner'
                ? 'bg-purple-800 hover:bg-purple-900 shadow-purple-900/30'
                : selectedRole === 'merchant'
                ? 'bg-amber-700 hover:bg-amber-800 shadow-amber-800/30'
                : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-800/30'
            }`}
          >
            <span>{isBn ? 'লগইন করুন' : 'Demo Login'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Toggle Login vs Signup (Only for customer & merchant; owner is master key login) */}
          {selectedRole !== 'owner' ? (
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  activeTab === 'login'
                    ? selectedRole === 'merchant' ? 'border-amber-600 text-amber-700' : 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 inline mr-1" />
                {isBn ? 'বিদ্যমান অ্যাকাউন্টে লগইন' : 'Sign In'}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                  activeTab === 'signup'
                    ? selectedRole === 'merchant' ? 'border-amber-600 text-amber-700' : 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                {selectedRole === 'merchant' 
                  ? isBn ? 'নতুন আড়তদার / সেলার রেজিস্ট্রেশন' : 'Register as Merchant' 
                  : isBn ? 'নতুন গ্রাহক অ্যাকাউন্ট খুলুন' : 'Create Account'}
              </button>
            </div>
          ) : (
            <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-purple-950 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-700 shrink-0" />
              <span className="text-[11px] font-semibold">
                {isBn 
                  ? 'নিরাপত্তা বার্তা: এই প্যানেলটি শুধুমাত্র প্ল্যাটফর্ম অ্যাডমিনিস্ট্রেটরদের জন্য সংরক্ষিত।'
                  : 'Security Notice: This portal is strictly restricted to platform administrators.'}
              </span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* Success Banner */}
          {successAnimation && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border border-emerald-300 animate-pulse">
              <Check className="w-5 h-5 text-emerald-700" />
              <span>
                {successRole === 'owner'
                  ? isBn ? 'সফল! অ্যাডমিন কন্ট্রোল সেন্টারে প্রবেশ করা হচ্ছে...' : 'Success! Loading Super Admin Console...'
                  : successRole === 'merchant'
                  ? isBn ? 'সফল! বিক্রেতা / মার্চেন্ট ড্যাশবোর্ডে প্রবেশ করা হচ্ছে...' : 'Success! Loading Merchant Dashboard...'
                  : isBn ? 'সফল! আপনার গ্রাহক অ্যাকাউন্টে লগইন হয়েছে...' : 'Success! Welcome to your Customer Account...'}
              </span>
            </div>
          )}

          {/* Form: Login */}
          {activeTab === 'login' && !successAnimation && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email / ID input */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {selectedRole === 'owner'
                    ? isBn ? 'সুপার অ্যাডমিন ইমেইল' : 'Super Admin Email'
                    : selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট রেজিস্টার্ড ইমেইল / ইউজার আইডি' : 'Merchant Email / User ID'
                    : isBn ? 'গ্রাহক মোবাইল নম্বর বা ইমেইল' : 'Customer Phone or Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={
                      selectedRole === 'owner'
                        ? 'admin@shutkibazar.com'
                        : selectedRole === 'merchant'
                        ? 'jalal@shutkibazar.com'
                        : 'rafiq@gmail.com'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 pl-9 border border-slate-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password or Security PIN */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-800">
                    {selectedRole === 'owner'
                      ? isBn ? 'মাস্টার সিকিউরিটি পাসকোড / ২এফএ' : 'Master Security Passcode / 2FA'
                      : isBn ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <span className="text-[10px] text-slate-500">
                    {isBn ? 'ডেমো: যেকোনো অক্ষর দিন' : 'Demo: Any input works'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 pl-9 border border-slate-300 rounded-xl bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Role specific hint badges */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {selectedRole === 'owner'
                      ? isBn ? 'কেন্দ্রীয় প্রশাসনিক অধিকার সংরক্ষিত' : 'Root Administrative Privileges'
                      : selectedRole === 'merchant'
                      ? isBn ? 'বিএসটিআই ও শুটকি বাজার অনুমোদিত মার্চেন্ট টার্মিনাল' : 'Certified Artisan Merchant Terminal'
                      : isBn ? 'ক্যাশ অন ডেলিভারি ও সুরক্ষিত অনলাইন পেমেন্ট সুরক্ষা' : 'Secured Customer Checkout & Loyalty Points'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {selectedRole === 'owner'
                    ? isBn ? 'লগইন করার সাথে সাথে সরাসরি সুপার অ্যাডমিন কনসোলে রিডাইরেক্ট হবে।' : 'Redirects instantly to the Super Admin Dashboard.'
                    : selectedRole === 'merchant'
                    ? isBn ? 'লগইন করার সাথে সাথে সরাসরি আপনার আড়তের মার্চেন্ট প্যানেলে রিডাইরেক্ট হবে।' : 'Redirects instantly to your Merchant Dashboard.'
                    : isBn ? 'লগইন করার সাথে সাথে কেনাকাটা ও অর্ডার ট্র্যাক করতে পারবেন।' : 'Browse products, manage wishlist, and track orders.'}
                </p>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white rounded-xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  selectedRole === 'owner'
                    ? 'bg-purple-900 hover:bg-purple-950 shadow-purple-950/20'
                    : selectedRole === 'merchant'
                    ? 'bg-amber-700 hover:bg-amber-800 shadow-amber-800/20'
                    : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-800/20'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {selectedRole === 'owner'
                    ? isBn ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Enter Admin Panel'
                    : selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট প্যানেলে প্রবেশ করুন' : 'Enter Merchant Panel'
                    : isBn ? 'কাস্টমার পোর্টালে লগইন করুন' : 'Sign in to Customer Account'}
                </span>
              </button>
            </form>
          )}

          {/* Form: Signup (Customer or Merchant Onboarding) */}
          {activeTab === 'signup' && selectedRole !== 'owner' && !successAnimation && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {selectedRole === 'merchant'
                    ? isBn ? 'স্বত্বাধিকারীর নাম *' : 'Proprietor Name *'
                    : isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: মোহাম্মদ রফিকুল আলম' : 'e.g. Rafiqul Alam'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              {selectedRole === 'merchant' && (
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isBn ? 'শুটকির আড়ত / চাতাল / ব্যবসার নাম *' : 'Business / Dry Loft Name *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: নাজিরারটেক কোস্টাল ড্রাই ফিশ ফার্ম' : 'e.g. Sonadia Organic Shutki'}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-2.5 pl-9 border border-slate-300 rounded-xl text-xs"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isBn ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              {selectedRole === 'merchant' ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {isBn ? 'উপকূলীয় চাতাল / ঘাট এলাকা' : 'Harbor / Coastal Area'}
                    </label>
                    <select
                      value={harborLocation}
                      onChange={(e) => setHarborLocation(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                    >
                      <option value="Cox's Bazar Nazirtek">নাজিরারটেক (কক্সবাজার)</option>
                      <option value="Dublar Char Sundarbans">দুবলার চর (সুন্দরবন)</option>
                      <option value="Saint Martin Island">সেন্টমার্টিন দ্বীপ</option>
                      <option value="Sonadia Island">সোনাদিয়া দ্বীপ</option>
                      <option value="Kuakata Sea Beach">কুয়াকাটা সৈকত</option>
                      <option value="Sunamganj Haor">সুনামগঞ্জ হাওর</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {isBn ? 'ট্রেড লাইসেন্স / জাতীয় পরিচয়পত্র' : 'Trade License / NID'}
                    </label>
                    <input
                      type="text"
                      placeholder="TR-882910"
                      value={tradeLicense}
                      onChange={(e) => setTradeLicense(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {isBn ? 'জেলা' : 'District'}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                    >
                      <option value="Dhaka">ঢাকা (Dhaka)</option>
                      <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
                      <option value="Sylhet">সিলেট (Sylhet)</option>
                      <option value="Rajshahi">রাজশাহী (Rajshahi)</option>
                      <option value="Khulna">খুলনা (Khulna)</option>
                      <option value="Barisal">বরিশাল (Barisal)</option>
                      <option value="Rangpur">রংপুর (Rangpur)</option>
                      <option value="Mymensingh">ময়মনসিংহ (Mymensingh)</option>
                      <option value="Other">অন্যান্য জেলা</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {isBn ? 'পূর্ণ ডেলিভারি ঠিকানা' : 'Full Delivery Address'}
                    </label>
                    <input
                      type="text"
                      placeholder={isBn ? 'বাসা/রোড, থানা, এলাকা' : 'House, Road, Area'}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 text-white rounded-xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  selectedRole === 'merchant'
                    ? 'bg-amber-700 hover:bg-amber-800'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>
                  {selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট অ্যাকাউন্ট নিশ্চিত করুন' : 'Register Merchant Account'
                    : isBn ? 'গ্রাহক অ্যাকাউন্ট নিশ্চিত করুন' : 'Create Customer Account'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
