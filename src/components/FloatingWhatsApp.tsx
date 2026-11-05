import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً خدمة عملاء JodiMini! أود الاستفسار عن تفاصيل مقاسات ملابس الأطفال وتطريز الاسم.'
      : 'Hello JodiMini support! I would like to inquire about children clothing sizes and custom embroidery.'
  )}`;

  return (
    <aside aria-label="Customer Support" className="fixed bottom-4 sm:bottom-6 start-3 sm:start-6 z-40 flex items-center gap-2.5">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#3B4B59] text-white text-xs font-bold shadow-lg animate-in fade-in duration-200">
          {t.whatsappTooltip}
        </div>
      )}

      {/* Floating Link Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 relative group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Contact JodiMini on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-[#25D366]" />

        {/* Outer gentle ripple ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
      </a>
    </aside>
  );
};
