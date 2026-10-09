import { useEffect } from 'react';
import { finePointer, prefersReducedMotion } from '../utils/format.js';

/**
 * Site-wide pointer effects:
 *  - every .btn: the hover fill grows from the pointer position (--mx/--my)
 *  - every .magnet: the button leans towards the pointer
 */
export default function usePointerEffects() {
  useEffect(() => {
    const over = (e) => {
      const b = e.target.closest?.('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', e.clientX - r.left + 'px');
      b.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    document.addEventListener('pointerover', over);
    if (!finePointer() || prefersReducedMotion()) return () => document.removeEventListener('pointerover', over);

    let current = null;
    const move = (e) => {
      const m = e.target.closest?.('.magnet');
      if (current && current !== m) current.style.transform = '';
      current = m;
      if (!m) return;
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
    };
    document.addEventListener('pointermove', move);
    return () => {
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointermove', move);
    };
  }, []);
}
