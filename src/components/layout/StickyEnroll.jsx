import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { IMAGES } from '../../data/images.js';
import { coursePath } from '../../utils/format.js';
import { getNextBatchCourse } from '../../utils/nextBatch.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';

const DISMISS_KEY = 'nl-sticky-dismissed';
const WATCH_SELECTORS = ['#hero', '#enroll-banner', '#enroll-proof', '#final-cta', 'footer'];

/**
 * Persistent bottom-left enroll pill (homepage desktop/tablet only).
 * Shows only when Hero has scrolled past and no other enroll moment or footer is in view.
 */
export default function StickyEnroll() {
  const { t, num } = useLang();
  const { openEnrol, isEnrolled, overlayOn } = useApp();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [heroPassed, setHeroPassed] = useState(false);
  const [anyVisible, setAnyVisible] = useState(true);

  useEffect(() => {
    if (dismissed) return undefined;

    const visibleMap = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visibleMap.set(e.target, e.isIntersecting);
          if (e.target.id === 'hero') {
            setHeroPassed(!e.isIntersecting && e.boundingClientRect.top < 0);
          }
        });
        const anyOn = Array.from(visibleMap.values()).some(Boolean);
        setAnyVisible(anyOn);
      },
      { threshold: 0.08 },
    );

    WATCH_SELECTORS.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        visibleMap.set(el, sel === '#hero');
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [dismissed]);

  if (dismissed) return null;

  const c = getNextBatchCourse();
  const enrolled = isEnrolled(c.id);
  const courseImg = IMAGES['course' + c.id] ? 'course' + c.id : 'cat_' + c.cat;
  const show = heroPassed && !anyVisible && !overlayOn;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      className={`ecta-sticky${show ? ' on' : ''}`}
      aria-label={c.s}
      aria-hidden={!show}
    >
      <div className="ecta-sticky-thumb">
        <Media img={courseImg} />
      </div>
      <div className="ecta-sticky-info">
        <b>{c.s}</b>
        <small>
          <span className="ecta-pulse-dot" aria-hidden="true" />
          <span>{num(c.left)} {t('ec_seats_left')}</span>
        </small>
      </div>
      {enrolled ? (
        <Link to={coursePath(c)} className="btn btn-sm ecta-btn-mint" tabIndex={show ? 0 : -1}>
          <span>{t('ec_continue')}</span>
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-sm ecta-shimmer"
          tabIndex={show ? 0 : -1}
          onClick={(e) => openEnrol(c, e.currentTarget)}
        >
          <span>{t('ec_enroll')}</span>
          <Arrow />
        </button>
      )}
      <button
        type="button"
        className="ecta-sticky-x"
        aria-label={t('ec_stk_dismiss')}
        tabIndex={show ? 0 : -1}
        onClick={dismiss}
      >
        <Icon name="x" small />
      </button>
    </aside>
  );
}
