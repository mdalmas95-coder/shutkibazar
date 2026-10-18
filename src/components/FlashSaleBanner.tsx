import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Clock, Tag, ShoppingBag, ArrowRight, Check, Zap, ChevronRight } from 'lucide-react';
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

  // Live Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 38,
    seconds: 22,
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
          return { hours: 12, minutes: 0, seconds: 0 };
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

  // 6 flash deal products
  const flashProducts = products.slice(0, 6);

  const getDiscountedPrice = (product: Product) => {
    const base = product.availableWeights[1]?.price || product.pricePerKg * 0.25;
    return Math.round(base * 0.82); // ~18% off
  };

  const getOriginalPrice = (product: Product) => {
    return product.availableWeights[1]?.price || product.pricePerKg * 0.25;
  };

  return (
    <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Daraz Flash Sale Header Bar */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            {/* Title in Daraz Orange */}
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#f85606] fill-[#f85606]" />
              <h2 className="text-lg sm:text-xl font-black text-[#f85606] tracking-tight">
                {isBn ? 'ফ্ল্যাশ সেল (Flash Sale)' : 'Flash Sale'}
              </h2>
            </div>

            {/* Countdown Timer with Dark Boxes */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700 hidden sm:inline">
                {isBn ? 'অফার শেষ হতে বাকি:' : 'Ending in:'}
              </span>

              <div className="flex items-center gap-1 font-mono font-black text-xs text-white">
                <span className="bg-[#d32f2f] px-2 py-1 rounded shadow-xs">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-slate-800 font-bold">:</span>
                <span className="bg-[#d32f2f] px-2 py-1 rounded shadow-xs">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-slate-800 font-bold">:</span>
                <span className="bg-[#d32f2f] px-2 py-1 rounded shadow-xs animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Extra Coupon Promo */}
            <button
              onClick={() => handleCopyCoupon('SHUTKI15')}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? 'কুপন কোড: SHUTKI15 (১৫% ছাড়)' : 'Coupon: SHUTKI15 (15% OFF)'}</span>
              {copiedCoupon && (
                <span className="text-emerald-700 text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                  কপি হয়েছে!
                </span>
              )}
            </button>
          </div>

          {/* Daraz "SHOP MORE" button */}
          <button
            onClick={() => {
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-lg border border-[#f85606] text-[#f85606] hover:bg-orange-50 font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>{isBn ? 'আরও দেখুন' : 'SHOP MORE'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Daraz Flash Sale Products Grid (6 items) */}
        <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {flashProducts.map((p, idx) => {
            const discPrice = getDiscountedPrice(p);
            const origPrice = getOriginalPrice(p);
            const soldCount = 8 + idx * 3;

            return (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group bg-white hover:shadow-md transition-all rounded-xl border border-slate-100 p-2.5 flex flex-col justify-between cursor-pointer relative"
              >
                {/* Discount Tag */}
                <div className="absolute top-2 left-2 z-10 bg-[#f85606] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  -18%
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-50 mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#f85606] transition-colors">
                    {isBn ? p.nameBn : p.name}
                  </h3>

                  {/* Price */}
                  <div className="pt-0.5">
                    <div className="text-sm font-black text-[#f85606] leading-none">
                      ৳{discPrice}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span className="line-through">৳{origPrice}</span>
                      <span className="text-[#f85606] font-semibold text-[10px]">-18%</span>
                    </div>
                  </div>

                  {/* Claimed Sold Progress Bar */}
                  <div className="pt-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                      <span>{isBn ? `${soldCount}টি বিক্রিত` : `${soldCount} Sold`}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-[#f85606] rounded-full"
                        style={{ width: `${Math.min(30 + idx * 12, 90)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Add To Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, 250, 1);
                  }}
                  className="mt-2.5 w-full py-1.5 bg-orange-50 hover:bg-[#f85606] text-[#f85606] hover:text-white rounded-lg font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>{isBn ? 'কার্টে নিন' : 'Add to Cart'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
