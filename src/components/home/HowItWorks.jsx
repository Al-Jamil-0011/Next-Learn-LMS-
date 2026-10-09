import { useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import useScroll from '../../hooks/useScroll.js';
import { prefersReducedMotion } from '../../utils/format.js';
import Icon from '../common/Icon.jsx';
import Lines from '../common/Lines.jsx';
import Media from '../common/Media.jsx';

const PANELS = [
  { n: '01', img: 'how1', pill: '', day: 'd1', h: 'st1', p: 'st1p', a: 'st1a', b: 'st1b' },
  { n: '02', img: 'how2', pill: 'sun', day: 'd2', h: 'st2', p: 'st2p', a: 'st2a', b: 'st2b' },
  { n: '03', img: 'how3', pill: 'mint', day: 'd3', h: 'st3', p: 'st3p', a: 'st3a', b: 'st3b' },
  { n: '04', img: 'how4', pill: 'live', day: 'd4', h: 'st4', p: 'st4p', a: 'st4a', b: 'st4b' },
];

/** Pinned section: vertical scroll drives the panels sideways (desktop only). */
export default function HowItWorks() {
  const { t } = useLang();
  const pin = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [n, setN] = useState(1);

  useScroll(() => {
    const el = pin.current;
    if (!el) return;
    if (window.innerWidth > 900) {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const k = Math.max(0, Math.min(1, -r.top / total));
      const dist = track.current.scrollWidth - window.innerWidth;
      track.current.style.transform = `translate3d(${-k * Math.max(0, dist)}px,0,0)`;
      bar.current.style.transform = `scaleX(${k})`;
      setN(Math.min(3, Math.floor(k * 4)) + 1);
    } else {
      track.current.style.transform = '';
    }
    if (prefersReducedMotion()) return;
    el.querySelectorAll('img.px').forEach((im) => {
      const r = im.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      im.style.transform = `translateY(${((r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight) * -7}%)`;
    });
  });

  return (
    <section className="pin" id="how" style={{ '--panels': 4 }} ref={pin}>
      <div className="pin-in">
        <div className="wrap">
          <div className="pin-head">
            <div>
              <span className="eyebrow"><i /><span>{t('s_e')}</span></span>
              <Lines className="h2">{t('s_t')}</Lines>
            </div>
            <div className="pin-count num"><b>0{n}</b> / 04</div>
          </div>
        </div>
        <div className="track" ref={track}>
          {PANELS.map((p) => (
            <article className="panel" key={p.n}>
              <div className="pm">
                <Media img={p.img} parallax />
                <span className="pnum">{p.n}</span>
              </div>
              <div className="pb">
                <span className={`pill${p.pill ? ' ' + p.pill : ''}`}>{t(p.day)}</span>
                <h3>{t(p.h)}</h3>
                <p>{t(p.p)}</p>
                <ul>
                  <li><Icon name="check" small /><span>{t(p.a)}</span></li>
                  <li><Icon name="check" small /><span>{t(p.b)}</span></li>
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="wrap"><div className="pin-bar"><i ref={bar} /></div></div>
      </div>
    </section>
  );
}
