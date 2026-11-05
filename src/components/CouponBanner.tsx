import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Gift } from 'lucide-react';
import { Language } from '../types';

interface CouponBannerProps {
  lang: Language;
  onApplyCoupon: (code: string) => void;
  activeCoupon: string | null;
}

export const CouponBanner: React.FC<CouponBannerProps> = ({
  lang,
  onApplyCoupon,
  activeCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = [
    {
      code: 'JODI20',
      discount: '20%',
      titleAr: 'خصم 20% على إجمالي الطلب',
      titleEn: '20% OFF Entire Order',
      descAr: 'بمناسبة افتتاح فرع الويب والجمعة البيضاء',
      descEn: 'Grand web opening & White Friday celebration',
      color: '#F26B4E',
    },
    {
      code: 'FREE200',
      discount: 'شحن مجاني',
      titleAr: 'شحن مجاني لكافة مدن المملكة',
      titleEn: 'Free Express KSA Shipping',
      descAr: 'على جميع الطلبات بدون حد أدنى اليوم',
      descEn: 'On all orders with no minimum today',
      color: '#20969B',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF5F2] via-[#FFFDF7] to-[#F0FAF9] border-2 border-dashed border-[#F497A9] p-5 sm:p-7 shadow-sm">
        {/* Decorative corner icon */}
        <div className="absolute top-2 end-2 text-[#F9A620]/20 pointer-events-none">
          <Gift className="w-24 h-24" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Title */}
          <div className="flex items-center gap-3.5 text-start">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F26B4E] to-[#F497A9] flex items-center justify-center text-white shadow-md shrink-0">
              <Tag className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#F26B4E] uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'كوبونات الخصم الحصرية' : 'Exclusive Promo Codes'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#3B4B59]">
                {lang === 'ar'
                  ? 'انسخي الكود واحصلي على خصم فوري عند الشراء!'
                  : 'Copy your coupon for an instant discount at checkout!'}
              </h3>
            </div>
          </div>

          {/* Coupon Cards */}
          <div className="flex flex-wrap items-center gap-3">
            {coupons.map((c) => {
              const isApplied = activeCoupon === c.code;
              const isCopied = copiedCode === c.code;

              return (
                <div
                  key={c.code}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#3B4B59]/15 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col text-start">
                    <span className="text-[11px] font-bold text-[#3B4B59]/75">
                      {lang === 'ar' ? c.titleAr : c.titleEn}
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-sm sm:text-base font-black tracking-wider"
                      style={{ color: c.color }}
                    >
                      {c.code}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(c.code)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                      isApplied || isCopied
                        ? 'bg-[#20969B] text-white shadow-xs'
                        : 'bg-[#3B4B59]/10 text-[#3B4B59] hover:bg-[#F26B4E] hover:text-white'
                    }`}
                  >
                    {isCopied || isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'تم التطبيق!' : 'Applied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'نسخ الكود' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
