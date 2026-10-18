import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Crown, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  ArrowUpRight, 
  Percent, 
  Truck, 
  AlertCircle,
  LogOut,
  Store,
  MapPin,
  Printer,
  Globe,
  Star,
  Copy,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';

export const WebsiteOwnerDashboard: React.FC = () => {
  const {
    language,
    currentUser,
    users,
    fishermen,
    products,
    orders,
    platformCommissionPercent,
    setPlatformCommissionPercent,
    approveMerchant,
    deleteProductByOwner,
    setActiveView,
    logout,
    setSelectedOrderForInvoice,
  } = useStore();

  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'overview' | 'merchants' | 'products' | 'orders' | 'seo'>('overview');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Calculate Global Financials
  const totalPlatformGMV = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCommissionEarned = Math.round((totalPlatformGMV * platformCommissionPercent) / 100);
  const totalMerchantPayouts = totalPlatformGMV - totalCommissionEarned;
  const verifiedMerchantsCount = fishermen.filter((f) => f.verified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner for Website Owner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 rounded-2xl p-6 text-white shadow-xl border border-purple-800/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center text-white shadow-lg border-2 border-purple-400">
            <Crown className="w-8 h-8 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                {isBn ? 'ওয়েবসাইট মালিক ও সুপার অ্যাডমিন প্যানেল' : 'Platform Owner & Super Admin'}
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-slate-300 text-xs font-mono">{currentUser?.email}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              {currentUser?.nameBn || 'Mohammad Almas (Platform Owner)'}
            </h1>
            <p className="text-xs text-purple-200/90 mt-0.5">
              {isBn 
                ? 'শুটকি বাজার প্ল্যাটফর্ম কেন্দ্রীয় নিয়ন্ত্রণ, রাজস্ব ও মার্চেন্ট ম্যানেজমেন্ট'
                : 'Shutki Bazar Central Operations, Revenue & Marketplace Governance'}
            </p>
          </div>
        </div>

        {/* Quick View Switcher & Logout */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveView('store')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Store className="w-4 h-4 text-amber-300" />
            <span>{isBn ? 'ক্রেতা স্টোর ভিউ' : 'Storefront'}</span>
          </button>

          <button
            onClick={() => setActiveView('merchant')}
            className="px-3.5 py-2 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-semibold text-xs border border-amber-500/30 active:scale-95 transition-all"
          >
            {isBn ? 'মার্চেন্ট হাব' : 'Merchant Hub'}
          </button>

          <button
            onClick={() => logout()}
            className="px-3 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-700 text-white font-bold text-xs active:scale-95 transition-all flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isBn ? 'লগআউট' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isBn ? 'সার্বিক আয় ও পরিসংখ্যান' : 'Revenue & Analytics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('merchants')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'merchants'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{isBn ? 'জেলে ও মার্চেন্ট অনুমোদন' : 'Merchants & Fishermen'}</span>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.2 rounded-full">
            {fishermen.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isBn ? 'পণ্য ক্যাটালগ নিয়ন্ত্রণ' : 'Product Moderation'}</span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.2 rounded-full">
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{isBn ? 'দেশব্যাপী সকল অর্ডার' : 'All Orders Feed'}</span>
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.2 rounded-full font-bold">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'seo'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4 text-blue-600" />
          <span>{isBn ? 'গুগল সার্চ ও এসইও' : 'Google Search & SEO'}</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
            ১০০% রেডি
          </span>
        </button>
      </div>

      {/* Tab 1: Platform Overview & Revenue */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'প্ল্যাটফর্ম মোট জিএমভি (বিক্রয়)' : 'Total Platform GMV'}</span>
                <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">৳{totalPlatformGMV}</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{isBn ? 'সারা দেশ থেকে শুটকি বিক্রি' : 'Nationwide sales'}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? `প্ল্যাটফর্ম কমিশন (${platformCommissionPercent}%)` : 'Commission Earned'}</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Percent className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-700">৳{totalCommissionEarned}</div>
              <div className="text-[11px] text-slate-500">
                {isBn ? 'মালিকের নিট আয়' : 'Net platform revenue'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'নিবন্ধিত প্রান্তিক জেলে' : 'Active Fishermen'}</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{fishermen.length} জন</div>
              <div className="text-[11px] text-emerald-700 font-medium">
                {verifiedMerchantsCount} {isBn ? 'জন শতভাগ যাচাইকৃত' : 'verified'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'নিবন্ধিত কাস্টমার' : 'Total Customers'}</span>
                <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{users.length + 142}</div>
              <div className="text-[11px] text-slate-500">
                {isBn ? 'সক্রিয় ক্রেতা' : 'Active buyers'}
              </div>
            </div>
          </div>

          {/* Commission Control Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isBn ? 'প্ল্যাটফর্ম ফেয়ার-ট্রেড কমিশন রেট কনফিগারেশন' : 'Marketplace Commission Settings'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn 
                    ? 'প্রান্তিক জেলেদের ন্যায্যমূল্য নিশ্চিত করতে স্বচ্ছ কমিশন হার নির্ধারণ করুন।'
                    : 'Set transparent platform fee. Remaining amount directly paid to artisanal fishermen.'}
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-center">
                <div className="text-xs text-purple-700 font-semibold">{isBn ? 'বর্তমান হার' : 'Current Rate'}</div>
                <div className="text-xl font-black text-purple-900">{platformCommissionPercent}%</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{isBn ? 'ন্যূনতম (৩%)' : 'Min (3%)'}</span>
                <span>{isBn ? 'সুপারিশকৃত ফেয়ার-ট্রেড (৫%)' : 'Fair-Trade Standard (5%)'}</span>
                <span>{isBn ? 'সর্বোচ্চ (১৫%)' : 'Max (15%)'}</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={platformCommissionPercent}
                onChange={(e) => setPlatformCommissionPercent(Number(e.target.value))}
                className="w-full accent-purple-700 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500">{isBn ? 'জেলেদের মোট প্রদেয় (Net Payout):' : 'Total Fisher Payouts:'}</span>
                <div className="text-lg font-bold text-slate-900">৳{totalMerchantPayouts}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                <span className="text-purple-700">{isBn ? 'প্ল্যাটফর্ম পরিচালনা তহবিল:' : 'Platform Revenue:'}</span>
                <div className="text-lg font-bold text-purple-900">৳{totalCommissionEarned}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Merchants Management & Approvals */}
      {activeTab === 'merchants' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">
              {isBn ? 'নিবন্ধিত প্রান্তিক জেলে ও মার্চেন্ট তালিকা' : 'Registered Fishermen & Merchants'}
            </h3>
            <span className="text-xs text-slate-500">
              {isBn ? '১০০% বিষমুক্ত ল্যাব টেস্ট নিরীক্ষণ' : 'Pesticide-free compliance audit'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">{isBn ? 'জেলে / মার্চেন্ট' : 'Fisherman / Merchant'}</th>
                  <th className="p-3.5">{isBn ? 'উপকূলীয় ঘাট ও অঞ্চল' : 'Location & Boat'}</th>
                  <th className="p-3.5">{isBn ? 'যোগাযোগ' : 'Contact'}</th>
                  <th className="p-3.5">{isBn ? 'অভিজ্ঞতা' : 'Experience'}</th>
                  <th className="p-3.5">{isBn ? 'যাচাই স্ট্যাটাস' : 'Verification'}</th>
                  <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fishermen.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-300"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{f.nameBn}</div>
                        <div className="text-[11px] text-slate-500">{f.name}</div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{f.locationBn}</div>
                      {f.boatName && (
                        <div className="text-[10px] text-slate-500">🚢 {f.boatName}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-slate-700">{f.phone}</td>
                    <td className="p-3.5 font-bold text-slate-900">{f.experienceYears}+ বছর</td>
                    <td className="p-3.5">
                      {f.verified ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{isBn ? 'অনুমোদিত ও সার্টিফাইড' : 'Verified'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>{isBn ? 'নিরীক্ষণাধীন' : 'Pending'}</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      {!f.verified ? (
                        <button
                          onClick={() => approveMerchant(f.id)}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700"
                        >
                          {isBn ? 'অনুমোদন দিন' : 'Approve'}
                        </button>
                      ) : (
                        <span className="text-slate-400 font-medium text-xs">
                          {isBn ? 'সক্রিয়' : 'Active'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Global Product Moderation */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">
              {isBn ? 'প্ল্যাটফর্মের সকল পণ্য মডারেশন' : 'All Marketplace Listings'}
            </h3>
            <span className="text-xs text-slate-500">
              {products.length} {isBn ? 'টি সক্রিয় আইটেম' : 'active listings'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">{isBn ? 'পণ্যের নাম' : 'Product'}</th>
                  <th className="p-3.5">{isBn ? 'জেলে / মার্চেন্ট' : 'Merchant'}</th>
                  <th className="p-3.5">{isBn ? 'দাম / কেজি' : 'Price/Kg'}</th>
                  <th className="p-3.5">{isBn ? 'মজুদ' : 'Stock'}</th>
                  <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{p.nameBn}</div>
                        <div className="text-[11px] text-slate-500">{p.originBn}</div>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">{p.fishermanName}</td>
                    <td className="p-3.5 font-bold text-slate-900">৳{p.pricePerKg}</td>
                    <td className="p-3.5 font-semibold text-slate-700">{p.stockKg} কেজি</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteProductByOwner(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title={isBn ? 'পণ্যটি মুছে ফেলুন' : 'Delete listing'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Global Orders Feed */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">
              {isBn ? 'সারাদেশে চলমান ও সম্পন্ন সকল অর্ডার' : 'Nationwide Orders Feed'}
            </h3>
            <span className="text-xs text-slate-500">
              {orders.length} {isBn ? 'টি মোট অর্ডার' : 'orders'}
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">#{o.id}</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                      {o.status}
                    </span>
                    <span className="text-slate-500">• {o.customerName} ({o.customerPhone})</span>
                  </div>
                  <div className="text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{o.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedOrderForInvoice(o)}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg font-bold text-xs flex items-center gap-1 shadow-2xs"
                    title={isBn ? 'অফিসিয়াল ইনভয়েস ও চালান প্রিন্ট করুন' : 'Print Official Invoice / PDF'}
                  >
                    <Printer className="w-3.5 h-3.5 text-purple-700" />
                    <span>{isBn ? 'ইনভয়েস' : 'Invoice'}</span>
                  </button>

                  <div className="text-right">
                    <div className="text-base font-black text-slate-900">৳{o.total}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">{o.paymentMethod} • {o.trackingNumber}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Google Search & SEO Governance */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white border border-blue-700/50 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-emerald-400 text-slate-900">
                  SEO 100/100
                </span>
                <span className="text-blue-200 text-xs">Google Search Console & Crawler Ready</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {isBn ? 'গুগল সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO) ও র‍্যাঙ্কিং হাব' : 'Google Search & SEO Governance Hub'}
              </h3>
              <p className="text-xs text-blue-200/90 max-w-2xl leading-relaxed">
                {isBn 
                  ? 'গুগল বট যেন সহজে পুরো সাইট ইনডেক্স করতে পারে তার জন্য মেটা ট্যাগ, ওপেনগ্রাফ, রোবটস ফাইল, সাইটম্যাপ এবং Schema.org রিচ স্নাইপেট সম্পূর্ণ কনফিগার করা হয়েছে।' 
                  : 'Full technical SEO configured including sitemap.xml, robots.txt, OpenGraph, and Schema.org rich snippets.'}
              </p>
            </div>

            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isBn ? 'গুগল সার্চ কনসোল ওপেন করুন' : 'Open Google Search Console'}</span>
            </a>
          </div>

          {/* Google Search Live Snippet Mock */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">
                  {isBn ? 'গুগলে সার্চ করলে আপনার সাইট যেভাবে দেখতে পাবে কাস্টমাররা:' : 'Live Google SERP Search Snippet:'}
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                রিচ স্নাইপেট সক্রিয় (⭐⭐⭐⭐⭐ ৪.৯)
              </span>
            </div>

            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded-full bg-[#f85606] flex items-center justify-center text-white text-[10px] font-bold">
                  🐟
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    শুটকি বাজার (Shutki Bazar BD)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    https://shutkibazar.com.bd › shutki-mall
                  </span>
                </div>
              </div>

              <h4 className="text-blue-800 hover:underline font-semibold text-base sm:text-lg cursor-pointer">
                শুটকি বাজার (ShutkiBazar.com.bd) - দারাজ স্টাইল বাংলাদেশের #১ খাঁটি শুটকি মল
              </h4>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-800 ml-1">৪.৯</span>
                </div>
                <span className="text-slate-400">•</span>
                <span>১,২৪০টি গ্রাহক রিভিউ</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-800">মূল্য: ৳৩৫০ - ৳২,৫০০</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">ইন-স্টক</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                দারাজ স্টাইলে বাংলাদেশের সর্ববৃহৎ অনলাইন শুটকি হাট। কক্সবাজার, সেন্টমার্টিন ও দুবলার চরের ১০০% বিষমুক্ত ও প্রাকৃতিকভাবে রোদে শুকানো খাঁটি শুটকি। ক্যাশ অন ডেলিভারি, বিকাশ ক্যাশব্যাক ও সারাদেশে দ্রুত হোম ডেলিভারি সুবিধা।
              </p>
            </div>
          </div>

          {/* Quick Technical Links and Copy Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  XML সাইটম্যাপ (Sitemap URL)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  প্রস্তুত
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isBn 
                  ? 'গুগল সার্চ কনসোলের Sitemaps অপশনে নিচের লিঙ্কটি পেস্ট করলেই সমস্ত পেজ স্বয়ংক্রিয়ভাবে ইনডেক্স হবে:'
                  : 'Submit this URL in Google Search Console to index all pages automatically:'}
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                <span>/sitemap.xml</span>
                <button
                  onClick={() => handleCopy('https://shutkibazar.com.bd/sitemap.xml', 'sitemap-admin')}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-sans hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                >
                  {copiedItem === 'sitemap-admin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedItem === 'sitemap-admin' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Robots.txt ফাইল (Crawler Directives)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  সক্রিয়
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isBn 
                  ? 'গুগল বট ও অন্যান্য সার্চ ইঞ্জিন যেন দ্রুত ক্রল করতে পারে সেটার নিয়মাবলী:'
                  : 'Allows full indexing permission for search engine crawlers:'}
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                <span>/robots.txt</span>
                <button
                  onClick={() => handleCopy('https://shutkibazar.com.bd/robots.txt', 'robots-admin')}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-sans hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                >
                  {copiedItem === 'robots-admin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedItem === 'robots-admin' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
