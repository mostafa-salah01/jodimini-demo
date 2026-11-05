import React, { useState } from 'react';
import { X, ShoppingBag, Ruler, Gift, AlertCircle, Check, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: Product, size: string, isGift: boolean) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  lang,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isGift, setIsGift] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const installmentAmount = (product.price / 4).toFixed(2);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onAddToCart(product, selectedSize, isGift);
    onClose();
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setShowError(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#3B4B59]/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl border border-[#3B4B59]/10 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 z-10 p-2 rounded-full bg-white/90 text-[#3B4B59] hover:bg-[#3B4B59] hover:text-white transition-colors shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Product Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBF8F4] border border-[#3B4B59]/10 shadow-xs">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="w-full h-full object-cover object-center"
              width="500"
              height="625"
            />
            {product.badge && (
              <span
                className="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-black text-white shadow-sm"
                style={{ backgroundColor: product.badge.color }}
              >
                {product.badge[lang]}
              </span>
            )}
            <span className="absolute bottom-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#3B4B59] shadow-xs">
              {product.ageLabel[lang]}
            </span>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#20969B]">
                {product.ageLabel[lang]}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#3B4B59] mt-1 leading-snug">
                {product.name[lang]}
              </h2>
            </div>

            {/* Price & Installments */}
            <div className="p-3.5 rounded-2xl bg-[#FBF8F4] border border-[#3B4B59]/10 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#3B4B59]">
                  {product.price}
                </span>
                <span className="text-sm font-bold text-[#3B4B59]/75">
                  {t.currency}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-[#3B4B59]/50 line-through ms-2">
                    {product.originalPrice} {t.currency}
                  </span>
                )}
              </div>

              {/* Installment simulation line with Tabby & Tamara */}
              <div className="flex items-center gap-1.5 text-xs text-[#3B4B59]/90 font-medium pt-1 border-t border-[#3B4B59]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#F9A620] shrink-0" />
                <span>
                  {t.tabbyTamaraNotice}{' '}
                  <strong className="text-[#3B4B59]">
                    {installmentAmount} {t.currency}
                  </strong>{' '}
                  ({lang === 'ar' ? 'تابي أو تمارا' : 'Tabby or Tamara'})
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#3B4B59]/80 font-medium leading-relaxed">
              {product.fullDesc[lang]}
            </p>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#3B4B59] flex items-center gap-1">
                  <span>{t.chooseSize}</span>
                  {selectedSize && (
                    <span className="text-xs text-[#20969B] font-extrabold">
                      ({selectedSize})
                    </span>
                  )}
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-xs font-bold text-[#20969B] hover:text-[#20969B]/80 underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{t.sizeGuide}</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isCurrent = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border-2 active:scale-95 ${
                        isCurrent
                          ? 'bg-[#3B4B59] text-white border-[#3B4B59] shadow-xs'
                          : 'bg-white text-[#3B4B59] border-[#3B4B59]/15 hover:border-[#20969B]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Size Warning Error if user attempts to add without size */}
              {showError && (
                <div className="p-3 rounded-xl bg-[#F26B4E]/10 border border-[#F26B4E]/30 text-[#F26B4E] text-xs font-bold flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t.selectSizeFirst}</span>
                </div>
              )}
            </div>

            {/* Gift Wrap Option */}
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#3B4B59]/15 hover:border-[#F497A9] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                className="w-4 h-4 rounded text-[#F26B4E] focus:ring-[#F26B4E]"
              />
              <div className="flex items-center gap-2 text-xs font-bold text-[#3B4B59]">
                <Gift className="w-4 h-4 text-[#F497A9]" />
                <span>{t.giftWrapOption}</span>
              </div>
            </label>

            {/* Fabric & Care Specs */}
            <div className="text-[11px] text-[#3B4B59]/75 space-y-1 bg-[#FBF8F4] p-3 rounded-xl border border-[#3B4B59]/10">
              <p>
                <strong className="text-[#3B4B59]">{t.fabricDetails}</strong>{' '}
                {product.fabric[lang]}
              </p>
              <p>
                <strong className="text-[#3B4B59]">{t.careInstructions}</strong>{' '}
                {product.care[lang]}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 ${
                selectedSize
                  ? 'bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white hover:shadow-lg'
                  : 'bg-[#F26B4E] text-white hover:bg-[#F26B4E]/90'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.addToCart}</span>
              {isGift && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md">+ هدية</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
