import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle, 
  Copy, 
  Truck, 
  CreditCard, 
  ArrowLeft,
  Check,
  Printer,
  FileText
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { language, cart, cartTotal, placeOrder, setSelectedOrderForInvoice } = useStore();
  const isBn = language === 'bn';

  // Customer Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [fullAddress, setFullAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'cod' | 'card'>('bkash');
  const [trxId, setTrxId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const deliveryFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : district === 'Dhaka' ? 60 : 120;
  const totalAmount = cartTotal + deliveryFee;

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !fullAddress) return;
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') && !trxId.trim()) {
      alert(isBn ? 'অনুগ্রহ করে বিকাশ/নগদ এর TrxID প্রদান করুন।' : 'Please enter the transaction TrxID.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        customerPhone,
        district,
        fullAddress: deliveryNotes ? `${fullAddress} (নোট: ${deliveryNotes})` : fullAddress,
        items: cart,
        subtotal: cartTotal,
        deliveryFee,
        discount: 0,
        total: totalAmount,
        paymentMethod,
        paymentTrxId: trxId || (paymentMethod === 'card' ? `CARD-${Date.now().toString().slice(-6)}` : undefined),
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {completedOrder 
                  ? (isBn ? 'অর্ডার সফল হয়েছে!' : 'Order Placed Successfully!')
                  : (isBn ? 'অর্ডার ও পেমেন্ট সম্পন্ন করুন' : 'Secure Checkout & Payment')}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isBn ? 'সারা বাংলাদেশে দ্রুততম হোম ডেলিভারি' : 'Direct from coastal artisanal fishers'}
              </p>
            </div>
          </div>

          {!completedOrder && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {completedOrder ? (
            /* Order Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {isBn ? 'অর্ডার নিশ্চিত করা হয়েছে' : 'Order Confirmed'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {isBn ? 'ধন্যবাদ আপনার অর্ডারের জন্য!' : 'Thank You for Your Order!'}
                </h4>
                <p className="text-slate-600 text-xs mt-1">
                  {isBn
                    ? `অর্ডার আইডি: #${completedOrder.id} | ট্র্যাকিং কোড: ${completedOrder.trackingNumber}`
                    : `Order ID: #${completedOrder.id} | Tracking: ${completedOrder.trackingNumber}`}
                </p>
              </div>

              {/* Order Highlights */}
              <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 space-y-2 max-w-md mx-auto text-xs">
                <div className="flex justify-between pb-1 border-b border-slate-200">
                  <span className="text-slate-500">{isBn ? 'গ্রাহকের নাম:' : 'Customer:'}</span>
                  <span className="font-bold text-slate-800">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-200">
                  <span className="text-slate-500">{isBn ? 'ডেলিভারি ঠিকানা:' : 'Address:'}</span>
                  <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                    {completedOrder.fullAddress}
                  </span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-200">
                  <span className="text-slate-500">{isBn ? 'পেমেন্ট মাধ্যম:' : 'Payment:'}</span>
                  <span className="font-bold text-amber-700 uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-200">
                  <span className="text-slate-500">{isBn ? 'মোট পরিশোধ:' : 'Total Amount:'}</span>
                  <span className="font-extrabold text-slate-900 text-sm">৳{completedOrder.total}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">{isBn ? 'সম্ভাব্য ডেলিভারি তারিখ:' : 'Est. Delivery:'}</span>
                  <span className="font-bold text-emerald-700">{completedOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Simulated SMS Alert Preview */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 max-w-md mx-auto text-left space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-sky-900 border-b border-sky-200 pb-1">
                  <span className="flex items-center gap-1.5">
                    <span>📱</span>
                    <span>{isBn ? 'আপনার মোবাইলে প্রেরিত এসএমএস (SMS Alert):' : 'SMS Notification Sent to Phone:'}</span>
                  </span>
                  <span className="font-mono text-slate-500">{completedOrder.customerPhone}</span>
                </div>
                <p className="text-[11px] text-slate-700 font-mono bg-white p-2.5 rounded-lg border border-sky-100 leading-relaxed">
                  "প্রিয় {completedOrder.customerName}, শুটকি বাজারে আপনার অর্ডার #{completedOrder.id} সফল হয়েছে। {completedOrder.trackingNumber} ট্র্যাকিং কোডে Steadfast কুরিয়ার মারফত আপনার পণ্যটি ৩-স্তরের গন্ধহীন সিল করে পাঠানো হচ্ছে। হেল্পলাইন: 01700-748854"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedOrderForInvoice(completedOrder);
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 border border-slate-700 active:scale-95 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>{isBn ? '📄 অফিসিয়াল ক্যাশ মেমো / ইনভয়েস প্রিন্ট বা PDF' : 'Print Official Invoice / PDF'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  {isBn ? 'আরও শুটকি কেনাকাটা করুন' : 'Continue Shopping'}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Customer Details */}
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>{isBn ? 'ডেলিভারি ঠিকানা ও ফোন নম্বর' : 'Shipping Address & Contact'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: মোহাম্মদ রফিকুল ইসলাম' : 'e.g. Rafiqul Islam'}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isBn ? 'সচল মোবাইল নম্বর * (01XXXXXXXXX)' : 'Mobile Phone * (01XXXXXXXXX)'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01712345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isBn ? 'জেলা / শহর *' : 'District / City *'}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="Dhaka">Dhaka (ঢাকা - ৳৬০ ডেলিভারি)</option>
                      <option value="Chittagong">Chittagong (চট্টগ্রাম - ৳১২০)</option>
                      <option value="Sylhet">Sylhet (সিলেট - ৳১২০)</option>
                      <option value="Khulna">Khulna (খুলনা - ৳১২০)</option>
                      <option value="Rajshahi">Rajshahi (রাজশাহী - ৳১২০)</option>
                      <option value="Barishal">Barishal (বরিশাল - ৳১২০)</option>
                      <option value="Rangpur">Rangpur (রংপুর - ৳১২০)</option>
                      <option value="Mymensingh">Mymensingh (ময়মনসিংহ - ৳১২০)</option>
                      <option value="Cox's Bazar">Cox's Bazar (কক্সবাজার - ৳১২০)</option>
                      <option value="Cumilla">Cumilla (কুমিল্লা - ৳১২০)</option>
                      <option value="Other">অন্যান্য জেলা (All 64 Districts - ৳১২০)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isBn ? 'ডেলিভারি নোট (ঐচ্ছিক)' : 'Delivery Note (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={isBn ? 'যেমন: বিকেলে ডেলিভারি দিন' : 'Special instructions'}
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBn ? 'পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট, রোড, এলাকা) *' : 'Detailed Street Address *'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder={isBn ? 'বাসা নং, রোড নং, পোস্ট অফিস বা এলাকার নাম' : 'House no, Road no, Area/Thana'}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Step 2: Payment Gateway Selection */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>{isBn ? 'পেমেন্ট গেটওয়ে নির্বাচন করুন' : 'Select Payment Gateway'}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isBn ? 'সুরক্ষিত লেনদেন' : '100% Secure'}
                  </span>
                </div>

                {/* Gateway Options Radio Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* bKash */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50/50 ring-2 ring-pink-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="sr-only"
                    />
                    <span className="text-xl">🌸</span>
                    <span className="font-bold text-slate-900 text-xs mt-1">bKash (বিকাশ)</span>
                    <span className="text-[10px] text-pink-600 font-medium">Merchant Pay</span>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="sr-only"
                    />
                    <span className="text-xl">🔥</span>
                    <span className="font-bold text-slate-900 text-xs mt-1">Nagad (নগদ)</span>
                    <span className="text-[10px] text-orange-600 font-medium">Mobile Pay</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-xs mt-1">ক্যাশ অন ডেলিভারি</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Pay on Delivery</span>
                  </label>

                  {/* Card / Visa */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-slate-900 text-xs mt-1">Debit / Card</span>
                    <span className="text-[10px] text-blue-600 font-medium">Visa / Master</span>
                  </label>
                </div>

                {/* Gateway Detail & TrxID Input Box */}
                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-slate-700">
                        {isBn ? (
                          <>
                            {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} মার্চেন্ট/পার্সোনাল নম্বরে মোট{' '}
                            <span className="font-bold text-slate-900">৳{totalAmount}</span> টাকা সেন্ড
                            মানি বা পেমেন্ট করুন:
                          </>
                        ) : (
                          <>
                            Send <span className="font-bold text-slate-900">৳{totalAmount}</span> to official{' '}
                            {paymentMethod.toUpperCase()} Number:
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-300 font-mono font-bold text-slate-900 text-xs">
                        <span>01700-748854</span>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber('01700748854')}
                          className="text-amber-700 hover:text-amber-800 p-0.5"
                          title="Copy number"
                        >
                          {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isBn ? 'পেমেন্ট এর ট্রানজেকশন আইডি (TrxID) *' : 'Transaction ID (TrxID) *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9J182KLP89"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono uppercase bg-white"
                      />
                      <div className="text-[11px] text-slate-500 mt-1">
                        {isBn
                          ? 'পেমেন্ট কনফার্মেশন এসএমএস থেকে TrxID কপি করে এখানে পেস্ট করুন।'
                          : 'Paste the TrxID from your payment confirmation SMS.'}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>{isBn ? 'ক্যাশ অন ডেলিভারি সুবিধা সক্রিয়' : 'Cash on Delivery Active'}</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      {isBn
                        ? 'পার্সেল ডেলিভারিম্যানের কাছ থেকে বুঝে পেয়ে চেক করে নগদ ৳' + totalAmount + ' টাকা পরিশোধ করুন। কোনো অগ্রিম চার্জ নেই।'
                        : `Pay ৳${totalAmount} in cash directly to the courier agent upon doorstep receipt.`}
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                    <label className="block text-xs font-semibold text-slate-700">Card Number (Visa / Mastercard)</label>
                    <input
                      type="text"
                      placeholder="4123 4567 8901 2345"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono bg-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="p-2 border border-slate-300 rounded-lg text-xs bg-white"
                      />
                      <input
                        type="password"
                        placeholder="CVC"
                        maxLength={4}
                        className="p-2 border border-slate-300 rounded-lg text-xs bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Cost Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{isBn ? 'পণ্যের মোট মূল্য:' : 'Subtotal:'}</span>
                  <span className="font-semibold text-slate-900">৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isBn ? 'ডেলিভারি ফি:' : 'Delivery Charge:'}</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">{isBn ? 'ফ্রি (৳০)' : 'FREE'}</span>
                    ) : (
                      `৳${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                  <span>{isBn ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span className="text-amber-800 text-lg">৳{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#f85606] hover:bg-[#d94803] text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isBn ? 'অর্ডার প্রক্রিয়াধীন...' : 'Processing Order...'}</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>
                      {isBn ? `৳${totalAmount} নিশ্চিত করে অর্ডার সম্পন্ন করুন` : `Place Order (৳${totalAmount})`}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
