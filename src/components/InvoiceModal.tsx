import React from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2, 
  Phone, 
  MapPin, 
  Truck, 
  CheckCircle2,
  QrCode
} from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const { language } = useStore();
  const isBn = language === 'bn';

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${order.id.replace('SB-', '')}-2026`;
  const orderDate = new Date(order.createdAt).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[96vh] flex flex-col print:shadow-none print:border-none print:max-h-full print:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controller (Hidden on print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-amber-400">📄</span>
            <span>{isBn ? 'অফিসিয়াল ক্যাশ মেমো ও ইনভয়েস' : 'Official Cash Memo & Invoice'}</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-amber-200">#{order.id}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              title={isBn ? 'ইনভয়েস সরাসরি প্রিন্ট করুন' : 'Print Invoice'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রিন্ট করুন' : 'Print'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              title={isBn ? 'PDF হিসেবে সেভ বা ডাউনলোড করুন' : 'Save / Download PDF'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isBn ? 'PDF ডাউনলোড' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div id="printable-invoice" className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm bg-white">
          {/* Top Brand Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-black text-xl">
                  🐟
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                    শুটকি<span className="text-amber-700">বাজার</span>
                  </h1>
                  <span className="text-[11px] text-slate-500 font-medium">
                    ShutkiBazar • Pure Coastal Dry Fish
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                <div>নাজিরারটেক কোস্টাল হাব, কক্সবাজার ও তেজগাঁও সেন্ট্রাল হাব, ঢাকা</div>
                <div>হটলাইন: 01700-748854 (01700-SHUTKI) | ইমেইল: billing@shutkibazar.com</div>
                <div className="font-mono text-[10px] text-slate-400">
                  সরকারি DBID: 981240182 | ট্রেড লাইসেন্স: TRAD/DSCC/019284/2026
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-wider">
                {isBn ? 'অফিসিয়াল ক্যাশ মেমো' : 'OFFICIAL CASH MEMO'}
              </span>
              <div className="font-bold text-slate-900 text-sm font-mono mt-1">{invoiceNumber}</div>
              <div className="text-slate-500 text-xs">তারিখ: {orderDate}</div>
              <div className="text-emerald-700 font-bold uppercase text-[11px]">
                {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (পরিশোধযোগ্য)' : 'পরিশোধিত (PAID)'}
              </div>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isBn ? 'গ্রাহকের বিবরণ (Billed To):' : 'Customer Details:'}
              </span>
              <div className="font-bold text-slate-900 text-sm">{order.customerName}</div>
              <div className="text-slate-600 font-mono mt-0.5">{order.customerPhone}</div>
              <div className="text-slate-600 mt-1 leading-relaxed">{order.fullAddress}</div>
              <div className="font-semibold text-slate-700 mt-0.5">{order.district}, বাংলাদেশ</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isBn ? 'কুরিয়ার ও ডেলিভারি বিবরণ:' : 'Courier & Logistics:'}
              </span>
              <div className="font-bold text-slate-900">{order.courierName || 'Steadfast Courier'}</div>
              <div className="font-mono text-slate-600 text-xs mt-0.5">
                ট্র্যাকিং নম্বর: <span className="font-bold text-slate-900">{order.trackingNumber}</span>
              </div>
              <div className="text-slate-500 mt-1">
                সম্ভাব্য ডেলিভারি: <span className="font-semibold text-slate-800">{order.estimatedDelivery}</span>
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>১০০% বিষমুক্ত পরীক্ষিত</span>
                </span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-3">ক্রম</th>
                  <th className="p-3">শুটকির বিবরণ ও প্যাক সাইজ</th>
                  <th className="p-3">উৎস অঞ্চল</th>
                  <th className="p-3 text-center">পরিমাণ</th>
                  <th className="p-3 text-right">একক মূল্য</th>
                  <th className="p-3 text-right">মোট (টাকা)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500 font-mono">{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{item.product.nameBn}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {item.product.name} ({item.selectedWeight >= 1000 ? `${item.selectedWeight / 1000}kg` : `${item.selectedWeight}g`})
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{item.product.originBn}</td>
                    <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="p-3 text-right text-slate-700">৳{item.price}</td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      ৳{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation & Summary */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-2 text-xs text-slate-500">
              <div className="font-bold text-slate-700">{isBn ? 'বিশেষ নির্দেশাবলী ও শর্তাবলী:' : 'Terms & Conditions:'}</div>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                <li>শুটকি বাজার থেকে সরবরাহকৃত সকল শুটকি ১০০% ডিডিটি ও রাসায়নিকমুক্ত রোদে শুকানো।</li>
                <li>৩ স্তরের গন্ধরোধী ভ্যাকুয়াম প্যাকেজিং খোলা না হলে সাধারণ তাপমাত্রায় ৪ মাস ভালো থাকে।</li>
                <li>যেকোনো গুণগত সমস্যায় পার্সেল পাওয়ার ২৪ ঘণ্টার মধ্যে কাস্টমার কেয়ারে যোগাযোগ করুন।</li>
              </ul>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>পণ্যের সাবটোটাল:</span>
                <span className="font-semibold text-slate-900">৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>হোম ডেলিভারি ফি:</span>
                <span className="font-semibold text-slate-900">
                  {order.deliveryFee === 0 ? <span className="text-emerald-700 font-bold">ফ্রি (৳০)</span> : `৳${order.deliveryFee}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>ডিসকাউন্ট / কুপন ছাড়:</span>
                  <span>-৳{order.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-slate-300 flex justify-between text-base font-black text-slate-900">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="text-amber-800">৳{order.total}</span>
              </div>
              <div className="text-[10px] text-slate-400 text-right mt-0.5">
                পেমেন্ট মাধ্যম: <span className="font-bold uppercase text-slate-700">{order.paymentMethod}</span>
                {order.paymentTrxId ? ` (TrxID: ${order.paymentTrxId})` : ''}
              </div>
            </div>
          </div>

          {/* Courier Stickering Barcode, Official Seal & Signatures (Bottom) */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-slate-300 rounded-lg bg-white">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[11px] leading-tight font-mono">
                <div className="font-bold text-slate-900">STEADFAST COURIER VERIFIED</div>
                <div className="text-slate-500">PARCEL ID: {order.trackingNumber}</div>
                <div className="text-[10px] text-slate-400">Scan QR to verify delivery authenticity</div>
              </div>
            </div>

            {/* Official Authentic Stamp Seal */}
            <div className="flex flex-col items-center justify-center p-2 rounded-full border-2 border-dashed border-red-600/80 w-26 h-26 text-center text-red-700/90 rotate-[-6deg] shadow-xs select-none">
              <span className="text-[7.5px] font-black tracking-widest uppercase">SHUTKI BAZAR BD</span>
              <span className="text-sm leading-none my-0.5">🐟</span>
              <span className="text-[8.5px] font-black leading-tight">অনুমোদিত মেমো</span>
              <span className="text-[7px] font-bold text-emerald-800">১০০% বিষমুক্ত শুটকি</span>
              <span className="text-[6.5px] font-mono text-slate-600">DBID: 981240182</span>
            </div>

            <div className="text-right space-y-1">
              <div className="w-36 border-b border-slate-400 mx-auto" />
              <div className="font-bold text-xs text-slate-800">কর্তৃপক্ষের স্বাক্ষর</div>
              <div className="text-[10px] text-slate-400">শুটকি বাজার বাংলাদেশ লিমিটেড</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
