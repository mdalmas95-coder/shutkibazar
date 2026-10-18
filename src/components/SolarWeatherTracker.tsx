import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sun, Wind, Droplets, Sparkles, MapPin, Compass } from 'lucide-react';

export const SolarWeatherTracker: React.FC = () => {
  const { language } = useStore();
  const isBn = language === 'bn';

  const COASTAL_WEATHER_STATIONS = [
    {
      hub: isBn ? 'নাজিরারটেক চাতাল, কক্সবাজার' : 'Nazirtek Loft, Cox’s Bazar',
      temp: '৩১° সে.',
      conditionBn: 'উজ্জ্বল তীব্র রোদ',
      conditionEn: 'Strong Sunlight',
      humidity: '৪৬%',
      wind: '১২ কিমি/ঘণ্টা (সাগরমুখী)',
      dryingIndex: '৯৯% (চমৎকার)',
      activeBatches: isBn ? 'লইট্টা ও ছুরি শুকানো চলছে' : 'Loitta & Churi Drying',
    },
    {
      hub: isBn ? 'দুবলার চর, সুন্দরবন' : 'Dublar Char, Sundarbans',
      temp: '২৯° সে.',
      conditionBn: 'নির্মল রোদ ও মিষ্টি বাতাস',
      conditionEn: 'Breezy & Sunny',
      humidity: '৪৮%',
      wind: '১৫ কিমি/ঘণ্টা',
      dryingIndex: '৯৬% (আদর্শ)',
      activeBatches: isBn ? 'মিষ্টি চিংড়ি শুটকি প্যাক' : 'Fresh Shrimp Batches',
    },
    {
      hub: isBn ? 'সেন্টমার্টিন কোরাল দ্বীপ' : 'Saint Martin Coral Island',
      temp: '৩০° সে.',
      conditionBn: 'প্রখর দ্বীপ সূর্যালোক',
      conditionEn: 'Peak Solar UV',
      humidity: '৪২%',
      wind: '১০ কিমি/ঘণ্টা',
      dryingIndex: '১০০% (নিখুঁত)',
      activeBatches: isBn ? 'রূপচাঁদা ও কোরাল ড্রায়িং' : 'Rupchanda Sun Drying',
    },
    {
      hub: isBn ? 'টাঙ্গুয়ার হাওর, সুনামগঞ্জ' : 'Tanguar Haor, Sunamganj',
      temp: '২৮° সে.',
      conditionBn: 'মিষ্টি রোদ ও মৃদু হাওয়া',
      conditionEn: 'Gentle Sunshine',
      humidity: '৫০%',
      wind: '৮ কিমি/ঘণ্টা',
      dryingIndex: '৯৪% (স্বাভাবিক)',
      activeBatches: isBn ? 'কাঁচকি ও চ্যাপা কিউরিং' : 'Kachki & Chepa Curing',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Title */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sun className="w-4 h-4 animate-spin duration-3000" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <span>{isBn ? 'উপকূলীয় চাতালের লাইভ আবহাওয়া ও রোদ ট্র্যাকার' : 'Coastal Solar Drying Live Weather Feed'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBn 
                  ? 'প্রাকৃতিক সৌর তাপে শতভাগ বিষমুক্ত শুকানো পর্যবেক্ষণ করুন' 
                  : 'Live solar conditions at our fishermen lofts across Bangladesh'}
              </p>
            </div>
          </div>

          <div className="text-[11px] bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-amber-300 font-medium">
            {isBn ? 'আজকের সামগ্রিক শুকানো স্কোর: ৯৮% (অনুকূল)' : 'Overall Solar Index: 98% (Optimal)'}
          </div>
        </div>

        {/* 4 Weather Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COASTAL_WEATHER_STATIONS.map((station, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80 space-y-2 text-xs backdrop-blur-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{station.hub}</span>
                </span>
                <span className="font-black text-white text-sm">{station.temp}</span>
              </div>

              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>{isBn ? 'অবস্থা:' : 'Sky:'}</span>
                  </span>
                  <span className="font-semibold text-white">{station.conditionBn}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-400" />
                    <span>{isBn ? 'আর্দ্রতা:' : 'Humidity:'}</span>
                  </span>
                  <span className="font-medium text-slate-200">{station.humidity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Wind className="w-3 h-3 text-teal-400" />
                    <span>{isBn ? 'বাতাস:' : 'Wind:'}</span>
                  </span>
                  <span className="font-medium text-slate-200 truncate max-w-[120px]">{station.wind}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">{station.activeBatches}</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                  {station.dryingIndex}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
