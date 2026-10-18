import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Fisherman, Order } from '../types';
import { 
  BarChart3, 
  Package, 
  PlusCircle, 
  TrendingUp, 
  UserCheck, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Edit3, 
  Check, 
  Eye, 
  ArrowUpRight,
  Fish,
  Users,
  Printer
} from 'lucide-react';

export const MerchantDashboard: React.FC = () => {
  const {
    language,
    fishermen,
    currentMerchantId,
    setCurrentMerchantId,
    products,
    orders,
    updateProductStock,
    updateOrderStatus,
    addProductByMerchant,
    registerFisherman,
    setActiveView,
    setSelectedOrderForInvoice,
  } = useStore();

  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders' | 'profile'>('analytics');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showOnboardFishermanModal, setShowOnboardFishermanModal] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // New Product Form State
  const [newProdNameBn, setNewProdNameBn] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('sea');
  const [newProdPriceKg, setNewProdPriceKg] = useState(1400);
  const [newProdStockKg, setNewProdStockKg] = useState(80);
  const [newProdOriginBn, setNewProdOriginBn] = useState("নাজিরারটেক, কক্সবাজার");
  const [newProdOriginEn, setNewProdOriginEn] = useState("Nazirtek, Cox's Bazar");
  const [newProdDescBn, setNewProdDescBn] = useState('');
  const [newProdDescEn, setNewProdDescEn] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80');
  const [newProdChemicalFree, setNewProdChemicalFree] = useState(true);
  const [newProdSaltFree, setNewProdSaltFree] = useState(true);

  // New Fisherman Onboarding Form State
  const [newFisherNameBn, setNewFisherNameBn] = useState('');
  const [newFisherNameEn, setNewFisherNameEn] = useState('');
  const [newFisherLocationBn, setNewFisherLocationBn] = useState('');
  const [newFisherPhone, setNewFisherPhone] = useState('');
  const [newFisherBoat, setNewFisherBoat] = useState('');
  const [newFisherExperience, setNewFisherExperience] = useState(10);
  const [newFisherSpecialty, setNewFisherSpecialty] = useState('');

  const activeFisherman =
    fishermen.find((f) => f.id === currentMerchantId) || fishermen[0];

  // Filter products belonging to this merchant
  const merchantProducts = products.filter((p) => p.fishermanId === activeFisherman.id);

  // Calculate Sales Reports & Analytics
  const merchantOrders = orders.filter((o) =>
    o.items.some((item) => item.product.fishermanId === activeFisherman.id)
  );

  const totalMerchantRevenue = merchantOrders.reduce((sum, order) => {
    const itemRev = order.items
      .filter((item) => item.product.fishermanId === activeFisherman.id)
      .reduce((sub, it) => sub + it.price * it.quantity, 0);
    return sum + itemRev;
  }, 0);

  const totalStockKg = merchantProducts.reduce((sum, p) => sum + p.stockKg, 0);
  const lowStockCount = merchantProducts.filter((p) => p.stockKg < 30).length;

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameBn.trim()) return;

    addProductByMerchant({
      name: newProdNameEn || newProdNameBn,
      nameBn: newProdNameBn,
      category: newProdCategory,
      categoryLabelBn: newProdCategory === 'sea' ? 'সামুদ্রিক শুটকি' : newProdCategory === 'haor' ? 'মিঠাপানির হাওর শুটকি' : newProdCategory === 'fermented' ? 'ঐতিহ্যবাহী চ্যাপা' : 'বালাচাও ও স্পেশাল',
      categoryLabelEn: newProdCategory === 'sea' ? 'Marine Dry Fish' : newProdCategory === 'haor' ? 'Freshwater Haor Fish' : 'Specialty Fish',
      pricePerKg: Number(newProdPriceKg),
      stockKg: Number(newProdStockKg),
      origin: newProdOriginEn,
      originBn: newProdOriginBn,
      fishermanId: activeFisherman.id,
      fishermanName: activeFisherman.name,
      fishermanLocation: activeFisherman.location,
      image: newProdImage,
      isChemicalFree: newProdChemicalFree,
      isSaltFree: newProdSaltFree,
      isOdorSealed: true,
      description: newProdDescEn || 'Direct natural sun-dried fish from coastal Bangladesh, vacuum packed.',
      descriptionBn: newProdDescBn || 'প্রাকৃতিক রোদে শুকানো নির্ভেজাল শুটকি, ৩ স্তরের বায়ুরোধী প্যাকেজিং।',
      availableWeights: [
        { weight: 100, label: '100g Trial Pack', price: Math.round((newProdPriceKg * 0.1) * 1.1) },
        { weight: 250, label: '250g Regular Pack', price: Math.round((newProdPriceKg * 0.25) * 1.05) },
        { weight: 500, label: '500g Value Pack', price: Math.round(newProdPriceKg * 0.5) },
        { weight: 1000, label: '1 Kg Wholesale Box', price: Number(newProdPriceKg) },
      ],
      nutrition: {
        protein: '64.0g / 100g',
        calcium: '1400mg',
        iron: '6.5mg',
        calories: '290 kcal',
      },
      cookingTips: ['Soak in lukewarm water for 5 minutes before cooking', 'Fry with generous garlic & mustard oil'],
    });

    setShowAddProductModal(false);
    setNewProdNameBn('');
    setNewProdNameEn('');
  };

  const handleOnboardFishermanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFisherNameBn.trim()) return;

    const newId = registerFisherman({
      name: newFisherNameEn || newFisherNameBn,
      nameBn: newFisherNameBn,
      location: newFisherLocationBn,
      locationBn: newFisherLocationBn,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
      experienceYears: Number(newFisherExperience),
      specialty: newFisherSpecialty || 'Authentic organic sun-dried coastal fish',
      bio: 'Directly registered fisherman & processor supplying chemical-free dried fish.',
      boatName: newFisherBoat || 'সোনার তরী',
      phone: newFisherPhone || '+8801700000000',
    });

    setShowOnboardFishermanModal(false);
    setSuccessToast(isBn ? 'জেলে নিবন্ধন সফল হয়েছে! ড্যাশবোর্ড আপডেট করা হলো।' : 'Fisherman registered successfully!');
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Banner */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Merchant Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-amber-900/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={activeFisherman.avatar}
            alt={activeFisherman.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isBn ? 'যাচাইকৃত প্রস্তুতকারক জেলে' : 'Verified Artisan Fisher'}
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-slate-300 text-xs font-mono">{activeFisherman.phone}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              {isBn ? activeFisherman.nameBn : activeFisherman.name}
            </h1>
            <p className="text-xs text-amber-200/90 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? activeFisherman.locationBn : activeFisherman.location}</span>
              {activeFisherman.boatName && (
                <span className="text-slate-400">| 🚢 {activeFisherman.boatName}</span>
              )}
            </p>
          </div>
        </div>

        {/* Merchant Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Switch Active Merchant Dropdown */}
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400 px-2">{isBn ? 'জেলে পরিবর্তন:' : 'Switch Fisher:'}</span>
            <select
              value={currentMerchantId}
              onChange={(e) => setCurrentMerchantId(e.target.value)}
              className="bg-slate-900 text-white rounded-lg p-1.5 font-semibold border-none focus:ring-0"
            >
              {fishermen.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nameBn} ({f.locationBn.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowOnboardFishermanModal(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/30 active:scale-95 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>{isBn ? 'নতুন জেলে যুক্ত করুন' : '+ Onboard New Fisher'}</span>
          </button>

          <button
            onClick={() => setActiveView('store')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 active:scale-95 transition-all"
          >
            {isBn ? 'ক্রেতা স্টোরে ফিরুন' : 'Back to Store'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isBn ? 'বিক্রির রিপোর্ট ও আয়' : 'Sales Analytics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{isBn ? 'ইনভেন্টরি ও স্টক ম্যানেজমেন্ট' : 'Inventory & Stock'}</span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.2 rounded-full">
            {merchantProducts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{isBn ? 'অর্ডার প্রসেসিং কিউ' : 'Orders Queue'}</span>
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.2 rounded-full font-bold">
            {merchantOrders.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Sales Analytics & Revenue Reports */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Metrics 4-Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'মোট শুটকি বিক্রয়' : 'Gross Sales'}</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">৳{totalMerchantRevenue}</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{isBn ? '১০০% সরাসরি আপনার বিকাশ অ্যাকাউন্টে' : 'Direct to your account'}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'সম্পন্ন ও চলমান অর্ডার' : 'Total Orders'}</span>
                <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Truck className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{merchantOrders.length}</div>
              <div className="text-[11px] text-slate-500">
                {isBn ? 'সারা বাংলাদেশ থেকে প্রাপ্ত' : 'Across Bangladesh'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'মোট মজুদ শুটকি' : 'Total Stock (Kg)'}</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Fish className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{totalStockKg} কেজি</div>
              <div className="text-[11px] text-emerald-700 font-medium">
                {isBn ? 'সৌর ড্রায়ারে সংরক্ষিত' : 'Solar-cured inventory'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>{isBn ? 'কম স্টকের সতর্কতা' : 'Low Stock Alert'}</span>
                <span className="p-2 rounded-xl bg-rose-50 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{lowStockCount} টি পণ্য</div>
              <div className="text-[11px] text-rose-600 font-medium">
                {isBn ? 'নতুন ব্যাচ শুকানো প্রয়োজন' : 'Batch replenishment needed'}
              </div>
            </div>
          </div>

          {/* Visual Sales Performance Graph (Simulated Canvas/SVG Chart) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isBn ? 'সাপ্তাহিক বিক্রয় পারফরম্যান্স ও চাহিদা (৳)' : 'Weekly Sales Breakdown (BDT)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? 'উপকূলীয় উৎস থেকে দৈনিক সংগৃহীত ও প্রেরিত শুটকি' : 'Daily fish orders and fulfillment rate'}
                </p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-semibold">
                {isBn ? 'অক্টোবর ২০২৬' : 'October 2026'}
              </span>
            </div>

            {/* Bar Visualizer */}
            <div className="grid grid-cols-7 gap-2 pt-4 items-end h-48 border-b border-slate-100 pb-2">
              {[
                { day: isBn ? 'শনিবার' : 'Sat', val: 3400, height: '40%' },
                { day: isBn ? 'রবিবার' : 'Sun', val: 5200, height: '65%' },
                { day: isBn ? 'সোমবার' : 'Mon', val: 4100, height: '50%' },
                { day: isBn ? 'মঙ্গলবার' : 'Tue', val: 6800, height: '80%' },
                { day: isBn ? 'বুধবার' : 'Wed', val: 5900, height: '70%' },
                { day: isBn ? 'বৃহস্পতিবার' : 'Thu', val: 8200, height: '95%' },
                { day: isBn ? 'শুক্রবার' : 'Fri', val: 7400, height: '85%' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-600">৳{item.val}</span>
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 rounded-t-lg transition-all cursor-pointer shadow-xs"
                    style={{ height: item.height }}
                    title={`৳${item.val}`}
                  />
                  <span className="text-[11px] font-semibold text-slate-500">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2">
              <span>{isBn ? 'সর্বোচ্চ বিক্রি: বৃহস্পতিবার ও ছুটির দিন' : 'Peak volume: Thursday & Weekends'}</span>
              <span className="text-emerald-700 font-semibold">
                {isBn ? 'গড় সন্তুষ্টি রেটিং: ৪.৯/৫ ★' : 'Satisfaction: 4.9/5 ★'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Management Tools */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isBn ? 'ইনভেন্টরি ও ব্যাচ ম্যানেজমেন্ট' : 'Live Inventory Control'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'নতুন শুটকি ব্যাচের ওজন, দাম এবং স্টক নিয়ন্ত্রণ করুন।' : 'Update stock kg, price, and active batches.'}
              </p>
            </div>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isBn ? '+ নতুন শুটকি পণ্য যোগ করুন' : '+ Add Dry Fish Product'}</span>
            </button>
          </div>

          {/* Product Inventory Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{isBn ? 'শুটকির নাম' : 'Product'}</th>
                    <th className="p-3.5">{isBn ? 'ক্যাটাগরি ও উৎস' : 'Category & Origin'}</th>
                    <th className="p-3.5">{isBn ? 'দাম (প্রতি কেজি)' : 'Price / Kg'}</th>
                    <th className="p-3.5">{isBn ? 'বর্তমান স্টক' : 'Current Stock'}</th>
                    <th className="p-3.5">{isBn ? 'মান সনদ' : 'Certifications'}</th>
                    <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {merchantProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{p.nameBn}</div>
                          <div className="text-slate-500 text-[11px]">{p.name}</div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{p.originBn}</div>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                          {p.categoryLabelBn}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-slate-900 text-sm">
                        ৳{p.pricePerKg}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="1000"
                            defaultValue={p.stockKg}
                            onBlur={(e) => updateProductStock(p.id, Number(e.target.value))}
                            className="w-20 p-1.5 border border-slate-300 rounded font-bold text-xs bg-white text-center"
                          />
                          <span className="text-slate-500 font-medium">কেজি</span>
                        </div>
                        {p.stockKg < 20 && (
                          <div className="text-[10px] text-rose-600 font-semibold mt-1">
                            {isBn ? '⚠️ কম স্টক!' : 'Low Stock!'}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-col gap-1 items-start">
                          {p.isChemicalFree && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.2 rounded font-semibold">
                              ✓ বিষমুক্ত
                            </span>
                          )}
                          {p.isSaltFree && (
                            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.2 rounded font-semibold">
                              ✓ লবণ ছাড়া
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            const newPrice = prompt(isBn ? 'প্রতি কেজির নতুন দাম লিখুন (টাকা):' : 'Enter new price per kg in BDT:', String(p.pricePerKg));
                            if (newPrice && !isNaN(Number(newPrice))) {
                              updateProductStock(p.id, p.stockKg, Number(newPrice));
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          {isBn ? 'দাম পরিবর্তন' : 'Edit Price'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Order Processing Queue */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isBn ? 'গ্রাহকদের অর্ডার কিউ ও শিপিং' : 'Customer Orders & Dispatch Queue'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'আপনার শুটকি প্যাক করে কুরিয়ারে হস্তান্তর করুন।' : 'Inspect, pack in 3-layer sealed pouch, and dispatch.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {merchantOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
                <p>{isBn ? 'বর্তমানে কোনো পেন্ডিং অর্ডার নেই।' : 'No active orders for this merchant currently.'}</p>
              </div>
            ) : (
              merchantOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">#{order.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          order.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {isBn ? 'অর্ডারের সময়:' : 'Placed:'} {new Date(order.createdAt).toLocaleDateString()} • {order.customerName} ({order.customerPhone})
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900">৳{order.total}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{order.paymentMethod}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-semibold text-slate-700">{isBn ? 'অর্ডারের পণ্যসমূহ:' : 'Ordered Items:'}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 truncate">{item.product.nameBn}</div>
                            <div className="text-[11px] text-slate-500">
                              {item.selectedWeight}g × {item.quantity} = ৳{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address & Status Updater */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-800">{isBn ? 'ডেলিভারি ঠিকানা: ' : 'Address: '}</span>
                      <span>{order.fullAddress}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelectedOrderForInvoice(order)}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-slate-900 hover:bg-slate-800 text-amber-300 flex items-center gap-1.5 transition-colors shadow-2xs"
                        title={isBn ? 'অফিসিয়াল ক্যাশ মেমো ও পার্সেল চালান প্রিন্ট করুন' : 'Print Official Invoice / Packing Slip'}
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isBn ? 'মেমো / চালান প্রিন্ট' : 'Invoice Slip'}</span>
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                          order.status === 'processing'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isBn ? 'প্যাকিং সম্পন্ন' : 'Packed'}
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'dispatched', `SF-${Date.now().toString().slice(-5)}`)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                          order.status === 'dispatched'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isBn ? 'কুরিয়ারে হস্তান্তর' : 'Dispatched'}
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                          order.status === 'delivered'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isBn ? 'ডেলিভার্ড' : 'Delivered'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              {isBn ? 'নতুন শুটকি ব্যাচ লিস্টিং তৈরি করুন' : 'Add New Dry Fish Listing'}
            </h3>

            <form onSubmit={handleAddNewProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">{isBn ? 'শুটকির নাম (বাংলায়) *' : 'Name in Bangla *'}</label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: সেন্টমার্টিনের খাঁটি কোরাল শুটকি' : 'e.g. Koral Shutki'}
                  value={newProdNameBn}
                  onChange={(e) => setNewProdNameBn(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{isBn ? 'শুটকির নাম (ইংরেজিতে)' : 'Name in English'}</label>
                <input
                  type="text"
                  placeholder="e.g. Saint Martin Koral Dry Fish"
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'ক্যাটাগরি' : 'Category'}</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as Product['category'])}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="sea">সামুদ্রিক শুটকি (Sea Fish)</option>
                    <option value="haor">মিঠাপানির হাওর শুটকি (Haor Fish)</option>
                    <option value="fermented">চ্যাপা ও সিদল (Fermented)</option>
                    <option value="balachao">বালাচাও (Balachao)</option>
                    <option value="special">বিশেষ কম্বো (Special)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'উৎস অঞ্চল' : 'Origin'}</label>
                  <input
                    type="text"
                    value={newProdOriginBn}
                    onChange={(e) => setNewProdOriginBn(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'দাম (প্রতি কেজি ৳) *' : 'Price / Kg *'}</label>
                  <input
                    type="number"
                    required
                    value={newProdPriceKg}
                    onChange={(e) => setNewProdPriceKg(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'মজুদ পরিমাণ (কেজি) *' : 'Stock (Kg) *'}</label>
                  <input
                    type="number"
                    required
                    value={newProdStockKg}
                    onChange={(e) => setNewProdStockKg(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-emerald-800">
                  <input
                    type="checkbox"
                    checked={newProdChemicalFree}
                    onChange={(e) => setNewProdChemicalFree(e.target.checked)}
                  />
                  <span>{isBn ? '১০০% বিষ ও রাসায়নিকমুক্ত' : 'Chemical-Free'}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-amber-800">
                  <input
                    type="checkbox"
                    checked={newProdSaltFree}
                    onChange={(e) => setNewProdSaltFree(e.target.checked)}
                  />
                  <span>{isBn ? 'লবণ ছাড়া শুকানো' : 'Salt-Free'}</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border rounded-lg font-bold text-slate-600"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                >
                  {isBn ? 'পণ্য প্রকাশ করুন' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Onboard New Fisherman */}
      {showOnboardFishermanModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>{isBn ? 'অনলাইনে নতুন প্রান্তিক জেলে নিবন্ধন' : 'Fisherman Onboarding'}</span>
            </h3>

            <p className="text-xs text-slate-500">
              {isBn 
                ? 'উপকূলের প্রান্তিক মেহনতি জেলে ও শুটকি প্রস্তুতকারকদের সরাসরি ন্যায্য মূল্যের বাজারে যুক্ত করার ফর্ম।'
                : 'Empowering coastal fishers with direct access to Bangladeshi consumers.'}
            </p>

            <form onSubmit={handleOnboardFishermanSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">{isBn ? 'জেলের নাম (বাংলা) *' : 'Fisherman Name *'}</label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: মো: রফিক মাঝি' : 'e.g. Rafiq Majhi'}
                  value={newFisherNameBn}
                  onChange={(e) => setNewFisherNameBn(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'উপকূলীয় এলাকা / ঘাট *' : 'Location *'}</label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? 'যেমন: টেকনাফ ঘাট, কক্সবাজার' : 'Teknaf, Cox\'s Bazar'}
                    value={newFisherLocationBn}
                    onChange={(e) => setNewFisherLocationBn(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'মোবাইল / বিকাশ নম্বর *' : 'Phone / bKash *'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={newFisherPhone}
                    onChange={(e) => setNewFisherPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'মাছ ধরার নৌকার নাম' : 'Boat Name'}</label>
                  <input
                    type="text"
                    placeholder={isBn ? 'যেমন: এফ বি সাগর কন্যা' : 'Boat name'}
                    value={newFisherBoat}
                    onChange={(e) => setNewFisherBoat(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">{isBn ? 'অভিজ্ঞতা (বছর)' : 'Experience (Years)'}</label>
                  <input
                    type="number"
                    value={newFisherExperience}
                    onChange={(e) => setNewFisherExperience(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowOnboardFishermanModal(false)}
                  className="px-4 py-2 border rounded-lg font-bold text-slate-600"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700"
                >
                  {isBn ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
