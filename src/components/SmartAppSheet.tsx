import React, { useState } from 'react';
import { X, Download, Check, Sparkles, Smartphone } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SmartAppSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SmartAppSheet: React.FC<SmartAppSheetProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalled, setIsInstalled] = useState(false);

  if (!isOpen) return null;

  const handleInstall = () => {
    setIsInstalling(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setInstallProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsInstalling(false);
        setIsInstalled(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B4B59]/40 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-t sm:border border-[#3B4B59]/15 pointer-events-auto sm:mb-6 mx-auto animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-[#3B4B59]/60 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          {/* JodiMini App Icon */}
          <div className="relative w-16 h-16 rounded-2xl bg-[#FBF8F4] border-2 border-[#20969B]/30 shadow-md p-1.5 shrink-0 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="JodiMini App Icon"
              className="w-full h-full object-contain"
              width="64"
              height="64"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#20969B] border-2 border-white flex items-center justify-center text-[9px] text-white font-black">
              ✓
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-1 pe-6">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#20969B] bg-[#20969B]/10 px-2 py-0.5 rounded-md">
                {lang === 'ar' ? 'تطبيق الويب الفوري' : 'Instant Web App'}
              </span>
              <span className="text-[11px] text-[#3B4B59]/60 font-semibold">
                (0 MB)
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-[#3B4B59] leading-snug">
              JodiMini App
            </h4>
          </div>
        </div>

        {/* Literal prompt text */}
        <p className="mt-3 text-xs sm:text-sm text-[#3B4B59]/85 font-semibold leading-relaxed bg-[#FBF8F4] p-3 rounded-2xl border border-[#3B4B59]/10">
          {t.smartAppBody}
        </p>

        {/* Installation Progress Bar */}
        {isInstalling && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#20969B]">
              <span>{t.installingApp}</span>
              <span>{installProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#FBF8F4] rounded-full overflow-hidden border border-[#3B4B59]/10">
              <div
                className="h-full bg-[#20969B] transition-all duration-200 rounded-full"
                style={{ width: `${installProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-3">
          {isInstalled ? (
            <div className="w-full py-3 rounded-2xl bg-[#20969B] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md">
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{t.installedSuccess}</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{t.smartAppDownloadBtn}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 rounded-2xl bg-[#FBF8F4] hover:bg-[#3B4B59]/10 text-[#3B4B59] font-bold text-sm transition-colors"
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
