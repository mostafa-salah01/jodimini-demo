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
  isInstalled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenSmartApp,
  isInstalled = false,
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
    <header className="sticky top-0 z-40 bg-[#FBF8F4]/95 backdrop-blur-md border-b border-[#3B4B59]/10 transition-shadow duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile menu toggle & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#3B4B59] hover:bg-[#3B4B59]/10 focus:outline-none focus:ring-2 focus:ring-[#20969B] active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="JodiMini Home"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-xs flex items-center justify-center p-1 sm:p-1.5 border border-[#20969B]/20 shrink-0">
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
              <span dir="ltr" className="text-xl sm:text-2xl font-black tracking-tight leading-tight select-none inline-flex items-baseline">
                <span className="text-[#20969B]">J</span>
                <span className="text-[#F9A620]">o</span>
                <span className="text-[#F497A9]">d</span>
                <span className="text-[#F26B4E]">i</span>
                <span className="text-[#20969B]">M</span>
                <span className="text-[#3B4B59]">i</span>
                <span className="text-[#F9A620]">n</span>
                <span className="text-[#F497A9]">i</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#20969B] -mt-0.5 tracking-wider hidden xs:inline">
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

        {/* Action Controls: Smart App Install, Icon Language Toggle & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Smart App Install Button (Android & iPhone) - hidden if already installed */}
          {!isInstalled && (
            <button
              type="button"
              onClick={onOpenSmartApp}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full text-xs font-black text-white bg-gradient-to-r from-[#20969B] to-[#F26B4E] hover:from-[#F26B4E] hover:to-[#20969B] shadow-xs hover:shadow-md transition-all active:scale-95 group shrink-0"
              title={lang === 'ar' ? 'تحميل تطبيق JodiMini على هاتفك' : 'Install JodiMini App'}
              aria-label={lang === 'ar' ? 'تحميل تطبيق JodiMini على هاتفك' : 'Install JodiMini App'}
            >
              <Smartphone className="w-4 h-4 text-white group-hover:rotate-12 transition-transform shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'حمّلي التطبيق' : 'Install App'}
              </span>
            </button>
          )}

          {/* Icon-based Language Switcher: Toggle between Arabic & English */}
          <button
            type="button"
            onClick={onToggleLang}
            className="group relative flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#FBF8F4] border border-[#3B4B59]/15 hover:border-[#20969B] shadow-xs hover:shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#20969B]/30 cursor-pointer shrink-0"
            aria-label={lang === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#20969B] group-hover:rotate-45 transition-transform duration-300 shrink-0" />
            <span className="flex items-center font-extrabold text-[11px] sm:text-xs select-none">
              <span
                className={`px-1 sm:px-1.5 py-0.5 rounded-md transition-colors ${
                  lang === 'ar'
                    ? 'bg-[#20969B]/15 text-[#20969B]'
                    : 'text-[#3B4B59]/40'
                }`}
              >
                ع
              </span>
              <span className="text-[#3B4B59]/25 text-[9px] sm:text-[10px] mx-0.5">/</span>
              <span
                className={`px-1 sm:px-1.5 py-0.5 rounded-md font-mono transition-colors ${
                  lang === 'en'
                    ? 'bg-[#F26B4E]/15 text-[#F26B4E]'
                    : 'text-[#3B4B59]/40'
                }`}
              >
                EN
              </span>
            </span>
          </button>

          {/* Cart Button with warm cheerful brand colors */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#F26B4E] to-[#F497A9] hover:from-[#F497A9] hover:to-[#F26B4E] text-white shadow-md shadow-[#F26B4E]/30 transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#F26B4E] shrink-0"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#20969B] text-white text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
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

          {/* Quick Language Toggle in Mobile Drawer */}
          <div className="pt-2 border-t border-[#3B4B59]/10 flex items-center justify-between px-3 py-2 bg-white/70 rounded-xl">
            <span className="text-sm font-bold text-[#3B4B59] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#20969B]" />
              <span>{lang === 'ar' ? 'لغة المتجر' : 'Store Language'}</span>
            </span>
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#3B4B59]/15 text-xs font-black shadow-xs"
            >
              <span className={lang === 'ar' ? 'text-[#20969B] font-bold' : 'text-[#3B4B59]/40'}>العربية</span>
              <span className="text-[#3B4B59]/30">|</span>
              <span className={lang === 'en' ? 'text-[#F26B4E] font-bold' : 'text-[#3B4B59]/40'}>English</span>
            </button>
          </div>

          {!isInstalled && (
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
          )}
        </div>
      )}
    </header>
  );
};
