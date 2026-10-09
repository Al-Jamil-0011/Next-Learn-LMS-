import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import useScroll from '../../hooks/useScroll.js';
import { prefersReducedMotion } from '../../utils/format.js';
import Icon from '../common/Icon.jsx';

/** Scroll progress line, back-to-top button and the mobile bottom CTA bar. */
export default function ScrollChrome() {
  const { t } = useLang();
  const prog = useRef(null);
  const [mbar, setMbar] = useState(false);
  const [top, setTop] = useState(false);

  useScroll(() => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog.current) prog.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    setMbar(y > 600);
    setTop(y > 1200);
  });

  return (
    <>
      <div className="progress-top" ref={prog} />
      <button
        type="button"
        className={`totop${top ? ' on' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      >
        <Icon name="arrow" small style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <div className={`mbar${mbar ? ' on' : ''}`}>
        <Link to="/free" className="btn btn-line"><span>{t('cta2')}</span></Link>
        <Link to="/courses" className="btn"><span>{t('cta1')}</span></Link>
      </div>
    </>
  );
}
