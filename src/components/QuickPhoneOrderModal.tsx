import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Phone, PhoneCall, Clock, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';

interface QuickPhoneOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickPhoneOrderModal: React.FC<QuickPhoneOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useStore();
  const isBn = language === 'bn';

  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);

  if (!isOpen) return null;

  const HOTLINE_NUMBER = '01700-748854';
  const HOTLINE_CLEAN = '01700748854';
  const WHATSAPP_LINK = `https://wa.me/8801700748854?text=${encodeURIComponent(
    'আসসালামু আলাইকুম, আমি শুটকি বাজার থেকে খাঁটি শুটকি অর্ডার করতে আগ্রহী।'
  )}`;

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {isBn ? 'সরাসরি ফোনে অর্ডার করুন' : 'Instant Phone Order Hotline'}
              </h3>
              <p className="text-xs text-amber-200">
                {isBn ? 'প্রতিদিন সকাল ৮টা - রাত ১১টা' : '7 Days a Week • 8 AM - 11 PM'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-amber-200 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Main Click-to-Call Button */}
          <div className="text-center space-y-2">
            <p className="text-slate-600 text-xs">
              {isBn
                ? 'অনলাইন ফর্ম ছাড়াই মাত্র ১ মিনিটে আমাদের কাস্টমার কেয়ারে কল করে যেকোনো শুটকি অর্ডার দিন:'
                : 'Skip forms! Call our customer care directly to place your dried fish order in 1 minute:'}
            </p>

            <a
              href={`tel:${HOTLINE_CLEAN}`}
              className="inline-flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-black text-lg shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>{HOTLINE_NUMBER}</span>
            </a>

            <div className="text-[11px] text-slate-500 font-medium">
              {isBn ? 'ট্যাপ করে সরাসরি কল করুন' : 'Tap to dial directly'}
            </div>
          </div>

          {/* WhatsApp Direct Option */}
          <div className="pt-2 border-t border-slate-100">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে (WhatsApp) মেসেজ দিয়ে অর্ডার দিন' : 'Order via WhatsApp'}</span>
            </a>
          </div>

          {/* Request Callback Form */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>{isBn ? 'আমরা আপনাকে কল করব (কলব্যাক রিকোয়েস্ট):' : 'Request Free Callback:'}</span>
              <span className="text-[10px] text-amber-700 font-medium">১৫ মিনিটের মধ্যে</span>
            </div>

            {callbackRequested ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {isBn
                    ? 'ধন্যবাদ! আমাদের প্রতিনিধি ১৫ মিনিটের মধ্যে কল করবেন।'
                    : 'Callback requested! Our representative will call within 15 mins.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder={isBn ? 'আপনার নাম' : 'Your Name'}
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs bg-white"
                />
                <input
                  type="tel"
                  required
                  placeholder={isBn ? 'আপনার মোবাইল নম্বর (01XXXXXXXXX)' : 'Phone (01XXXXXXXXX)'}
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
                >
                  {isBn ? 'আমাকে কল দিন' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>

          {/* Quality assurance footer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? '১০০% ক্যাশ অন ডেলিভারি ও মান যাচাইয়ের সুবিধা' : 'Cash on Delivery Across 64 Districts'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
