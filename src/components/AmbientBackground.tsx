import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--scroll-px', `${window.scrollY * 0.15}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const bgColor = isLight ? '#fafafa' : '#08080f';
  const gridColor = isLight ? '#000000' : '#ffffff';
  const vignetteColor = isLight ? '#fafafa' : '#08080f';

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
      <div
        className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full blur-[160px] transition-transform duration-300"
        style={{ backgroundColor: isLight ? 'rgba(34, 197, 94, 0.06)' : 'rgba(16, 185, 129, 0.08)', transform: 'translate3d(calc(var(--scroll-px, 0px) * 0.5), calc(var(--scroll-px, 0px) * 0.3), 0)' }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full blur-[150px] transition-transform duration-300"
        style={{ backgroundColor: isLight ? 'rgba(14, 165, 233, 0.05)' : 'rgba(6, 95, 70, 0.10)', transform: 'translate3d(calc(var(--scroll-px, 0px) * -0.4), calc(var(--scroll-px, 0px) * 0.2), 0)' }}
      />
      <div
        className="absolute bottom-[10%] left-[30%] h-[450px] w-[450px] rounded-full blur-[140px] transition-transform duration-300"
        style={{ backgroundColor: isLight ? 'rgba(99, 102, 241, 0.04)' : 'rgba(16, 185, 129, 0.06)', transform: 'translate3d(calc(var(--scroll-px, 0px) * 0.3), calc(var(--scroll-px, 0px) * -0.25), 0)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] transition-transform duration-300"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          transform: 'translateY(calc(var(--scroll-px, 0px) * -0.5))',
        }}
      />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 40%, ${vignetteColor} 100%)` }} />
    </div>
  );
}
