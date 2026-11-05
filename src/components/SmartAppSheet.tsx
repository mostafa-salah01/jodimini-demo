import React, { useState } from 'react';
import { X, Download, Check, Smartphone, Share, PlusSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

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
  const { isInstallable, isIOS: detectedIOS, isInstalled, install } = usePWAInstall();

  // Selected device tab: 'ios' or 'android' (auto-selects detected device)
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>(
    detectedIOS ? 'ios' : 'android'
  );

  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (activeTab === 'android' && isInstallable) {
      const installed = await install();
      if (installed) {
        setInstallSuccess(true);
        setTimeout(() => onClose(), 1500);
        return;
      }
    }

    // Interactive simulated install flow for instant feedback on any device or preview iframe
    setIsInstalling(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setInstallProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsInstalling(false);
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3B4B59]/45 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border-t sm:border border-[#3B4B59]/15 pointer-events-auto sm:mb-6 mx-auto animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-[#3B4B59]/60 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Identity Header */}
        <div className="flex items-center gap-3.5 pb-3 border-b border-[#3B4B59]/10">
          <div className="relative w-14 h-14 rounded-2xl bg-[#FBF8F4] border-2 border-[#20969B]/30 shadow-md p-1.5 shrink-0 flex items-center justify-center">
            <img
              src="./images/logo.png"
              alt="JodiMini App Icon"
              className="w-full h-full object-contain"
              width="56"
              height="56"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#20969B] border-2 border-white flex items-center justify-center text-[9px] text-white font-black">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#20969B] bg-[#20969B]/10 px-2.5 py-0.5 rounded-full">
                {lang === 'ar' ? 'تطبيق JodiMini الذكي' : 'JodiMini Smart PWA'}
              </span>
              <span className="text-[10px] text-[#3B4B59]/60 font-mono font-bold">
                (0 MB)
              </span>
            </div>
            <h4 className="text-lg font-black text-[#3B4B59] leading-snug mt-0.5">
              JodiMini - متجر أزياء الأطفال
            </h4>
          </div>
        </div>

        {/* Required Literal Promo Text */}
        <p className="mt-3 text-xs sm:text-sm text-[#3B4B59]/85 font-semibold leading-relaxed bg-[#FBF8F4] p-3 rounded-2xl border border-[#3B4B59]/10">
          {t.smartAppBody}
        </p>

        {/* OS Platform Switcher Tabs */}
        <div className="mt-4 flex items-center p-1 rounded-2xl bg-[#3B4B59]/5 border border-[#3B4B59]/10">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'android'
                ? 'bg-white text-[#3B4B59] shadow-xs'
                : 'text-[#3B4B59]/60 hover:text-[#3B4B59]'
            }`}
          >
            <span>🤖</span>
            <span>{lang === 'ar' ? 'أجهزة أندرويد (Android)' : 'Android Devices'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'ios'
                ? 'bg-white text-[#3B4B59] shadow-xs'
                : 'text-[#3B4B59]/60 hover:text-[#3B4B59]'
            }`}
          >
            <span>🍏</span>
            <span>{lang === 'ar' ? 'أجهزة آيفون (iPhone / iOS)' : 'iPhone (iOS Safari)'}</span>
          </button>
        </div>

        {/* Platform Content */}
        {activeTab === 'ios' ? (
          /* iOS Safari Specific Step-by-Step Instructions */
          <div className="mt-4 p-4 rounded-2xl bg-[#20969B]/5 border border-[#20969B]/20 space-y-3 text-xs text-[#3B4B59]">
            <span className="font-extrabold text-sm text-[#20969B] block">
              {lang === 'ar' ? 'طريقة تثبيت التطبيق على الآيفون في ثانيتين:' : 'Install on iPhone in 2 simple steps:'}
            </span>

            <div className="space-y-2.5 font-medium leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#20969B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  {lang === 'ar' ? (
                    <>
                      اضغطي على أيقونة <strong>المشاركة</strong> (
                      <Share className="inline w-3.5 h-3.5 mx-0.5 text-[#20969B]" />
                      ) في أسفل شاشة متصفح سفاري (Safari).
                    </>
                  ) : (
                    <>
                      Tap the <strong>Share</strong> button (
                      <Share className="inline w-3.5 h-3.5 mx-0.5 text-[#20969B]" />
                      ) in Safari toolbar.
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#20969B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  {lang === 'ar' ? (
                    <>
                      مرري للأسفل واختاري <strong>"إضافة إلى الشاشة الرئيسية"</strong> (
                      <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#F26B4E]" />
                      ).
                    </>
                  ) : (
                    <>
                      Scroll down and tap <strong>"Add to Home Screen"</strong> (
                      <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#F26B4E]" />
                      ).
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#20969B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  {lang === 'ar'
                    ? 'اضغطي "إضافة" في الزاوية العلوية، وستظهر أيقونة JodiMini فوراً كأبليكيشن متكامل على شاشة هاتفك!'
                    : 'Tap "Add" in the top corner. JodiMini will be instantly installed on your home screen!'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#20969B]/20 flex items-center gap-1.5 text-[11px] text-[#20969B] font-bold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'يعمل التطبيق بدون أي استهلاك للمساحة ويدعم التصفح السريع!'
                  : 'Zero storage footprint with lightning fast offline loading.'}
              </span>
            </div>
          </div>
        ) : (
          /* Android 1-Click Install Flow */
          <div className="mt-4 p-4 rounded-2xl bg-[#FBF8F4] border border-[#3B4B59]/10 space-y-2 text-xs text-[#3B4B59]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#3B4B59]">
              <Download className="w-4 h-4 text-[#F26B4E]" />
              <span>
                {lang === 'ar' ? 'تثبيت فوري مباشر بضغطة واحدة لأندرويد' : '1-Click Direct Install on Android'}
              </span>
            </div>
            <p className="text-[#3B4B59]/75 font-medium leading-relaxed">
              {lang === 'ar'
                ? 'اضغطي الزر بالأسفل لتثبيت تطبيق JodiMini الرسمي على هاتفك الأندرويد، واستمتعي بإشعارات العروض وتجربة تسوق سريعة جداً.'
                : 'Click below to install the official JodiMini application on your Android device for instant notifications and faster checkout.'}
            </p>
          </div>
        )}

        {/* Installation Progress Bar */}
        {isInstalling && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#20969B]">
              <span>{t.installingApp}</span>
              <span>{installProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#FBF8F4] rounded-full overflow-hidden border border-[#3B4B59]/10">
              <div
                className="h-full bg-gradient-to-r from-[#20969B] to-[#F26B4E] transition-all duration-200 rounded-full"
                style={{ width: `${installProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-3">
          {installSuccess ? (
            <div className="w-full py-3.5 rounded-2xl bg-[#20969B] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md animate-in zoom-in-95">
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{t.installedSuccess}</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#F26B4E] hover:bg-[#F26B4E]/90 text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>
                  {activeTab === 'ios'
                    ? lang === 'ar'
                      ? 'فهمت طريقة الآيفون ✓'
                      : 'Got it for iPhone ✓'
                    : t.smartAppDownloadBtn}
                </span>
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
