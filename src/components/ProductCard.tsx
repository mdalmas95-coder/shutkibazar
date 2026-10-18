import React, { useState } from 'react';
import { Product, Fisherman } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, MapPin, MessageSquare, Plus, Check, FileCheck2, Heart } from 'lucide-react';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const associatedFisherman =
    fishermen.find((f) => f.id === product.fishermanId) || fishermen[0];

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenChatWithFisherman(associatedFisherman);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quality Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isChemicalFree && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onViewCertificate) onViewCertificate(product);
              }}
              className="inline-flex items-center gap-1 bg-emerald-600/95 hover:bg-emerald-700 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs cursor-pointer transition-colors"
              title={isBn ? 'ল্যাব পরীক্ষার সনদপত্র দেখুন' : 'View Lab Certificate'}
            >
              <ShieldCheck className="w-3 h-3 text-emerald-200" />
              <span>{isBn ? '১০০% বিষমুক্ত (সনদ)' : 'Chemical-Free (Cert)'}</span>
            </button>
          )}
          {product.isSaltFree && (
            <span className="bg-amber-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {isBn ? 'লবণ ছাড়া' : 'Salt-Free'}
            </span>
          )}
        </div>

        {/* Rating Tag */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
        </div>

        {/* Top Right: Stock status indicator & Wishlist Heart Button */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <div className="bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            {product.stockKg > 0 ? (
              <span className="text-emerald-700">
                {isBn ? `মজুদ: ${product.stockKg} কেজি` : `Stock: ${product.stockKg} kg`}
              </span>
            ) : (
              <span className="text-rose-600">{isBn ? 'স্টক শেষ' : 'Out of stock'}</span>
            )}
          </div>

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
            title={isBn ? (isWishlisted ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় রাখুন') : (isWishlisted ? 'Remove from wishlist' : 'Save to wishlist')}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Origin & Fisherman */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="inline-flex items-center gap-1 font-medium text-amber-800">
              <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
              {isBn ? product.originBn : product.origin}
            </span>
            <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">
              {isBn ? product.categoryLabelBn : product.categoryLabelEn}
            </span>
          </div>

          {/* Titles - Bengali First & English Subtitle */}
          <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1 leading-snug">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {product.name}
          </p>

          {/* Fisherman provenance tag */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img
                src={associatedFisherman.avatar}
                alt={associatedFisherman.name}
                className="w-5 h-5 rounded-full object-cover border border-amber-300"
              />
              <span className="text-[11px] text-slate-600 font-medium">
                {isBn ? associatedFisherman.nameBn : associatedFisherman.name}
              </span>
            </div>

            {/* Direct Chat with Fisherman button */}
            <button
              onClick={handleChatClick}
              className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:bg-amber-50 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
              title={isBn ? 'মার্চেন্টের সাথে সরাসরি কথা বলুন' : 'Direct Fisherman Chat'}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{isBn ? 'জেলে চ্যাট' : 'Chat'}</span>
            </button>
          </div>
        </div>

        {/* Weight Selector & Price */}
        <div className="space-y-2.5 pt-1">
          {/* Weight Chips */}
          <div className="grid grid-cols-4 gap-1">
            {product.availableWeights.map((w) => (
              <button
                key={w.weight}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(w.weight);
                }}
                className={`py-1 text-[11px] font-semibold rounded-md transition-all text-center border ${
                  selectedWeight === w.weight
                    ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {w.weight >= 1000 ? `${w.weight / 1000}kg` : `${w.weight}g`}
              </button>
            ))}
          </div>

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="text-[11px] text-slate-500">
                {currentWeightOption?.label}
              </div>
              <div className="text-lg font-extrabold text-slate-900 leading-none">
                ৳{currentWeightOption?.price}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stockKg <= 0}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : product.stockKg <= 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isBn ? 'যোগ হয়েছে' : 'Added!'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'কিনুন' : 'Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
