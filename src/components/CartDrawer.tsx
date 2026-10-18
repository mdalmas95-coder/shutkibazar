import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const { language, cart, removeFromCart, updateCartQty, cartTotal } = useStore();
  const isBn = language === 'bn';

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isFlightPacking, setIsFlightPacking] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));

  const discountAmount = couponApplied ? 50 : 0;
  const flightPackingFee = isFlightPacking ? 50 : 0;
  const deliveryFee = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : 60;
  const finalTotal = Math.max(0, cartTotal + deliveryFee + flightPackingFee - discountAmount);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SHUTKI50') {
      setCouponApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="font-extrabold text-slate-900 text-base">
              {isBn ? 'আপনার শপিং ব্যাগ' : 'Shopping Cart'}
            </h2>
            <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-amber-50/80 px-5 py-3 border-b border-amber-200/60 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-1.5 text-amber-900">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="font-bold text-emerald-700">
                  {isBn ? '🎉 আপনি ফ্রি ডেলিভারি পাচ্ছেন!' : '🎉 Free Delivery Unlocked!'}
                </span>
              ) : (
                <span>
                  {isBn
                    ? `আর ৳${remainingForFreeShipping} এর শুটকি কিনলে ফ্রি ডেলিভারি!`
                    : `Add ৳${remainingForFreeShipping} more for Free Delivery!`}
                </span>
              )}
            </span>
            <span className="font-bold text-amber-800">{freeShippingProgress}%</span>
          </div>

          <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-3xl">
                🐟
              </div>
              <div className="font-bold text-slate-800 text-sm">
                {isBn ? 'আপনার ব্যাগ এখনও খালি' : 'Your cart is empty'}
              </div>
              <p className="text-xs text-slate-500 max-w-xs">
                {isBn
                  ? 'উপকূলীয় তাজা লইট্টা, চিংড়ি, রূপচাঁদা বা নোনা ইলিশ বেছে নিন।'
                  : 'Add authentic sun-dried fish from our catalog to get started.'}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700"
              >
                {isBn ? 'শুটকি দেখুন' : 'Explore Fish'}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedWeight}`}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {item.product.nameBn}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {item.selectedWeight >= 1000
                      ? `${item.selectedWeight / 1000} Kg Pack`
                      : `${item.selectedWeight}g Pack`}{' '}
                    • ৳{item.price} {isBn ? 'প্রতি প্যাক' : 'each'}
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateCartQty(item.product.id, item.selectedWeight, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.product.id, item.selectedWeight, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-extrabold text-slate-900 text-sm">
                      ৳{item.price * item.quantity}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Coupon Code Section */}
        {cart.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs">
            <form onSubmit={applyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder={isBn ? 'কুপন কোড (যেমন: SHUTKI50)' : 'Coupon Code (SHUTKI50)'}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs uppercase"
              />
              <button
                type="submit"
                disabled={couponApplied || !couponCode.trim()}
                className="px-3 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50"
              >
                {couponApplied ? (isBn ? 'প্রযোজ্য ✓' : 'Applied') : (isBn ? 'প্রয়োগ' : 'Apply')}
              </button>
            </form>
            {couponApplied && (
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                {isBn ? '✓ ৳৫০ ছাড় সফলভাবে প্রয়োগ হয়েছে!' : '✓ ৳50 discount applied!'}
              </div>
            )}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{isBn ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-semibold text-slate-900">৳{cartTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{isBn ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">{isBn ? 'ফ্রি (৳০)' : 'FREE'}</span>
                  ) : (
                    `৳${deliveryFee}`
                  )}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{isBn ? 'কুপন ছাড় (SHUTKI50):' : 'Discount:'}</span>
                  <span>-৳50</span>
                </div>
              )}
              {/* Flight-Safe Packing Option */}
              <div className="py-1 border-t border-slate-100">
                <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg bg-sky-50/80 border border-sky-200 text-sky-950 font-medium">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={isFlightPacking}
                      onChange={(e) => setIsFlightPacking(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>✈️ {isBn ? 'প্রবাসী লাগেজ-ফ্রেন্ডলি ৪-স্তর এয়ারটাইট প্যাক' : 'Flight-Safe 4-Layer Packing'}</span>
                  </div>
                  <span className="font-bold text-sky-800">+৳50</span>
                </label>
              </div>

              {isFlightPacking && (
                <div className="flex justify-between text-sky-800 font-medium">
                  <span>{isBn ? 'লাগেজ ফ্রেন্ডলি সিল ফি:' : 'Flight-Safe Pack Fee:'}</span>
                  <span>+৳50</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>{isBn ? 'মোট প্রদেয়:' : 'Total Amount:'}</span>
                <span className="text-amber-800 text-lg">৳{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#f85606] hover:bg-[#d94803] text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{isBn ? 'চেকআউটে এগিয়ে যান' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? 'ক্যাশ অন ডেলিভারি ও বিকাশ/নগদে নিরাপদ পেমেন্ট' : 'bKash, Nagad & Cash on Delivery'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
