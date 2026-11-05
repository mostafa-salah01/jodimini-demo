import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export const HeroChildGreeting: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Trigger entrance when user scrolls near this section
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasEntered(true);
              setShowSparkles(true);
              setTimeout(() => setShowSparkles(false), 2400);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      setHasEntered(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-end justify-center select-none"
    >
      {/* Decorative entrance celebration sparkles */}
      {showSparkles && (
        <div className="absolute -top-6 inset-x-0 flex justify-between pointer-events-none animate-in fade-in zoom-in duration-500">
          <Sparkles className="w-6 h-6 text-[#F9A620] animate-bounce" />
          <Sparkles className="w-5 h-5 text-[#F26B4E] animate-ping" />
          <Sparkles className="w-6 h-6 text-[#20969B] animate-pulse" />
        </div>
      )}

      {/* Dramatic Surprise Entrance from Side & Continuous Wave */}
      <div
        className={`transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
          hasEntered
            ? 'opacity-100 translate-x-0 scale-100 rotate-0'
            : 'opacity-0 translate-x-16 sm:translate-x-24 scale-75 rotate-6'
        }`}
      >
        <div className="relative animate-hand-wave">
          <img
            src="./images/real-child-waving.png"
            alt="طفلة جودي ميني ترحب بالزائر بحركة أنيميشن"
            className="w-32 h-44 sm:w-40 sm:h-56 md:w-48 md:h-64 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
            width="192"
            height="256"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
