import React, { useState, useEffect } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TopBarProps {
  lang: Language;
}

export const TopBar: React.FC<TopBarProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

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

  return (
    <div className="bg-[#3B4B59] text-white text-xs md:text-sm py-2 px-3 relative z-50 border-b border-[#F497A9]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 md:gap-4 text-center">
        {/* Shipping notice */}
        <div className="flex items-center justify-center gap-1.5 font-medium text-[#FBF8F4]/95">
          <Sparkles className="w-3.5 h-3.5 text-[#F9A620] animate-pulse shrink-0" />
          <span>{t.topBarShipping}</span>
        </div>

        {/* White Friday countdown */}
        <div className="flex items-center justify-center gap-2 font-medium">
          <div className="flex items-center gap-1 text-[#F497A9]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">{t.topBarCountdown}</span>
          </div>
          <div className="inline-flex items-center gap-1 font-bold font-mono tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full text-white text-xs">
            <span className="text-[#F9A620]">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] text-white/70">{t.days}</span>
            <span className="text-white/40">:</span>
            <span className="text-[#20969B]">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] text-white/70">{t.hours}</span>
            <span className="text-white/40">:</span>
            <span className="text-[#F497A9]">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] text-white/70">{t.minutes}</span>
            <span className="text-white/40">:</span>
            <span className="text-[#F26B4E]">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] text-white/70">{t.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
