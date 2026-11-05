import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgeFilter } from './components/AgeFilter';
import { PaymentShippingMarquee } from './components/PaymentShippingMarquee';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { EmbroiderySection } from './components/EmbroiderySection';
import { WhiteFridaySection } from './components/WhiteFridaySection';
import { BundlesSection } from './components/BundlesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SmartAppSheet } from './components/SmartAppSheet';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InteractiveSparkles } from './components/InteractiveSparkles';
import { AgeCategory, BundleItem, CartItem, Language, Product } from './types';
import { PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import { Check, Sparkles, Smartphone } from 'lucide-react';

export const App: React.FC = () => {
  // 1) Language state: default Arabic (RTL)
  const [lang, setLang] = useState<Language>('ar');

  // Update HTML document lang and dir dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = TRANSLATIONS[lang];

  // 2) Age Filter State
  const [selectedAge, setSelectedAge] = useState<AgeCategory>('all');

  // Filtered products list
  const filteredProducts = useMemo(() => {
    if (selectedAge === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.ageCategory === selectedAge);
  }, [selectedAge]);

  // 3) Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 sample item so user immediately notices the cart and free shipping meter
    {
      id: 'init-item-1',
      product: PRODUCTS[0],
      selectedSize: '5 سنوات',
      quantity: 1,
      isGift: false,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 4) Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // 5) Smart App Bottom Sheet State (shown once per session)
  const [isSmartAppOpen, setIsSmartAppOpen] = useState(false);
  const [hasShownSmartApp, setHasShownSmartApp] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tracking state for user actions
  const [viewedProductsCount, setViewedProductsCount] = useState(0);
  const [showFloatingInstallBadge, setShowFloatingInstallBadge] = useState(false);

  // Trigger Smart App sheet once per session
  const triggerSmartApp = () => {
    setShowFloatingInstallBadge(true);
    const alreadyShown = sessionStorage.getItem('jodimini_smart_app_shown');
    if (!alreadyShown && !hasShownSmartApp) {
      setIsSmartAppOpen(true);
      setHasShownSmartApp(true);
      sessionStorage.setItem('jodimini_smart_app_shown', 'true');
    }
  };

  // Timer trigger: 7 seconds of browsing as requested by user
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingInstallBadge(true);
      triggerSmartApp();
    }, 7000);
    return () => clearTimeout(timer);
  }, [hasShownSmartApp]);

  // Open Quick View & track viewed products
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setViewedProductsCount((prev) => {
      const next = prev + 1;
      // Trigger if customer views 1 or 2 products
      if (next >= 2) {
        triggerSmartApp();
      }
      return next;
    });
  };

  // Add product from Quick View
  const handleAddToCart = (product: Product, size: string, isGift: boolean) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.isGift === isGift &&
          !item.embroidery
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${Date.now()}`,
          product,
          selectedSize: size,
          quantity: 1,
          isGift,
        },
      ];
    });

    showToast(t.addedToCartAlert);
    triggerSmartApp(); // Trigger on first add to cart
  };

  // Quick direct add (prompts quick view or default first size)
  const handleDirectAdd = (product: Product) => {
    handleOpenQuickView(product);
  };

  // Add Custom Embroidery from Section
  const handleAddCustomEmbroidery = (name: string, colorHex: string, fontName: string) => {
    // Uses product-08 (cotton romper) or custom piece
    const baseProduct = PRODUCTS[7]; // Romper
    setCartItems((prev) => [
      ...prev,
      {
        id: `embroidery-${Date.now()}`,
        product: baseProduct,
        selectedSize: '3-6 شهور',
        quantity: 1,
        isGift: true,
        embroidery: {
          childName: name,
          threadColor: colorHex,
          fontFamily: fontName,
          price: 25,
        },
      },
    ]);

    showToast(lang === 'ar' ? 'تمت إضافة القطعة المطرزة باسم طفلك! 🧵' : 'Custom embroidered piece added! 🧵');
    triggerSmartApp();
  };

  // Add Bundle to Cart
  const handleAddBundle = (bundle: BundleItem, isGiftWrap: boolean) => {
    const bundledProducts = bundle.productIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean) as Product[];

    setCartItems((prev) => {
      const newItems: CartItem[] = bundledProducts.map((p) => ({
        id: `bundle-${bundle.id}-${p.id}-${Date.now()}`,
        product: p,
        selectedSize: p.sizes[0],
        quantity: 1,
        isGift: isGiftWrap,
      }));
      return [...prev, ...newItems];
    });

    showToast(lang === 'ar' ? 'تمت إضافة الباقة بخصم 10%! 🎉' : 'Bundle added with 10% discount! 🎉');
    triggerSmartApp();
  };

  // Cart quantity controls
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Total cart calculation for checkout
  const cartSubtotal = cartItems.reduce((acc, item) => {
    let p = item.product.price;
    if (item.embroidery) p += item.embroidery.price;
    if (item.isGift) p += 15;
    return acc + p * item.quantity;
  }, 0);
  const cartShipping = cartSubtotal >= 200 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = cartSubtotal + cartShipping;

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col font-sans text-[#3B4B59]">
      {/* 1. Announcement Bar */}
      <TopBar lang={lang} />

      {/* 2. Sticky Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSmartApp={() => setIsSmartAppOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section with Video/Poster & GSAP Bouncy Letters */}
        <Hero lang={lang} />

        {/* 4. Shop by Age Filter */}
        <AgeFilter
          lang={lang}
          selectedCategory={selectedAge}
          onSelectCategory={(cat) => setSelectedAge(cat)}
        />

        {/* 5. Payment & Shipping Marquee */}
        <PaymentShippingMarquee lang={lang} />

        {/* 6. Products Grid (9 products) */}
        <section id="products" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20969B]/10 text-[#20969B] text-xs font-black mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F9A620]" />
                <span>{lang === 'ar' ? 'تشكيلة حصرية' : 'Exclusive Collection'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#3B4B59]">
                {t.productsTitle}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#3B4B59]/75 font-medium">
                {t.productsSubtitle}
              </p>
            </div>

            <span className="text-xs sm:text-sm font-bold text-[#3B4B59]/60">
              {lang === 'ar'
                ? `عرض ${filteredProducts.length} من أصل 9 قطع أزياء`
                : `Showing ${filteredProducts.length} of 9 styles`}
            </span>
          </div>

          {/* Grid with alternating slide-in animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod, index) => (
              <div
                key={prod.id}
                className={index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left'}
                style={{ animationDelay: `${(index % 3) * 0.1}s` }}
              >
                <ProductCard
                  product={prod}
                  lang={lang}
                  onQuickView={handleOpenQuickView}
                  onAddToCartDirect={handleDirectAdd}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 7. Interactive Custom Embroidery Section */}
        <EmbroiderySection
          lang={lang}
          onAddCustomEmbroidery={handleAddCustomEmbroidery}
        />

        {/* 8. White Friday Promotional Banner Section */}
        <WhiteFridaySection lang={lang} />

        {/* 9. Bundle & Save Section */}
        <BundlesSection
          lang={lang}
          onAddBundle={handleAddBundle}
        />

        {/* 10. Reviews from Mothers */}
        <ReviewsSection lang={lang} />
      </main>

      {/* 11. Footer with WebStack demo notice */}
      <Footer lang={lang} />

      {/* 12. Floating WhatsApp button */}
      <FloatingWhatsApp lang={lang} />

      {/* 12.1 Interactive Sparkles (Touch/Cursor trails & Click Starburst Explosion) */}
      <InteractiveSparkles />

      {/* 12.5 Floating Smart App Install Badge (Appears after 7s or user interaction) */}
      {showFloatingInstallBadge && (
        <aside
          aria-label="Smart App Install"
          className="fixed bottom-6 end-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <button
            type="button"
            onClick={() => setIsSmartAppOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#20969B] to-[#F26B4E] hover:from-[#F26B4E] hover:to-[#20969B] text-white font-extrabold text-xs sm:text-sm shadow-2xl hover:shadow-[#F26B4E]/40 border-2 border-white transition-all transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#20969B]/40"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-white animate-pulse" />
            </div>
            <span>
              {lang === 'ar' ? 'حمّلي التطبيق (آيفون وأندرويد)' : 'Install App (iOS & Android)'}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F9A620] animate-ping" />
          </button>
        </aside>
      )}

      {/* 13. Modals and Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        lang={lang}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onQuickAddProduct={handleDirectAdd}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        lang={lang}
        totalAmount={cartTotal}
        onCompleteSuccess={() => setCartItems([])}
      />

      {/* 14. Smart App Install Bottom Sheet (Appears once per session) */}
      <SmartAppSheet
        isOpen={isSmartAppOpen}
        onClose={() => setIsSmartAppOpen(false)}
        lang={lang}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 start-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#3B4B59] text-white text-sm font-bold shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-4 h-4 text-[#20969B]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
