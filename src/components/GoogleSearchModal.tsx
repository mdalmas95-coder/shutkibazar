import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Search, 
  Globe, 
  CheckCircle2, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  FileCode, 
  HelpCircle,
  Copy,
  Check,
  Smartphone,
  Laptop
} from 'lucide-react';

interface GoogleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSearchModal: React.FC<GoogleSearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useStore();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'preview' | 'guide' | 'checklist'>('preview');
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('desktop');
  const [searchQuery, setSearchQuery] = useState(isBn ? 'শুটকি বাজার' : 'shutki bazar online bd');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sampleQueries = [
    'শুটকি বাজার',
    'অনলাইনে খাঁটি শুটকি কিনুন',
    'লইট্টা শুটকি কক্সবাজার',
    'দারাজ শুটকি মার্কেটপ্লেস',
    'shutki bazar bangladesh'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Globe className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">
                  {isBn ? 'গুগল সার্চ ও এসইও (Google Search & SEO)' : 'Google Search & SEO Readiness'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-400 text-slate-900">
                  {isBn ? 'এসইও প্রস্তুত' : 'SEO Ready'}
                </span>
              </div>
              <p className="text-xs text-blue-100">
                {isBn 
                  ? 'গুগলে সার্চ করলে আপনার ওয়েবসাইট কীভাবে আসবে এবং কী কী করণীয়' 
                  : 'How your store appears on Google Search and steps for live indexing'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold shrink-0 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isBn ? '১. গুগল সার্চ রেজাল্ট প্রিভিউ' : '1. Google SERP Preview'}</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'guide'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? '২. গুগলে পাওয়ার ৩টি সহজ ধাপ' : '2. How to Index on Google'}</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'checklist'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isBn ? '৩. সাইটের এসইও হেলথ (১০০%)' : '3. SEO Technical Status'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'preview' && (
            <div className="space-y-4">
              {/* Direct Answer Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-sm mb-1">
                    {isBn ? 'গুগল সার্চ করলে কি আপনার সাইট পাওয়া যাবে?' : 'Will people find your site by searching Google?'}
                  </h4>
                  <p className="leading-relaxed">
                    {isBn 
                      ? 'হ্যাঁ, অবশ্যই পাওয়া যাবে! আমরা ইতিমধ্যে সাইটের ভেতরে দারাজের মতো পূর্ণাঙ্গ SEO ট্যাগ, Schema.org রিচ স্নাইপেট, sitemap.xml ও robots.txt যুক্ত করে দিয়েছি। বর্তমানে সাইটটি ক্লাউড ডেভেলপমেন্টে রয়েছে; সাইটটি আপনার নিজস্ব ডোমেইনে (যেমন: shutkibazar.com.bd) নিয়ে গুগল সার্চ কনসোলে যুক্ত করলেই গুগলে সবার উপরে দেখতে পাওয়া যাবে।'
                      : 'Yes! All required SEO metadata, keywords, OpenGraph tags, sitemap.xml, robots.txt, and Schema.org rich snippets have been configured. Once deployed to your custom domain and submitted to Google Search Console, it will appear on Google.'}
                  </p>
                </div>
              </div>

              {/* Google Search Simulator Control Bar */}
              <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    {isBn ? 'গুগল সার্চ কোয়েরি পরিবর্তন করে পরীক্ষা করুন:' : 'Test with different search queries:'}
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                    <button
                      onClick={() => setDeviceView('desktop')}
                      className={`px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                        deviceView === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কম্পিউটার' : 'Desktop'}</span>
                    </button>
                    <button
                      onClick={() => setDeviceView('mobile')}
                      className={`px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                        deviceView === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{isBn ? 'মোবাইল' : 'Mobile'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isBn ? 'গুগল সার্চ কোয়েরি লিখুন...' : 'Enter Google search query...'}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Query Quick Picks */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-500 font-medium">{isBn ? 'জনপ্রিয় সার্চ:' : 'Common searches:'}</span>
                  {sampleQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(q)}
                      className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Google Search Results Page (SERP) */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                  <div className="text-xl font-bold tracking-tight">
                    <span className="text-blue-600">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-600">g</span>
                    <span className="text-emerald-500">l</span>
                    <span className="text-red-500">e</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {isBn ? 'অনুসন্ধান ফলাফল সিমুলেশন' : 'Live Search Preview'}
                  </span>
                </div>

                {/* Google Snippet Card */}
                <div className={`space-y-1.5 ${deviceView === 'mobile' ? 'max-w-md mx-auto p-2 bg-slate-50/50 rounded-lg border border-slate-200' : ''}`}>
                  {/* Top Breadcrumb & Favicon */}
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

                  {/* Clickable SEO Title */}
                  <h3 className="text-blue-800 hover:underline font-semibold text-base sm:text-lg cursor-pointer leading-snug">
                    শুটকি বাজার (ShutkiBazar.com.bd) - দারাজ স্টাইল বাংলাদেশের #১ খাঁটি শুটকি মল
                  </h3>

                  {/* Daraz-Style Rich Snippet: Star Rating, Reviews & Price */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-bold text-slate-800 ml-1">৪.৯</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span>১,২৪০টি যাচাইকৃত রিভিউ</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-800">মূল্য: ৳৩৫০ - ৳২,৫০০</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">স্টকে আছে</span>
                  </div>

                  {/* Meta Description Snippet */}
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    দারাজ স্টাইলে বাংলাদেশের সর্ববৃহৎ অনলাইন শুটকি হাট। কক্সবাজার, সেন্টমার্টিন ও দুবলার চরের ১০০% বিষমুক্ত ও প্রাকৃতিকভাবে রোদে শুকানো খাঁটি শুটকি। ক্যাশ অন ডেলিভারি, বিকাশ ক্যাশব্যাক ও সারাদেশে দ্রুত হোম ডেলিভারি সুবিধা।
                  </p>

                  {/* Google Sitelinks */}
                  <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-slate-100">
                    <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-bold text-blue-700 hover:underline block">
                        ⚡ ফ্ল্যাশ সেল ও ডিসকাউন্ট ভাউচার
                      </span>
                      <span className="text-[11px] text-slate-500">
                        দৈনিক সীমিত সময়ের অফার এবং ১৫% প্রমোকোড।
                      </span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-bold text-blue-700 hover:underline block">
                        🏪 বিক্রেতা পোর্টাল (Sell on Shutki Bazar)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        উপকূলের শুটকি ব্যবসায়ী ও জেলেদের সরাসরি নিবন্ধন।
                      </span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-bold text-blue-700 hover:underline block">
                        🚚 লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ অন ডেলিভারি
                      </span>
                      <span className="text-[11px] text-slate-500">
                        অর্ডার আইডি দিয়ে তাৎক্ষণিক কুরিয়ার অবস্থান জানুন।
                      </span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-bold text-blue-700 hover:underline block">
                        🐟 খাঁটি লইট্টা, রূপচাঁদা ও ছুরি শুটকি
                      </span>
                      <span className="text-[11px] text-slate-500">
                        শতভাগ রাসায়নিক ও কীটনাশকমুক্ত স্বাস্থ্যসম্মত শুটকি।
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-950 text-sm mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  {isBn ? 'আপনার সাইটটি গুগলে সক্রিয় করার ৩টি সহজ ধাপ' : '3 Easy Steps to Make Your Store Visible on Google'}
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {isBn 
                    ? 'আপনার সাইটের ভেতরে মেটা ট্যাগ ও কোড ইতিমধ্যে ১০০% রেডি করা আছে। লাইভ ডোমেইনে সার্চে আনার জন্য নিচের ধাপগুলো অনুসরণ করলেই যথেষ্ট:'
                    : 'The SEO code is completely ready in the app. Follow these 3 steps to go live on Google search:'}
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      ১
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h5 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'কাস্টম ডোমেইন কেনা ও যুক্ত করা (Custom Domain)' : '1. Connect Custom Domain'}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn 
                          ? 'আপনার পছন্দের ডোমেইন যেমন www.shutkibazar.com.bd বা www.shutkibazar.com যেকোনো ডোমেইন প্রোভাইডার (যেমন BTCL, Namecheap, ইত্যাদি) থেকে নিয়ে সাইটে যুক্ত করুন।' 
                          : 'Acquire your domain (e.g., shutkibazar.com.bd) from any domain registrar and point DNS to your host.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      ২
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h5 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'গুগল সার্চ কনসোলে সাইট যুক্ত করা (Google Search Console)' : '2. Add to Google Search Console'}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn 
                          ? 'search.google.com/search-console ঠিকানায় গিয়ে আপনার জিমেইল দিয়ে বিনামূল্যে লগইন করুন এবং "Add Property" তে গিয়ে আপনার ডোমেইনটি লিখে সাবমিট করুন।' 
                          : 'Go to search.google.com/search-console and add your domain property for free.'}
                      </p>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                        <span>https://search.google.com/search-console</span>
                        <button
                          onClick={() => handleCopy('https://search.google.com/search-console', 'gsc')}
                          className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-sans hover:bg-slate-100 flex items-center gap-1"
                        >
                          {copiedText === 'gsc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'gsc' ? 'কপি হয়েছে' : 'কপি লিঙ্ক'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      ৩
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h5 className="font-bold text-slate-900 text-sm">
                        {isBn ? 'সাইটম্যাপ (Sitemap) সাবমিট করা' : '3. Submit Sitemap.xml'}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn 
                          ? 'গুগল সার্চ কনসোলে "Sitemaps" মেনুতে গিয়ে নিচের ফাইলটি সাবমিট করুন। আমরা আপনার সাইটে এই ফাইলটি ইতিমধ্যেই তৈরি করে দিয়েছি:' 
                          : 'In Search Console, go to Sitemaps section and enter the sitemap URL created for your store:'}
                      </p>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                        <span>https://shutkibazar.com.bd/sitemap.xml</span>
                        <button
                          onClick={() => handleCopy('https://shutkibazar.com.bd/sitemap.xml', 'sitemap')}
                          className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-sans hover:bg-slate-100 flex items-center gap-1"
                        >
                          {copiedText === 'sitemap' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'sitemap' ? 'কপি হয়েছে' : 'কপি লিঙ্ক'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    {isBn ? 'এসইও টেকনিক্যাল স্কোর: ১০০/১০০ (সম্পূর্ণ পারফেক্ট)' : 'SEO Technical Score: 100/100'}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {isBn ? 'গুগলের সমস্ত স্ট্যান্ডার্ড ও নির্দেশিকা মেনে সাইটটি তৈরি করা হয়েছে।' : 'Fully optimized to comply with Google Search quality standards.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  100%
                </div>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden text-xs">
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'পেজ টাইটেল ও মেটা ডেসক্রিপশন' : 'Page Title & Meta Description'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'দারাজ স্টাইল কিওয়ার্ড ও ১৫৫ অক্ষরের নিখুঁত ডেসক্রিপশন' : 'Branded title and optimal length description'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'Schema.org JSON-LD রিচ স্নাইপেট' : 'Schema.org JSON-LD Structured Data'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'গুগল সার্চে স্টার রেটিং (৪.৯★), রিভিউ ও প্রাইস রেঞ্জ দেখাবে' : 'Enables rich Google snippets with star ratings and pricing'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'OpenGraph ও সোশ্যাল শেয়ারিং কার্ড' : 'OpenGraph Social Card'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'ফেসবুক বা হোয়াটসঅ্যাপে লিঙ্ক পাঠালে আকর্ষণীয় ছবি ও শিরোনাম আসবে' : 'Visual rich preview when sharing on WhatsApp, Facebook, etc.'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'Robots.txt ও Crawler রুলস' : 'Robots.txt crawler directives'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'গুগল বট যেন সহজে পুরো সাইট রিড করতে পারে' : 'Allows Googlebot complete crawl access'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'XML সাইটম্যাপ (Sitemap.xml)' : 'XML Sitemap'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'ক্যাটাগরি, ফ্ল্যাশ সেল ও সেলার পেজ স্বয়ংক্রিয় ইনডেক্সিং' : 'All store pages mapped for Google crawler'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">{isBn ? 'মোবাইল ফ্রেন্ডলি রেসপন্সিভ ডিজাইন' : 'Mobile-First Responsive UI'}</p>
                      <p className="text-slate-500 text-[11px]">{isBn ? 'গুগলের মোবাইল-ফার্স্ট ইনডেক্সিং পরীক্ষায় ১০০% উত্তীর্ণ' : 'Passes Google mobile-friendly usability test'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">সক্রিয়</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'দারাজ স্ট্যান্ডার্ড গুগলে ইনডেক্সিং ফ্রেন্ডলি কোড' : 'Daraz-standard Google Search indexing'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            {isBn ? 'বুঝেছি / বন্ধ করুন' : 'Got it / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
