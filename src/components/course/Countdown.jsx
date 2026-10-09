import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import { prefersReducedMotion } from '../../utils/format.js';

/** One countdown cell; the number drops in each time it changes. */
function Cell({ value, label }) {
  const ref = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!prefersReducedMotion() && ref.current?.animate) {
      ref.current.animate([{ transform: 'translateY(-30%)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
        duration: 350,
        easing: 'cubic-bezier(.2,.7,.1,1)',
      });
    }
  }, [value]);
  return (
    <div>
      <b ref={ref}>{value}</b>
      <small>{label}</small>
    </div>
  );
}

/** Days / hours / minutes / seconds until `target` (ms timestamp). */
export default function Countdown({ target }) {
  const { y, num } = useLang();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.max(0, ((target - now) / 1000) | 0);
  const parts = [(s / 86400) | 0, ((s % 86400) / 3600) | 0, ((s % 3600) / 60) | 0, s % 60];
  const labels = [y.dd, y.hh, y.mm, y.ss];
  return (
    <div className="cd-cd">
      {parts.map((n, i) => (
        <Cell key={i} value={num(String(n).padStart(2, '0'))} label={labels[i]} />
      ))}
    </div>
  );
}
