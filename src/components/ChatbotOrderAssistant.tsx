import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Phone, 
  CheckCircle2, 
  HelpCircle,
  Flame,
  ArrowRight
} from 'lucide-react';

interface ChatbotOrderAssistantProps {
  onOpenPhoneOrder: () => void;
  onOpenCart: () => void;
}

interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
  actionType?: 'product' | 'order_form' | 'order_success';
  productRefId?: string;
}

export const ChatbotOrderAssistant: React.FC<ChatbotOrderAssistantProps> = ({
  onOpenPhoneOrder,
  onOpenCart,
}) => {
  const { language, products, addToCart, placeOrder } = useStore();
  const isBn = language === 'bn';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: isBn
        ? 'আসসালামু আলাইকুম! আমি শুটকি বাজারের স্মার্ট সহকারী। আপনি কি পছন্দ অনুযায়ী শুটকি খুঁজতে চান নাকি সরাসরি চ্যাটে অর্ডার দিতে চান?'
        : 'Hello! I am your Shutki Bazar Assistant. Looking for dry fish recommendations or want to order directly via chat?',
      time: 'Just now',
      suggestions: isBn
        ? [
            'ঝাল ভুনার জন্য সেরা শুটকি',
            'কম গন্ধ ও লবণ ছাড়া শুটকি',
            'চ্যাটে সরাসরি অর্ডার করতে চাই',
            'ফোনে সরাসরি কথা বলতে চাই',
          ]
        : [
            'Best fish for Spicy Bhuna',
            'Odorless & Salt-Free Fish',
            'Express Order in Chat',
            'Call Hotline',
          ],
    },
  ]);

  const [input, setInput] = useState('');

  // In-chat direct order form state
  const [inChatStep, setInChatStep] = useState<null | 'select_item' | 'customer_info'>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState(products[0]);
  const [chatOrderName, setChatOrderName] = useState('');
  const [chatOrderPhone, setChatOrderPhone] = useState('');
  const [chatOrderAddress, setChatOrderAddress] = useState('');

  const handleSend = (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: BotMessage = {
      id: `bot-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process Bot Response
    setTimeout(() => {
      processBotLogic(userText);
    }, 700);
  };

  const processBotLogic = (query: string) => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('ফোন') || q.includes('কল') || q.includes('call') || q.includes('phone')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? 'সরাসরি আমাদের সেন্ট্রাল হটলাইনে কল করুন: 01700-748854 (01700-SHUTKI)। আমাদের প্রতিনিধি অবিলম্বে আপনার অর্ডার লিপিবদ্ধ করবেন।'
            : 'Call our direct order hotline: 01700-748854 (01700-SHUTKI). Our team will assist immediately.',
          time,
          suggestions: isBn ? ['চ্যাটে অর্ডার দিন', 'লইট্টা শুটকি দেখান'] : ['Order via Chat', 'Show Loitta'],
        },
      ]);
      return;
    }

    if (q.includes('অর্ডার') || q.includes('order') || q.includes('কিনতে চাই')) {
      setInChatStep('customer_info');
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? 'চমৎকার! চ্যাটেই দ্রুত অর্ডার নিশ্চিত করুন। আপনার নাম, মোবাইল নম্বর এবং পূর্ণ ঠিকানা নিচে লিখে পাঠান:'
            : 'Great! Quick order right here in chat. Please provide your Name, Phone Number, and Delivery Address below:',
          time,
          actionType: 'order_form',
        },
      ]);
      return;
    }

    if (q.includes('ভুনা') || q.includes('ঝাল') || q.includes('bhuna') || q.includes('spicy')) {
      const loitta = products.find((p) => p.id === 'p-1') || products[0];
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? 'ঝাল ভুনার জন্য কক্সবাজারের খাঁটি "লইট্টা শুটকি" অথবা সোনাদিয়ার "ছুরি শুটকি" সবচেয়ে সেরা। প্রচুর রসুন ও শুকনো মরিচ দিয়ে ভুনা করলে জিভে জল আসবে!'
            : 'For spicy bhuna, Cox’s Bazar Loitta or Sonadia Churi shutki is unbeatable! Loaded with garlic and roasted chilies.',
          time,
          actionType: 'product',
          productRefId: loitta.id,
          suggestions: isBn ? ['২৫০ গ্রাম লইট্টা কার্টে যোগ করুন', 'চ্যাপা শুটকি সম্পর্কে বলুন'] : ['Add 250g Loitta to Cart'],
        },
      ]);
      return;
    }

    if (q.includes('লবণ ছাড়া') || q.includes('গন্ধ') || q.includes('salt') || q.includes('odor')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? 'আমাদের নাজিরারটেকের "লইট্টা শুটকি", সেন্টমার্টিনের "রূপচাঁদা", এবং সুনামগঞ্জ হাওরের "কাঁচকি" সম্পূর্ণ লবণ ছাড়া রোদে শুকানো। এবং ৩-স্তর ভ্যাকুয়াম প্যাকেজের কারণে ফ্রিজে বা ঘরে রাখলে কোনো গন্ধ বের হবে না।'
            : 'Our Loitta, Rupchanda, and Kachki are 100% salt-free solar dried. Our 3-layer food-grade packaging ensures 0% smell leakage.',
          time,
          suggestions: isBn ? ['কাঁচকি শুটকি কার্টে যোগ করুন', 'লইট্টা শুটকি কার্টে যোগ করুন'] : ['Add Kachki to Cart'],
        },
      ]);
      return;
    }

    if (q.includes('কার্টে যোগ') || q.includes('add')) {
      addToCart(products[0], 250, 1);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '✅ পণ্যটি আপনার শপিং ব্যাগে যুক্ত করা হয়েছে! আপনি কি চেকআউট করতে চান নাকি আরও শুটকি দেখবেন?'
            : '✅ Added to your shopping bag! Would you like to checkout now or keep browsing?',
          time,
          suggestions: isBn ? ['ব্যাগ ওপেন করুন', 'চ্যাটে সরাসরি অর্ডার সম্পন্ন করুন'] : ['Open Bag', 'Complete Order'],
        },
      ]);
      return;
    }

    // Default Fallback
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-r-${Date.now()}`,
        sender: 'bot',
        text: isBn
          ? `আপনার বার্তার জন্য ধন্যবাদ! শুটকি বাজারের সমস্ত পণ্য কক্সবাজার, দুবলার চর ও হাওরের প্রান্তিক জেলেদের কাছ থেকে সরাসরি সংগৃহীত। ১০০% প্রাকৃতিক ও বিষমুক্ত।`
          : `Thank you! All dried fish at Shutki Bazar are 100% chemical-free and sourced directly from artisanal fishermen.`,
        time,
        suggestions: isBn ? ['জনপ্রিয় সেরা শুটকি দেখান', 'ফোনে অর্ডার দিন'] : ['Show Bestsellers', 'Call Hotline'],
      },
    ]);
  };

  const handleInChatOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatOrderName || !chatOrderPhone || !chatOrderAddress) return;

    const order = placeOrder({
      customerName: chatOrderName,
      customerPhone: chatOrderPhone,
      district: 'Dhaka',
      fullAddress: chatOrderAddress,
      items: [
        {
          product: selectedProductForOrder,
          selectedWeight: 250,
          quantity: 1,
          price: selectedProductForOrder.availableWeights[1]?.price || 330,
        },
      ],
      subtotal: selectedProductForOrder.availableWeights[1]?.price || 330,
      deliveryFee: 60,
      discount: 0,
      total: (selectedProductForOrder.availableWeights[1]?.price || 330) + 60,
      paymentMethod: 'cod',
    });

    setInChatStep(null);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-r-${Date.now()}`,
        sender: 'bot',
        text: isBn
          ? `🎉 অভিনন্দন ${chatOrderName}! আপনার অর্ডার #${order.id} সফলভাবে গ্রহণ করা হয়েছে। ক্যাশ অন ডেলিভারিতে মোট ৳${order.total} পরিশোধযোগ্য। আমাদের ডেলিভারি টিম শীঘ্রই যোগাযোগ করবে।`
          : `🎉 Congratulations ${chatOrderName}! Your order #${order.id} has been placed via Chat Assistant. Total payable upon Cash on Delivery is ৳${order.total}.`,
        time: 'Just now',
        actionType: 'order_success',
        suggestions: isBn ? ['অর্ডার হিস্ট্রি দেখুন', 'আরও প্রশ্ন আছে'] : ['View Orders'],
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-amber-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-amber-400/50 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wide leading-none">
              {isBn ? 'শুটকি সহকারী' : 'Shutki Assistant'}
            </span>
            <span className="text-[10px] text-amber-200">
              {isBn ? 'চ্যাটে দ্রুত অর্ডার করুন' : 'Chat & Order 24/7'}
            </span>
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 text-white p-3.5 flex items-center justify-between border-b border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm leading-none flex items-center gap-1.5">
                  <span>{isBn ? 'শুটকি বাজার এআই সহকারী' : 'Shutki Assistant'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium">
                  ● {isBn ? 'অর্ডার ও তথ্য সহায়তায় সক্রিয়' : 'Active for quick orders'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenPhoneOrder}
                className="p-1.5 text-amber-200 hover:text-white rounded transition-colors"
                title={isBn ? 'ফোনে কল করুন' : 'Call'}
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-amber-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>

                  {/* Optional Embedded Product Card */}
                  {m.actionType === 'product' && (
                    <div className="mt-2 p-2.5 bg-white rounded-xl border border-amber-200 shadow-xs w-full max-w-[85%] flex items-center gap-2.5">
                      <img
                        src={products[0].image}
                        alt="Product"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{products[0].nameBn}</div>
                        <div className="text-[11px] text-amber-700 font-extrabold">৳330 (250g)</div>
                      </div>
                      <button
                        onClick={() => addToCart(products[0], 250, 1)}
                        className="px-2.5 py-1 bg-amber-600 text-white rounded-lg font-bold text-[11px] hover:bg-amber-700"
                      >
                        {isBn ? 'কিনুন' : 'Add'}
                      </button>
                    </div>
                  )}

                  {/* Optional In-Chat Quick Order Form */}
                  {m.actionType === 'order_form' && inChatStep === 'customer_info' && (
                    <form
                      onSubmit={handleInChatOrderSubmit}
                      className="mt-2 p-3 bg-white rounded-xl border border-slate-200 shadow-md w-full max-w-[90%] space-y-2"
                    >
                      <div className="font-bold text-slate-900 text-[11px]">
                        {isBn ? 'সরাসরি ক্যাশ অন ডেলিভারি ফর্ম:' : 'Express Cash on Delivery Form:'}
                      </div>

                      <select
                        value={selectedProductForOrder.id}
                        onChange={(e) => {
                          const found = products.find((p) => p.id === e.target.value);
                          if (found) setSelectedProductForOrder(found);
                        }}
                        className="w-full p-1.5 border rounded text-[11px] bg-slate-50"
                      >
                        {products.slice(0, 6).map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nameBn} - 250g (৳{p.availableWeights[1]?.price || 330})
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        required
                        placeholder={isBn ? 'আপনার পূর্ণ নাম' : 'Your Name'}
                        value={chatOrderName}
                        onChange={(e) => setChatOrderName(e.target.value)}
                        className="w-full p-1.5 border rounded text-[11px]"
                      />

                      <input
                        type="tel"
                        required
                        placeholder={isBn ? 'মোবাইল নম্বর (01XXXXXXXXX)' : 'Phone (01XXXXXXXXX)'}
                        value={chatOrderPhone}
                        onChange={(e) => setChatOrderPhone(e.target.value)}
                        className="w-full p-1.5 border rounded text-[11px]"
                      />

                      <textarea
                        rows={2}
                        required
                        placeholder={isBn ? 'পূর্ণ ঠিকানা ও এলাকা' : 'Full Address'}
                        value={chatOrderAddress}
                        onChange={(e) => setChatOrderAddress(e.target.value)}
                        className="w-full p-1.5 border rounded text-[11px]"
                      />

                      <button
                        type="submit"
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                      >
                        {isBn ? 'অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)' : 'Confirm Express Order'}
                      </button>
                    </form>
                  )}

                  {/* Suggestion Buttons */}
                  {m.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (s.includes('ব্যাগ') || s.includes('Bag')) {
                              onOpenCart();
                            } else {
                              handleSend(s);
                            }
                          }}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-full border border-amber-300 text-[10px] font-semibold transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Chat Input */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder={isBn ? 'কোন শুটকি খুঁজছেন লিখুন...' : 'Ask or order dry fish...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
