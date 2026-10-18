import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Clock, 
  ThermometerSnowflake, 
  Sun, 
  Box, 
  ShieldCheck, 
  Lightbulb, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ShelfLifeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FishStorageProfile {
  id: string;
  nameBn: string;
  nameEn: string;
  roomTemp: string;
  fridgeTemp: string;
  deepFreeze: string;
  specialTipsBn: string;
  cleaningAdviceBn: string;
}

const STORAGE_PROFILES: FishStorageProfile[] = [
  {
    id: 'loitta',
    nameBn: 'লইট্টা ও ছুরি শুটকি (Loitta & Churi)',
    nameEn: 'Bombay Duck & Ribbon Fish',
    roomTemp: '৪ থেকে ৫ মাস (বায়ুরোধী পাত্রে)',
    fridgeTemp: '৮ থেকে ১০ মাস (স্বাভাবিক ফ্রিজ)',
    deepFreeze: '১.৫ বছর পর্যন্ত একদম টাটকা',
    specialTipsBn: 'কাঁচের এয়ারটাইট বয়ামে ২-৩টি শুকনো তেজপাতা ও লবঙ্গ দিয়ে রাখলে কোনো ধরনের পোকা বা ছত্রাক জন্মায় না।',
    cleaningAdviceBn: 'রান্নার আগে কুসুম গরম পানিতে ৫ মিনিট ভিজিয়ে রেখে আলতো করে ধুয়ে নিন। অতিরিক্ত লবণ দেওয়া থাকে না তাই সেদ্ধ করার প্রয়োজন নেই।',
  },
  {
    id: 'chingri',
    nameBn: 'দুবলার চরের চিংড়ি শুটকি (Chingri)',
    nameEn: 'Dried Shrimp & Prawn',
    roomTemp: '৩ থেকে ৪ মাস',
    fridgeTemp: '৬ থেকে ৮ মাস',
    deepFreeze: '১ বছর সম্পূর্ণ নিরাপদ',
    specialTipsBn: 'চিংড়ি শুটকির প্রাকৃতিক মিষ্টি সুবাস ধরে রাখতে সূর্যের সরাসরি তাপ থেকে দূরে শুষ্ক ও ঠান্ডা স্থানে বয়ামে সংরক্ষণ করুন।',
    cleaningAdviceBn: 'হালকা ঠান্ডা পানিতে ২ বার ধুয়ে সাথে সাথে পানি ঝরিয়ে নিন। বেশি ভেজালে স্বাদ হালকা হতে পারে।',
  },
  {
    id: 'rupchanda',
    nameBn: 'সেন্টমার্টিন রূপচাঁদা শুটকি (Rupchanda)',
    nameEn: 'Silver Pomfret Dry Fish',
    roomTemp: '৫ থেকে ৬ মাস',
    fridgeTemp: '১০ থেকে ১২ মাস',
    deepFreeze: '২ বছর পর্যন্ত নির্ভেজাল',
    specialTipsBn: 'পুরু মাংসল শুটকি হওয়ায় ডিপ ফ্রিজে বায়ুরোধী জিপলক ব্যাগে রাখলে স্বাদ ও টেক্সচার নতুনের মতো অপরিবর্তিত থাকে।',
    cleaningAdviceBn: 'কাটার আগে সামান্য হালকা গরম পানিতে ১০ মিনিট রাখলে কাটা সহজ হয়। রান্নায় ভাজার আগে হালকা হলুদ-মরিচে ম্যারিনেট করুন।',
  },
  {
    id: 'chepa',
    nameBn: 'হাওরের চ্যাপা / সিদল (Chepa / Sidol)',
    nameEn: 'Fermented Haor Fish',
    roomTemp: '২ মাস (মাটির পাত্র বা কাঁচের বয়ামে)',
    fridgeTemp: '৬ থেকে ৮ মাস (গন্ধহীন কন্টেইনারে)',
    deepFreeze: '১ বছর পর্যন্ত অটুট সুবাস',
    specialTipsBn: 'চ্যাপা যেহেতু গাঁজন (Fermented) পদ্ধতিতে তৈরি, তাই এটি সবসময় পুরোপুরি এয়ারটাইট প্লাস্টিক বা কাঁচের বয়ামে রাখুন যাতে সুবাস সুরক্ষিত থাকে।',
    cleaningAdviceBn: 'খুব সাবধানতার সাথে ঠান্ডা পানিতে ধুয়ে নিন যাতে নরম মাছটি গলে না যায়। ভর্তা বা ভুনা তৈরির জন্য আদর্শ।',
  },
  {
    id: 'kachki',
    nameBn: 'কাঁচকি ও মোলা শুটকি (Kachki & Mola)',
    nameEn: 'River Sprat & Small Haor Fish',
    roomTemp: '৪ মাস',
    fridgeTemp: '৮ মাস',
    deepFreeze: '১ বছর',
    specialTipsBn: 'ছোট আকারের মাছ হওয়ায় সামান্য আর্দ্রতা পেলেই নরম হতে পারে, তাই আর্দ্রতাহীন পাত্রে সিলিকা জেল বা শুষ্ক নিমপাতা সাথে রাখতে পারেন।',
    cleaningAdviceBn: 'সূক্ষ্ম চালনি বা ছাঁকনিতে নিয়ে আলতো করে ধুয়ে নিন। চচ্চড়িতে রান্নার সময় মাছ অক্ষত থাকে।',
  },
];

export const ShelfLifeCalculatorModal: React.FC<ShelfLifeCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useStore();
  const isBn = language === 'bn';

  const [selectedProfile, setSelectedProfile] = useState<FishStorageProfile>(STORAGE_PROFILES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-4 text-white flex items-center justify-between border-b border-blue-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-blue-400/20 text-blue-300 border border-blue-400/30 px-2 py-0.2 rounded font-bold uppercase">
                  {isBn ? 'সংরক্ষণ ও মেয়াদ গাইড' : 'Storage & Shelf Life Guide'}
                </span>
              </div>
              <h3 className="font-extrabold text-base leading-tight mt-0.5">
                {isBn ? 'শুটকি সংরক্ষণ ও ফ্রেশনেস ক্যালকুলেটর' : 'Dried Fish Freshness & Storage Calculator'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* Fish Selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 text-xs">
              {isBn ? 'শুটকির ধরন নির্বাচন করুন:' : 'Select Dried Fish Type:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STORAGE_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => setSelectedProfile(prof)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedProfile.id === prof.id
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-500/20 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs truncate">{prof.nameBn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Temperature Conditions Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 text-center space-y-1.5 shadow-2xs">
              <Sun className="w-6 h-6 text-amber-600 mx-auto" />
              <div className="font-bold text-slate-900 text-xs">
                {isBn ? 'ঘরের সাধারণ তাপমাত্রা' : 'Room Temperature'}
              </div>
              <div className="text-base font-black text-amber-800">{selectedProfile.roomTemp}</div>
              <p className="text-[10px] text-slate-500">
                {isBn ? 'শুকনো বায়ুরোধী কাঁচের বয়ামে' : 'In airtight dry jar'}
              </p>
            </div>

            <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-200 text-center space-y-1.5 shadow-2xs">
              <Box className="w-6 h-6 text-blue-600 mx-auto" />
              <div className="font-bold text-slate-900 text-xs">
                {isBn ? 'স্বাভাবিক ফ্রিজ (৪° সে.)' : 'Normal Fridge (4°C)'}
              </div>
              <div className="text-base font-black text-blue-800">{selectedProfile.fridgeTemp}</div>
              <p className="text-[10px] text-slate-500">
                {isBn ? 'পাউচ বা জিপলক ব্যাগে' : 'In sealed pouch'}
              </p>
            </div>

            <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-200 text-center space-y-1.5 shadow-2xs">
              <ThermometerSnowflake className="w-6 h-6 text-purple-600 mx-auto" />
              <div className="font-bold text-slate-900 text-xs">
                {isBn ? 'ডিপ ফ্রিজ (-১৮° সে.)' : 'Deep Freeze (-18°C)'}
              </div>
              <div className="text-base font-black text-purple-800">{selectedProfile.deepFreeze}</div>
              <p className="text-[10px] text-slate-500">
                {isBn ? '১০০% টাটকা থাকবে' : 'Retains fresh texture'}
              </p>
            </div>
          </div>

          {/* Special Advice for Selected Fish */}
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{isBn ? 'প্রাকৃতিক উপায়ে পোকা ও ছত্রাক প্রতিরোধের ঘরোয়া টিপস:' : 'Natural Insect-Proof Preservation Tip:'}</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedProfile.specialTipsBn}
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{isBn ? 'ধৌত প্রণালী ও বালুমুক্ত করার পরামর্শ:' : 'Sand Cleaning & Washing Advice:'}</span>
              </span>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {selectedProfile.cleaningAdviceBn}
              </p>
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs"
            >
              {isBn ? 'ধন্যবাদ, বুঝেছি' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
