import React, { useState, useEffect, useRef } from 'react';
import { PenTool } from 'lucide-react';

interface HandwritingTitleProps {
  text: string;
  className?: string;
  penColor?: string;
  speedMs?: number;
  showUnderline?: boolean;
}

export const HandwritingTitle: React.FC<HandwritingTitleProps> = ({
  text,
  className = '',
  penColor = '#F26B4E',
  speedMs = 38,
  showUnderline = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Trigger writing once the title scrolls into the viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
              setHasStarted(true);
            }
          });
        },
        { threshold: 0.15 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    } else {
      setHasStarted(true);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    setIsWriting(true);
    setDisplayedText('');

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
      } else {
        clearInterval(interval);
        setTimeout(() => setIsWriting(false), 400);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [hasStarted, text, speedMs]);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span>{hasStarted ? displayedText : ''}</span>

      {/* Hand-writing Stylus Follower (hand/pen drawing the words) */}
      {isWriting && (
        <span
          className="inline-flex items-center ms-1.5 -mb-1 select-none animate-bounce"
          style={{ color: penColor }}
          aria-hidden="true"
        >
          <span className="text-base sm:text-xl transform -rotate-12 inline-block filter drop-shadow-md">
            ✍️
          </span>
          <PenTool className="w-4 h-4 sm:w-5 sm:h-5 transform -rotate-45 -ms-1 filter drop-shadow-xs" />
        </span>
      )}

      {/* Smooth Ink Underline that draws as the pen writes */}
      {showUnderline && hasStarted && (
        <svg
          className="w-full h-2.5 sm:h-3.5 -mt-0.5 overflow-visible block"
          viewBox="0 0 200 10"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M2 7 C 45 2, 135 9, 198 3"
            stroke={penColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={isWriting ? 220 - (displayedText.length / Math.max(1, text.length)) * 220 : 0}
            className="transition-all duration-100"
          />
        </svg>
      )}
    </span>
  );
};
