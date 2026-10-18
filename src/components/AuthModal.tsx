import React, { useState } from 'react';
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
  Check
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
  const { language, login, signup, quickSwitchRole } = useStore();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email) return;

    const res = login(email, password, selectedRole);
    if (res.success) {
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        onClose();
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
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      district,
      address,
      businessName: selectedRole === 'merchant' ? businessName : undefined,
    });

    if (res) {
      setSuccessAnimation(true);
      setTimeout(() => {
        setSuccessAnimation(false);
        onClose();
      }, 700);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    quickSwitchRole(role);
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 text-white flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {isBn ? 'লগইন ও প্রোফাইল অ্যাক্সেস' : 'Sign In & Profile Access'}
              </h3>
              <p className="text-xs text-amber-200">
                {isBn ? 'কাস্টমার, মার্চেন্ট ও ওয়েবসাইট মালিক' : 'Customer, Merchant & Owner Portals'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Fast Demo Switcher Bar */}
        <div className="bg-amber-50/80 p-3.5 border-b border-amber-200/70 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? 'তাত্ক্ষণিক টেস্ট লগইন (১-ক্লিক ডেমো):' : 'Instant 1-Click Demo Login:'}</span>
            </span>
            <span className="text-amber-800 text-[10px]">{isBn ? 'পাসওয়ার্ড প্রয়োজন নেই' : 'No password needed'}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('customer')}
              className="py-2 px-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-slate-800 text-[11px] font-bold flex flex-col items-center gap-0.5 shadow-2xs hover:border-emerald-500 transition-all active:scale-95"
            >
              <span className="flex items-center gap-1 text-emerald-700">
                <User className="w-3.5 h-3.5" />
                <span>{isBn ? 'কাস্টমার' : 'Customer'}</span>
              </span>
              <span className="text-[9px] text-slate-500 font-normal">রফিকুল ইসলাম</span>
            </button>

            <button
              onClick={() => handleDemoLogin('merchant')}
              className="py-2 px-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-slate-800 text-[11px] font-bold flex flex-col items-center gap-0.5 shadow-2xs hover:border-amber-500 transition-all active:scale-95"
            >
              <span className="flex items-center gap-1 text-amber-800">
                <Fish className="w-3.5 h-3.5" />
                <span>{isBn ? 'মার্চেন্ট / জেলে' : 'Merchant'}</span>
              </span>
              <span className="text-[9px] text-slate-500 font-normal">জালাল মাঝি</span>
            </button>

            <button
              onClick={() => handleDemoLogin('owner')}
              className="py-2 px-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-300 text-slate-800 text-[11px] font-bold flex flex-col items-center gap-0.5 shadow-2xs hover:border-purple-500 transition-all active:scale-95"
            >
              <span className="flex items-center gap-1 text-purple-700">
                <Crown className="w-3.5 h-3.5" />
                <span>{isBn ? 'সাইট মালিক' : 'Owner'}</span>
              </span>
              <span className="text-[9px] text-slate-500 font-normal">আলমাস (অ্যাডমিন)</span>
            </button>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div className="p-5 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">
              {isBn ? 'আপনার লগইন ধরন নির্বাচন করুন:' : 'Select Login Role:'}
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('customer');
                  setEmail('rafiq@gmail.com');
                }}
                className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'customer'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBn ? 'কাস্টমার' : 'Customer'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('merchant');
                  setEmail('jalal@shutkibazar.com');
                }}
                className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'merchant'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Fish className="w-3.5 h-3.5" />
                <span>{isBn ? 'মার্চেন্ট' : 'Merchant'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('owner');
                  setEmail('admin@shutkibazar.com');
                }}
                className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'owner'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>{isBn ? 'মালিক (Owner)' : 'Owner'}</span>
              </button>
            </div>
          </div>

          {/* Toggle Login vs Signup */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 inline mr-1" />
              {isBn ? 'লগইন করুন' : 'Sign In'}
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                activeTab === 'signup'
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 inline mr-1" />
              {isBn ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Account'}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* Success Banner */}
          {successAnimation && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? 'সফলভাবে লগইন সম্পন্ন হয়েছে!' : 'Logged in successfully!'}</span>
            </div>
          )}

          {/* Form: Login */}
          {activeTab === 'login' && !successAnimation && (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {selectedRole === 'owner'
                    ? isBn ? 'মালিকের ইমেইল অ্যাড্রেস' : 'Owner Admin Email'
                    : selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট / জেলের ইমেইল' : 'Merchant / Fisherman Email'
                    : isBn ? 'কাস্টমার ইমেইল' : 'Customer Email'}
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
                    className="w-full p-2.5 pl-9 border border-slate-300 rounded-xl bg-white text-xs"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 pl-9 border border-slate-300 rounded-xl bg-white text-xs"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  selectedRole === 'owner'
                    ? 'bg-purple-700 hover:bg-purple-800'
                    : selectedRole === 'merchant'
                    ? 'bg-amber-700 hover:bg-amber-800'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {selectedRole === 'owner'
                    ? isBn ? 'মালিক পোর্টালে লগইন' : 'Sign in as Owner'
                    : selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট ড্যাশবোর্ডে লগইন' : 'Sign in as Merchant'
                    : isBn ? 'কাস্টমার অ্যাকাউন্টে লগইন' : 'Sign in as Customer'}
                </span>
              </button>
            </form>
          )}

          {/* Form: Signup */}
          {activeTab === 'signup' && !successAnimation && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBn ? 'পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: কবির হোসেন' : 'e.g. Kabir Hossain'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'ইমেইল *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'মোবাইল নম্বর *' : 'Phone *'}
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

              {selectedRole === 'merchant' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'ব্যবসা / শুকানোর চাতালের নাম' : 'Business / Dry Loft Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBn ? 'যেমন: টেকনাফ কোস্টাল ড্রাই ফিশ' : 'Fishery name'}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'জেলা / অঞ্চল' : 'District'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                  >
                    <option value="Dhaka">Dhaka (ঢাকা)</option>
                    <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="Cox's Bazar">Cox's Bazar (কক্সবাজার)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                    <option value="Khulna">Khulna (খুলনা)</option>
                    <option value="Other">অন্যান্য জেলা</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'ঠিকানা' : 'Address'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBn ? 'এলাকা বা রোড' : 'Area/Street'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>
                  {selectedRole === 'merchant'
                    ? isBn ? 'মার্চেন্ট হিসেবে সাইনআপ' : 'Register as Merchant'
                    : isBn ? 'কাস্টমার অ্যাকাউন্ট তৈরি' : 'Create Customer Account'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
