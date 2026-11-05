import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface HeroChildGreetingProps {
  lang: Language;
}

export const HeroChildGreeting: React.FC<HeroChildGreetingProps> = () => {
  // Stages: 'entering' -> 'waving' -> 'exiting' -> 'hidden'
  const [stage, setStage] = useState<'entering' | 'waving' | 'exiting' | 'hidden'>('entering');
  const stageRef = useRef(stage);
  stageRef.current = stage;

  useEffect(() => {
    // 1. Slide in immediately on mount and start waving
    const enterTimer = setTimeout(() => {
      setStage('waving');
    }, 300);

    // 2. Stay for 30 seconds while user is looking, then smoothly exit
    const autoExitTimer = setTimeout(() => {
      if (stageRef.current === 'waving') {
        triggerExit();
      }
    }, 30000);

    // 3. Dismiss as soon as user starts scrolling down the page
    const handleScroll = () => {
      if (window.scrollY > 100 && stageRef.current === 'waving') {
        triggerExit();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoExitTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerExit = () => {
    setStage('exiting');
    setTimeout(() => {
      setStage('hidden');
    }, 800);
  };

  if (stage === 'hidden') return null;

  return (
    <div
      onClick={triggerExit}
      title="اضغط للإغلاق"
      className={`absolute bottom-0 left-2 sm:left-6 md:left-12 z-20 pointer-events-auto cursor-pointer transition-all duration-700 ease-out transform ${
        stage === 'entering'
          ? '-translate-x-[120%] opacity-0'
          : stage === 'exiting'
          ? '-translate-x-[120%] opacity-0'
          : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center group">
        {/* Real Child Live Waving Cutout (100% Transparent PNG, no background) */}
        <div
          className={`relative w-40 h-52 sm:w-52 sm:h-68 md:w-64 md:h-80 select-none ${
            stage === 'waving' ? 'animate-hand-wave' : ''
          }`}
        >
          <img
            src="./images/real-child-waving.png"
            alt="طفلة حقيقية ترحب بالزائر بابتسامة وبيدها"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105"
            width="256"
            height="320"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
