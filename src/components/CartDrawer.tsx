import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Sparkles, Gift, ArrowLeft, ArrowRight } from 'lucide-react';
import { CartItem, Language, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  lang: Language;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onOpenCheckout: () => void;
  onQuickAddProduct: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onQuickAddProduct,
}) => {
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  // Free shipping threshold = 200 SAR
  const FREE_SHIPPING_THRESHOLD = 200;

  const subtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.embroidery) {
      itemPrice += item.embroidery.price;
    }
    if (item.isGift) {
      itemPrice += 15;
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 25;
  const total = subtotal + shippingFee;

  // Find an upsell item (e.g. product-02 or product-08 which are affordable accessories/tees)
  const upsellProduct = PRODUCTS.find(
    (p) => !cartItems.some((item) => item.product.id === p.id)
  ) || PRODUCTS[1];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3B4B59]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-s border-[#3B4B59]/10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#3B4B59]/10 flex items-center justify-between bg-[#FBF8F4]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#3B4B59] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#3B4B59]">
                  {t.cartTitle}
                </h3>
                <span className="text-xs text-[#3B4B59]/70 font-semibold">
                  ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} {lang === 'ar' ? 'قطع' : 'items'})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#3B4B59]/60 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-white p-4 border-b border-[#3B4B59]/10">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-[#3B4B59]">
                <Sparkles className="w-4 h-4 text-[#F9A620]" />
                {isFreeShipping ? (
                  <strong className="text-[#20969B]">
                    {t.freeShippingUnlocked}
                  </strong>
                ) : (
                  <span>
                    {t.freeShippingRemaining.replace('{amount}', remainingForFreeShipping.toFixed(0))}
                  </span>
                )}
              </span>
              <span className="font-mono text-[#3B4B59]/70">
                {progressPercent}%
              </span>
            </div>
            {/* Bar */}
            <div className="w-full h-2.5 bg-[#FBF8F4] rounded-full overflow-hidden border border-[#3B4B59]/10">
              <div
                className="h-full bg-gradient-to-r from-[#20969B] to-[#F26B4E] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FBF8F4] flex items-center justify-center text-[#3B4B59]/40 border-2 border-dashed border-[#3B4B59]/20">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#3B4B59]">
                    {t.cartEmpty}
                  </h4>
                  <p className="text-xs text-[#3B4B59]/60 mt-1 max-w-xs">
                    {lang === 'ar'
                      ? 'تصفحي تشكيلتنا الراقية واختاري أجمل الأزياء لطفلك'
                      : 'Browse our signature collection and pick the best outfits for your little one'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#20969B] text-white font-bold text-sm shadow-sm hover:bg-[#20969B]/90"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                let unitPrice = item.product.price;
                if (item.embroidery) unitPrice += item.embroidery.price;
                if (item.isGift) unitPrice += 15;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-[#FBF8F4] border border-[#3B4B59]/10 shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-[#3B4B59]/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name[lang]}
                        className="w-full h-full object-cover object-center"
                        width="80"
                        height="96"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-sm text-[#3B4B59] line-clamp-1">
                            {item.product.name[lang]}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#3B4B59]/40 hover:text-[#F26B4E] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Size Pill */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-[#3B4B59] border border-[#3B4B59]/10">
                            {item.selectedSize}
                          </span>

                          {/* Custom Embroidery Tag */}
                          {item.embroidery && (
                            <span
                              className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white border border-[#3B4B59]/15 flex items-center gap-1"
                              style={{ color: item.embroidery.threadColor }}
                            >
                              <span>تطريز: {item.embroidery.childName}</span>
                            </span>
                          )}

                          {/* Gift Tag */}
                          {item.isGift && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#F497A9]/20 text-[#3B4B59] flex items-center gap-1">
                              <Gift className="w-3 h-3 text-[#F26B4E]" />
                              <span>هدية</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and Quantity Adjuster */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#3B4B59]/10 mt-2">
                        <div className="flex items-center border border-[#3B4B59]/20 rounded-xl bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-[#3B4B59] hover:bg-[#3B4B59]/10 active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono text-[#3B4B59]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-[#3B4B59] hover:bg-[#3B4B59]/10 active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-black text-sm text-[#3B4B59]">
                          {unitPrice * item.quantity} {t.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Smart Upsell Item */}
            {upsellProduct && cartItems.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#20969B]/20 shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#20969B] block">
                  {t.upsellTitle}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={upsellProduct.image}
                      alt={upsellProduct.name[lang]}
                      className="w-12 h-14 rounded-lg object-cover bg-[#FBF8F4]"
                      width="48"
                      height="56"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-[#3B4B59] line-clamp-1">
                        {upsellProduct.name[lang]}
                      </h5>
                      <span className="text-xs font-extrabold text-[#F26B4E]">
                        {upsellProduct.price} {t.currency}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onQuickAddProduct(upsellProduct)}
                    className="px-3 py-1.5 rounded-xl bg-[#20969B] text-white text-xs font-bold hover:bg-[#20969B]/90 active:scale-95"
                  >
                    + إضافة
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#3B4B59]/10 bg-white space-y-3">
              <div className="space-y-1.5 text-xs font-semibold text-[#3B4B59]/80">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-bold text-[#3B4B59]">{subtotal} {t.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.shippingFee}</span>
                  <span className="font-bold text-[#20969B]">
                    {shippingFee === 0 ? t.free : `${shippingFee} ${t.currency}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#3B4B59] pt-2 border-t border-[#3B4B59]/10">
                  <span>{t.total}</span>
                  <span className="text-xl text-[#F26B4E]">{total} {t.currency}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenCheckout}
                className="w-full py-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-base shadow-lg hover:shadow-[#F26B4E]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t.checkoutBtn}</span>
                {lang === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
