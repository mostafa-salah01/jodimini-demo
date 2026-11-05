import React from 'react';
import { ShieldCheck, Truck, Clock, Phone, Mail } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#3B4B59] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center">
                <img
                  src="./images/logo.png"
                  alt="JodiMini Logo"
                  className="w-full h-full object-contain"
                  width="48"
                  height="48"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Jodi<span className="text-[#F26B4E]">Mini</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FBF8F4]/80 font-medium leading-relaxed">
              {t.footerAbout}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-[#F9A620]">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <a href="#products" className="hover:text-[#F497A9] transition-colors">
                  {t.navShop}
                </a>
              </li>
              <li>
                <a href="#embroidery" className="hover:text-[#F497A9] transition-colors">
                  {t.navEmbroidery}
                </a>
              </li>
              <li>
                <a href="#white-friday" className="hover:text-[#F497A9] transition-colors">
                  {t.navWhiteFriday}
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-[#F497A9] transition-colors">
                  {t.navBundles}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#F497A9] transition-colors">
                  {t.navReviews}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-[#20969B]">
              {t.footerContact}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-white/80 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F9A620]" />
                <span dir="ltr">{t.footerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F497A9]" />
                <span>{t.footerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#20969B]" />
                <span>{t.footerHours}</span>
              </div>
            </div>
          </div>

          {/* Payment & Shipping textual trust badges */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-[#F497A9]">
              {lang === 'ar' ? 'طرق الدفع والشحن' : 'Payment & Shipping'}
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-white/90">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                Apple Pay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                مدى | Mada
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                STC Pay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                تابي | Tabby
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                تمارا | Tamara
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                سبل | SPL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                أرامكس | Aramex
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                سمسا | SMSA
              </span>
            </div>
          </div>
        </div>

        {/* Required Mandatory Attribution & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/15 text-center space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-white/90">
            {t.footerCopyright}
          </p>
          <p className="text-[11px] text-white/50">
            © 2026 JodiMini Kids Wear Demo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
