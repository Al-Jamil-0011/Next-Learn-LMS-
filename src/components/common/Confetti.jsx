import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { prefersReducedMotion } from '../../utils/format.js';

const COLS = ['#FFC53D', '#2F47E8', '#FF5A3C', '#6FDDBC', '#0E1430'];

/** Full-screen canvas burst, fired with confetti() from AppContext. */
export default function Confetti() {
  const ref = useRef(null);
  const { confettiRef } = useApp();

  useEffect(() => {
    confettiRef.current = () => {
      if (prefersReducedMotion()) return;
      const cv = ref.current;
      const x = cv.getContext('2d');
      cv.width = innerWidth;
      cv.height = innerHeight;
      const parts = Array.from({ length: 150 }, () => ({
        x: innerWidth / 2 + (Math.random() - 0.5) * 240, y: innerHeight * 0.42,
        vx: (Math.random() - 0.5) * 15, vy: -Math.random() * 15 - 4,
        s: Math.random() * 8 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: COLS[(Math.random() * COLS.length) | 0], sh: (Math.random() * 3) | 0,
      }));
      let f = 0;
      (function loop() {
        x.clearRect(0, 0, cv.width, cv.height);
        parts.forEach((p) => {
          p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
          x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c;
          if (p.sh === 0) x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          else if (p.sh === 1) { x.beginPath(); x.arc(0, 0, p.s / 2.4, 0, 7); x.fill(); }
          else { x.beginPath(); x.moveTo(0, -p.s / 2); x.lineTo(p.s / 2, p.s / 2); x.lineTo(-p.s / 2, p.s / 2); x.fill(); }
          x.restore();
        });
        if (++f < 160) requestAnimationFrame(loop);
        else x.clearRect(0, 0, cv.width, cv.height);
      })();
    };
    return () => { confettiRef.current = null; };
  }, [confettiRef]);

  return <canvas className="confetti" ref={ref} />;
}
