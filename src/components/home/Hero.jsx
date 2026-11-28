import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { HERO_ROT } from '../../i18n/strings.js';
import { finePointer, prefersReducedMotion } from '../../utils/format.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import HeroFlow from './hero/HeroFlow.jsx';
import HeroVideo from './hero/HeroVideo.jsx';
import heroVideoSrc from '../../assets/videos/nextlearn-hero-with-music.mp4';

export const HERO_VIDEO = { src: heroVideoSrc, poster: null };

/** Rotating highlighted word in the hero headline with dynamic measured width + saffron underline. */
function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(null);
  const [moved, setMoved] = useState(false);
  const [width, setWidth] = useState(null);
  const spanRefs = useRef([]);
  const reduced = prefersReducedMotion();

  const measure = (idx = i) => {
    const el = spanRefs.current[idx];
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (w > 0) setWidth(Math.ceil(w));
  };

  useEffect(() => {
    measure(i);
    document.fonts?.ready.then(() => measure(i));
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => measure(i));
    spanRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, words]);

  useEffect(() => {
    if (reduced) return undefined;
    let clear;
    const id = setInterval(() => {
      setMoved(true);
      setI((cur) => {
        setOut(cur);
        return (cur + 1) % words.length;
      });
      clearTimeout(clear);
      clear = setTimeout(() => setOut(null), 900);
    }, 2600);
    return () => {
      clearInterval(id);
      clearTimeout(clear);
    };
  }, [words, reduced]);

  return (
    <span
      className={`rot${moved ? ' anim-w' : ''}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      {words.map((w, k) => (
        <span
          key={w}
          ref={(el) => (spanRefs.current[k] = el)}
          className={k === i ? 'on' : k === out ? 'out' : undefined}
        >
          {w}
        </span>
      ))}
      <svg className="rot-ul" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 14 C 50 4, 120 4, 196 10" />
      </svg>
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const heroRef = useRef(null);
  const rafRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [offScreen, setOffScreen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const motion = !prefersReducedMotion();

  // Trigger intro one frame after mount
  useEffect(() => {
    let b;
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setLoaded(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, []);

  // Pause background animations when hero leaves viewport
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setOffScreen(!entry.isIntersecting),
      { threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerMove = (e) => {
    if (!finePointer() || !motion || !heroRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = heroRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      const nx = x / r.width - 0.5;
      const ny = y / r.height - 0.5;
      setTilt({
        ry: Number((nx * 8).toFixed(2)),
        rx: Number((-ny * 6).toFixed(2)),
      });
    });
  };

  const onPointerLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTilt({ rx: 0, ry: 0 });
  };

  const heroFade = (i) => ({
    className: `fade${loaded ? ' in' : ''}`,
    'data-hero': '',
    style: { '--d': i * 110 },
  });

  return (
    <section
      ref={heroRef}
      className={`hero${loaded ? ' loaded' : ''}${offScreen ? ' off' : ''}`}
      id="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-bg" aria-hidden="true">
        <span className="fl f1" />
        <span className="fl f2" />
        <span className="fl f3" />
        <span className="bg-grid" />
        <span className="bg-spot" />
        <span className="bg-grain" />
        <HeroFlow />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span {...heroFade(0)} className={`kick ${heroFade(0).className}`}>
            <b>
              <i className="k-dot" aria-hidden="true" />
              <span>{t('kb')}</span>
            </b>
            <span>{t('k2')}</span>
          </span>

          <h1 {...heroFade(1)} className={heroFade(1).className}>
            {t('h1x')} <RotatingWord key={lang} words={HERO_ROT[lang]} /> {t('h1y')}
            <br className="br" /> {t('h1z')}
          </h1>

          <p {...heroFade(2)} className={`lead ${heroFade(2).className}`}>
            {t('lead5')}
          </p>

          <div {...heroFade(3)} className={`ctas ${heroFade(3).className}`}>
            <Link to="/courses" className="cta-pri">
              <span>{t('hcta1')}</span>
              <span className="cta-arr" aria-hidden="true">
                <Arrow />
              </span>
            </Link>
            <Link to="/free" className="cta-sec">
              <span className="cta-play" aria-hidden="true">
                <Icon name="play" small />
              </span>
              <span>{t('hcta2')}</span>
              <span className="cta-tag">{t('htag')}</span>
            </Link>
          </div>

          <ul {...heroFade(4)} className={`ticks ${heroFade(4).className}`}>
            {[t('ht1'), t('ht2'), t('ht3')].map((item) => (
              <li key={item}>
                <span className="tk-ic" aria-hidden="true">
                  <Icon name="check" small />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div {...heroFade(5)} className={`hero-stage-wrap ${heroFade(5).className}`}>
          <HeroVideo
            src={HERO_VIDEO.src}
            poster={HERO_VIDEO.poster}
            tilt={tilt}
            offScreen={offScreen}
          />
        </div>
      </div>
    </section>
  );
}
