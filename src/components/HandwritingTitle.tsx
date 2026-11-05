import React, { useState, useEffect } from 'react';
import { PenTool } from 'lucide-react';

interface HandwritingTitleProps {
  text: string;
  className?: string;
  penColor?: string;
  speedMs?: number;
}

export const HandwritingTitle: React.FC<HandwritingTitleProps> = ({
  text,
  className = '',
  penColor = '#F26B4E',
  speedMs = 45,
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
      setDisplayedText(text);
      setIsWriting(false);
      return;
    }

    setDisplayedText('');
    setIsWriting(true);

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
      } else {
        clearInterval(interval);
        setTimeout(() => setIsWriting(false), 500);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span>{displayedText}</span>
      {/* Animated Pen Nib Follower */}
      {isWriting && (
        <span
          className="inline-block ms-1 -mb-1 animate-bounce"
          style={{ color: penColor }}
          title="قلم الكتابة الحي"
        >
          <PenTool className="w-5 h-5 sm:w-6 sm:h-6 inline-block transform -rotate-45 filter drop-shadow-sm transition-transform" />
        </span>
      )}
      {/* Hand-drawn ink underline */}
      <svg
        className="w-full h-3 sm:h-4 -mt-1 overflow-visible block"
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M2 9 C 45 3, 135 11, 198 4"
          stroke={penColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="220"
          strokeDashoffset={isWriting ? 220 - (displayedText.length / text.length) * 220 : 0}
          className="transition-all duration-150"
        />
      </svg>
    </span>
  );
};
