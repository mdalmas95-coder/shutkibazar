import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShoppingBag, 
  LogOut, 
  Edit3, 
  Check, 
  ShieldCheck, 
  Fish,
  Crown
} from 'lucide-react';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrders: () => void;
  onOpenAuthModal: () => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenOrders,
  onOpenAuthModal,
}) => {
  const { 
    language, 
    currentUser, 
    updateUserProfile, 
    logout, 
    setActiveView, 
    orders 
  } = useStore();
  const isBn = language === 'bn';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [district, setDistrict] = useState(currentUser?.district || 'Dhaka');
  const [address, setAddress] = useState(currentUser?.address || '');

  if (!isOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      nameBn: name,
      phone,
      district,
      address,
    });
    setIsEditing(false);
  };

  const customerOrders = orders.filter((o) =>
    o.customerPhone === currentUser.phone || o.customerName === currentUser.name
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.2 rounded font-bold">
                  {isBn ? 'সম্মানিত কাস্টমার প্রোফাইল' : 'Customer Account'}
                </span>
              </div>
              <h3 className="font-extrabold text-base leading-tight mt-0.5">
                {isBn ? currentUser.nameBn : currentUser.name}
              </h3>
              <p className="text-xs text-emerald-200 font-mono mt-0.5">
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-xs">{isBn ? 'মোট সম্পন্ন অর্ডার:' : 'Total Orders:'}</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {customerOrders.length || currentUser.totalOrders || 1} টি
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-xs">{isBn ? 'শুটকি ক্রয় হিসেব:' : 'Total Spent:'}</span>
              <div className="text-xl font-black text-emerald-800 mt-1">
                ৳{currentUser.totalSpent || 2450}
              </div>
            </div>
          </div>

          {/* Profile Details or Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 text-xs mb-1">
                {isBn ? 'প্রোফাইল তথ্য আপডেট করুন:' : 'Update Information:'}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{isBn ? 'নাম' : 'Name'}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{isBn ? 'ফোন নম্বর' : 'Phone'}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{isBn ? 'জেলা' : 'District'}</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Dhaka">Dhaka (ঢাকা)</option>
                    <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                    <option value="Khulna">Khulna (খুলনা)</option>
                    <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                    <option value="Other">অন্যান্য জেলা</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{isBn ? 'ডেলিভারি ঠিকানা' : 'Address'}</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 border rounded-lg text-xs font-bold text-slate-600"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
                >
                  {isBn ? 'সংরক্ষণ করুন' : 'Save Profile'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900">{isBn ? 'সংরক্ষিত ঠিকানা ও তথ্য' : 'Saved Details'}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'এডিট করুন' : 'Edit'}</span>
                </button>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-900">{currentUser.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-900">
                    {currentUser.address || 'Dhaka, Bangladesh'} ({currentUser.district || 'Dhaka'})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isBn ? 'যাচাইকৃত নিয়মিত ক্রেতা অ্যাকাউন্ট' : 'Verified Buyer Status'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenOrders();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{isBn ? 'আমার অর্ডার হিস্ট্রি ও ট্র্যাকিং' : 'View Order History & Tracking'}</span>
              </span>
              <span className="text-slate-400">➔</span>
            </button>

            <button
              onClick={() => {
                onClose();
                setActiveView('merchant');
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-amber-200 hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Fish className="w-4 h-4 text-amber-700" />
                <span>{isBn ? 'মার্চেন্ট / জেলে পোর্টালে যান' : 'Switch to Merchant Hub'}</span>
              </span>
              <span className="text-amber-500">➔</span>
            </button>
          </div>

          {/* Bottom Switch / Logout */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              {isBn ? 'অন্য অ্যাকাউন্টে লগইন' : 'Switch Account'}
            </button>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isBn ? 'লগআউট' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
