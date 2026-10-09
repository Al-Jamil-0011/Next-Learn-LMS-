import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/format.js';

/** Counts from 0 to `to` with an ease-out once the element is 60% visible. */
export default function useCountUp(to, duration = 1800) {
  const ref = useRef(null);
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
          setVal(Math.round(to * (1 - Math.pow(1 - k, 4))));
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
  }, [to, duration]);
  return [ref, val.toLocaleString('en-IN')];
}
