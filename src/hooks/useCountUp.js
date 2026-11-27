import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/format.js';

/** Counts from 0 to `to` with an ease-out once the element is 60% visible. Supports decimals. */
export default function useCountUp(to, duration = 1800) {
  const ref = useRef(null);
  const decimals = Number.isInteger(to) ? 0 : (String(to).split('.')[1]?.length || 1);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (prefersReducedMotion()) return setVal(to);
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / duration);
          const raw = to * (1 - Math.pow(1 - k, 4));
          setVal(decimals ? Number(raw.toFixed(decimals)) : Math.round(raw));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, decimals]);

  const formatted = decimals ? val.toFixed(decimals) : val.toLocaleString('en-IN');
  return [ref, formatted];
}
