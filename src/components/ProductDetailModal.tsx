import React, { useState } from 'react';
import { Product, Fisherman } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  ShoppingBag, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  PhoneCall,
  UserCheck,
  Heart
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOpenChatWithFisherman: (fisherman: Fisherman) => void;
  onOpenCheckoutDirect: () => void;
  onOpenPhoneOrder: () => void;
  onViewCertificate?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenChatWithFisherman,
  onOpenCheckoutDirect,
  onOpenPhoneOrder,
  onViewCertificate,
}) => {
  const { language, addToCart, fishermen, addReview, isInWishlist, toggleWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const isBn = language === 'bn';

  const [selectedWeight, setSelectedWeight] = useState<number>(
    product.availableWeights[1]?.weight || product.availableWeights[0]?.weight || 250
  );
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'cooking'>('details');

  // Review Form state
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewerLocation, setNewReviewerLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentWeightOption =
    product.availableWeights.find((w) => w.weight === selectedWeight) || product.availableWeights[0];

  const associatedFisherman =
    fishermen.find((f) => f.id === product.fishermanId) || fishermen[0];

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, 1);
    onClose();
    onOpenCheckoutDirect();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    addReview(product.id, {
      userName: newReviewerName,
      location: newReviewerLocation || 'Dhaka, Bangladesh',
      rating: newRating,
      comment: newComment,
    });

    setReviewSubmitted(true);
    setNewComment('');
    setNewReviewerName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isBn ? product.originBn : product.origin}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">{isBn ? product.categoryLabelBn : product.categoryLabelEn}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isChemicalFree && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isBn ? '১০০% বিষমুক্ত' : 'Chemical-Free'}</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                  {isBn ? '৩-স্তর গন্ধহীন ফুড-গ্রেড সিল' : '3-Layer Odor-Proof Pouch'}
                </div>
              </div>

              {/* Lab Certificate Button */}
              {product.isChemicalFree && (
                <button
                  type="button"
                  onClick={() => {
                    if (onViewCertificate) onViewCertificate(product);
                  }}
                  className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isBn ? '🔬 বিএসআইআর ল্যাব টেস্ট সনদপত্র দেখুন' : 'View BCSIR Lab Test Certificate'}</span>
                </button>
              )}

              {/* Fisherman Bio Card */}
              <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/80 flex items-start gap-3">
                <img
                  src={associatedFisherman.avatar}
                  alt={associatedFisherman.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div className="flex-1 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-sm">
                      {isBn ? associatedFisherman.nameBn : associatedFisherman.name}
                    </div>
                    <span className="bg-amber-200/80 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                      {associatedFisherman.experienceYears}+ {isBn ? 'বছরের অভিজ্ঞতা' : 'yrs exp'}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium">
                    {isBn ? associatedFisherman.locationBn : associatedFisherman.location}
                  </div>
                  {associatedFisherman.boatName && (
                    <div className="text-[11px] text-amber-800 italic">
                      🚢 {associatedFisherman.boatName}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatWithFisherman(associatedFisherman);
                    }}
                    className="mt-1 text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline pt-0.5"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{isBn ? 'এই জেলের সাথে সরাসরি কথা বলুন' : 'Chat with this Fisherman'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.nameBn}
                </h2>
                <div className="text-sm font-medium text-slate-500 mt-0.5">
                  {product.name}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900 text-sm">{product.rating}</span>
                    <span className="text-xs text-slate-500">
                      ({product.reviewsCount} {isBn ? 'গ্রাহক রিভিউ' : 'verified reviews'})
                    </span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {isBn ? 'ইন-স্টক ও ডেলিভারিযোগ্য' : 'In Stock'}
                  </span>
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'প্যাকেট সাইজ নির্বাচন করুন:' : 'Select Pack Size:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {product.availableWeights.map((w) => (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeight(w.weight)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedWeight === w.weight
                          ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{w.label}</div>
                      <div className="text-sm font-extrabold text-amber-700">৳{w.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Price Display & Actions */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500">
                    {isBn ? 'সর্বমোট মূল্য (ভ্যাট অন্তর্ভুক্ত):' : 'Total Price (incl. VAT):'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ৳{currentWeightOption?.price}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'border-rose-400 bg-rose-50 text-rose-600'
                        : 'border-slate-300 text-slate-600 hover:text-rose-600 hover:bg-slate-50'
                    }`}
                    title={isBn ? (isWishlisted ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে রাখুন') : (isWishlisted ? 'Remove from wishlist' : 'Save to wishlist')}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 rounded-xl border border-amber-600 text-amber-700 hover:bg-amber-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isBn ? 'ব্যাগ এ রাখুন' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>{isBn ? 'সরাসরি অর্ডার করুন' : 'Buy Now'}</span>
                  </button>
                </div>
              </div>

              {/* Phone Order Quick Bar */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs">
                <span className="text-emerald-900 font-medium">
                  {isBn ? 'অনলাইনে অর্ডারে জটিলতা? ফোনে সরাসরি কথা বলুন:' : 'Prefer ordering over the phone?'}
                </span>
                <button
                  onClick={onOpenPhoneOrder}
                  className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                  <span>01700-748854</span>
                </button>
              </div>

              {/* Content Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isBn ? 'বিস্তারিত ও পুষ্টিগুণ' : 'Details & Nutrition'}
                  </button>
                  <button
                    onClick={() => setActiveTab('cooking')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'cooking'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isBn ? 'রান্নার নিয়ম ও ধৌত প্রণালী' : 'Cooking & Cleaning Tips'}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-amber-600 text-amber-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isBn ? `গ্রাহক রিভিউ (${product.reviews.length})` : `Reviews (${product.reviews.length})`}
                  </button>
                </div>

                <div className="pt-3 text-xs leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      <p className="text-slate-700">{isBn ? product.descriptionBn : product.description}</p>
                      
                      {/* Nutrition Table */}
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div className="font-bold text-slate-900 mb-2">
                          {isBn ? 'পুষ্টি উপাদান (প্রতি ১০০ গ্রামে):' : 'Nutrition Breakdown (per 100g):'}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                          <div className="bg-white p-2 rounded border border-slate-100">
                            <div className="text-slate-500">{isBn ? 'প্রোটিন' : 'Protein'}</div>
                            <div className="font-bold text-slate-900">{product.nutrition.protein}</div>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100">
                            <div className="text-slate-500">{isBn ? 'ক্যালসিয়াম' : 'Calcium'}</div>
                            <div className="font-bold text-slate-900">{product.nutrition.calcium}</div>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100">
                            <div className="text-slate-500">{isBn ? 'আয়রন' : 'Iron'}</div>
                            <div className="font-bold text-slate-900">{product.nutrition.iron}</div>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100">
                            <div className="text-slate-500">{isBn ? 'ক্যালোরি' : 'Calories'}</div>
                            <div className="font-bold text-slate-900">{product.nutrition.calories}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'cooking' && (
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900">
                        {isBn ? 'কীভাবে প্রস্তুত করবেন:' : 'Preparation Guide:'}
                      </div>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                        {product.cookingTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {/* Existing Reviews */}
                      <div className="space-y-3">
                        {product.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                {rev.userName}
                                {rev.verifiedPurchase && (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                                    {isBn ? 'যাচাইকৃত ক্রেতা' : 'Verified'}
                                  </span>
                                )}
                              </span>
                              <div className="flex text-amber-500">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <div className="text-[11px] text-slate-500">{rev.location} • {rev.date}</div>
                            <p className="text-slate-700 pt-1">{rev.comment}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Review Form */}
                      <div className="border-t border-slate-200 pt-3">
                        <div className="font-bold text-slate-900 mb-2">
                          {isBn ? 'আপনার রিভিউ লিখুন:' : 'Write a Review:'}
                        </div>
                        {reviewSubmitted ? (
                          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-semibold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{isBn ? 'আপনার মূল্যবান রিভিউর জন্য ধন্যবাদ!' : 'Thank you for your review!'}</span>
                          </div>
                        ) : (
                          <form onSubmit={handleReviewSubmit} className="space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                required
                                placeholder={isBn ? 'আপনার নাম' : 'Your Name'}
                                value={newReviewerName}
                                onChange={(e) => setNewReviewerName(e.target.value)}
                                className="p-2 border rounded text-xs w-full"
                              />
                              <input
                                type="text"
                                placeholder={isBn ? 'শহর / জেলা (যেমন: ঢাকা)' : 'City (e.g. Dhaka)'}
                                value={newReviewerLocation}
                                onChange={(e) => setNewReviewerLocation(e.target.value)}
                                className="p-2 border rounded text-xs w-full"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 font-medium">{isBn ? 'রেটিং:' : 'Rating:'}</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    type="button"
                                    key={star}
                                    onClick={() => setNewRating(star)}
                                    className="p-0.5"
                                  >
                                    <Star
                                      className={`w-4 h-4 ${
                                        star <= newRating
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-slate-300'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <textarea
                              required
                              rows={2}
                              placeholder={isBn ? 'শুটকির মান ও স্বাদ কেমন ছিল তা লিখুন...' : 'Share your honest feedback...'}
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="p-2 border rounded text-xs w-full"
                            />
                            <button
                              type="submit"
                              className="px-4 py-1.5 bg-slate-900 text-white rounded font-bold text-xs hover:bg-slate-800"
                            >
                              {isBn ? 'রিভিউ জমা দিন' : 'Submit Review'}
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
