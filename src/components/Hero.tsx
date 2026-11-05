import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HandwritingTitle } from './HandwritingTitle';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroLettersRef = useRef<HTMLDivElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  // Check user preferences for mobile, motion and data saving
  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const saveData = nav.connection?.saveData === true;

    if (isMobile || prefersReducedMotion || saveData) {
      setShouldPlayVideo(false);
    } else {
      setShouldPlayVideo(true);
    }
  }, []);

  // Force play video on mount & ensure mobile playback compatibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlayVideo) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      video.play().catch(() => {
        // If browser blocks immediate autoplay, resume on first user interaction
        const resumeOnTouch = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchstart', resumeOnTouch);
          window.removeEventListener('click', resumeOnTouch);
        };
        window.addEventListener('touchstart', resumeOnTouch, { once: true, passive: true });
        window.addEventListener('click', resumeOnTouch, { once: true, passive: true });
      });
    };

    tryPlay();
  }, [shouldPlayVideo]);

  // GSAP bouncy letter-by-letter entrance for JodiMini - runs once on load
  useEffect(() => {
    if (!heroLettersRef.current) return;

    const letters = heroLettersRef.current.querySelectorAll('.hero-letter');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(letters, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      letters,
      {
        opacity: 0,
        y: -40,
        scale: 0.4,
        rotate: () => (Math.random() - 0.5) * 20,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(2.2)',
        delay: 0.2,
      }
    );
  }, []);

  // Letter styling with brand identity colors
  const letterColors = [
    '#20969B', // J
    '#F9A620', // o
    '#F497A9', // d
    '#F26B4E', // i
    '#20969B', // M
    '#3B4B59', // i
    '#F9A620', // n
    '#F497A9', // i
  ];

  const jodiMiniLetters = 'JodiMini'.split('');

  const handleScrollToShop = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#3B4B59]">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {shouldPlayVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="./images/hero-poster.webp"
            className="w-full h-full object-cover object-center scale-102"
            aria-hidden="true"
            onCanPlay={() => videoRef.current?.play().catch(() => {})}
            onError={() => setShouldPlayVideo(false)}
          >
            <source src="./videos/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="./images/hero-poster.webp"
            alt="أطفال يرتدون أزياء JodiMini"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
        )}

        {/* Very subtle bottom vignette for seamless section transition, video remains 100% natural and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 w-full">
        <div className={`max-w-xl lg:max-w-2xl bg-black/25 backdrop-blur-[3px] p-5 sm:p-8 rounded-3xl border border-white/20 shadow-2xl ${lang === 'ar' ? 'ms-0 me-auto md:me-0' : 'me-0 ms-auto md:ms-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#3B4B59] text-xs sm:text-sm font-black shadow-md mb-4 sm:mb-5 border border-white/50 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#F9A620]" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main Title with GSAP letter animation for JodiMini */}
          <div className="space-y-2 sm:space-y-3">
            <span className="block text-lg sm:text-2xl lg:text-3xl font-semibold text-[#FBF8F4]/95 drop-shadow-md">
              {t.heroTitlePrefix}
            </span>

            {/* Letter by letter bouncy hero name with LTR explicitly enforced */}
            <div
              ref={heroLettersRef}
              dir="ltr"
              className="inline-flex items-baseline text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] pb-1 sm:pb-2 select-none"
              aria-label="JodiMini"
            >
              {jodiMiniLetters.map((letter, idx) => (
                <span
                  key={idx}
                  className="hero-letter inline-block transform origin-bottom hover:scale-125 transition-transform duration-200 cursor-pointer"
                  style={{ color: letterColors[idx % letterColors.length] }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
              <HandwritingTitle
                text={lang === 'ar' ? 'بريق الطفولة، وأناقة تصنع ذكريات لا تُنسى ✨' : 'Joyful Childhood, Timeless Elegance ✨'}
                penColor="#F9A620"
                speedMs={40}
              />
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#FBF8F4]/90 font-medium leading-relaxed max-w-lg">
            {t.heroSubtitle}
          </p>

          {/* CTA & Trust highlight */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleScrollToShop}
              className="px-8 py-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-lg sm:text-xl shadow-lg hover:shadow-[#F26B4E]/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group active:scale-95"
            >
              <span>{t.heroCta}</span>
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </button>

            <a
              href="#embroidery"
              className="px-6 py-4 rounded-2xl bg-white/90 hover:bg-white text-[#3B4B59] font-bold text-base sm:text-lg shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#20969B] animate-ping" />
              <span>{t.navEmbroidery}</span>
            </a>
          </div>

          {/* Quick micro-perks */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/90 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-[#F9A620] font-bold">✓</span>
              <span>{lang === 'ar' ? 'قطن عضوي 100%' : '100% Organic Cotton'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#20969B] font-bold">✓</span>
              <span>{lang === 'ar' ? 'تطريز يدوي ملكي' : 'Royal Custom Embroidery'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F497A9] font-bold">✓</span>
              <span>{lang === 'ar' ? 'توصيل سريع لكافة المدن' : 'Fast KSA Express Shipping'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
