import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhiteFridaySectionProps {
  lang: Language;
}

export const WhiteFridaySection: React.FC<WhiteFridaySectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);

  // Target: White Friday, November 27, 2026
  const targetDate = new Date('2026-11-27T00:00:00+03:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WHITE25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToShop = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="white-friday" className="relative py-20 sm:py-28 overflow-hidden bg-[#3B4B59]">
      {/* Background Image with Parallax & Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/banner-whitefriday.webp"
          alt="عروض الجمعة البيضاء للأطفال"
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
          loading="lazy"
          decoding="async"
          width="1920"
          height="800"
        />
        {/* Center overlay gradient designed specifically so middle text pops */}
        <div className="absolute inset-0 bg-[#3B4B59]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#3B4B59]/40 to-[#3B4B59]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        {/* Festive Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F26B4E] text-white text-xs sm:text-sm font-extrabold shadow-lg mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-[#F9A620]" />
          <span>{lang === 'ar' ? 'أكبر مواسم التخفيضات 2026' : 'Biggest Sale of 2026'}</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight filter drop-shadow-md">
          {t.whiteFridayTitle}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-[#FBF8F4]/90 font-medium max-w-2xl mx-auto leading-relaxed">
          {t.whiteFridaySubtitle}
        </p>

        {/* Coupon Code Pill */}
        <div className="mt-6 inline-flex items-center gap-3 p-2 bg-white/15 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-lg">
          <div className="px-4 py-2 rounded-xl bg-white text-[#3B4B59] font-mono font-black text-lg sm:text-2xl tracking-widest border border-dashed border-[#F26B4E]">
            WHITE25
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-4 py-2.5 rounded-xl bg-[#20969B] hover:bg-[#20969B]/90 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.codeCopied : t.copyCode}</span>
          </button>
        </div>

        {/* Big Countdown Timer Cards */}
        <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-md">
            <span className="block text-2xl sm:text-4xl font-black text-[#F9A620] font-mono">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-white/80 font-bold">
              {t.days}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-md">
            <span className="block text-2xl sm:text-4xl font-black text-[#20969B] font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-white/80 font-bold">
              {t.hours}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-md">
            <span className="block text-2xl sm:text-4xl font-black text-[#F497A9] font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-white/80 font-bold">
              {t.minutes}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-md">
            <span className="block text-2xl sm:text-4xl font-black text-[#F26B4E] font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-white/80 font-bold">
              {t.seconds}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            type="button"
            onClick={handleScrollToShop}
            className="px-8 py-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-lg sm:text-xl shadow-xl hover:-translate-y-1 transition-all duration-200 inline-flex items-center gap-2 active:scale-95"
          >
            <span>{t.shopWhiteFriday}</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
