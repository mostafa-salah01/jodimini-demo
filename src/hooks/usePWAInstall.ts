import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function persistInstalledFlag() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('jodimini_app_installed', 'true');
    sessionStorage.setItem('jodimini_app_installed', 'true');
    // Persistent cookie with 1-year expiry so it survives across WebAPK and browser sandboxes
    document.cookie = 'jodimini_app_installed=true; max-age=31536000; path=/; SameSite=Lax';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('app-is-installed');
    }
  } catch (e) {
    // Ignore private mode quota error
  }
}

export function isAppRunningAsPWA(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // 1. URL search or hash parameters (set by PWA start_url: ?source=pwa&mode=standalone)
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (
      search.includes('source=pwa') ||
      search.includes('mode=standalone') ||
      search.includes('source=homescreen') ||
      search.includes('pwa=true') ||
      hash.includes('pwa')
    ) {
      persistInstalledFlag();
      return true;
    }

    // 2. Display mode media queries (standard modern PWA on Android & Desktop)
    const isStandaloneMedia =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches;
    if (isStandaloneMedia) {
      persistInstalledFlag();
      return true;
    }

    // 3. iOS Safari Home Screen standalone mode
    if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) {
      persistInstalledFlag();
      return true;
    }

    // 4. Android WebAPK referrer (when launched from Android home screen or intent)
    if (typeof document !== 'undefined' && document.referrer.includes('android-app://')) {
      persistInstalledFlag();
      return true;
    }

    // 5. Android WebView / TWA user agent
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('wv') && ua.includes('android')) {
      persistInstalledFlag();
      return true;
    }

    // 6. LocalStorage & SessionStorage flag
    const isLocallyInstalled =
      localStorage.getItem('jodimini_app_installed') === 'true' ||
      sessionStorage.getItem('jodimini_app_installed') === 'true';
    if (isLocallyInstalled) {
      return true;
    }

    // 7. Persistent Cookie
    if (typeof document !== 'undefined' && document.cookie.includes('jodimini_app_installed=true')) {
      persistInstalledFlag();
      return true;
    }

    // 8. Document class set by initial HTML inline script
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('app-is-installed')) {
      return true;
    }
  } catch (err) {
    console.warn('PWA detection check error:', err);
  }

  return false;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => isAppRunningAsPWA());
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const markAsInstalled = () => {
    setIsInstalled(true);
    persistInstalledFlag();
    setDeferredPrompt(null);
  };

  useEffect(() => {
    // Initial sync
    const installed = isAppRunningAsPWA();
    if (installed) {
      setIsInstalled(true);
      persistInstalledFlag();
    }

    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(userAgent);

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      // If already installed or running as PWA, discard prompt
      if (isAppRunningAsPWA()) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      markAsInstalled();
    };

    // Re-verify on window focus, visibilitychange or pageshow (e.g. when app resumes from Android task switcher)
    const handleRecheck = () => {
      if (isAppRunningAsPWA()) {
        setIsInstalled(true);
      }
    };

    // Listen for standalone display-mode changes
    const matchMediaStandalone = window.matchMedia('(display-mode: standalone)');
    const matchMediaFullscreen = window.matchMedia('(display-mode: fullscreen)');
    const matchMediaMinimal = window.matchMedia('(display-mode: minimal-ui)');

    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        markAsInstalled();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('focus', handleRecheck);
    window.addEventListener('visibilitychange', handleRecheck);
    window.addEventListener('pageshow', handleRecheck);

    if (matchMediaStandalone.addEventListener) {
      matchMediaStandalone.addEventListener('change', handleDisplayModeChange);
    }
    if (matchMediaFullscreen.addEventListener) {
      matchMediaFullscreen.addEventListener('change', handleDisplayModeChange);
    }
    if (matchMediaMinimal.addEventListener) {
      matchMediaMinimal.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('focus', handleRecheck);
      window.removeEventListener('visibilitychange', handleRecheck);
      window.removeEventListener('pageshow', handleRecheck);

      if (matchMediaStandalone.removeEventListener) {
        matchMediaStandalone.removeEventListener('change', handleDisplayModeChange);
      }
      if (matchMediaFullscreen.removeEventListener) {
        matchMediaFullscreen.removeEventListener('change', handleDisplayModeChange);
      }
      if (matchMediaMinimal.removeEventListener) {
        matchMediaMinimal.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  const install = async () => {
    // Immediate optimistic mark so UI elements vanish instantly
    markAsInstalled();

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
    return true;
  };

  return {
    isInstallable: !!deferredPrompt && !isInstalled,
    isInstalled,
    isIOS,
    isAndroid,
    install,
    markAsInstalled,
  };
}
