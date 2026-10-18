import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Sparkles, Phone, Award, PackageCheck, Flame } from 'lucide-react';

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
  const { language } = useStore();
  const isBn = language === 'bn';

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 text-white">
      {/* Background coastal texture/gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Origin & Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-400/30 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{isBn ? 'সরাসরি উপকূলীয় প্রান্তিক জেলেদের হাত থেকে' : 'Direct From Coastal Artisanal Fishermen'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              {isBn ? (
                <>
                  ১০০% বিষমুক্ত ও প্রাকৃতিকভাবে রোদে শুকানো{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
                    খাঁটি শুটকির হাট
                  </span>
                </>
              ) : (
                <>
                  100% Chemical-Free, Naturally Sun-Dried{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
                    Authentic Bangladeshi Dry Fish
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isBn 
                ? 'কক্সবাজার, সেন্টমার্টিন, দুবলার চর ও হাওরের মেহনতি জেলেদের কাছ থেকে সরাসরি সংগৃহীত। কোনো কীটনাশক, অতিরিক্ত লবণ বা রাসায়নিক নেই—বিশেষ ৩ স্তরের গন্ধহীন বায়ুরোধী প্যাকেজিংয়ে পৌঁছে যাবে আপনার দরজায়।'
                : 'Direct fair-trade sourcing from the fishing communities of Cox’s Bazar, Saint Martin, Sundarbans & Sylhet Haor. No pesticides, zero harmful DDT, vacuum-packed in 3-layer odor-proof pouches with island-to-table traceability.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onScrollToProducts}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>🐟</span>
                <span>{isBn ? 'শুটকি পছন্দ করুন' : 'Shop Dry Fish'}</span>
              </button>

              <button
                onClick={onOpenPhoneOrder}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{isBn ? 'সরাসরি ফোনে অর্ডার' : 'Order by Phone'}</span>
              </button>

              <button
                onClick={onScrollToRecipes}
                className="px-4 py-3 rounded-xl text-amber-200 hover:text-white font-medium text-sm flex items-center gap-1.5 hover:underline"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>{isBn ? 'রেসিপি ও রান্নার টিপস' : 'Recipes & Tips'}</span>
              </button>
            </div>

            {/* Fast Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">{isBn ? 'বিষমুক্ত' : 'DDT Free'}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? 'ল্যাব টেস্ট প্রত্যয়িত' : 'Zero chemicals'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <PackageCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">{isBn ? 'গন্ধহীন প্যাক' : 'Odor-Proof'}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? '৩-স্তর বায়ুরোধী' : 'Food-grade seal'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">{isBn ? 'সারাদেশে ক্যাশ' : 'Cash on Delivery'}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? '৬৪ জেলায় হোম ডেলিভারি' : '64 Districts'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">{isBn ? 'ন্যায্য মূল্য' : 'Fair Trade'}</div>
                  <div className="text-[10px] text-slate-400">{isBn ? 'জেলেদের সহায়তা' : 'Direct to fishers'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-2xl backdrop-blur-sm">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-4 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic Dried Fish"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-300 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <span>★ 4.9</span>
                  <span>(1,840+ {isBn ? 'রিভিউ' : 'reviews'})</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-xs rounded-lg p-2.5 text-xs text-slate-200 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-300">
                      {isBn ? 'নাজিরারটেক ও দুবলার চরের তাজা ব্যাচ' : 'Fresh Sun-Dried Batch'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isBn ? 'আজকে প্রস্তুত ও প্যাক করা' : 'Dried & Odor-Locked Today'}
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                    {isBn ? 'স্টক প্রস্তুত' : 'Ready'}
                  </span>
                </div>
              </div>

              {/* Quick Trust Highlights */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800">
                  <span className="text-slate-400">{isBn ? 'উৎস অঞ্চল:' : 'Primary Sourcing:'}</span>
                  <span className="font-semibold text-white">কক্সবাজার, দুবলার চর, সেন্টমার্টিন</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800">
                  <span className="text-slate-400">{isBn ? 'পেমেন্ট মাধ্যম:' : 'Payment Gateways:'}</span>
                  <span className="font-semibold text-amber-300">bKash, Nagad, Rocket, Cash on Delivery</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 py-1">
                  <span className="text-slate-400">{isBn ? 'শিপিং চার্জ:' : 'Delivery Fee:'}</span>
                  <span className="font-semibold text-emerald-400">
                    {isBn ? '৳১৫০০+ অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি' : 'Free over ৳1500'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
