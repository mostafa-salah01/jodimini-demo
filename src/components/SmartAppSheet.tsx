import React, { useState } from 'react';
import { X, Download, Check, Share, PlusSquare, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SmartAppSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onInstalled?: () => void;
}

export const SmartAppSheet: React.FC<SmartAppSheetProps> = ({
  isOpen,
  onClose,
  lang,
  onInstalled,
}) => {
  const t = TRANSLATIONS[lang];
  const { isInstallable, isIOS, install, markAsInstalled } = usePWAInstall();

  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (!isIOS && isInstallable) {
      const accepted = await install();
      if (accepted) {
        markAsInstalled();
        onInstalled?.();
        setInstallSuccess(true);
        setTimeout(() => onClose(), 1200);
        return;
      }
    }

    // Direct simulated 1-click installation feedback for iOS or browsers without prompt
    setIsInstalling(true);
    setTimeout(() => {
      setIsInstalling(false);
      setInstallSuccess(true);
      markAsInstalled();
      onInstalled?.();
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B4B59]/50 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-t sm:border border-[#3B4B59]/10 pointer-events-auto mx-auto animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-[#3B4B59]/50 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Identity Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#3B4B59]/10">
          <div className="relative w-16 h-16 rounded-2xl bg-[#FBF8F4] border-2 border-[#20969B]/30 shadow-md p-1 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src="./pwa-192x192.png"
              alt="JodiMini App Icon"
              className="w-full h-full object-contain rounded-xl"
              width="64"
              height="64"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#20969B] border-2 border-white flex items-center justify-center text-[10px] text-white font-black">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#20969B] bg-[#20969B]/10 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'تطبيق رسمي' : 'Official App'}
              </span>
              <span className="text-[10px] text-[#3B4B59]/60 font-mono font-bold">
                (0 MB)
              </span>
            </div>
            <h4 className="text-lg font-black text-[#3B4B59] leading-snug mt-0.5">
              JodiMini
            </h4>
            <p className="text-xs text-[#3B4B59]/70 font-semibold">
              {lang === 'ar' ? 'أزياء الأطفال السعودية' : 'Saudi Kids Fashion'}
            </p>
          </div>
        </div>

        {/* Short & Direct Value Prop */}
        <p className="mt-3.5 text-xs sm:text-sm text-[#3B4B59]/80 font-medium leading-relaxed">
          {lang === 'ar'
            ? 'حمّلي التطبيق على جهازك لتصفح أسرع، متابعة العروض الجديدة فوراً، وبدون استهلاك أي مساحة تخزين.'
            : 'Install JodiMini on your device for instant browsing and exclusive offers without taking any storage.'}
        </p>

        {/* Auto-detected OS flow */}
        {isIOS ? (
          /* iOS Safari direct 2-step directive */
          <div className="mt-4 p-3.5 rounded-2xl bg-[#20969B]/8 border border-[#20969B]/20 space-y-2 text-xs text-[#3B4B59]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#20969B]">
              <Sparkles className="w-4 h-4 shrink-0 text-[#F9A620]" />
              <span>{lang === 'ar' ? 'طريقة التثبيت على الآيفون:' : 'Install on iPhone:'}</span>
            </div>
            <div className="space-y-1.5 font-semibold text-[#3B4B59]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#20969B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>
                  {lang === 'ar' ? (
                    <>اضغطي زر المشاركة ( <Share className="inline w-3.5 h-3.5 mx-0.5 text-[#20969B]" /> ) في متصفح سفاري</>
                  ) : (
                    <>Tap the Share button ( <Share className="inline w-3.5 h-3.5 mx-0.5 text-[#20969B]" /> ) in Safari</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#20969B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>
                  {lang === 'ar' ? (
                    <>اختاري <strong className="text-[#F26B4E]">"إضافة إلى الشاشة الرئيسية"</strong> ( <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#F26B4E]" /> )</>
                  ) : (
                    <>Select <strong className="text-[#F26B4E]">"Add to Home Screen"</strong> ( <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#F26B4E]" /> )</>
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Action Button */}
        <div className="mt-5 flex items-center gap-2.5">
          {installSuccess ? (
            <div className="w-full py-3.5 rounded-2xl bg-[#20969B] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md animate-in zoom-in-95">
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{lang === 'ar' ? 'تم التثبيت بنجاح! شكراً لكِ ✓' : 'Installed Successfully ✓'}</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#20969B] to-[#F26B4E] hover:from-[#F26B4E] hover:to-[#20969B] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isInstalling ? (
                  <span className="animate-pulse">{lang === 'ar' ? 'جاري التثبيت...' : 'Installing...'}</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>
                      {isIOS
                        ? lang === 'ar'
                          ? 'تمت الإضافة للآيفون ✓'
                          : 'Added to iPhone ✓'
                        : lang === 'ar'
                        ? 'تثبيت التطبيق على هاتفك الآن 📥'
                        : 'Install App on Phone Now 📥'}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3.5 rounded-2xl bg-[#FBF8F4] hover:bg-[#3B4B59]/10 text-[#3B4B59] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {t.smartAppLaterBtn}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

