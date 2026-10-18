import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Fisherman } from '../types';
import { X, Send, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';

interface MerchantChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  fisherman?: Fisherman | null;
}

export const MerchantChatModal: React.FC<MerchantChatModalProps> = ({
  isOpen,
  onClose,
  fisherman,
}) => {
  const { language, chatMessages, sendChatMessage, fishermen } = useStore();
  const isBn = language === 'bn';

  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const currentFisher = fisherman || fishermen[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage, currentFisher.id);
    setInputMessage('');
  };

  const handleQuickQuestion = (q: string) => {
    sendChatMessage(q, currentFisher.id);
  };

  const quickQuestions = isBn
    ? [
        'শুটকি কি সম্পূর্ণ প্রাকৃতিক রোদে শুকানো?',
        'প্যাকেটে কি কোনো দুর্গন্ধ ছড়াবে?',
        'লবণ ছাড়া কোন কোন শুটকি আছে?',
        'ঢাকায় ডেলিভারি পেতে কতদিন লাগবে?',
      ]
    : [
        'Is the fish 100% solar dried without chemicals?',
        'Is the packaging completely odor-sealed?',
        'Which dried fish are 100% salt-free?',
        'How many days for delivery to Dhaka?',
      ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 flex flex-col h-[600px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-slate-900 to-amber-950 p-4 text-white flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentFisher.avatar}
                alt={currentFisher.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-none">
                  {isBn ? currentFisher.nameBn : currentFisher.name}
                </h3>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded font-semibold border border-amber-500/40">
                  {isBn ? 'জেলে প্রস্তুতকারক' : 'Artisan Fisher'}
                </span>
              </div>
              <div className="text-[11px] text-amber-200/90 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{isBn ? currentFisher.locationBn : currentFisher.location}</span>
                <span className="text-emerald-400">• {isBn ? 'সরাসরি লাইভ' : 'Online'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Bar */}
        <div className="bg-amber-50 px-4 py-2 text-[11px] text-amber-900 border-b border-amber-200/60 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            {isBn
              ? 'আপনি সরাসরি উপকূলীয় জেলের সাথে কথা বলছেন। শুটকির গুণগত মান সম্পর্কে যে কোনো প্রশ্ন করুন।'
              : 'Direct communication with coastal fisherman. Inquire about harvest freshness and custom cuts.'}
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                  {msg.senderName} • {msg.timestamp}
                </span>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-amber-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px]">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(q)}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-300 hover:border-amber-400 px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            placeholder={
              isBn
                ? 'জেলেকে সরাসরি মেসেজ লিখুন (যেমন: ভাই লবণ কেমন?)...'
                : 'Write a message to the fisherman...'
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl font-bold transition-colors flex items-center justify-center shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
