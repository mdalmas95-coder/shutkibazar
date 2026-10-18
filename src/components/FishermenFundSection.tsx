import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, LifeBuoy, Sun, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

export const FishermenFundSection: React.FC = () => {
  const { language, orders } = useStore();
  const isBn = language === 'bn';

  // Dynamic fund accumulation
  const baseFund = 84500;
  const currentTotalFund = baseFund + orders.length * 10;

  return (
    <section className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white py-12 border-t border-amber-900/40 relative overflow-hidden">
      {/* Background visual texture */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>{isBn ? 'সামাজিক প্রভাব ও দায়িত্বশীল বাণিজ্য' : 'Social Impact & Fishermen Welfare'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isBn ? (
              <>
                আপনার প্রতিটি অর্ডারের <span className="text-amber-400">১০ টাকা</span> জমা হয় উপকূলীয় জেলে তহবিলে
              </>
            ) : (
              <>
                Every Order Donates <span className="text-amber-400">৳10</span> to Coastal Fishermen Safety Fund
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isBn
              ? 'আমরা শুধু খাঁটি শুটকি সরবরাহ করি না, সমুদ্রের বৈরী আবহাওয়ায় জীবনের ঝুঁকি নেওয়া প্রান্তিক জেলেদের সুরক্ষা ও তাদের সন্তানদের শিক্ষার পাশে দাঁড়াই।'
              : 'Empowering artisanal fishermen with safety lifejackets, modern net-covered solar drying lofts, and educational scholarships.'}
          </p>
        </div>

        {/* 4 Impact Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/30 text-center space-y-2 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Heart className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              ৳{currentTotalFund.toLocaleString('bn-BD')}
            </div>
            <div className="text-xs font-bold text-slate-200">
              {isBn ? 'মোট সংগৃহীত কল্যাণ তহবিল' : 'Total Welfare Fund Raised'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-center space-y-2 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ১২৪ টি
            </div>
            <div className="text-xs font-bold text-slate-200">
              {isBn ? 'বিতরণকৃত জীবনরক্ষা জ্যাকেট' : 'Safety Lifejackets Given'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-center space-y-2 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Sun className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ১৮ টি
            </div>
            <div className="text-xs font-bold text-slate-200">
              {isBn ? 'আধুনিক নেটযুক্ত সৌর ড্রায়ার' : 'Insect-Proof Solar Lofts'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-center space-y-2 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ৫২ জন
            </div>
            <div className="text-xs font-bold text-slate-200">
              {isBn ? 'জেলে সন্তানের শিক্ষাবৃত্তি' : 'Children Scholarships'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
