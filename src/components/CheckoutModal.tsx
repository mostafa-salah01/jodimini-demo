import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  totalAmount: number;
  onCompleteSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  totalAmount,
  onCompleteSuccess,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedMethod, setSelectedMethod] = useState<'apple_pay' | 'mada' | 'stc_pay' | 'tabby' | 'tamara'>('apple_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'mada', name: 'مدى | Mada', sub: 'بطاقة الصراف الآلي والفيزا السعودية' },
    { id: 'stc_pay', name: 'STC Pay', sub: 'المحفظة الرقمية السريعة والآمنة' },
    { id: 'tabby', name: 'تابي | Tabby', sub: 'قسّمي على 4 دفعات بدون أي فوائد' },
    { id: 'tamara', name: 'تمارا | Tamara', sub: 'ادفعي لاحقاً أو على 4 دفعات ميسّرة' },
  ] as const;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onCompleteSuccess();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B4B59]/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3B4B59]/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-[#3B4B59]/60 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#20969B]/10 text-[#20969B] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#3B4B59]">
                {t.checkoutModalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B4B59]/70 font-medium mt-1">
                {t.checkoutModalSubtitle}
              </p>
            </div>

            {/* Total Badge */}
            <div className="p-4 rounded-2xl bg-[#FBF8F4] border border-[#3B4B59]/10 flex items-center justify-between">
              <span className="font-bold text-sm text-[#3B4B59]">
                {t.total}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#F26B4E]">
                  {totalAmount}
                </span>
                <span className="text-sm font-bold text-[#3B4B59]/70">
                  {t.currency}
                </span>
              </div>
            </div>

            {/* Apple Pay Priority Hero Button */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#3B4B59]/70 block">
                {lang === 'ar' ? 'الخيار الأسرع بنقرة واحدة:' : 'Fastest 1-Click Checkout:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('apple_pay');
                  handlePay();
                }}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-black hover:bg-neutral-900 text-white font-extrabold text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="text-lg">Pay</span>
                <span className="text-xs font-medium opacity-80">
                  - {t.payWithApplePay}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#3B4B59]/15 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-[#3B4B59]/60 shrink-0">
                {t.orOtherMethods}
              </span>
              <div className="border-t border-[#3B4B59]/15 w-full" />
            </div>

            {/* Other Payment Methods List */}
            <div className="space-y-2.5">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <label
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#20969B] bg-[#20969B]/5 shadow-xs'
                        : 'border-[#3B4B59]/15 hover:border-[#3B4B59]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#20969B] bg-[#20969B]' : 'border-[#3B4B59]/30'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#3B4B59]">
                          {method.name}
                        </strong>
                        <span className="text-[11px] text-[#3B4B59]/70 font-medium">
                          {method.sub}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Confirm Payment Button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.processingPayment}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.confirmPayment} ({totalAmount} {t.currency})</span>
                </>
              )}
            </button>

            {/* Demo Notice Disclaimer */}
            <p className="text-[11px] text-center text-[#3B4B59]/60 font-medium">
              ℹ️ {t.demoCheckoutNotice}
            </p>
          </div>
        ) : (
          /* Payment Success State */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#20969B]/10 text-[#20969B] flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#3B4B59]">
                {t.paymentSuccessTitle}
              </h3>
              <p className="text-sm text-[#3B4B59]/75 font-medium mt-1">
                {t.paymentSuccessDesc}
              </p>
              <div className="inline-block mt-3 px-4 py-2 rounded-xl bg-[#FBF8F4] border border-dashed border-[#20969B] font-mono font-black text-lg text-[#20969B]">
                #JM-8492
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#20969B]/10 border border-[#20969B]/20 text-xs text-[#3B4B59] font-medium leading-relaxed max-w-sm mx-auto">
              {lang === 'ar'
                ? 'تم استلام طلبك التجريبي بنجاح! سيتم إرسال تفاصيل التتبع عبر رسالة نصية SMS وتطبيق الواتساب فور شحنه.'
                : 'Demo order received! Tracking info will be simulated via SMS and WhatsApp once dispatched.'}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-[#3B4B59] text-white font-extrabold text-sm hover:bg-[#3B4B59]/90 active:scale-95 shadow-md"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
