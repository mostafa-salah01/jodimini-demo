import React from 'react';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface PaymentShippingMarqueeProps {
  lang: Language;
}

export const PaymentShippingMarquee: React.FC<PaymentShippingMarqueeProps> = ({ lang }) => {
  const items = [
    { label: 'Apple Pay', type: 'payment', badge: 'دفع فوري / Instant' },
    { label: 'مدى | Mada', type: 'payment', badge: 'بطاقة سعودية' },
    { label: 'STC Pay', type: 'payment', badge: 'محفظة رقمية' },
    { label: 'تابي | Tabby', type: 'payment', badge: 'قسّمي على 4' },
    { label: 'تمارا | Tamara', type: 'payment', badge: 'دفع بدون فوائد' },
    { label: 'سبل | SPL', type: 'shipping', badge: 'البريد السعودي' },
    { label: 'أرامكس | Aramex', type: 'shipping', badge: 'توصيل سريع' },
    { label: 'سمسا | SMSA', type: 'shipping', badge: 'تغطية شاملة' },
  ];

  // Duplicate list to create a seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="bg-[#3B4B59]/5 py-3.5 border-y border-[#3B4B59]/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 mb-2 flex items-center justify-between text-xs font-bold text-[#3B4B59]/75 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#20969B]" />
          <span>{lang === 'ar' ? 'وسائل دفع معتمدة وتوصيل لكافة مناطق المملكة' : 'Verified Payment & Express Shipping'}</span>
        </span>
        <span className="hidden sm:inline text-[11px] text-[#3B4B59]/60 font-normal">
          {lang === 'ar' ? 'مرري للتصفح (يتوقف عند اللمس)' : 'Scroll to browse (pauses on touch)'}
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient masks */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#FBF8F4] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[#FBF8F4] to-transparent z-10 pointer-events-none" />

        <div className={lang === 'ar' ? 'animate-marquee-rtl' : 'animate-marquee-ltr'}>
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 mx-3 px-4 py-2 bg-white rounded-xl shadow-xs border border-[#3B4B59]/10 text-xs sm:text-sm font-bold text-[#3B4B59] hover:border-[#20969B] transition-colors"
            >
              {item.type === 'payment' ? (
                <CreditCard className="w-3.5 h-3.5 text-[#20969B] shrink-0" />
              ) : (
                <Truck className="w-3.5 h-3.5 text-[#F26B4E] shrink-0" />
              )}
              <span className="font-extrabold">{item.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#3B4B59]/5 text-[#3B4B59]/80 font-medium">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
