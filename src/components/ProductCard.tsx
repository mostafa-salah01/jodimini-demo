import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onQuickView,
  onAddToCartDirect,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-[#3B4B59]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container with 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FBF8F4]">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          decoding="async"
          width="400"
          height="500"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-black text-white shadow-sm"
            style={{ backgroundColor: product.badge.color || '#F26B4E' }}
          >
            {product.badge[lang]}
          </div>
        )}

        {/* Age pill */}
        <div className="absolute bottom-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#3B4B59] backdrop-blur-sm shadow-xs border border-[#3B4B59]/10">
          {product.ageLabel[lang]}
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-[#3B4B59]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="px-4 py-2.5 rounded-xl bg-white text-[#3B4B59] font-bold text-sm shadow-lg hover:bg-[#20969B] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>{t.quickView}</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-extrabold text-[#3B4B59] hover:text-[#F26B4E] cursor-pointer transition-colors line-clamp-1 leading-snug"
          >
            {product.name[lang]}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#3B4B59]/75 font-medium line-clamp-2 leading-relaxed">
            {product.shortDesc[lang]}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2 border-t border-[#3B4B59]/10 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#3B4B59]">
                {product.price}
              </span>
              <span className="text-xs font-bold text-[#3B4B59]/70">
                {t.currency}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs font-semibold text-[#3B4B59]/50 line-through -mt-1">
                {product.originalPrice} {t.currency}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCartDirect(product)}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#F26B4E]"
            aria-label={`${t.addToCart} ${product.name[lang]}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
