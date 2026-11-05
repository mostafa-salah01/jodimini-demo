import React, { useState, useEffect, useRef } from 'react';

export const HeroChildGreeting: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasEntered(true);
            }
          });
        },
        { threshold: 0.05 }
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
      className={`relative inline-flex items-end justify-center select-none transition-all duration-700 ease-out transform ${
        hasEntered
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95'
      }`}
    >
      {/* Real Child Waving Cutout (Continuous cute waving in place, zero text messages, scrolls naturally with the page) */}
      <div className="relative animate-hand-wave">
        <img
          src="./images/real-child-waving.png"
          alt="طفلة جودي ميني ترحب بالزائر بحركة أنيميشن"
          className="w-24 h-32 sm:w-28 sm:h-38 md:w-32 md:h-44 object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] hover:scale-105 transition-transform"
          width="128"
          height="176"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};
