import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Phone, MapPin, Mail, Award, Heart, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenPhoneOrder: () => void;
  onOpenChat: () => void;
  onScrollToRecipes: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhoneOrder,
  onOpenChat,
  onScrollToRecipes,
}) => {
  const { language, setActiveView, quickSwitchRole } = useStore();
  const isBn = language === 'bn';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* 4 Guarantees Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {isBn ? '১০০% বিষ ও রাসায়নিকমুক্ত' : '100% Chemical-Free'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn ? 'কোনো ডিডিটি, সালফার বা কৃত্রিম রঙ নেই' : 'Natural solar dried with zero pesticides'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {isBn ? 'সরাসরি প্রান্তিক জেলেদের হাত থেকে' : 'Direct Fair-Trade'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn ? 'মধ্যস্বত্বভোগী ছাড়া ন্যায্যমূল্যে সংগৃহীত' : 'Empowering coastal artisanal fishing families'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {isBn ? 'সারাদেশে হোম ডেলিভারি' : 'Nationwide 64 Districts'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn ? 'ক্যাশ অন ডেলিভারি ও দ্রুততম কুরিয়ার শিপিং' : 'Cash on delivery with express courier'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {isBn ? '২৪/৭ ফোন ও চ্যাট সাপোর্ট' : 'Direct Helpline'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn ? 'সরাসরি কল করে অর্ডার করার নিশ্চয়তা' : 'Order via phone hotline or chatbot'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white text-xl">
                🐟
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                শুটকি<span className="text-amber-500">বাজার</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isBn
                ? 'শুটকি বাজার বাংলাদেশের প্রথম ডিজিটাল শুটকি হাট, যেখানে গ্রাহকরা কক্সবাজার, সেন্টমার্টিন, দুবলার চর ও হাওরের মেহনতি জেলেদের কাছ থেকে সরাসরি বিষমুক্ত ও স্বাস্থ্যসম্মত শুটকি কিনতে পারেন।'
                : 'Bangladesh’s direct-to-consumer artisanal dry fish marketplace connecting buyers to verified coastal fishermen with complete origin traceability.'}
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-white font-bold font-mono">01700-748854 (01700-SHUTKI)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>নাজিরারটেক ড্রাই ফিশ হাব, কক্সবাজার ও তেজগাঁও সেন্ট্রাল হাব, ঢাকা</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@shutkibazar.com.bd</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              {isBn ? 'উপকূলীয় শুটকির সম্ভার' : 'Dry Fish Varieties'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>লইট্টা শুটকি (লবণ ছাড়া)</li>
              <li>দুবলার চরের মিষ্টি চিংড়ি</li>
              <li>সেন্টমার্টিনের রূপচাঁদা</li>
              <li>ঐতিহ্যবাহী চ্যাপা / সিদল</li>
              <li>সোনাদিয়া দ্বীপের ছুরি</li>
              <li>সুনামগঞ্জ হাওরের কাঁচকি ও মোলা</li>
              <li>পদ্মার নোনা ইলিশ</li>
              <li>চট্টগ্রামের স্পাইসি বালাচাও</li>
            </ul>
          </div>

          {/* Sourcing Hubs */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              {isBn ? 'সংগ্রহ কেন্দ্র ও ঘাট' : 'Sourcing Hubs'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>নাজিরারটেক, কক্সবাজার</li>
              <li>দুবলার চর, সুন্দরবন</li>
              <li>সেন্টমার্টিন কোরাল দ্বীপ</li>
              <li>কুয়াকাটা সৈকত ঘাট</li>
              <li>টাঙ্গুয়ার হাওর, সুনামগঞ্জ</li>
              <li>নিকলী হাওর, কিশোরগঞ্জ</li>
              <li>কুতুবদিয়া উপকূল</li>
            </ul>
          </div>

          {/* Merchant & Customer Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wider uppercase">
              {isBn ? 'মার্চেন্ট ও সেবা' : 'Portal & Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    quickSwitchRole('merchant');
                    setActiveView('merchant');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {isBn ? 'জেলে ও মার্চেন্ট ড্যাশবোর্ড' : 'Merchant Dashboard'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    quickSwitchRole('owner');
                    setActiveView('owner');
                  }}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  {isBn ? 'ওয়েবসাইট মালিকের প্যানেল' : 'Website Owner Admin'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPhoneOrder}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {isBn ? 'সরাসরি ফোনে অর্ডার' : 'Phone Hotline'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {isBn ? 'মার্চেন্টের সাথে লাইভ চ্যাট' : 'Fisherman Chat'}
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToRecipes}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {isBn ? 'রেসিপি ও রান্নার টিপস' : 'Recipes & Blogs'}
                </button>
              </li>
              <li>
                <span className="text-slate-500">BSTI ও ল্যাব কোয়ালিটি পরীক্ষিত</span>
              </li>
            </ul>

            {/* Payment Gateways visual pills */}
            <div className="pt-3">
              <div className="text-[10px] text-slate-500 font-bold mb-1.5 uppercase">
                {isBn ? 'পেমেন্ট পার্টনার' : 'Accepted Gateways'}
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="bg-pink-900/40 text-pink-300 border border-pink-700/50 px-2 py-0.5 rounded">
                  bKash
                </span>
                <span className="bg-orange-900/40 text-orange-300 border border-orange-700/50 px-2 py-0.5 rounded">
                  Nagad
                </span>
                <span className="bg-purple-900/40 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded">
                  Rocket
                </span>
                <span className="bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} শুটকি বাজার (Shutki Bazar). সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>উপকূলীয় জেলেদের ভালোবাসায় নির্মিত</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>বাংলাদেশ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
