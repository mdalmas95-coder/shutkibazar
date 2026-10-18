import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Phone, 
  Award, 
  PackageCheck, 
  Flame, 
  ChevronRight, 
  Gift, 
  Clock, 
  Zap, 
  Tag, 
  Percent, 
  ArrowRight,
  Fish,
  CheckCircle2,
  Headphones
} from 'lucide-react';

interface HeroBannerProps {
  onOpenPhoneOrder: () => void;
  onScrollToRecipes: () => void;
  onScrollToProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenPhoneOrder,
  onScrollToRecipes,
  onScrollToProducts,
}) => {
  const { language, setSelectedCategory } = useStore();
  const isBn = language === 'bn';

  // Daraz Banner Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      titleBn: 'দারাজ স্টাইল মেগা শুটকি মেলা',
      subtitleBn: 'কক্সবাজার ও দুবলার চরের ১০০% বিষমুক্ত ও খাঁটি রোদে শুকানো শুটকি',
      titleEn: 'Daraz Style Mega Dried Fish Festival',
      subtitleEn: '100% Chemical-free coastal harvest from artisanal fishermen',
      badgeBn: '⚡ মেগা অফার • ১৫% ছাড়',
      badgeEn: '⚡ MEGA OFFER • 15% OFF',
      code: 'SHUTKI15',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-[#f85606] to-amber-700',
    },
    {
      titleBn: 'সরাসরি সেন্টমার্টিনের আস্ত রূপচাঁদা ও লইট্টা',
      subtitleBn: '৩-স্তর বায়ুরোধী ভ্যাকুয়াম সিলিং—ফ্রিজে রাখলেও কোনো গন্ধ ছড়াবে না',
      titleEn: 'Direct St. Martin Rupchanda & Nazirtek Loitta',
      subtitleEn: '3-layer food-grade vacuum heat-sealed with 0% odor leakage',
      badgeBn: '🏆 শুটকি মল • অরিজিনাল গ্যারান্টি',
      badgeEn: '🏆 SHUTKI MALL • 100% AUTHENTIC',
      code: 'FREESHIP',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-orange-600 to-rose-700',
    },
    {
      titleBn: 'সারাদেশে ক্যাশ অন ডেলিভারি ও দ্রুততম কুরিয়ার',
      subtitleBn: 'পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা • বিএসটিআই ও বিসিএসআইআর পরীক্ষিত',
      titleEn: 'Nationwide Cash on Delivery in 64 Districts',
      subtitleEn: 'Pay after receiving the package • BCSIR Lab Tested',
      badgeBn: '🚚 ফ্রি ডেলিভারি ভাউচার',
      badgeEn: '🚚 FREE DELIVERY VOUCHERS',
      code: 'DARAZ10',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-emerald-700 to-teal-800',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const slide = bannerSlides[currentSlide];

  return (
    <div className="bg-[#f5f5f5] py-3 sm:py-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
        {/* Main Daraz Grid: Left Categories Sidebar + Center Banner Carousel + Right Daraz Mall Perks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* Left: Daraz Categories Sidebar (Hidden on mobile/tablet, prominent on desktop) */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-xl border border-slate-200 p-2 shadow-2xs text-xs font-semibold">
            <div className="px-3 py-2 font-black text-slate-900 border-b border-slate-100 flex items-center justify-between text-xs uppercase tracking-wider">
              <span>{isBn ? 'ক্যাটাগরি সমূহ' : 'Categories'}</span>
              <span className="text-[#f85606] text-[10px] font-bold">দারাজ স্পেশাল</span>
            </div>

            <nav className="py-1 space-y-0.5">
              {[
                { id: 'all', icon: '🐟', labelBn: 'সকল খাঁটি শুটকি', labelEn: 'All Dried Fish' },
                { id: 'sea', icon: '🌊', labelBn: 'সামুদ্রিক শুটকি (লইট্টা, ছুরি)', labelEn: 'Marine Dry Fish' },
                { id: 'haor', icon: '🌾', labelBn: 'মিঠাপানির হাওর (কাঁচকি, মলা)', labelEn: 'Haor Freshwater' },
                { id: 'fermented', icon: '🏺', labelBn: 'ঐতিহ্যবাহী চ্যাপা ও সিদল', labelEn: 'Traditional Chepa' },
                { id: 'balachao', icon: '🌶️', labelBn: 'ক্রিস্পি ঝাল বালাচাও', labelEn: 'Crispy Balachao' },
                { id: 'special', icon: '🎁', labelBn: 'ফ্যামিলি কম্বো গিফট বক্স', labelEn: 'Family Gift Box' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    onScrollToProducts();
                  }}
                  className="w-full px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-[#f85606] transition-colors flex items-center justify-between group text-slate-700 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{cat.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {isBn ? cat.labelBn : cat.labelEn}
                    </span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#f85606]" />
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 mt-2 space-y-1">
                <button
                  onClick={onScrollToRecipes}
                  className="w-full px-3 py-1.5 text-slate-600 hover:text-[#f85606] hover:bg-orange-50 rounded-lg flex items-center justify-between transition-colors text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>{isBn ? 'শুটকি ভুনার রেসিপি' : 'Shutki Bhuna Recipes'}</span>
                  </span>
                  <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">HOT</span>
                </button>

                <button
                  onClick={onOpenPhoneOrder}
                  className="w-full px-3 py-1.5 text-slate-600 hover:text-[#f85606] hover:bg-orange-50 rounded-lg flex items-center justify-between transition-colors text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isBn ? 'ফোনে সরাসরি অর্ডার' : 'Phone Order Hotline'}</span>
                  </span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-bold">২৪/৭</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Center: Daraz Big Slider Banner */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-between min-h-[300px] sm:min-h-[360px] group">
            {/* Background Image with Gradient Overlay */}
            <img
              src={slide.image}
              alt={slide.titleEn}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />

            {/* Slide Content */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-[#f85606] text-white text-[11px] font-black px-3 py-1 rounded-md shadow-xs uppercase tracking-wider mb-3">
                  {isBn ? slide.badgeBn : slide.badgeEn}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight max-w-md">
                  {isBn ? slide.titleBn : slide.titleEn}
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-sm line-clamp-2 leading-relaxed">
                  {isBn ? slide.subtitleBn : slide.subtitleEn}
                </p>
              </div>

              {/* Actions & Voucher Code */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onScrollToProducts}
                  className="px-5 py-2.5 bg-[#f85606] hover:bg-[#d94803] text-white rounded-lg font-black text-xs sm:text-sm shadow-lg shadow-orange-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{isBn ? 'এখনই কিনুন' : 'Shop Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-mono border border-white/30 flex items-center gap-2">
                  <span className="text-[10px] text-amber-200 uppercase font-sans font-bold">
                    {isBn ? 'ভাউচার:' : 'CODE:'}
                  </span>
                  <span className="font-black text-amber-300">{slide.code}</span>
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-[#f85606]' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Daraz Mall & Trust Card */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {/* Shutki Mall Guarantee Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#f85606] font-black text-sm">
                    Mall
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 leading-tight">
                      {isBn ? 'শুটকি মল (Shutki Mall)' : 'Shutki Mall Official'}
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-bold">
                      {isBn ? '১০০% অরিজিনাল ও বিষমুক্ত' : '100% Authentic Guarantee'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isBn ? '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' : '7 Days Easy Return'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#f85606] shrink-0" />
                    <span>{isBn ? '২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি' : 'Express 24-48h Delivery'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isBn ? 'বিএসটিআই ও ল্যাব সনদ প্রাপ্ত' : 'BSTI & BCSIR Tested'}</span>
                  </div>
                </div>
              </div>

              {/* Express Order Button */}
              <button
                onClick={onOpenPhoneOrder}
                className="w-full py-2 px-3 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#f85606] border border-orange-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isBn ? 'হটলাইনে অর্ডার: 01700-748854' : 'Call: 01700-748854'}</span>
              </button>
            </div>

            {/* Daraz Seller Promotion Card */}
            <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white rounded-xl p-3.5 shadow-2xs flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  {isBn ? 'বিক্রেতাদের জন্য' : 'FOR SELLERS'}
                </span>
                <span className="font-extrabold text-xs">
                  {isBn ? 'আপনার শুটকির আড়ত রেজিস্টার করুন' : 'Register your Dry Fish Yard'}
                </span>
              </div>
              <button
                onClick={onScrollToProducts}
                className="px-3 py-1.5 bg-[#f85606] hover:bg-[#d94803] text-white rounded-md text-xs font-bold shrink-0 transition-colors"
              >
                {isBn ? 'যুক্ত হন' : 'Join'}
              </button>
            </div>
          </div>
        </div>

        {/* Daraz Iconic Channel Icons Row (Flash Sale, Free Shipping, Mall, Custom Box, Freshness Guide, Call) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 pt-1">
          {[
            {
              id: 'flash-sale',
              icon: <Zap className="w-5 h-5 text-[#f85606]" />,
              labelBn: 'ফ্ল্যাশ সেল',
              labelEn: 'Flash Sale',
              action: () => {
                const el = document.getElementById('flash-sale-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              id: 'free-shipping',
              icon: <Truck className="w-5 h-5 text-emerald-600" />,
              labelBn: 'ফ্রি ডেলিভারি',
              labelEn: 'Free Delivery',
              action: onScrollToProducts,
            },
            {
              id: 'shutki-mall',
              icon: <Award className="w-5 h-5 text-amber-600" />,
              labelBn: 'শুটকি মল',
              labelEn: 'Shutki Mall',
              action: onScrollToProducts,
            },
            {
              id: 'custom-box',
              icon: <Gift className="w-5 h-5 text-purple-600" />,
              labelBn: 'নিজের বক্স সাজান',
              labelEn: 'Custom Box',
              action: () => {
                const el = document.getElementById('custom-box-button');
                if (el) (el as HTMLElement).click();
              },
            },
            {
              id: 'recipes',
              icon: <Flame className="w-5 h-5 text-rose-600" />,
              labelBn: 'রেসিপি ও টিপস',
              labelEn: 'Recipes & Tips',
              action: onScrollToRecipes,
            },
            {
              id: 'hotline',
              icon: <Phone className="w-5 h-5 text-blue-600" />,
              labelBn: 'হটলাইন কল',
              labelEn: 'Hotline Help',
              action: onOpenPhoneOrder,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="bg-white hover:bg-orange-50/60 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center justify-center gap-1.5 group text-center active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center shadow-inner transition-colors">
                {item.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-[#f85606] transition-colors leading-tight">
                {isBn ? item.labelBn : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
