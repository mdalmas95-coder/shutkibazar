import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Clock, Tag, Sparkles, ShoppingBag, ArrowRight, Check, Percent } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleBannerProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  onSelectProduct,
  onOpenCart,
}) => {
  const { language, products, addToCart, setAppliedCoupon } = useStore();
  const isBn = language === 'bn';

  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Countdown timer calculations (e.g. countdown to midnight or fixed 8 hours window)
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // resets
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setAppliedCoupon(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  // Top 4 flash sale dried fish items
  const flashProducts = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 text-white shadow-2xl border-2 border-amber-500/40 p-5 sm:p-8">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Row: Flash Sale Title + Countdown Timer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-amber-500/20">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-black text-xs uppercase tracking-wider animate-pulse">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{isBn ? '⚡ সীমিত সময়ের মেগা ফ্ল্যাশ সেল' : '⚡ Limited Time Mega Flash Sale'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {isBn 
                ? 'নাজিরারটেক ও দুবলার চরের খাঁটি শুটকিতে সর্বোচ্চ ২৫% ছাড়!' 
                : 'Up to 25% Off Pure Sun-Dried Coastal Delicacies!'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80">
              {isBn 
                ? 'কীটনাশকমুক্ত ও সম্পূর্ণ রোদে শুকানো টাটকা শুটকি সরাসরি জেলেদের থেকে সংগৃহীত।' 
                : 'Direct harvest from verified artisanal fishermen. 100% chemical & pesticide free.'}
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{isBn ? 'আজকের অফার শেষ হতে আর মাত্র বাকি:' : 'Flash Deal Ends In:'}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-amber-300 shadow-inner">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1">
                  {isBn ? 'ঘণ্টা' : 'Hours'}
                </span>
              </div>

              <span className="font-mono font-black text-2xl text-amber-400 mb-4">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-amber-300 shadow-inner">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1">
                  {isBn ? 'মিনিট' : 'Mins'}
                </span>
              </div>

              <span className="font-mono font-black text-2xl text-amber-400 mb-4">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-red-500/20 border border-red-400/40 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-red-300 shadow-inner animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1">
                  {isBn ? 'সেকেন্ড' : 'Secs'}
                </span>
              </div>
            </div>

            {/* 1-Click Coupon Voucher */}
            <div className="mt-1">
              <button
                onClick={() => handleCopyCoupon('SHUTKI15')}
                className="group px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 flex items-center gap-2 text-xs font-bold transition-all text-amber-200"
                title={isBn ? 'কুপন কোড কপি করতে ক্লিক করুন' : 'Click to copy coupon code'}
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isBn ? 'অতিরিক্ত ১৫% ছাড়ের কোড:' : 'Extra 15% OFF Code:'}{' '}
                  <span className="font-mono text-white underline decoration-amber-400 decoration-2">
                    SHUTKI15
                  </span>
                </span>
                {copiedCoupon ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                    <Check className="w-3 h-3" />
                    {isBn ? 'কপি হয়েছে ও যুক্ত হয়েছে!' : 'Applied!'}
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black group-hover:scale-105 transition-transform">
                    {isBn ? 'কপি করুন' : 'COPY'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards Grid */}
        <div className="relative z-10 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashProducts.map((p, idx) => {
              const discountPercent = idx === 0 ? 25 : idx === 1 ? 20 : idx === 2 ? 15 : 18;
              const originalPrice = p.availableWeights[0]?.price ? Math.round(p.availableWeights[0].price * 1.25) : 350;
              const discountedPrice = p.availableWeights[0]?.price || 280;
              const claimedPercent = [82, 74, 91, 68][idx];

              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group bg-slate-900/90 rounded-2xl border border-amber-500/30 hover:border-amber-400 p-3.5 flex flex-col justify-between space-y-3 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl shadow-xs"
                >
                  <div className="space-y-2.5">
                    {/* Image with flash discount badge */}
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>{discountPercent}% {isBn ? 'ছাড়' : 'OFF'}</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-xs text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded">
                        {p.availableWeights[0]?.label || '250g'}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-white text-sm group-hover:text-amber-300 transition-colors truncate">
                        {p.nameBn}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate font-mono">
                        {p.name}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-amber-400">
                        ৳{discountedPrice}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ৳{originalPrice}
                      </span>
                    </div>

                    {/* Claimed progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-300 font-semibold">
                        <span>{isBn ? `বিক্রি হয়েছে: ${claimedPercent}%` : `Sold: ${claimedPercent}%`}</span>
                        <span className="text-amber-400">{isBn ? 'স্টক দ্রুত ফুরিয়ে আসছে!' : 'Few left!'}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                          style={{ width: `${claimedPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const weight = p.availableWeights[0]?.weight || 250;
                      addToCart(p, weight, 1);
                    }}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isBn ? '⚡ ব্যাগে যোগ করুন' : 'Quick Add'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
