import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu, X, Smartphone } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSmartApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenSmartApp,
}) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#products', label: t.navShop },
    { href: '#embroidery', label: t.navEmbroidery },
    { href: '#white-friday', label: t.navWhiteFriday },
    { href: '#bundles', label: t.navBundles },
    { href: '#reviews', label: t.navReviews },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F4]/95 backdrop-blur-md border-b border-[#3B4B59]/10 transition-shadow duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#3B4B59] hover:bg-[#3B4B59]/10 focus:outline-none focus:ring-2 focus:ring-[#20969B]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="JodiMini Home"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center p-1.5 border border-[#20969B]/20">
              <img
                src="./images/logo.png"
                alt="JodiMini Logo"
                className="w-full h-full object-contain"
                width="48"
                height="48"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <span dir="ltr" className="text-2xl font-black tracking-tight leading-tight select-none inline-flex items-baseline">
                <span className="text-[#20969B]">J</span>
                <span className="text-[#F9A620]">o</span>
                <span className="text-[#F497A9]">d</span>
                <span className="text-[#F26B4E]">i</span>
                <span className="text-[#20969B]">M</span>
                <span className="text-[#3B4B59]">i</span>
                <span className="text-[#F9A620]">n</span>
                <span className="text-[#F497A9]">i</span>
              </span>
              <span className="text-[11px] font-bold text-[#20969B] -mt-0.5 tracking-wider">
                {lang === 'ar' ? 'أزياء أطفال سعودية' : 'Saudi Kids Fashion'}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3.5 py-2 text-sm lg:text-base font-bold text-[#3B4B59] hover:text-[#F26B4E] hover:bg-white rounded-xl transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls: Smart App Install, Language Toggle & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Smart App Install Button (Android & iPhone) */}
          <button
            type="button"
            onClick={onOpenSmartApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#20969B] to-[#F26B4E] hover:from-[#F26B4E] hover:to-[#20969B] shadow-xs hover:shadow-md transition-all active:scale-95 group"
            title={lang === 'ar' ? 'تحميل تطبيق JodiMini على هاتفك' : 'Install JodiMini App'}
          >
            <Smartphone className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
            <span className="hidden xs:inline">
              {lang === 'ar' ? 'حمّلي التطبيق' : 'Install App'}
            </span>
          </button>

          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#3B4B59] bg-white border border-[#F497A9]/40 hover:border-[#20969B] hover:text-[#20969B] shadow-xs transition-all active:scale-95"
            aria-label={`Switch to ${t.switchLanguage}`}
          >
            <Globe className="w-3.5 h-3.5 text-[#20969B]" />
            <span>{t.switchLanguage}</span>
          </button>

          {/* Cart Button with warm cheerful brand colors */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-r from-[#F26B4E] to-[#F497A9] hover:from-[#F497A9] hover:to-[#F26B4E] text-white shadow-md shadow-[#F26B4E]/30 transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#F26B4E]"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#20969B] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF8F4] border-b border-[#3B4B59]/15 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-start px-4 py-3 text-base font-bold text-[#3B4B59] hover:bg-white rounded-xl transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#20969B] text-lg">›</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSmartApp();
            }}
            className="w-full text-start px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-[#20969B] to-[#F26B4E] rounded-xl transition-all flex items-center justify-between shadow-xs mt-2"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-white" />
              <span>{lang === 'ar' ? 'حمّلي تطبيق JodiMini (آيفون وأندرويد)' : 'Install JodiMini App (iOS & Android)'}</span>
            </div>
            <span className="text-white text-lg">★</span>
          </button>
        </div>
      )}
    </header>
  );
};
