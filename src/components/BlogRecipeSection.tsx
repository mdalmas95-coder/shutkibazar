import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Recipe, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';
import { 
  Flame, 
  Clock, 
  ChefHat, 
  BookOpen, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface BlogRecipeSectionProps {
  onSelectRecipeProduct?: (productId: string) => void;
}

export const BlogRecipeSection: React.FC<BlogRecipeSectionProps> = ({
  onSelectRecipeProduct,
}) => {
  const { language, recipes, addRecipe, addToCart, products } = useStore();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'recipes' | 'blogs'>('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(recipes[0] || null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [kitAddedAnimation, setKitAddedAnimation] = useState(false);

  // Recipe submission modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ভুনা (Bhuna)');
  const [newTime, setNewTime] = useState('২৫ মিনিট');
  const [newSpice, setNewSpice] = useState<'Mild' | 'Medium' | 'Extra Spicy'>('Extra Spicy');
  const [newIngredients, setNewIngredients] = useState('');
  const [newSteps, setNewSteps] = useState('');
  const [submittedRecipeSuccess, setSubmittedRecipeSuccess] = useState(false);

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSteps.trim()) return;

    addRecipe({
      title: newTitle,
      titleBn: newTitle,
      category: newCategory,
      prepTime: '১০ মিনিট',
      cookTime: newTime,
      servings: 4,
      difficulty: 'Easy',
      spiceLevel: newSpice,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      ingredients: newIngredients.split('\n').filter(Boolean).map((line) => ({
        item: line,
        amount: 'প্রয়োজনমতো',
      })),
      steps: newSteps.split('\n').filter(Boolean),
      chefNotes: 'ব্যবহারকারীর ঘরোয়া ঐতিহ্যবাহী রেসিপি।',
    });

    setSubmittedRecipeSuccess(true);
    setTimeout(() => {
      setSubmittedRecipeSuccess(false);
      setShowShareModal(false);
      setNewTitle('');
      setNewIngredients('');
      setNewSteps('');
    }, 1500);
  };

  return (
    <section id="recipe-blog-section" className="py-12 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
              <ChefHat className="w-3.5 h-3.5 text-amber-700" />
              <span>{isBn ? 'ঐতিহ্যবাহী রসনা বিলাস' : 'Culinary Heritage'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isBn ? 'শুটকির ঘরোয়া রেসিপি ও রান্নার গাইড' : 'Traditional Shutki Recipes & Guides'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isBn
                ? 'চট্টগ্রাম, সিলেট ও উপকূলের খাঁটি রান্না প্রণালী, পরিষ্কার করার টিপস এবং পরিবারের রেসিপি।'
                : 'Authentic cooking secrets, cleaning methods, and community kitchen tips.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher: Recipes vs Blogs */}
            <div className="bg-white p-1 rounded-xl border border-slate-200 flex text-xs font-bold shadow-xs">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'recipes'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🍲 {isBn ? 'রেসিপি সংগ্রহ' : 'Recipes'}
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'blogs'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📖 {isBn ? 'তথ্যমূলক ব্লগ' : 'Blog Articles'}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? 'আপনার রেসিপি শেয়ার করুন' : 'Share Your Recipe'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Recipe Showcase */}
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Recipe List */}
            <div className="lg:col-span-5 space-y-3">
              {recipes.map((rec) => {
                const isSelected = selectedRecipe?.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecipe(rec)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-white border-amber-600 shadow-md ring-2 ring-amber-500/10'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-800 mb-1">
                        <span>{rec.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.cookTime}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm leading-snug truncate">
                        {isBn ? rec.titleBn : rec.title}
                      </h4>

                      <div className="flex items-center justify-between mt-2 text-[11px]">
                        <span className="font-medium text-slate-500">
                          {isBn ? `${rec.servings} জনের জন্য` : `Serves ${rec.servings}`}
                        </span>
                        <span className="text-orange-600 font-bold flex items-center gap-0.5">
                          <Flame className="w-3 h-3" />
                          {rec.spiceLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Recipe View */}
            {selectedRecipe && (
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-md space-y-5">
                <div className="relative rounded-xl overflow-hidden aspect-16/7 bg-slate-100 border border-slate-200 shadow-inner">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{selectedRecipe.spiceLevel}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {isBn ? selectedRecipe.titleBn : selectedRecipe.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {isBn ? 'রান্নার সময়:' : 'Time:'} {selectedRecipe.cookTime}
                    </span>
                    <span>•</span>
                    <span>{isBn ? 'পরিবেশন:' : 'Serves:'} {selectedRecipe.servings} {isBn ? 'জন' : 'people'}</span>
                    <span>•</span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                      {selectedRecipe.category}
                    </span>
                  </div>
                </div>

                {/* Ingredients Grid */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                    {isBn ? 'প্রয়োজনীয় উপকরণ:' : 'Ingredients:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <span className="font-semibold text-slate-800">{ing.item}</span>
                        <span className="text-slate-500">{ing.amount}</span>
                      </div>
                    ))}
                  </div>

                  {/* 1-Click Buy Recipe Fish Kit */}
                  {selectedRecipe.relatedProductId && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const targetProd = products.find((p) => p.id === selectedRecipe.relatedProductId) || products[0];
                          addToCart(targetProd, 250, 1);
                          setKitAddedAnimation(true);
                          setTimeout(() => setKitAddedAnimation(false), 1500);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                          kitAddedAnimation
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                        }`}
                      >
                        {kitAddedAnimation ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{isBn ? '✓ রেসিপির শুটকি ব্যাগে যোগ করা হয়েছে!' : '✓ Added to Cart!'}</span>
                          </>
                        ) : (
                          <>
                            <span>🛒</span>
                            <span>
                              {isBn 
                                ? 'এই রেসিপির জন্য খাঁটি শুটকি (২৫০ গ্রাম) ১-ক্লিকে কিনুন' 
                                : 'Buy Dried Fish for this Recipe (250g Pack)'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Cooking Instructions */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                    {isBn ? 'ধাপে ধাপে প্রস্তুত প্রণালী:' : 'Step-by-Step Preparation:'}
                  </h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {selectedRecipe.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Chef Secret Note */}
                {selectedRecipe.chefNotes && (
                  <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {isBn ? 'শেফ টিপস / বিশেষ রহস্য:' : 'Chef Secret Note:'}
                    </span>
                    <p className="leading-relaxed">{selectedRecipe.chefNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Educational Blog Articles */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => setSelectedBlog(blog)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full">
                      {blog.readTime}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1">
                        {blog.author} • {blog.date}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                        {isBn ? blog.titleBn : blog.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {isBn ? blog.summaryBn : blog.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex gap-1.5 flex-wrap">
                        {blog.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <span className="font-bold text-amber-700 flex items-center gap-1 hover:underline">
                        <span>{isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read Blog Modal if open */}
            {selectedBlog && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-amber-700">{selectedBlog.author}</span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                        {isBn ? selectedBlog.titleBn : selectedBlog.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>

                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full aspect-16/8 rounded-xl object-cover"
                  />

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedBlog.content.map((p, idx) => (
                      <p key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="text-right pt-2">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                    >
                      {isBn ? 'বন্ধ করুন' : 'Close'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: Share Your Recipe */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span>{isBn ? 'আপনার শুটকি রেসিপি শেয়ার করুন' : 'Share Your Shutki Recipe'}</span>
              </h3>

              {submittedRecipeSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl font-bold text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <span>{isBn ? 'রেসিপি সফলভাবে যুক্ত হয়েছে! ধন্যবাদ।' : 'Recipe added successfully! Thank you.'}</span>
                </div>
              ) : (
                <form onSubmit={handleShareSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">{isBn ? 'রেসিপির নাম *' : 'Recipe Title *'}</label>
                    <input
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: বেগুন দিয়ে কাঁচকি শুটকির চচ্চড়ি' : 'Recipe Name'}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">{isBn ? 'রান্নার ধরন' : 'Category'}</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="ভুনা (Bhuna)">ভুনা (Bhuna)</option>
                        <option value="ভর্তা (Bhorta)">ভর্তা (Bhorta)</option>
                        <option value="চচ্চড়ি (Charchari)">চচ্চড়ি (Charchari)</option>
                        <option value="ঝোল তরকারি (Curry)">ঝোল তরকারি (Curry)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">{isBn ? 'ঝালের মাত্রা' : 'Spice Level'}</label>
                      <select
                        value={newSpice}
                        onChange={(e) => setNewSpice(e.target.value as any)}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="Mild">হালকা ঝাল (Mild)</option>
                        <option value="Medium">মাঝারি ঝাল (Medium)</option>
                        <option value="Extra Spicy">স্পাইসি ঝাল (Extra Spicy)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      {isBn ? 'উপকরণসমূহ (প্রতি লাইনে একটি) *' : 'Ingredients (one per line) *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={isBn ? '২৫০ গ্রাম লইট্টা শুটকি\n১ কাপ রসুন কোয়া\n১/২ কাপ খাঁটি শর্ষের তেল' : 'Ingredients...'}
                      value={newIngredients}
                      onChange={(e) => setNewIngredients(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      {isBn ? 'রান্নার প্রস্তুত প্রণালী *' : 'Cooking Instructions *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={isBn ? '১. কুসুম গরম পানিতে শুটকি ধুয়ে নিন...\n২. কড়াইয়ে তেল গরম করে রসুন সোনালী করে ভাজুন...' : 'Steps...'}
                      value={newSteps}
                      onChange={(e) => setNewSteps(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowShareModal(false)}
                      className="px-4 py-2 border rounded-lg font-bold text-slate-600"
                    >
                      {isBn ? 'বাতিল' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                    >
                      {isBn ? 'রেসিপি প্রকাশ করুন' : 'Publish Recipe'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
