import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Gift, Check, Tag } from 'lucide-react';
import { BundleItem, Language, Product } from '../types';
import { BUNDLES, PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface BundlesSectionProps {
  lang: Language;
  onAddBundle: (bundle: BundleItem, isGiftWrap: boolean) => void;
}

export const BundlesSection: React.FC<BundlesSectionProps> = ({
  lang,
  onAddBundle,
}) => {
  const t = TRANSLATIONS[lang];
  const [giftWrapStates, setGiftWrapStates] = useState<Record<string, boolean>>({});
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const toggleGiftWrap = (bundleId: string) => {
    setGiftWrapStates((prev) => ({
      ...prev,
      [bundleId]: !prev[bundleId],
    }));
  };

  const handleAddBundle = (bundle: BundleItem) => {
    const isGift = !!giftWrapStates[bundle.id];
    onAddBundle(bundle, isGift);
    setAddedBundleId(bundle.id);
    setTimeout(() => setAddedBundleId(null), 2500);
  };

  return (
    <section id="bundles" className="py-16 sm:py-24 bg-white border-t border-[#3B4B59]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F497A9]/20 text-[#3B4B59] text-xs sm:text-sm font-black mb-3">
            <Tag className="w-4 h-4 text-[#F26B4E]" />
            <span>{lang === 'ar' ? 'وفّري أكثر مع كل باقة' : 'Bundle & Save More'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B4B59]">
            {t.bundlesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3B4B59]/80 font-medium">
            {t.bundlesSubtitle}
          </p>
        </div>

        {/* 3 Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BUNDLES.map((bundle) => {
            const bundledProducts = bundle.productIds
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter(Boolean) as Product[];

            const hasGiftWrap = !!giftWrapStates[bundle.id];
            const isAdded = addedBundleId === bundle.id;

            return (
              <div
                key={bundle.id}
                className="bg-[#FBF8F4] rounded-3xl p-5 sm:p-6 border-2 border-[#3B4B59]/10 hover:border-[#20969B] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#20969B] text-white text-xs font-black">
                      {bundle.badge[lang]}
                    </span>
                    <span className="text-xs font-bold text-[#F26B4E] bg-[#F26B4E]/10 px-2.5 py-1 rounded-lg">
                      {bundle.tagline[lang]}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#3B4B59]">
                    {bundle.title[lang]}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#3B4B59]/75 font-medium leading-relaxed">
                    {bundle.desc[lang]}
                  </p>

                  {/* Dual Images Side by Side */}
                  <div className="mt-5 grid grid-cols-2 gap-3 relative">
                    {bundledProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-xs border border-[#3B4B59]/10"
                      >
                        <img
                          src={p.image}
                          alt={p.name[lang]}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                          decoding="async"
                          width="240"
                          height="300"
                        />
                        <span className="absolute bottom-2 start-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 text-[#3B4B59] shadow-xs">
                          {p.ageLabel[lang]}
                        </span>
                      </div>
                    ))}
                    {/* Plus Icon Divider in middle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-black text-[#F26B4E] border border-[#3B4B59]/15">
                      +
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-white border border-[#3B4B59]/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#3B4B59]/60 line-through block">
                        {bundle.originalPrice} {t.currency}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#3B4B59]">
                          {bundle.discountedPrice}
                        </span>
                        <span className="text-xs font-bold text-[#3B4B59]/70">
                          {t.currency}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-[#F9A620]/15 text-[#F9A620] text-xs font-black">
                      {lang === 'ar' ? 'وفرتِ 10%' : '10% OFF'}
                    </span>
                  </div>

                  {/* Gift Wrap checkbox */}
                  <label className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#3B4B59]/10 cursor-pointer text-xs font-bold text-[#3B4B59] hover:border-[#F497A9] transition-colors">
                    <input
                      type="checkbox"
                      checked={hasGiftWrap}
                      onChange={() => toggleGiftWrap(bundle.id)}
                      className="w-4 h-4 rounded text-[#F26B4E] focus:ring-[#F26B4E]"
                    />
                    <Gift className="w-3.5 h-3.5 text-[#F497A9]" />
                    <span>{t.giftWrapOption}</span>
                  </label>
                </div>

                {/* Add Bundle Button */}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => handleAddBundle(bundle)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'تمت إضافة الباقة للسلة ✓' : 'Bundle Added ✓'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t.addBundleToCart}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
