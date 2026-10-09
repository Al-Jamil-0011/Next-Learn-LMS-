import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { ROT } from '../../i18n/strings.js';
import useScroll from '../../hooks/useScroll.js';
import { finePointer, prefersReducedMotion } from '../../utils/format.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';

/** The word that rotates in the headline ("Master design / coding / IELTS …"). */
function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(null);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let clear;
    const id = setInterval(() => {
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
  }, [words]);
  return (
    <span className="rot">
      {words.map((w, k) => (
        <span key={w} className={k === i ? 'on' : k === out ? 'out' : undefined}>{w}</span>
      ))}
    </span>
  );
}

/** Running clock on the live class mock. */
function LiveClock() {
  const [s, setS] = useState(42 * 60 + 18);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const t = [(s / 3600) | 0, ((s / 60) | 0) % 60, s % 60].map((n) => String(n).padStart(2, '0')).join(':');
  return <span className="mk-time num">{t}</span>;
}

const LAYERS = [
  { cls: 'ring', depth: -0.4 },
  { cls: 'dotgrid', depth: 0.5 },
  { cls: 'sunb', depth: 0.9 },
];

export default function Hero() {
  const { t, lang, x } = useLang();
  const { f, setQuery } = useCatalogue();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [q, setQ] = useState(f.q);
  const stage = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const motion = !prefersReducedMotion();

  useEffect(() => setQ(f.q), [f.q]);

  // Play the intro (headline mask, photo wipe, chips) one frame after mount.
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

  const moveLayers = () => {
    if (!motion || !stage.current) return;
    const sy = Math.min(window.scrollY, 900);
    const { x: mx, y: my } = pointer.current;
    stage.current.querySelectorAll('.layer').forEach((l) => {
      const d = +l.dataset.depth || 0;
      l.style.transform = `translate3d(${mx * d * -40}px,${my * d * -40 + sy * d * -0.12}px,0)`;
    });
  };
  useScroll(moveLayers);

  const onPointerMove = (e) => {
    if (!finePointer() || !motion) return;
    pointer.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    moveLayers();
  };

  const search = (term) => {
    setQuery(term);
    navigate('/courses');
  };

  const heroFade = (i) => ({ className: `fade${loaded ? ' in' : ''}`, 'data-hero': '', style: { '--d': i * 110 } });

  return (
    <section className={`hero${loaded ? ' loaded' : ''}`} id="hero" onPointerMove={onPointerMove}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span {...heroFade(0)} className={`kick ${heroFade(0).className}`}>
            <b>{t('kb')}</b>
            <span>{t('k2')}</span>
          </span>
          <h1 className={loaded ? 'in' : undefined}>
            <span className="lr">
              <span>
                <span>{t('h1x')}</span> <RotatingWord key={lang} words={ROT[lang]} />
              </span>
            </span>
            <span className="lr"><span>{t('h1y')}</span></span>
            <span className="lr"><span><span className="hl">{t('h1z')}</span></span></span>
          </h1>
          <p {...heroFade(1)} className={`lead ${heroFade(1).className}`}>{t('lead5')}</p>
          <form
            {...heroFade(2)}
            className={`finder ${heroFade(2).className}`}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              search(q.trim());
            }}
          >
            <Icon name="search" small />
            <label htmlFor="heroSearch" className="sr">Search courses</label>
            <input id="heroSearch" type="search" autoComplete="off" placeholder={t('ph1')} value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit" className="btn magnet">
              <span>{t('search')}</span>
              <Arrow />
            </button>
          </form>

        </div>

        <div className="stage" ref={stage} aria-hidden="true">
          {LAYERS.map((l) => (
            <span key={l.cls} className={`layer ${l.cls}`} data-depth={l.depth} />
          ))}
          <div className="layer ph-main" data-depth=".15">
            <div className="mock">
              <div className="mk-top">
                <span className="pill live" style={{ background: 'rgba(255,90,60,.16)', color: '#FF8A73' }}>LIVE</span>
                <span className="mk-t">{t('mk1')}</span>
                <LiveClock />
              </div>
              <div className="mk-main">
                <div className="mk-slide">
                  <div className="mk-bar"><i /><i /><i /></div>
                  <div className="mk-wire">
                    <span className="w1" /><span className="w2" /><span className="w3" /><span className="w4" /><span className="w5" />
                    <span className="mk-cursor">
                      <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 3l14 8-6 2-2 6z" fill="#FFC53D" stroke="#0B1030" strokeWidth="1.2" /></svg>
                      <b>Farhana</b>
                    </span>
                  </div>
                </div>
                <div className="mk-cam">
                  <Media img="mFarhana" ini="FA" eager />
                  <span className="mk-name">Farhana · <span>{t('mk2')}</span></span>
                  <span className="mk-wave"><i /><i /><i /><i /></span>
                </div>
              </div>
              <div className="mk-row">
                <span>SR</span><span>TK</span><span>NJ</span><span>RH</span><span className="more">+38</span>
                <span className="mk-chat"><Icon name="chat" small /><span>{t('mk3')}</span></span>
              </div>
            </div>
            <Media img="hero" eager />
          </div>

          <span className="hand">{t('hand')}</span>
        </div>
      </div>
    </section>
  );
}
