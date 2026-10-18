import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  X, 
  Package, 
  Gift, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  ShoppingBag,
  Percent,
  CheckCircle2
} from 'lucide-react';

interface CustomBoxBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoxAddedToCart: () => void;
}

interface BoxSlot {
  product: Product;
  weightGrams: number;
  price: number;
}

export const CustomBoxBuilderModal: React.FC<CustomBoxBuilderModalProps> = ({
  isOpen,
  onClose,
  onBoxAddedToCart,
}) => {
  const { language, products, addToCart } = useStore();
  const isBn = language === 'bn';

  const [boxSize, setBoxSize] = useState<3 | 5>(3);
  const [selectedItems, setSelectedItems] = useState<BoxSlot[]>([
    { product: products[0], weightGrams: 250, price: products[0].availableWeights[1]?.price || 330 },
    { product: products[1], weightGrams: 250, price: products[1].availableWeights[1]?.price || 480 },
  ]);
  const [boxName, setBoxName] = useState('আমার স্পেশাল শুটকি বক্স');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const discountRate = boxSize === 3 ? 0.10 : 0.15; // 10% for 3 items, 15% for 5 items
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const finalBoxPrice = subtotal - discountAmount;

  const handleAddItem = (prod: Product) => {
    if (selectedItems.length >= boxSize) {
      alert(isBn ? `এই বক্সে সর্বোচ্চ ${boxSize}টি শুটকি নির্বাচন করা যাবে।` : `Max ${boxSize} items allowed in this box.`);
      return;
    }
    const weightOpt = prod.availableWeights[1] || prod.availableWeights[0];
    setSelectedItems((prev) => [
      ...prev,
      {
        product: prod,
        weightGrams: weightOpt.weight,
        price: weightOpt.price,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddBoxToCart = () => {
    if (selectedItems.length === 0) return;

    // Create a bundle product representation
    const bundleProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `${boxName} (${selectedItems.length} Items Custom Box)`,
      nameBn: `${boxName} (${selectedItems.length}টি শুটকির কাস্টম গিফট বক্স)`,
      category: 'special',
      categoryLabelBn: 'কাস্টম শুটকি বক্স',
      categoryLabelEn: 'Custom Bundle Box',
      pricePerKg: 1600,
      availableWeights: [{ weight: 1000, label: `${selectedItems.length}টি সেরা শুটকি কম্বো`, price: finalBoxPrice }],
      image: selectedItems[0]?.product.image || products[0].image,
      origin: "Cox's Bazar & Sundarbans",
      originBn: 'কক্সবাজার ও সুন্দরবন সংগৃহীত',
      fishermanId: 'fish-1',
      fishermanName: 'Custom Artisanal Bundle',
      fishermanLocation: 'Coastal Bangladesh',
      rating: 5.0,
      reviewsCount: 1,
      stockKg: 50,
      isChemicalFree: true,
      isSaltFree: true,
      isOdorSealed: true,
      description: `Custom curated box containing: ${selectedItems.map((i) => `${i.product.nameBn} (${i.weightGrams}g)`).join(', ')}`,
      descriptionBn: `গ্রাহকের পছন্দের কাস্টম বক্স: ${selectedItems.map((i) => `${i.product.nameBn} (${i.weightGrams} গ্রাম)`).join(', ')}`,
      nutrition: { protein: '65g', calcium: '1500mg', iron: '7mg', calories: '300 kcal' },
      cookingTips: ['Pre-sealed in decorative air-tight gift box'],
      reviews: [],
    };

    addToCart(bundleProduct, 1000, 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
      onBoxAddedToCart();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 p-4 text-white flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-200">
              <Gift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2 py-0.2 rounded font-bold uppercase">
                  {isBn ? 'স্পেশাল বান্ডেল মেকার' : 'Custom Bundle Maker'}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded font-bold">
                  {boxSize === 3 ? '১০% অতিরিক্ত ছাড়' : '১৫% মেগা ছাড়'}
                </span>
              </div>
              <h3 className="font-extrabold text-base leading-tight mt-0.5">
                {isBn ? 'নিজের শুটকি বক্স নিজে সাজান' : 'Build Your Own Custom Shutki Box'}
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

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Step 1: Select Box Size */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 text-xs">
              {isBn ? '১. বক্সের সাইজ ও ছাড় নির্বাচন করুন:' : '1. Choose Box Size & Savings:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setBoxSize(3);
                  if (selectedItems.length > 3) setSelectedItems(selectedItems.slice(0, 3));
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  boxSize === 3
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {isBn ? '৩-আইটেম ফ্যামিলি বক্স' : '3-Item Family Box'}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    ১০% ছাড়
                  </span>
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  {isBn ? 'দৈনন্দিন পারিবারিক রান্নার জন্য সেরা' : 'Perfect for family meals'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBoxSize(5)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  boxSize === 5
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {isBn ? '৫-আইটেম মেগা গিফট বক্স' : '5-Item Mega Gift Box'}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    ১৫% ছাড়
                  </span>
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  {isBn ? 'উপহার ও প্রবাসী বন্ধুদের জন্য সেরা' : 'Best for gifting & expats'}
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Visual Box Slots */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-700" />
                <span>{isBn ? `আপনার বক্সের স্লটসমূহ (${selectedItems.length}/${boxSize}):` : `Box Slots (${selectedItems.length}/${boxSize}):`}</span>
              </span>
              <span className="text-slate-500 text-[11px]">
                {boxSize - selectedItems.length > 0
                  ? isBn ? `আরও ${boxSize - selectedItems.length}টি শুটকি যোগ করুন` : `Add ${boxSize - selectedItems.length} more`
                  : isBn ? 'বক্স সম্পূর্ণ প্রস্তুত ✓' : 'Box Ready ✓'}
              </span>
            </div>

            {/* Visual Slots Grid */}
            <div className={`grid gap-2.5 ${boxSize === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-5'}`}>
              {Array.from({ length: boxSize }).map((_, index) => {
                const item = selectedItems[index];
                return (
                  <div
                    key={index}
                    className={`rounded-xl border p-2.5 text-center flex flex-col justify-between items-center min-h-[120px] transition-all ${
                      item
                        ? 'bg-white border-amber-300 shadow-2xs'
                        : 'border-dashed border-slate-300 bg-white/50 text-slate-400'
                    }`}
                  >
                    {item ? (
                      <>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="w-full mt-1">
                          <div className="font-bold text-slate-900 text-xs truncate">
                            {item.product.nameBn}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {item.weightGrams}g • ৳{item.price}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-rose-600 hover:text-rose-800 p-1 mt-1 text-[10px] font-semibold flex items-center gap-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{isBn ? 'বাদ' : 'Del'}</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full space-y-1 text-slate-400">
                        <Plus className="w-5 h-5 text-slate-300" />
                        <span className="text-[10px] font-medium">{isBn ? `স্লট ${index + 1}` : `Slot ${index + 1}`}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Choose Fish Varieties to Fill */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 text-xs">
              {isBn ? '২. নিচে থেকে পছন্দের শুটকি ট্যাপ করে বক্সে যুক্ত করুন:' : '2. Tap to add fish to your box:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1">
              {products.map((p) => {
                const defaultWeight = p.availableWeights[1] || p.availableWeights[0];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleAddItem(p)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-left transition-all flex items-center gap-2 group shadow-2xs"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-xs truncate group-hover:text-amber-800">
                        {p.nameBn}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {defaultWeight.label.split(' ')[0]} • ৳{defaultWeight.price}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Checkout Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-600 text-xs">
              <span>{isBn ? 'আইটেমগুলোর মোট মূল্য:' : 'Items Subtotal:'}</span>
              <span className="line-through">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold text-xs">
              <span>{isBn ? `বান্ডেল বিশেষ ছাড় (${Math.round(discountRate * 100)}%):` : 'Bundle Discount:'}</span>
              <span>-৳{discountAmount}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
              <div>
                <span>{isBn ? 'কাস্টম বক্সের চূড়ান্ত মূল্য:' : 'Final Box Price:'}</span>
                <span className="text-[10px] text-emerald-700 font-medium block">
                  {isBn ? 'ফ্রি প্রিমিয়াম গিফট প্যাকেজিং সহ' : 'Includes Free Gift Box Packing'}
                </span>
              </div>
              <span className="text-xl text-amber-800">৳{finalBoxPrice}</span>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddBoxToCart}
            disabled={selectedItems.length === 0}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md shadow-amber-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {addedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{isBn ? 'বক্স সফলভাবে কার্টে যোগ হয়েছে!' : 'Box Added to Cart!'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {isBn ? `৳${finalBoxPrice} এ কাস্টম বক্সটি ব্যাগে নিন` : `Add Custom Box to Cart (৳${finalBoxPrice})`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
