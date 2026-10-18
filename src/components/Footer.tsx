import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Phone, MapPin, Mail, Award, Heart, MessageSquare, CreditCard, Clock, Smartphone, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenPhoneOrder: () => void;
  onOpenChat: () => void;
  onScrollToRecipes: () => void;
  onOpenGoogleSeo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhoneOrder,
  onOpenChat,
  onScrollToRecipes,
  onOpenGoogleSeo,
}) => {
  const { language, setActiveView, quickSwitchRole } = useStore();
  const isBn = language === 'bn';

  return (
    <footer className="bg-[#2e2e2e] text-slate-300 border-t border-slate-700 text-xs">
      {/* 4 Daraz Trust Pillars Bar */}
      <div className="bg-[#383838] border-b border-slate-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f85606]/20 border border-[#f85606]/40 flex items-center justify-center text-[#f85606] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  {isBn ? 'সারা দেশে হোম ডেলিভারি' : 'Nationwide Delivery'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isBn ? '৬৪ জেলায় ক্যাশ অন ডেলিভারি' : 'Cash on Delivery in 64 districts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  {isBn ? '১০০% খাঁটি ও বিষমুক্ত' : '100% Authentic Quality'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isBn ? 'বিসিএসআইআর ল্যাব সনদপ্রাপ্ত' : 'BCSIR Lab Test Certified'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  {isBn ? '৭ দিনের রিপ্লেসমেন্ট' : '7 Days Easy Return'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isBn ? 'পছন্দ না হলে সহজ রিটার্ন' : 'Hassle-free guarantee'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  {isBn ? '২৪/৭ গ্রাহক সেবা' : '24/7 Helpline'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  01700-748854 (সরাসরি কল)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Daraz Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs tracking-wider uppercase">
              {isBn ? 'গ্রাহক সেবা (Customer Care)' : 'Customer Care'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <button onClick={onOpenPhoneOrder} className="hover:text-[#f85606] transition-colors">
                  {isBn ? 'হেল্প সেন্টার ও ফোন অর্ডার' : 'Help Center & Call Order'}
                </button>
              </li>
              <li>
                <button onClick={onOpenChat} className="hover:text-[#f85606] transition-colors">
                  {isBn ? 'জেলে ও বিক্রেতাদের সাথে চ্যাট' : 'Chat with Fishermen'}
                </button>
              </li>
              <li>
                <button onClick={onScrollToRecipes} className="hover:text-[#f85606] transition-colors">
                  {isBn ? 'রান্নার নিয়ম ও রেসিপি গাইড' : 'Cooking Recipes Guide'}
                </button>
              </li>
              <li>{isBn ? 'কীভাবে অর্ডার করবেন' : 'How to Buy'}</li>
              <li>{isBn ? 'শিপিং ও ডেলিভারি নীতিমালা' : 'Shipping & Delivery'}</li>
              <li>{isBn ? 'রিটার্ন ও রিফান্ড পলিসি' : 'Return & Refund Policy'}</li>
            </ul>
          </div>

          {/* Column 2: Shutki Bazar */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs tracking-wider uppercase">
              {isBn ? 'শুটকি বাজার (Shutki Bazar)' : 'About Shutki Bazar'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>{isBn ? 'আমাদের সম্পর্কে (About Us)' : 'About Us'}</li>
              <li>
                <button
                  onClick={() => {
                    quickSwitchRole('merchant');
                    setActiveView('merchant');
                  }}
                  className="hover:text-[#f85606] font-semibold text-left"
                >
                  {isBn ? 'শুটকি বাজারে বিক্রি করুন (সেলার হাব)' : 'Sell on Shutki Bazar'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    quickSwitchRole('owner');
                    setActiveView('owner');
                  }}
                  className="hover:text-[#f85606] font-semibold text-left"
                >
                  {isBn ? 'ওয়েবসাইট অ্যাডমিন কনসোল' : 'Admin Control Center'}
                </button>
              </li>
              {onOpenGoogleSeo && (
                <li>
                  <button
                    onClick={onOpenGoogleSeo}
                    className="hover:text-blue-400 font-semibold text-left text-blue-300 flex items-center gap-1"
                  >
                    <span>{isBn ? '🔍 গুগল সার্চ প্রিভিউ ও এসইও' : '🔍 Google Search & SEO'}</span>
                  </button>
                </li>
              )}
              <li>{isBn ? 'জেলে উন্নয়ন তহবিল' : 'Fishermen Development Fund'}</li>
              <li>{isBn ? 'প্রাইভেসি পলিসি ও শর্তাবলী' : 'Privacy Policy & Terms'}</li>
              <li>{isBn ? 'ডিজিটাল পেমেন্ট সুরক্ষা' : 'Digital Payment Security'}</li>
            </ul>
          </div>

          {/* Column 3: Payment Methods & Logistics */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-black text-white text-xs tracking-wider uppercase">
                {isBn ? 'পেমেন্ট মেথড (Payment Methods)' : 'Payment Methods'}
              </h4>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="bg-[#e2136e] text-white px-2.5 py-1 rounded shadow-xs">bKash</span>
                <span className="bg-[#f7941d] text-white px-2.5 py-1 rounded shadow-xs">Nagad</span>
                <span className="bg-[#8b2383] text-white px-2.5 py-1 rounded shadow-xs">Rocket</span>
                <span className="bg-emerald-600 text-white px-2.5 py-1 rounded shadow-xs">Cash on Delivery</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded shadow-xs">VISA / Mastercard</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-white text-xs tracking-wider uppercase">
                {isBn ? 'ডেলিভারি পার্টনার (Delivery Partners)' : 'Delivery Partners'}
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-300">
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Steadfast Courier</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Pathao</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">RedX</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">eCourier</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quality & Hotline */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs tracking-wider uppercase">
              {isBn ? 'কোয়ালিটি গ্যারান্টি ও হটলাইন' : 'Quality & Hotline'}
            </h4>
            <div className="bg-[#383838] p-3 rounded-xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f85606] flex items-center justify-center text-white font-black text-sm">
                  🐟
                </div>
                <div>
                  <div className="font-bold text-white text-xs leading-none">
                    শুটকি<span className="text-[#f85606]">বাজার</span> মল
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    ১০০% খাঁটি ও বিষমুক্ত
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed">
                {isBn 
                  ? 'বিসিএসআইআর (BCSIR) ও বিএসটিআই মান অনুসারে পরীক্ষিত। কোনো কীটনাশক নেই।' 
                  : 'Certified chemical-free under Bangladesh BCSIR standards.'}
              </p>

              <button
                onClick={onOpenPhoneOrder}
                className="w-full py-1.5 bg-[#f85606] hover:bg-[#d94803] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>01700-748854 (হটলাইন)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Daraz Tag */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} শুটকি বাজার বাংলাদেশ (Shutki Bazar Bangladesh). সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-1.5">
            <span>বাংলাদেশের জনপ্রিয় ই-কমার্স আর্কিটেকচার</span>
            <span>•</span>
            <span className="text-[#f85606] font-bold">Daraz Style E-Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
