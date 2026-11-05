import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, Check, Heart } from 'lucide-react';
import { Language } from '../types';

interface WelcomeMascotProps {
  lang: Language;
  onOpenShop: () => void;
}

export const WelcomeMascot: React.FC<WelcomeMascotProps> = ({ lang, onOpenShop }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showGiftCode, setShowGiftCode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Pop up with a delightful surprise after 1.5 seconds of load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('JODI10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-40 transition-all duration-700 ease-out ${
        isMinimized
          ? 'bottom-24 start-4 sm:start-8'
          : 'bottom-4 sm:bottom-8 start-2 sm:start-6'
      }`}
    >
      {isMinimized ? (
        /* Minimized floating avatar button */
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="group relative flex items-center gap-2 p-1.5 rounded-full bg-white shadow-2xl border-2 border-[#20969B] hover:border-[#F26B4E] transition-all transform hover:scale-110 active:scale-95"
          title={lang === 'ar' ? 'ترحيب JodiMini' : 'JodiMini Greeting'}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#FBF8F4] flex items-center justify-center">
            <img
              src="./images/real-child-waving.png"
              alt="طفل JodiMini يرحب بالزائر"
              className="w-full h-full object-cover object-top mix-blend-multiply"
              width="48"
              height="48"
            />
          </div>
          <span className="w-3 h-3 rounded-full bg-[#F26B4E] absolute -top-1 -right-1 border-2 border-white animate-ping" />
        </button>
      ) : (
        /* Real Child Cutout Welcome Character */
        <div className="relative flex flex-col items-start animate-in slide-in-from-left duration-700">
          {/* Speech Bubble */}
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 shadow-2xl border-2 border-[#20969B]/30 max-w-[270px] sm:max-w-xs mb-1 transition-all">
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
                  {lang === 'ar' ? 'أهلاً بكِ في JodiMini! 👋✨' : 'Welcome to JodiMini! 👋✨'}
                </span>
              </div>

              <p className="font-semibold leading-relaxed text-[#3B4B59]/90">
                {lang === 'ar'
                  ? 'نوّرتينا يا ماما! جهّزنا لكِ أرقى أزياء أطفال وخامات قطنية باردة مع تطريز اسم طفلك بحب.'
                  : 'Welcome, dear mom! We prepared the sweetest childrenswear with bespoke name embroidery!'}
              </p>

              {/* Gift promo reward */}
              {showGiftCode ? (
                <div className="mt-2 p-2 rounded-xl bg-[#F9A620]/15 border border-dashed border-[#F9A620] text-center font-bold text-xs text-[#3B4B59] animate-in zoom-in-95 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span>{lang === 'ar' ? 'كود الهدية:' : 'Gift Code:'}</span>
                    <strong className="text-[#F26B4E] font-mono text-sm tracking-wider">JODI10</strong>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2 py-0.5 rounded-md bg-[#20969B] text-white text-[10px] hover:bg-[#20969B]/90"
                    >
                      {copied ? <Check className="w-3 h-3 inline" /> : 'نسخ'}
                    </button>
                  </div>
                  <span className="block text-[10px] text-[#3B4B59]/70">
                    {lang === 'ar' ? 'خصم 10% إضافي عند إتمام الطلب' : 'Extra 10% OFF at checkout'}
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

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 start-10 w-4 h-4 bg-white border-b-2 border-e-2 border-[#20969B]/30 transform rotate-45" />
          </div>

          {/* Real Child Cutout Figure (Seamlessly blended over background) */}
          <div
            onClick={() => setShowGiftCode(true)}
            className="cursor-pointer group relative transition-transform duration-300 hover:scale-105 active:scale-95 flex items-end select-none"
            title={lang === 'ar' ? 'اضغطي للتفاعل والحصول على هدية' : 'Click to interact and claim gift'}
          >
            <div className="relative w-28 h-36 sm:w-36 sm:h-48 overflow-visible">
              <img
                src="./images/real-child-waving.png"
                alt="طفل حقيقي يرحب بالزائر بيده"
                className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-md transform origin-bottom hover:rotate-2 transition-transform duration-300"
                width="144"
                height="192"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Waving Hand Emoji badge */}
            <span className="absolute -top-1 -end-1 text-2xl animate-bounce">
              👋
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
