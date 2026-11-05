import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface HeroChildGreetingProps {
  lang: Language;
}

export const HeroChildGreeting: React.FC<HeroChildGreetingProps> = ({ lang }) => {
  // State to control lifecycle: 'entering' -> 'waving' -> 'exiting' -> 'hidden'
  const [stage, setStage] = useState<'entering' | 'waving' | 'exiting' | 'hidden'>('entering');

  useEffect(() => {
    // 1. Enter and wave immediately on page load
    const waveTimer = setTimeout(() => {
      setStage('waving');
    }, 400);

    // 2. Wave for 3.5 seconds, then slide back out
    const exitTimer = setTimeout(() => {
      setStage('exiting');
    }, 3800);

    // 3. Completely hide/unmount after exit animation finishes
    const hideTimer = setTimeout(() => {
      setStage('hidden');
    }, 4600);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (stage === 'hidden') return null;

  // In Arabic RTL, text is on the right, so child appears from the left (opposite side)
  // In English LTR, text is on the left, so child appears from the right
  const isRTL = lang === 'ar';

  return (
    <div
      className={`absolute bottom-0 z-20 pointer-events-none transition-all duration-700 ease-out ${
        isRTL
          ? stage === 'exiting'
            ? '-translate-x-full opacity-0'
            : 'translate-x-0 start-4 sm:start-12'
          : stage === 'exiting'
            ? 'translate-x-full opacity-0'
            : 'translate-x-0 end-4 sm:end-12'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Real Child Waving Figure */}
        <div
          className={`relative w-36 h-48 sm:w-48 sm:h-64 md:w-56 md:h-72 select-none filter drop-shadow-2xl ${
            stage === 'waving' ? 'animate-hand-wave' : ''
          }`}
        >
          <img
            src="./images/real-child-waving.png"
            alt="طفل حقيقي يرحب بالزائر بيده"
            className="w-full h-full object-contain mix-blend-multiply filter contrast-105"
            width="224"
            height="288"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
