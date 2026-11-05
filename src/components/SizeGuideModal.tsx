import React from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { Language } from '../types';
import { SIZE_CHART } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B4B59]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#3B4B59]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#3B4B59]/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#20969B]/10 flex items-center justify-center text-[#20969B]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#3B4B59]">
                {t.sizeGuideTitle}
              </h3>
              <p className="text-xs text-[#3B4B59]/70 font-medium">
                {lang === 'ar' ? 'معايير المقاسات المعتمدة لأزياء JodiMini' : 'Standard measurement reference'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#3B4B59]/60 hover:text-[#3B4B59] hover:bg-[#3B4B59]/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto max-h-[60vh]">
          <table className="w-full text-xs sm:text-sm text-start">
            <thead>
              <tr className="bg-[#FBF8F4] text-[#3B4B59] font-extrabold border-b border-[#3B4B59]/10">
                <th className="py-3 px-3 text-start">{t.sizeGuideAge}</th>
                <th className="py-3 px-3 text-start">{t.sizeGuideHeight}</th>
                <th className="py-3 px-3 text-start">{t.sizeGuideWeight}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3B4B59]/10 font-semibold text-[#3B4B59]/90">
              {SIZE_CHART.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#20969B]/5 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#3B4B59]">
                    {row.age[lang]}
                  </td>
                  <td className="py-2.5 px-3 text-[#20969B]">{row.height}</td>
                  <td className="py-2.5 px-3 text-[#F26B4E]">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mom Tip */}
        <div className="mt-5 p-3.5 rounded-2xl bg-[#F9A620]/10 border border-[#F9A620]/30 flex items-start gap-2.5 text-xs text-[#3B4B59]">
          <Info className="w-4 h-4 text-[#F9A620] shrink-0 mt-0.5" />
          <p className="font-semibold leading-relaxed">{t.sizeGuideTip}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#3B4B59] text-white font-bold text-sm hover:bg-[#3B4B59]/90"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
