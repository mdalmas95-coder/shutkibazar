import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductDetail: (product: any) => void;
  onOpenCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onOpenProductDetail,
  onOpenCart,
}) => {
  const { language, wishlist, toggleWishlist, products, addToCart } = useStore();
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((prod) => {
      const defaultWeight = prod.availableWeights[1]?.weight || prod.availableWeights[0]?.weight || 250;
      addToCart(prod, defaultWeight, 1);
    });
    onClose();
    onOpenCart();
  };

  const handleAddSingleToCart = (prod: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultWeight = prod.availableWeights[1]?.weight || prod.availableWeights[0]?.weight || 250;
    addToCart(prod, defaultWeight, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-rose-50 to-amber-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isBn ? 'পছন্দের তালিকা (উইশলিস্ট)' : 'My Saved Wishlist'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {isBn 
                  ? `${wishlistProducts.length} টি পছন্দের শুটকি সংরক্ষিত আছে` 
                  : `${wishlistProducts.length} item(s) saved for later`}
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

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-3xl shadow-inner">
                <Heart className="w-10 h-10 stroke-[1.5] text-rose-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 text-base">
                  {isBn ? 'আপনার পছন্দের তালিকা খালি' : 'Your Wishlist is Empty'}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  {isBn
                    ? 'যেকোনো পণ্যের ওপর হার্ট (❤️) আইকনে ক্লিক করে আপনার পছন্দের শুটকি সংরক্ষণ করতে পারেন।'
                    : 'Click the heart icon on any dried fish to save it here for later.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                {isBn ? 'শুটকির ক্যাটালগ দেখুন' : 'Explore Dry Fish'}
              </button>
            </div>
          ) : (
            wishlistProducts.map((prod) => {
              const defaultWeight = prod.availableWeights[1] || prod.availableWeights[0];
              return (
                <div
                  key={prod.id}
                  onClick={() => onOpenProductDetail(prod)}
                  className="group p-3 rounded-2xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/20 transition-all flex items-center gap-3 shadow-2xs cursor-pointer"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {prod.isChemicalFree && (
                      <div className="absolute top-1 left-1 bg-emerald-600/90 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                        বিষমুক্ত
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate">
                      {prod.nameBn}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate font-mono">
                      {prod.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-800 font-extrabold text-xs">
                        ৳{defaultWeight?.price}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        / {defaultWeight?.label}
                      </span>
                    </div>
                  </div>

                  {/* Actions for this item */}
                  <div className="flex flex-col gap-1.5 items-end shrink-0">
                    <button
                      onClick={(e) => handleAddSingleToCart(prod, e)}
                      className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors active:scale-95"
                      title={isBn ? 'ব্যাগে যোগ করুন' : 'Add to cart'}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title={isBn ? 'তালিকা থেকে সরান' : 'Remove from wishlist'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Actions */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <button
              onClick={handleAddAllToCart}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isBn ? 'সবগুলো পণ্য ব্যাগে যোগ করুন' : 'Move All to Cart'}</span>
            </button>
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => toggleWishlist(p.id));
              }}
              className="w-full py-2 text-slate-500 hover:text-rose-600 text-xs font-semibold text-center transition-colors"
            >
              {isBn ? 'সম্পূর্ণ উইশলিস্ট খালি করুন' : 'Clear Wishlist'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
