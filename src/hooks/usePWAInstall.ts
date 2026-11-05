import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Check if app is running in standalone PWA mode or was already marked installed
  const checkIsInstalled = () => {
    if (typeof window === 'undefined') return false;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isAndroidReferrer = typeof document !== 'undefined' && document.referrer.includes('android-app://');
    const isLocallyInstalled = localStorage.getItem('jodimini_app_installed') === 'true';

    return isStandalone || isIOSStandalone || isAndroidReferrer || isLocallyInstalled;
  };

  const [isInstalled, setIsInstalled] = useState<boolean>(checkIsInstalled);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const markAsInstalled = () => {
    setIsInstalled(true);
    localStorage.setItem('jodimini_app_installed', 'true');
    setDeferredPrompt(null);
  };

  useEffect(() => {
    setIsInstalled(checkIsInstalled());

    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(userAgent);

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      markAsInstalled();
    };

    // Listen for standalone display-mode changes
    const matchMediaStandalone = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        markAsInstalled();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    if (matchMediaStandalone.addEventListener) {
      matchMediaStandalone.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (matchMediaStandalone.removeEventListener) {
        matchMediaStandalone.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          markAsInstalled();
          return true;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isAndroid,
    install,
    markAsInstalled,
  };
}
