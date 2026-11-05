import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Palette, Type, Check } from 'lucide-react';
import { Language, Product } from '../types';
import { EMBROIDERY_COLORS, EMBROIDERY_FONTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { HandwritingTitle } from './HandwritingTitle';

interface EmbroiderySectionProps {
  lang: Language;
  onAddCustomEmbroidery: (name: string, colorHex: string, fontName: string) => void;
}

export const EmbroiderySection: React.FC<EmbroiderySectionProps> = ({
  lang,
  onAddCustomEmbroidery,
}) => {
  const t = TRANSLATIONS[lang];

  const [childName, setChildName] = useState<string>('جود');
  const [selectedColor, setSelectedColor] = useState<string>(EMBROIDERY_COLORS[0].hex);
  const [selectedFont, setSelectedFont] = useState<string>(EMBROIDERY_FONTS[0].fontFamily);
  const [selectedFontId, setSelectedFontId] = useState<string>(EMBROIDERY_FONTS[0].id);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 12 characters
    const val = e.target.value.slice(0, 12);
    setChildName(val);
  };

  const handleAddToCart = () => {
    const finalName = childName.trim() || (lang === 'ar' ? 'جود' : 'Joodi');
    onAddCustomEmbroidery(finalName, selectedColor, selectedFont);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section id="embroidery" className="py-16 sm:py-24 bg-[#FBF8F4] relative overflow-hidden">
      {/* Background soft decorative shapes */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#F497A9]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-96 h-96 bg-[#20969B]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20969B]/10 text-[#20969B] text-xs sm:text-sm font-extrabold mb-3">
            <Sparkles className="w-4 h-4 text-[#F9A620]" />
            <span>{lang === 'ar' ? 'خدمة التطريز الملكية الخاصة' : 'Bespoke Custom Embroidery'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B4B59] leading-tight">
            <HandwritingTitle text={t.embroiderySectionTitle} penColor="#20969B" />
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3B4B59]/80 font-medium leading-relaxed">
            {t.embroiderySectionSubtitle}
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Live Preview on embroidery-base.webp (Left on RTL, Right on LTR) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              {/* Base Image */}
              <img
                src="./images/embroidery-base.webp"
                alt="قطعة ملابس أطفال لتخصيص التطريز"
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
                decoding="async"
                width="600"
                height="750"
              />

              {/* Realistic Chest Stitched Overlay */}
              {/* Positioned on the chest of the outfit without covering child face */}
              <div className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[85%] text-center pointer-events-none transition-all duration-300">
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/20 backdrop-blur-[1px] border border-white/30 transform -rotate-2 shadow-xs max-w-full">
                  {/* Stitched Thread Embroidery Text */}
                  <span
                    className="embroidery-text block text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide select-none truncate max-w-[240px] sm:max-w-xs"
                    style={{
                      color: selectedColor,
                      fontFamily: selectedFont,
                    }}
                  >
                    {childName.trim() || (lang === 'ar' ? 'اسم طفلك' : 'Child Name')}
                  </span>
                  {/* Subtle stitch indicator dots */}
                  <div className="flex items-center justify-center gap-1 mt-0.5 opacity-60">
                    <span className="w-1 h-1 rounded-full bg-current" style={{ color: selectedColor }} />
                    <span className="w-3 h-0.5 border-b border-dashed border-current" style={{ color: selectedColor }} />
                    <span className="w-1 h-1 rounded-full bg-current" style={{ color: selectedColor }} />
                  </div>
                </div>
              </div>

              {/* Badge indicating live preview */}
              <div className="absolute bottom-4 inset-x-4 bg-white/90 backdrop-blur-md py-2 px-3 rounded-xl border border-white/60 text-center shadow-xs">
                <p className="text-xs font-bold text-[#3B4B59]">
                  ✨ {t.embroideryLivePreview} - {t.embroideryHint}
                </p>
              </div>
            </div>
          </div>

          {/* Controls Panel (Right on RTL, Left on LTR) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#3B4B59]/10 space-y-6">
            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-[#3B4B59] flex items-center justify-between">
                <span>{t.childNameLabel}</span>
                <span className="text-xs text-[#20969B] font-mono">
                  {childName.length}/12
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={12}
                  value={childName}
                  onChange={handleNameChange}
                  placeholder={t.childNamePlaceholder}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FBF8F4] border-2 border-[#3B4B59]/15 text-[#3B4B59] font-bold text-base sm:text-lg focus:border-[#20969B] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Choose Thread Color */}
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#3B4B59] flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#F26B4E]" />
                <span>{t.chooseThreadColor}</span>
              </label>
              <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                {EMBROIDERY_COLORS.map((col) => {
                  const isPicked = selectedColor === col.hex;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColor(col.hex)}
                      className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all active:scale-95 ${
                        isPicked
                          ? 'border-[#3B4B59] bg-[#3B4B59]/5 shadow-sm'
                          : 'border-transparent hover:border-[#3B4B59]/20'
                      }`}
                      title={col.name[lang]}
                    >
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-105 border border-white"
                        style={{ backgroundColor: col.hex }}
                      >
                        {isPicked && <Check className="w-4 h-4 text-white stroke-[3]" />}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#3B4B59] text-center line-clamp-1">
                        {col.name[lang].split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Font Style */}
            <div className="space-y-3">
              <label className="text-sm font-extrabold text-[#3B4B59] flex items-center gap-2">
                <Type className="w-4 h-4 text-[#20969B]" />
                <span>{t.chooseFont}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {EMBROIDERY_FONTS.map((font) => {
                  const isPicked = selectedFontId === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => {
                        setSelectedFont(font.fontFamily);
                        setSelectedFontId(font.id);
                      }}
                      className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all text-center active:scale-95 ${
                        isPicked
                          ? 'border-[#20969B] bg-[#20969B]/10 text-[#20969B] shadow-xs'
                          : 'border-[#3B4B59]/10 bg-[#FBF8F4] text-[#3B4B59] hover:border-[#3B4B59]/30'
                      }`}
                    >
                      {font.name[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Note & Add to Cart Action */}
            <div className="pt-4 border-t border-[#3B4B59]/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#3B4B59]/80">
                  {t.embroideryPriceNote}
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#F26B4E]">
                  25 {t.currency}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-[#F26B4E]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>{lang === 'ar' ? 'تمت إضافة التطريز للسلة ✓' : 'Embroidered Item Added ✓'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{t.addEmbroideryToCart}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
