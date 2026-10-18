import React, { useState } from 'react';
import { Product, Fisherman } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, MapPin, Plus, Check, Heart, ShoppingBag, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onOpenChatWithFisherman: (fisherman: Fisherman) => void;
  onViewCertificate?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenChatWithFisherman,
  onViewCertificate,
}) => {
  const { language, addToCart, fishermen, isInWishlist, toggleWishlist } = useStore();
  const isBn = language === 'bn';
  const isWishlisted = isInWishlist(product.id);

  const [selectedWeight, setSelectedWeight] = useState<number>(
    product.availableWeights[1]?.weight || product.availableWeights[0]?.weight || 250
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentWeightOption =
    product.availableWeights.find((w) => w.weight === selectedWeight) || product.availableWeights[0];

  const currentPrice = currentWeightOption?.price || 330;
  const originalPrice = Math.round(currentPrice * 1.2); // ~20% higher

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const associatedFisherman =
    fishermen.find((f) => f.id === product.fishermanId) || fishermen[0];

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-[#f85606] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top-Left: Discount Tag */}
        <div className="absolute top-2 left-2 z-10 bg-[#f85606] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
          -15%
        </div>

        {/* Top-Right: Wishlist Heart Button */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isWishlisted
                ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
                : 'bg-white/95 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
            title={isBn ? (isWishlisted ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় রাখুন') : (isWishlisted ? 'Remove' : 'Save')}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
          </button>
        </div>

        {/* Chemical-Free / Lab Cert Micro Badge */}
        {product.isChemicalFree && (
          <div className="absolute bottom-2 left-2 bg-emerald-700/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-200" />
            <span>{isBn ? '১০০% বিষমুক্ত' : 'Chemical-Free'}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Origin & Category tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-0.5 text-slate-600 font-medium">
              <MapPin className="w-3 h-3 text-[#f85606]" />
              <span className="truncate max-w-[120px]">{isBn ? product.originBn : product.origin}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {isBn ? product.categoryLabelBn : product.categoryLabelEn}
            </span>
          </div>

          {/* Titles - Bengali First & English Subtitle */}
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-[#f85606] transition-colors line-clamp-2 leading-snug">
            {product.nameBn}
          </h3>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 text-[11px]">
            <div className="flex text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <span className="font-bold text-slate-700">{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>

          {/* Daraz-Style Bold Orange Price & Discounted Struck-through Price */}
          <div className="pt-1">
            <div className="text-base sm:text-lg font-black text-[#f85606] leading-none">
              ৳{currentPrice}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span className="line-through">৳{originalPrice}</span>
              <span className="text-slate-700 font-semibold text-[10px]">-15%</span>
              <span className="text-emerald-700 text-[10px] font-bold hidden sm:inline">• ফ্রি ডেলিভারি</span>
            </div>
          </div>

          {/* Weight Selection Buttons */}
          <div className="pt-1.5 flex items-center gap-1 overflow-x-auto">
            {product.availableWeights.map((w) => (
              <button
                key={w.weight}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(w.weight);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  selectedWeight === w.weight
                    ? 'bg-[#f85606] text-white border-[#f85606]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {w.weight >= 1000 ? `${w.weight / 1000}kg` : `${w.weight}g`}
              </button>
            ))}
          </div>
        </div>

        {/* Daraz Quick Action Button: Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 ${
            addedAnimation
              ? 'bg-emerald-600 text-white'
              : 'bg-[#f85606] hover:bg-[#d94803] text-white'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{isBn ? 'কার্টে যোগ হয়েছে!' : 'Added!'}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
