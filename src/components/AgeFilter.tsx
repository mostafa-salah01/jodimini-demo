import React from 'react';
import { AgeCategory, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AgeFilterProps {
  lang: Language;
  selectedCategory: AgeCategory;
  onSelectCategory: (category: AgeCategory) => void;
}

export const AgeFilter: React.FC<AgeFilterProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
}) => {
  const t = TRANSLATIONS[lang];

  const categories: { id: AgeCategory; label: { ar: string; en: string }; color: string }[] = [
    { id: 'all', label: { ar: 'جميع الأعمار', en: 'All Ages' }, color: '#3B4B59' },
    { id: '0-12m', label: { ar: '0-12 شهر', en: '0-12 Months' }, color: '#F9A620' },
    { id: '1-3y', label: { ar: '1-3 سنين', en: '1-3 Years' }, color: '#20969B' },
    { id: '4-6y', label: { ar: '4-6 سنين', en: '4-6 Years' }, color: '#F497A9' },
    { id: '7-9y', label: { ar: '7-9 سنين', en: '7-9 Years' }, color: '#F26B4E' },
    { id: '10-12y', label: { ar: '10-12 سنة', en: '10-12 Years' }, color: '#3B4B59' },
  ];

  return (
    <section className="py-8 bg-white border-b border-[#3B4B59]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B4B59]">
            {t.ageFilterTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#3B4B59]/75 font-medium">
            {t.ageFilterSubtitle}
          </p>
        </div>

        {/* Big Touch-Friendly Age Buttons */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`snap-center shrink-0 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 border-2 flex items-center gap-2 active:scale-95 shadow-xs ${
                  isSelected
                    ? 'text-white shadow-md transform -translate-y-0.5'
                    : 'bg-[#FBF8F4] text-[#3B4B59] border-transparent hover:border-[#3B4B59]/20 hover:bg-white'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : undefined,
                  borderColor: isSelected ? cat.color : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: isSelected ? '#FFFFFF' : cat.color,
                  }}
                />
                <span>{cat.label[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
