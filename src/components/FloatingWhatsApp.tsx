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

  // Demo WhatsApp click
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? 'مرحباً خدمة عملاء JodiMini! أود الاستفسار عن تفاصيل مقاسات ملابس الأطفال وتطريز الاسم.'
        : 'Hello JodiMini support! I would like to inquire about children clothing sizes and custom embroidery.'
    );
    window.open(`https://wa.me/966500000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 start-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#3B4B59] text-white text-xs font-bold shadow-lg animate-in fade-in duration-200">
          {t.whatsappTooltip}
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 relative group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contact JodiMini on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />

        {/* Outer gentle ripple ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
      </button>
    </div>
  );
};
