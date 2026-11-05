import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeroChildGreetingProps {
  lang: Language;
}

export const HeroChildGreeting: React.FC<HeroChildGreetingProps> = ({ lang }) => {
  // Whether the child greeting is currently in the active viewport zone
  const [isInZone, setIsInZone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (isDismissed) return;

      const productsEl = document.getElementById('products');
      if (!productsEl) return;

      const rect = productsEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger condition:
      // The user has scrolled down into the products area (shown in the screenshot):
      // - rect.top is within the viewport or just above (user has reached the products section)
      // - rect.bottom is still visible or not scrolled far below (user has not scrolled far past it)
      // Enter when the top of the products section is 70% down the screen, and stay until 200px after it ends
      const inProductsArea = rect.top < windowHeight * 0.75 && rect.bottom > 120;

      setIsInZone(inProductsArea);
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    // Check immediately on mount in case user lands on or refreshes near products
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsInZone(false);
  };

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Welcome Greeting"
      className={`fixed bottom-2 sm:bottom-5 left-2 sm:left-6 md:left-8 z-30 pointer-events-auto transition-all duration-700 ease-out transform ${
        isInZone
          ? 'translate-x-0 opacity-100 scale-100'
          : '-translate-x-[130%] opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center group">
        {/* Friendly speech bubble greeting */}
        <div className="mb-1.5 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-[#20969B]/25 text-[#3B4B59] text-[11px] sm:text-xs font-black flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-300 select-none">
          <span className="text-[#F26B4E] text-sm animate-bounce">👋</span>
          <span className="text-[#3B4B59]">
            {lang === 'ar' ? 'أهلاً بكِ في JodiMini! 💕' : 'Welcome to JodiMini! 💕'}
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            className="ms-1 p-0.5 rounded-full text-[#3B4B59]/40 hover:text-[#3B4B59] hover:bg-[#3B4B59]/10 transition-colors cursor-pointer"
            title={lang === 'ar' ? 'إغلاق' : 'Close'}
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Real Child Waving Cutout (Continuous playful waving animation) */}
        <div className="relative select-none animate-hand-wave cursor-pointer">
          <img
            src="./images/real-child-waving.png"
            alt="طفلة جودي ميني ترحب بالزائر بابتسامة"
            className="w-28 h-36 sm:w-36 sm:h-48 md:w-44 md:h-56 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95"
            width="176"
            height="224"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </aside>
  );
};

