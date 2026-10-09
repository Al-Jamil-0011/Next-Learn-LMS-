import { useEffect, useRef } from 'react';

/** Calls `fn` at most once per animation frame on scroll and resize. */
export default function useScroll(fn) {
  const cb = useRef(fn);
  cb.current = fn;
  useEffect(() => {
    let ticking = false;
    const run = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        cb.current();
        ticking = false;
      });
    };
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run);
    requestAnimationFrame(() => cb.current());
    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
    };
  }, []);
}
