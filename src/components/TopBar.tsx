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
    <div className="bg-gradient-to-r from-[#FFF9F5] via-[#FFF1F4] to-[#F0FAF9] text-[#3B4B59] text-xs md:text-sm py-2 px-3 relative z-50 border-b border-[#F497A9]/30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 md:gap-4 text-center">
        {/* Shipping notice */}
        <div className="flex items-center justify-center gap-1.5 font-bold text-[#3B4B59]">
          <Sparkles className="w-4 h-4 text-[#F26B4E] animate-pulse shrink-0" />
          <span>{t.topBarShipping}</span>
        </div>

        {/* White Friday countdown */}
        <div className="flex items-center justify-center gap-2 font-bold">
          <div className="flex items-center gap-1 text-[#F26B4E]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline text-[#3B4B59]">{t.topBarCountdown}</span>
          </div>
          <div className="inline-flex items-center gap-1 font-extrabold font-mono tracking-wider bg-white px-2.5 py-0.5 rounded-full text-[#3B4B59] text-xs shadow-xs border border-[#F497A9]/40">
            <span className="text-[#F26B4E]">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#3B4B59]/70">{t.days}</span>
            <span className="text-[#3B4B59]/30">:</span>
            <span className="text-[#20969B]">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#3B4B59]/70">{t.hours}</span>
            <span className="text-[#3B4B59]/30">:</span>
            <span className="text-[#F9A620]">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#3B4B59]/70">{t.minutes}</span>
            <span className="text-[#3B4B59]/30">:</span>
            <span className="text-[#F497A9]">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#3B4B59]/70">{t.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
