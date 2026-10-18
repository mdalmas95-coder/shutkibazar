import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  CheckCircle2, 
  Download, 
  Printer, 
  Microscope,
  Building2
} from 'lucide-react';
import { Product } from '../types';

interface LabCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const LabCertificateModal: React.FC<LabCertificateModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { language, products } = useStore();
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const currentProduct = product || products[0];
  const certNumber = `BCSIR-FSH-2026-${currentProduct.id.toUpperCase()}-99`;
  const testDate = '08 October 2026';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-4 text-white flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.2 rounded font-bold uppercase">
                  {isBn ? 'ল্যাবরেটরি টেস্ট প্রত্যয়ন' : 'Official Lab Report'}
                </span>
              </div>
              <h3 className="font-extrabold text-base leading-tight mt-0.5">
                {isBn ? '১০০% বিষ ও রাসায়নিকমুক্ত সনদপত্র' : 'Chemical-Free Lab Test Certificate'}
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

        {/* Certificate Paper Sheet */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-amber-50/20 text-xs sm:text-sm">
          {/* Certificate Header Banner */}
          <div className="border-4 border-double border-emerald-800/60 p-6 rounded-xl bg-white shadow-xs relative">
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-9xl font-black text-emerald-900">BCSIR</span>
            </div>

            <div className="text-center space-y-1 pb-4 border-b-2 border-emerald-900/20">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>{isBn ? 'খাদ্য ও পুষ্টি বিজ্ঞান মান নিয়ন্ত্রণ বিভাগ' : 'Division of Food Quality & Safety Analysis'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                {isBn ? 'বিশুদ্ধ খাদ্য ও কীটনাশক অবশিষ্টাংশ পরীক্ষা সনদ' : 'Certificate of Chemical Purity & Safety Analysis'}
              </h2>
              <div className="text-[11px] text-slate-500 font-mono">
                {isBn ? 'সনদপত্র নং:' : 'Certificate Ref:'} {certNumber} • {testDate}
              </div>
            </div>

            {/* Tested Product Spec */}
            <div className="py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500">{isBn ? 'পরীক্ষাকৃত নমুনা:' : 'Sample Name:'}</span>
                  <div className="font-bold text-slate-900">{currentProduct.nameBn} ({currentProduct.name})</div>
                </div>
                <div>
                  <span className="text-slate-500">{isBn ? 'সংগ্রহের অঞ্চল:' : 'Harvest Origin:'}</span>
                  <div className="font-bold text-amber-900">{currentProduct.originBn}</div>
                </div>
                <div>
                  <span className="text-slate-500">{isBn ? 'প্রস্তুতকারক জেলে:' : 'Producer / Fisher:'}</span>
                  <div className="font-bold text-slate-900">{currentProduct.fishermanName}</div>
                </div>
                <div>
                  <span className="text-slate-500">{isBn ? 'শুকানোর পদ্ধতি:' : 'Drying Method:'}</span>
                  <div className="font-bold text-emerald-700">{isBn ? '১০০% সৌর চাতাল (মাচা)' : '100% Elevated Solar Loft'}</div>
                </div>
              </div>

              {/* Lab Parameters Table */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  {isBn ? 'পরীক্ষার ফলাফল ও রাসায়নিক পরামিতি:' : 'Test Results & Chemical Parameters:'}
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-emerald-800 text-white font-bold">
                      <tr>
                        <th className="p-2.5">{isBn ? 'পরীক্ষিত উপাদান' : 'Parameter'}</th>
                        <th className="p-2.5">{isBn ? 'গ্রহণযোগ্য মানদণ্ড' : 'Standard Limit'}</th>
                        <th className="p-2.5">{isBn ? 'প্রাপ্ত ফলাফল' : 'Observed Level'}</th>
                        <th className="p-2.5 text-right">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="p-2.5 font-semibold">ডিডিটি কীটনাশক (DDT Pesticide)</td>
                        <td className="p-2.5 text-slate-500">Nil / 0.0 mg/kg</td>
                        <td className="p-2.5 font-mono font-bold text-emerald-700">0.00 mg/kg (Not Detected)</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">✓ উত্তীর্ণ (Pass)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">ফরমালিন অবশিষ্টাংশ (Formalin)</td>
                        <td className="p-2.5 text-slate-500">Nil / 0.0 mg/kg</td>
                        <td className="p-2.5 font-mono font-bold text-emerald-700">Negative / 0.00</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">✓ উত্তীর্ণ (Pass)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">সালফার বা কৃত্রিম প্রিজারভেটিভ</td>
                        <td className="p-2.5 text-slate-500">Nil / Negative</td>
                        <td className="p-2.5 font-mono font-bold text-emerald-700">Not Detected</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">✓ উত্তীর্ণ (Pass)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">আর্দ্রতার পরিমাণ (Moisture Level)</td>
                        <td className="p-2.5 text-slate-500">Max 15.0%</td>
                        <td className="p-2.5 font-mono font-bold text-slate-900">12.4% (Optimal Dry)</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">✓ উত্তীর্ণ (Pass)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">অতিরিক্ত বালু ও অপদ্রব্য (Sand / Silica)</td>
                        <td className="p-2.5 text-slate-500">&lt; 0.5%</td>
                        <td className="p-2.5 font-mono font-bold text-slate-900">&lt; 0.02% (Extremely Clean)</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">✓ উত্তীর্ণ (Pass)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lab Certification Stamp */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Award className="w-8 h-8 text-emerald-700 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold">{isBn ? 'নিরাপদ ও জৈব খাদ্য প্রত্যয়ন' : 'Certified 100% Organic & Chemical-Free'}</div>
                    <div className="text-slate-500">{isBn ? 'বিএসটিআই ও নিরাপদ খাদ্য আইন ২০১৩ অনুযায়ী অনুমোদিত' : 'Compliant with Bangladesh Food Safety Act 2013'}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block p-2 rounded-lg border-2 border-emerald-700 text-emerald-800 font-black text-xs uppercase rotate-[-3deg] bg-emerald-50">
                    SEALED & VERIFIED ✓
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Chief Food Quality Analyst</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{isBn ? 'সনদ প্রিন্ট করুন' : 'Print Certificate'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors"
            >
              {isBn ? 'ঠিক আছে' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
