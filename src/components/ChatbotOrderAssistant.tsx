import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  Volume2,
  VolumeX,
  Clock,
  Truck,
  ShieldCheck,
  FileText,
  PackageCheck
} from 'lucide-react';
import { Product } from '../types';

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
  actionType?: 'product' | 'order_form' | 'order_success' | 'order_status';
  productRef?: Product;
  orderRefId?: string;
}

export const ChatbotOrderAssistant: React.FC<ChatbotOrderAssistantProps> = ({
  onOpenPhoneOrder,
  onOpenCart,
}) => {
  const { language, products, orders, addToCart, placeOrder, setSelectedOrderForInvoice } = useStore();
  const isBn = language === 'bn';

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: isBn
        ? 'আসসালামু আলাইকুম! আমি শুটকি বাজারের রিয়েল-টাইম স্মার্ট সহকারী। আপনি কি সেরা শুটকির পরামর্শ চান, সরাসরি চ্যাটে অর্ডার করতে চান, নাকি বিদ্যমান অর্ডার ট্র্যাক করতে চান?'
        : 'Hello! I am Shutki Bazar\'s Real-Time AI Assistant. Looking for dry fish recommendations, ordering directly in chat, or tracking an existing order?',
      time: 'Just now',
      suggestions: isBn
        ? [
            'ঝাল ভুনার সেরা শুটকি',
            '১০০% বিষমুক্ত ও গন্ধহীন শুটকি',
            'চ্যাটে সরাসরি অর্ডার করতে চাই',
            'আমার অর্ডার ট্র্যাক করুন (#SB-88291)',
            'ফোনে সরাসরি কথা বলতে চাই',
          ]
        : [
            'Best fish for Spicy Bhuna',
            'Chemical-free & Odorless dry fish',
            'Order directly in chat',
            'Track My Order (#SB-88291)',
            'Call Hotline',
          ],
    },
  ]);

  const [input, setInput] = useState('');

  // In-chat direct order form state
  const [inChatStep, setInChatStep] = useState<null | 'customer_info'>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product>(products[0] || {} as Product);
  const [selectedWeightGrams, setSelectedWeightGrams] = useState<number>(250);
  const [chatOrderName, setChatOrderName] = useState('');
  const [chatOrderPhone, setChatOrderPhone] = useState('');
  const [chatOrderAddress, setChatOrderAddress] = useState('');
  const [chatOrderDistrict, setChatOrderDistrict] = useState('Dhaka');

  // Play subtle synthesis chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext policy fallback
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: BotMessage = {
      id: `bot-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Trigger typing indicator and real-time smart answering
    setIsTyping(true);
    const delay = Math.floor(Math.random() * 400) + 600; // 600ms - 1000ms realistic delay
    setTimeout(() => {
      processBotLogic(userText);
      setIsTyping(false);
      playChime();
    }, delay);
  };

  const processBotLogic = (query: string) => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Hotline Phone Call Query
    if (q.includes('ফোন') || q.includes('কল') || q.includes('call') || q.includes('phone') || q.includes('হটলাইন')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '📞 আমাদের সেন্ট্রাল কাস্টমার হটলাইন: 01700-748854 (সকাল ৯টা - রাত ১১টা)। যেকোনো প্রশ্ন বা সরাসরি ফোনে অর্ডার গ্রহণ করার জন্য আমাদের প্রতিনিধি প্রস্তুত আছেন।'
            : '📞 Call our Customer Hotline: 01700-748854 (9 AM - 11 PM daily). Our representatives are available for direct order booking.',
          time,
          suggestions: isBn ? ['চ্যাটে অর্ডার দিন', 'লইট্টা শুটকি দেখান', 'আমার অর্ডার ট্র্যাক করুন'] : ['Order in Chat', 'Show Loitta', 'Track My Order'],
        },
      ]);
      return;
    }

    // Order Tracking Query
    const orderMatch = q.match(/sb-\d+/i) || (q.includes('ট্র্যাক') || q.includes('track') || q.includes('অর্ডার কোথায়') || q.includes('স্ট্যাটাস'));
    if (orderMatch) {
      const searchedOrder = orders.find((o) => q.includes(o.id.toLowerCase())) || orders[0];
      if (searchedOrder) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-r-${Date.now()}`,
            sender: 'bot',
            text: isBn
              ? `📦 অর্ডার #${searchedOrder.id} এর বর্তমান লাইভ স্ট্যাটাস:\n• বর্তমান অবস্থা: ${
                  searchedOrder.status === 'delivered' ? '✅ গ্রাহকের কাছে ডেলিভার্ড' :
                  searchedOrder.status === 'dispatched' ? '🚚 কুরিয়ারে হস্তান্তর সম্পন্ন (পথে আছে)' :
                  searchedOrder.status === 'processing' ? '📦 আড়তে প্যাকিং সম্পন্ন' : '⏳ নতুন অর্ডার প্রস্তুত হচ্ছে'
                }\n• কুরিয়ার: ${searchedOrder.courierName || 'Steadfast Courier'} (ট্র্যাকিং: ${searchedOrder.trackingNumber || 'SF-BD-99412'})\n• মোট মূল্য: ৳${searchedOrder.total} (${searchedOrder.paymentMethod.toUpperCase()})\n• আনুমানিক পৌঁছানোর সময়: ${searchedOrder.estimatedDelivery}`
              : `📦 Order #${searchedOrder.id} Status:\n• Current Status: ${searchedOrder.status.toUpperCase()}\n• Courier: ${searchedOrder.courierName || 'Steadfast Courier'} (${searchedOrder.trackingNumber || 'SF-BD-99412'})\n• Total: ৳${searchedOrder.total}\n• Delivery: ${searchedOrder.estimatedDelivery}`,
            time,
            actionType: 'order_status',
            orderRefId: searchedOrder.id,
            suggestions: isBn ? ['ক্যাশ মেমো / ইনভয়েস দেখুন', 'নতুন শুটকি অর্ডার দিন'] : ['View Cash Memo', 'Order Dry Fish'],
          },
        ]);
        return;
      }
    }

    // Direct Chat Order Query
    if (q.includes('অর্ডার') || q.includes('order') || q.includes('কিনতে চাই') || q.includes('ক্রয়') || q.includes('ফর্ম')) {
      setInChatStep('customer_info');
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? 'চমৎকার! আপনি কোনো প্রকার ঝামেলা ছাড়াই সরাসরি চ্যাটে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারেন। নিচের ফর্মে মাছ, ওজন ও আপনার ডেলিভারি ঠিকানা পূরণ করে সাবমিট করুন:'
            : 'Great! You can place an instant Cash-on-Delivery order directly inside this chat. Choose your fish, weight, and enter delivery details below:',
          time,
          actionType: 'order_form',
        },
      ]);
      return;
    }

    // Spicy Bhuna Recipe & Recommendations
    if (q.includes('ভুনা') || q.includes('ঝাল') || q.includes('bhuna') || q.includes('spicy') || q.includes('লইট্টা') || q.includes('loitta')) {
      const loitta = products.find((p) => p.id === 'p-1') || products[0];
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '🌶️ ঝাল ভুনার জন্য কক্সবাজার নাজিরারটেকের "লইট্টা শুটকি" সবচেয়ে জনপ্রিয়! প্রচুর রসুন কোয়া, পেঁয়াজ কুচি ও শুকনো মরিচ দিয়ে কড়া করে ভুনা করলে এক থালা গরম ভাত এক নিমিষেই শেষ হয়ে যায়। এছাড়া সোনাদিয়ার ছুরি শুটকিও দারুণ ভুনার জন্য।'
            : '🌶️ For spicy bhuna, Cox\'s Bazar Nazirtek "Loitta Shutki" is unbeatable! Cook with ample garlic cloves, sliced onions, and roasted dry chilies.',
          time,
          actionType: 'product',
          productRef: loitta,
          suggestions: isBn ? ['লইট্টা শুটকি কার্টে যোগ করুন', 'শুটকি ভর্তার রেসিপি', 'চ্যাটে সরাসরি অর্ডার দিন'] : ['Add Loitta to Cart', 'Vorta Recipe', 'Order in Chat'],
        },
      ]);
      return;
    }

    // Rupchanda / Premium Fish
    if (q.includes('রূপচাঁদা') || q.includes('rupchanda') || q.includes('সেন্টমার্টিন') || q.includes('ইলিশ')) {
      const rupchanda = products.find((p) => p.id === 'p-3') || products[0];
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '👑 সেন্টমার্টিনের প্রিমিয়াম আস্ত রূপচাঁদা শুটকি হলো অভিজাত পছন্দের সেরা নিদর্শন। এটি সম্পূর্ণ প্রাকৃতিক সামুদ্রিক বাতাসে শুকানো, কোনো লবণ বা প্রিজারভেটিভ নেই। এটি ফ্রাই বা হালকা কারি দুভাবেই দারুণ সুস্বাদু।'
            : '👑 Saint Martin Island Premium Whole Rupchanda is our flagship royal delicacy. 100% salt-free solar dried in pure sea breeze.',
          time,
          actionType: 'product',
          productRef: rupchanda,
          suggestions: isBn ? ['রূপচাঁদা কার্টে যোগ করুন', 'লবণমুক্ত শুটকি কী কী আছে?', 'চ্যাটে অর্ডার দিন'] : ['Add Rupchanda to Cart', 'Show Salt-Free'],
        },
      ]);
      return;
    }

    // Vorta (ভর্তা) Recipe
    if (q.includes('ভর্তা') || q.includes('vorta') || q.includes('মলা') || q.includes('কাঁচকি') || q.includes('চিংড়ি')) {
      const churi = products.find((p) => p.id === 'p-2') || products[0];
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '🥣 ঐতিহ্যবাহী শুটকি ভর্তা তৈরির টিপস:\n১. শুটকি প্রথমে হালকা গরম পানিতে ১০ মিনিট ভিজিয়ে রাখুন এবং ভালো করে ধুয়ে নিন।\n২. কড়াইয়ে সামান্য সরিষার তেলে রসুন, কাঁচা/শুকনো মরিচ ও শুটকি ভেজে নিন।\n৩. পাটায় বা ব্লেন্ডারে পিষে কাঁচা সরিষার তেল ও পেঁয়াজ মিশিয়ে পরিবেশন করুন। সোনাদিয়ার ছুরি বা চিংড়ি শুটকি দিয়ে এই ভর্তা অমৃত!'
            : '🥣 Authentic Shutki Vorta Tips:\n1. Soak in warm water for 10 mins and rinse.\n2. Lightly saute in pure mustard oil with whole garlic & red chilies.\n3. Mash on a sil-pata or grinder with raw onions & mustard oil.',
          time,
          actionType: 'product',
          productRef: churi,
          suggestions: isBn ? ['ছুরি শুটকি কার্টে যোগ করুন', 'বিষমুক্ত শুটকির প্রমাণ কী?', 'চ্যাটে অর্ডার দিন'] : ['Add Churi', 'Chemical-Free Proof'],
        },
      ]);
      return;
    }

    // Chemical-Free & Lab Test
    if (q.includes('লবণ ছাড়া') || q.includes('গন্ধ') || q.includes('বিষমুক্ত') || q.includes('chemical') || q.includes('salt') || q.includes('lab') || q.includes('ল্যাব')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '🔬 আমাদের প্রতিশ্রুতি: শুটকি বাজারের সমস্ত শুটকি ১০০% ডিডিটি, কীটনাশক ও রাসায়নিক মুক্ত। এগুলো বিসিএসআইআর (BCSIR) ও বিএসটিআই ল্যাব কর্তৃক পরীক্ষিত। তাছাড়া আমাদের আধুনিক ৩-স্তর ফুড-গ্রেড ভ্যাকুয়াম সিলিংয়ের কারণে ফ্রিজে বা ঘরে রাখলে বিন্দুমাত্র দুর্গন্ধ ছড়ায় না।'
            : '🔬 100% Chemical-free & BCSIR Lab tested. Our 3-layer food-grade vacuum heat-sealed packaging guarantees 0% odor leakage in your refrigerator.',
          time,
          suggestions: isBn ? ['ল্যাব টেস্ট রিপোর্ট দেখুন', 'চ্যাটে সরাসরি অর্ডার দিন', 'জনপ্রিয় শুটকি দেখান'] : ['Lab Certificate', 'Order via Chat', 'Bestsellers'],
        },
      ]);
      return;
    }

    // Delivery Fee & Duration
    if (q.includes('ডেলিভারি') || q.includes('চার্জ') || q.includes('কুরিয়ার') || q.includes('delivery') || q.includes('time') || q.includes('fee')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-r-${Date.now()}`,
          sender: 'bot',
          text: isBn
            ? '🚚 ডেলিভারি সংক্রান্ত তথ্য:\n• ঢাকা সিটির ভেতরে: ডেলিভারি চার্জ মাত্র ৬০ টাকা (২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি)।\n• ঢাকার বাইরে সমগ্র বাংলাদেশে: ডেলিভারি চার্জ ১২০ টাকা (২ থেকে ৩ কর্মদিবসের মধ্যে স্টিডফাস্ট কুরিয়ারে ক্যাশ অন ডেলিভারি)।\n• প্যাকেজিং: ১০০% লিক-প্রুফ ভ্যাকুয়াম ব্যাগ ও কার্টন।'
            : '🚚 Delivery Policy:\n• Inside Dhaka: ৳60 delivery charge (within 24-48 hours).\n• Outside Dhaka (All Districts): ৳120 delivery charge (within 2-3 business days via Steadfast Courier with COD).',
          time,
          suggestions: isBn ? ['চ্যাটে অর্ডার দিন', 'ফোনে কথা বলুন', 'লইট্টা শুটকি দেখান'] : ['Order in Chat', 'Call Hotline', 'Show Loitta'],
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
          ? `আপনার বার্তার জন্য ধন্যবাদ! শুটকি বাজারের সমস্ত মাছ কক্সবাজার, নাজিরারটেক, দুবলার চর ও হাওরের প্রান্তিক জেলেদের কাছ থেকে সরাসরি সংগৃহীত। আপনি কি নির্দিষ্ট কোনো শুটকি খুঁজছেন, রান্নার রেসিপি জানতে চান, নাকি সরাসরি অর্ডার করতে চান?`
          : `Thank you for your message! All dried fish at Shutki Bazar are 100% chemical-free and sourced directly from artisanal coastal fishermen. How may I assist your order today?`,
        time,
        suggestions: isBn ? ['ঝাল ভুনার সেরা শুটকি', 'চ্যাটে সরাসরি অর্ডার দিন', 'আমার অর্ডার ট্র্যাক করুন', 'ফোনে কল দিন'] : ['Best fish for Bhuna', 'Order in Chat', 'Track Order'],
      },
    ]);
  };

  const handleInChatOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatOrderName || !chatOrderPhone || !chatOrderAddress) return;

    const matchedWeight = selectedProductForOrder.availableWeights.find((w) => w.weight === selectedWeightGrams) || selectedProductForOrder.availableWeights[1] || { weight: 250, price: 330 };
    const deliveryFee = chatOrderDistrict === 'Dhaka' ? 60 : 120;
    const itemTotal = matchedWeight.price;

    const order = placeOrder({
      customerName: chatOrderName,
      customerPhone: chatOrderPhone,
      district: chatOrderDistrict,
      fullAddress: chatOrderAddress,
      items: [
        {
          product: selectedProductForOrder,
          selectedWeight: matchedWeight.weight,
          quantity: 1,
          price: matchedWeight.price,
        },
      ],
      subtotal: itemTotal,
      deliveryFee,
      discount: 0,
      total: itemTotal + deliveryFee,
      paymentMethod: 'cod',
    });

    setInChatStep(null);
    playChime();

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-r-${Date.now()}`,
        sender: 'bot',
        text: isBn
          ? `🎉 অভিনন্দন ${chatOrderName}! আপনার অর্ডার #${order.id} সফলভাবে সম্পন্ন হয়েছে।\n• পণ্য: ${selectedProductForOrder.nameBn} (${matchedWeight.weight}g)\n• পরিশোধযোগ্য (ক্যাশ অন ডেলিভারি): ৳${order.total}\n• ডেলিভারি ঠিকানা: ${chatOrderAddress}\n• ট্র্যাকিং নম্বর: ${order.trackingNumber || 'SF-BD-NEW'}\n\nআমাদের ডেলিভারি প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।`
          : `🎉 Congratulations ${chatOrderName}! Your order #${order.id} has been placed.\n• Item: ${selectedProductForOrder.name} (${matchedWeight.weight}g)\n• Payable (COD): ৳${order.total}\n• Delivery Address: ${chatOrderAddress}`,
        time: 'Just now',
        actionType: 'order_success',
        orderRefId: order.id,
        suggestions: isBn ? ['ক্যাশ মেমো / ইনভয়েস প্রিন্ট করুন', 'আরও শুটকি খুঁজুন'] : ['Print Cash Memo', 'Browse More'],
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
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900 animate-pulse" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wide leading-none flex items-center gap-1">
              <span>{isBn ? 'শুটকি রিয়েল-টাইম সহকারী' : 'Shutki Assistant'}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-amber-200">
              {isBn ? 'চ্যাটে সরাসরি অর্ডার ও ট্র্যাকিং' : 'Real-time Chat & Order'}
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Real-Time Chatbot Modal Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px] max-h-[88vh] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md border border-amber-400/40">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm leading-none flex items-center gap-1.5">
                  <span>{isBn ? 'শুটকি বাজার এআই সহকারী' : 'Shutki Bazar Assistant'}</span>
                  <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-mono border border-amber-400/30">
                    LIVE
                  </span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isBn ? 'সক্রিয় • চ্যাটে সরাসরি অর্ডার ও পরামর্শ' : 'Active 24/7 for instant support'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 text-amber-200 hover:text-white rounded-lg transition-colors"
                title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Call Hotline */}
              <button
                onClick={onOpenPhoneOrder}
                className="p-1.5 text-amber-200 hover:text-white rounded-lg transition-colors"
                title={isBn ? 'সরাসরি ফোনে কথা বলুন' : 'Call'}
              >
                <Phone className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
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
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs whitespace-pre-line ${
                      isUser
                        ? 'bg-amber-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>

                  {/* Optional Embedded Product Card */}
                  {m.actionType === 'product' && m.productRef && (
                    <div className="mt-2 p-2.5 bg-white rounded-2xl border border-amber-300 shadow-sm w-full max-w-[88%] flex items-center gap-3">
                      <img
                        src={m.productRef.image}
                        alt={m.productRef.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{m.productRef.nameBn}</div>
                        <div className="text-[10px] text-slate-500">{m.productRef.originBn}</div>
                        <div className="text-xs text-amber-700 font-black">৳{m.productRef.availableWeights[1]?.price || 330} (২৫০ গ্রাম)</div>
                      </div>
                      <button
                        onClick={() => {
                          if (m.productRef) {
                            addToCart(m.productRef, 250, 1);
                            playChime();
                          }
                        }}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] shadow-xs active:scale-95 transition-all shrink-0"
                      >
                        {isBn ? '+ কার্টে নিন' : 'Add'}
                      </button>
                    </div>
                  )}

                  {/* In-Chat Order Status or Cash Memo trigger */}
                  {(m.actionType === 'order_status' || m.actionType === 'order_success') && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const target = orders.find((o) => o.id === m.orderRefId) || orders[0];
                          if (target) setSelectedOrderForInvoice(target);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isBn ? 'অফিসিয়াল ক্যাশ মেমো / ইনভয়েস দেখুন' : 'View Cash Memo'}</span>
                      </button>
                    </div>
                  )}

                  {/* Optional In-Chat Quick Express Order Form */}
                  {m.actionType === 'order_form' && inChatStep === 'customer_info' && (
                    <form
                      onSubmit={handleInChatOrderSubmit}
                      className="mt-2 p-3.5 bg-white rounded-2xl border border-amber-300 shadow-md w-full max-w-[92%] space-y-2.5 animate-in zoom-in-95"
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                        <span className="font-extrabold text-slate-900 text-[11px] flex items-center gap-1 text-amber-800">
                          <PackageCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isBn ? 'চ্যাটে দ্রুত ক্যাশ অন ডেলিভারি ফর্ম:' : 'Express COD Form:'}</span>
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold">পণ্য হাতে পেয়ে টাকা</span>
                      </div>

                      {/* Select Product */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-700 block mb-0.5">
                          {isBn ? 'শুটকি মাছ নির্বাচন করুন:' : 'Select Fish:'}
                        </label>
                        <select
                          value={selectedProductForOrder.id}
                          onChange={(e) => {
                            const found = products.find((p) => p.id === e.target.value);
                            if (found) setSelectedProductForOrder(found);
                          }}
                          className="w-full p-2 border border-slate-300 rounded-xl text-xs bg-slate-50 font-medium"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nameBn} - {p.originBn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Weight Selector */}
                      <div className="grid grid-cols-3 gap-1">
                        {[100, 250, 500].map((w) => {
                          const price = selectedProductForOrder.availableWeights?.find((item) => item.weight === w)?.price || (w === 100 ? 150 : w === 250 ? 330 : 640);
                          return (
                            <button
                              type="button"
                              key={w}
                              onClick={() => setSelectedWeightGrams(w)}
                              className={`py-1.5 px-1 rounded-lg text-center text-[10px] font-bold border transition-all ${
                                selectedWeightGrams === w
                                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <div>{w} গ্রাম</div>
                              <div className={selectedWeightGrams === w ? 'text-amber-100' : 'text-slate-500'}>৳{price}</div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Name & Phone */}
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder={isBn ? 'আপনার নাম *' : 'Name *'}
                          value={chatOrderName}
                          onChange={(e) => setChatOrderName(e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                        />
                        <input
                          type="tel"
                          required
                          placeholder={isBn ? 'মোবাইল (০১৭XXXXXXXX) *' : 'Phone *'}
                          value={chatOrderPhone}
                          onChange={(e) => setChatOrderPhone(e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                        />
                      </div>

                      {/* District & Address */}
                      <div className="space-y-1.5">
                        <select
                          value={chatOrderDistrict}
                          onChange={(e) => setChatOrderDistrict(e.target.value)}
                          className="w-full p-1.5 border border-slate-300 rounded-xl text-xs bg-white"
                        >
                          <option value="Dhaka">ঢাকা সিটি (ডেলিভারি চার্জ ৳৬০)</option>
                          <option value="Chittagong">চট্টগ্রাম (ডেলিভারি চার্জ ৳১২০)</option>
                          <option value="Sylhet">সিলেট (ডেলিভারি চার্জ ৳১২০)</option>
                          <option value="Rajshahi">রাজশাহী (ডেলিভারি চার্জ ৳১২০)</option>
                          <option value="Other">অন্যান্য জেলা (ডেলিভারি চার্জ ৳১২০)</option>
                        </select>

                        <textarea
                          rows={2}
                          required
                          placeholder={isBn ? 'পূর্ণ ঠিকানা (বাসা/রোড, এলাকা, থানা)' : 'Full Delivery Address'}
                          value={chatOrderAddress}
                          onChange={(e) => setChatOrderAddress(e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black rounded-xl text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isBn ? 'অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)' : 'Place COD Order Now'}</span>
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
                            } else if (s.includes('ইনভয়েস') || s.includes('মেমো')) {
                              const target = orders.find((o) => o.id === m.orderRefId) || orders[0];
                              if (target) setSelectedOrderForInvoice(target);
                            } else {
                              handleSend(s);
                            }
                          }}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-full border border-amber-300 text-[10px] font-bold transition-all active:scale-95"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Real-time Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit shadow-2xs animate-pulse">
                <Bot className="w-4 h-4 text-amber-600 animate-spin" />
                <span className="text-[11px] font-semibold text-slate-700">
                  {isBn ? 'শুটকি সহকারী চিন্তা করছে ও লিখছে...' : 'Shutki Assistant is typing...'}
                </span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={isBn ? 'শুটকি সম্পর্কে জানতে বা অর্ডার করতে লিখুন...' : 'Ask question, track #SB.. or order...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl font-bold transition-colors shadow-xs active:scale-95"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
