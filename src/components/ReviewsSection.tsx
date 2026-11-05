import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { REVIEWS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FBF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F497A9]/20 text-[#3B4B59] text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-[#F26B4E] fill-[#F26B4E]" />
              <span>{lang === 'ar' ? 'ثقة الأمهات' : 'Mothers Trust'}</span>
            </span>
            {/* Required Demo Badge */}
            <span className="px-2.5 py-0.5 rounded-full bg-[#3B4B59]/10 text-[#3B4B59]/70 text-[11px] font-semibold border border-[#3B4B59]/15">
              {t.demoBadge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B4B59]">
            {t.reviewsTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3B4B59]/80 font-medium">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow border border-[#3B4B59]/10 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#F9A620] fill-[#F9A620]"
                    />
                  ))}
                </div>

                {/* Highlight Tag */}
                {rev.highlight && (
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#20969B]/10 text-[#20969B] text-xs font-extrabold mb-3">
                    ✓ {rev.highlight[lang]}
                  </div>
                )}

                {/* Comment Text */}
                <p className="text-sm sm:text-base text-[#3B4B59] font-medium leading-relaxed italic">
                  "{rev.comment[lang]}"
                </p>
              </div>

              {/* Author & City */}
              <div className="mt-6 pt-4 border-t border-[#3B4B59]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#3B4B59] text-sm">
                    {rev.author[lang]}
                  </h4>
                  <span className="text-xs text-[#3B4B59]/60 font-medium">
                    {rev.city[lang]}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#20969B] bg-[#20969B]/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'طلب مؤكد' : 'Verified'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
