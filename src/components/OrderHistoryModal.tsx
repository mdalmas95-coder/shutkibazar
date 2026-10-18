import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  ShoppingBag,
  MapPin,
  Check,
  FileText,
  Printer
} from 'lucide-react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  onContinueShopping,
}) => {
  const { language, orders, setSelectedOrderForInvoice } = useStore();
  const isBn = language === 'bn';

  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [expandedSmsOrderId, setExpandedSmsOrderId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isBn ? 'আমার অর্ডার হিস্ট্রি ও ডেলিভারি ট্র্যাকিং' : 'My Order History & Live Tracking'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isBn ? `সর্বমোট ${orders.length} টি অর্ডার নথিভুক্ত আছে` : `${orders.length} orders on record`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-3xl">
                📦
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                {isBn ? 'আপনার কোনো পূর্ববর্তী অর্ডার পাওয়া যায়নি' : 'No order history found'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isBn
                  ? 'আমাদের উপকূলীয় খাঁটি শুটকির সম্ভার থেকে আপনার পছন্দের শুটকি অর্ডার করুন।'
                  : 'Order authentic dry fish to start tracking your shipments in real-time.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700"
              >
                {isBn ? 'শুটকি পছন্দ করুন' : 'Shop Now'}
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const statusSteps = [
                { id: 'pending', label: isBn ? 'অর্ডার গ্রহণ' : 'Confirmed' },
                { id: 'processing', label: isBn ? 'ভ্যাকুয়াম প্যাক' : 'Odor-Packed' },
                { id: 'dispatched', label: isBn ? 'কুরিয়ারে রওয়ানা' : 'Dispatched' },
                { id: 'delivered', label: isBn ? 'ডেলিভার্ড' : 'Delivered' },
              ];

              const currentStepIndex =
                order.status === 'delivered'
                  ? 3
                  : order.status === 'dispatched'
                  ? 2
                  : order.status === 'processing'
                  ? 1
                  : 0;

              return (
                <div
                  key={order.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4 hover:border-amber-300 transition-colors"
                >
                  {/* Top Bar of Order Card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">#{order.id}</span>
                        <button
                          onClick={() => handleCopy(order.id, order.id)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Copy Order ID"
                        >
                          {copiedId === order.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{order.fullAddress}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrderForInvoice(order)}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        title={isBn ? 'অফিসিয়াল ক্যাশ মেমো / ইনভয়েস প্রিন্ট বা PDF ডাউনলোড করুন' : 'Print Official Invoice / PDF'}
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-700" />
                        <span>{isBn ? 'ক্যাশ মেমো / ইনভয়েস' : 'Invoice / PDF'}</span>
                      </button>

                      <div className="text-right">
                        <div className="text-lg font-black text-slate-900 leading-none">
                          ৳{order.total}
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">
                          {order.paymentMethod} {order.paymentTrxId ? `• ${order.paymentTrxId}` : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Delivery Status Progress Bar */}
                  <div className="py-2">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {statusSteps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        return (
                          <div key={step.id} className="flex flex-col items-center gap-1.5">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-500'
                              } ${isCurrent ? 'ring-4 ring-emerald-500/20' : ''}`}
                            >
                              {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[10px] font-semibold leading-tight ${
                                isCurrent
                                  ? 'text-emerald-700 font-bold'
                                  : isCompleted
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Courier Information */}
                  {order.trackingNumber && (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-semibold text-slate-700">
                            {order.courierName || 'Steadfast Courier'}
                          </span>
                          <div className="font-mono text-slate-500 text-[11px]">
                            {isBn ? 'ট্র্যাকিং নম্বর:' : 'Tracking:'} {order.trackingNumber}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">
                          {isBn ? 'প্রত্যাশিত ডেলিভারি:' : 'Est. Delivery:'}{' '}
                          <span className="font-bold text-slate-800">{order.estimatedDelivery}</span>
                        </span>

                        <button
                          onClick={() => setExpandedSmsOrderId(expandedSmsOrderId === order.id ? null : order.id)}
                          className="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-md text-[10px] font-bold transition-colors"
                        >
                          📱 {isBn ? 'এসএমএস প্রিভিউ' : 'SMS Alert'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Simulated SMS Alert Card */}
                  {expandedSmsOrderId === order.id && (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-left space-y-1 shadow-2xs text-[11px]">
                      <div className="flex items-center justify-between font-bold text-sky-900 border-b border-sky-200 pb-1">
                        <span>📱 {isBn ? 'আপনার মোবাইলে প্রেরিত লাইভ মেসেজ:' : 'Live SMS Notification:'}</span>
                        <span className="font-mono">{order.customerPhone}</span>
                      </div>
                      <p className="font-mono text-slate-700 bg-white p-2 rounded border border-sky-100">
                        "শুটকি বাজার: প্রিয় {order.customerName}, আপনার অর্ডার #{order.id} প্রস্তুত হয়েছে। কুরিয়ার ট্র্যাকিং কোড: {order.trackingNumber}। ৪-স্তর এয়ারটাইট সিল করা প্যাকেজটি শীঘ্রই পৌঁছাবে। হেল্পলাইন: 01700-748854"
                      </p>
                    </div>
                  )}

                  {/* Items in this Order */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">
                      {isBn ? 'অর্ডারের পণ্যসমূহ:' : 'Ordered Items:'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 truncate">
                              {item.product.nameBn}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {item.selectedWeight >= 1000
                                ? `${item.selectedWeight / 1000}kg`
                                : `${item.selectedWeight}g`}{' '}
                              × {item.quantity} প্যাক
                            </div>
                            <div className="font-extrabold text-amber-800 text-[11px]">
                              ৳{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
