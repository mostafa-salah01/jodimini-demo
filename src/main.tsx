import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || 'حدث خطأ غير متوقع' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('JodiMini Uncaught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF8F4] flex flex-col items-center justify-center p-6 text-center text-[#3B4B59]">
          <div className="w-16 h-16 rounded-full bg-[#F26B4E]/10 flex items-center justify-center mb-4 text-2xl">
            🛍️
          </div>
          <h1 className="text-2xl font-bold mb-2">جاري تحديث متجر JodiMini...</h1>
          <p className="text-sm text-[#3B4B59]/75 mb-6 max-w-md">
            تم استلام أحدث نسخة للمتجر. يرجى الضغط على الزر أدناه لإعادة التحميل.
          </p>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
            className="px-6 py-3 rounded-xl bg-[#20969B] text-white font-bold text-sm shadow-md hover:bg-[#20969B]/90 transition-all cursor-pointer"
          >
            تحديث المتجر الآن
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Guard against duplicate root creation
const rootElement = document.getElementById('root');
if (rootElement) {
  const globalWin = window as unknown as { __jodimini_root?: ReactDOM.Root };
  if (!globalWin.__jodimini_root) {
    globalWin.__jodimini_root = ReactDOM.createRoot(rootElement);
  }
  globalWin.__jodimini_root.render(
    <React.StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </React.StrictMode>
  );
}

// Background PWA auto-update checker
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.ready
    .then((registration) => {
      // Trigger background update check
      try {
        registration.update();
      } catch (_) {}

      // Check for updates when coming back into view
      window.addEventListener('focus', () => {
        try {
          registration.update();
        } catch (_) {}
      });
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          try {
            registration.update();
          } catch (_) {}
        }
      });
    })
    .catch(() => {});
}
