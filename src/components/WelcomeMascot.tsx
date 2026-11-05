import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Gift, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface WelcomeMascotProps {
  lang: Language;
  onOpenShop: () => void;
}

export const WelcomeMascot: React.FC<WelcomeMascotProps> = ({ lang, onOpenShop }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showGiftCode, setShowGiftCode] = useState(false);

  useEffect(() => {
    // Pop up on surprise after 1.8 seconds of loading
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-40 transition-all duration-500 ease-out ${
        isMinimized
          ? 'bottom-24 start-4 sm:start-8'
          : 'bottom-20 sm:bottom-24 start-2 sm:start-6'
      }`}
    >
      {isMinimized ? (
        /* Minimized floating mascot avatar button */
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="group relative flex items-center gap-2 p-2 rounded-full bg-white shadow-2xl border-2 border-[#20969B] hover:border-[#F26B4E] transition-all transform hover:scale-110 active:scale-95"
          title={lang === 'ar' ? 'تحدث مع جودي ميني' : 'Talk with Jodi'}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#FBF8F4] border border-[#20969B]/30 flex items-center justify-center">
            <img
              src="./images/mascot.png"
              alt="JodiMini Mascot"
              className="w-full h-full object-cover object-top"
              width="48"
              height="48"
            />
          </div>
          <span className="w-3 h-3 rounded-full bg-[#20969B] absolute -top-1 -right-1 border-2 border-white animate-ping" />
        </button>
      ) : (
        /* Peeking Animated Mascot Character */
        <div className="relative flex flex-col items-start animate-in slide-in-from-left duration-700">
          {/* Speech Bubble */}
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 shadow-2xl border-2 border-[#20969B]/30 max-w-[260px] sm:max-w-xs mb-2 transition-all">
            {/* Close / Minimize Button */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-[#3B4B59] text-white flex items-center justify-center hover:bg-[#F26B4E] shadow-sm transition-colors text-xs"
              aria-label="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="space-y-1.5 text-xs sm:text-sm text-[#3B4B59]">
              <div className="flex items-center gap-1.5 font-black text-[#20969B]">
                <Sparkles className="w-4 h-4 text-[#F9A620] animate-spin" />
                <span>
                  {lang === 'ar' ? 'أهلاً بكِ في JodiMini! ✨' : 'Welcome to JodiMini! ✨'}
                </span>
              </div>

              <p className="font-semibold leading-relaxed text-[#3B4B59]/90">
                {lang === 'ar'
                  ? 'نوّرتينا يا ماما! أنا جودي، جهّزنا لكِ أرقى أزياء أطفال مع ميزة تطريز اسم طفلك بحب.'
                  : 'Welcome, dear mom! I am Jodi, bringing you the sweetest outfits with custom name embroidery!'}
              </p>

              {/* Gift promo reward */}
              {showGiftCode ? (
                <div className="mt-2 p-2 rounded-xl bg-[#F9A620]/15 border border-dashed border-[#F9A620] text-center font-bold text-xs text-[#3B4B59] animate-in zoom-in-95">
                  <span>{lang === 'ar' ? 'هدية جودي لكِ: كود' : 'Jodi Gift Code:'} </span>
                  <strong className="text-[#F26B4E] font-mono text-sm">JODI10</strong>
                  <span className="block text-[10px] text-[#3B4B59]/70">
                    {lang === 'ar' ? 'خصم 10% إضافي عند الدفع' : 'Extra 10% OFF at checkout'}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowGiftCode(true)}
                  className="mt-1 text-[11px] font-extrabold text-[#F26B4E] hover:underline flex items-center gap-1"
                >
                  <Gift className="w-3.5 h-3.5 text-[#F26B4E]" />
                  <span>{lang === 'ar' ? 'اضغطي هنا للحصول على هدية الترحيب 🎁' : 'Click for your welcome gift 🎁'}</span>
                </button>
              )}
            </div>

            {/* Bubble Tail Pointing down toward mascot */}
            <div className="absolute -bottom-2 start-8 w-4 h-4 bg-white border-b-2 border-e-2 border-[#20969B]/30 transform rotate-45" />
          </div>

          {/* Peeking Mascot Toddler Figure */}
          <div
            onClick={() => setShowGiftCode(true)}
            className="cursor-pointer group relative transition-transform duration-300 hover:scale-105 active:scale-95 flex items-end"
          >
            <div className="relative w-24 h-28 sm:w-28 sm:h-36 overflow-hidden rounded-3xl bg-transparent filter drop-shadow-xl">
              <img
                src="./images/mascot.png"
                alt="طفل JodiMini يرحب بالزائر"
                className="w-full h-full object-contain transform origin-bottom hover:rotate-3 transition-transform duration-300"
                width="112"
                height="144"
              />
            </div>

            {/* Wave animation tag */}
            <span className="absolute -top-1 -end-1 text-xl animate-bounce">
              👋
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
