if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Check if the page is ALREADY controlled by an existing service worker before register
    const hadExistingController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker
      .register('./sw.js', { scope: './' })
      .then((registration) => {
        // Automatically check for new updates on open
        try {
          registration.update();
        } catch (_) {}

        // Check for updates whenever returning from background
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            try {
              registration.update();
            } catch (_) {}
          }
        });
        window.addEventListener('focus', () => {
          try {
            registration.update();
          } catch (_) {}
        });

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Background update downloaded: if user already had previous version, reload once to show updates
                if (hadExistingController && !sessionStorage.getItem('jodimini_sw_updated')) {
                  sessionStorage.setItem('jodimini_sw_updated', 'true');
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('ServiceWorker registration error:', err);
      });

    let isRefreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // ONLY reload if there was already an old controller running (do NOT reload on initial visit)
      if (hadExistingController && !isRefreshing && !sessionStorage.getItem('jodimini_sw_updated')) {
        isRefreshing = true;
        sessionStorage.setItem('jodimini_sw_updated', 'true');
        window.location.reload();
      }
    });
  });
}
