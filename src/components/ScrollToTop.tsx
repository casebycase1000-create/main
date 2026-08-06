import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let attempts = 0;
      const maxAttempts = 10;
      const scrollToEl = () => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ block: 'start' });
          return true;
        }
        return false;
      };
      if (scrollToEl()) return;
      const interval = window.setInterval(() => {
        attempts++;
        if (scrollToEl() || attempts >= maxAttempts) {
          window.clearInterval(interval);
        }
      }, 100);
      return () => window.clearInterval(interval);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}
