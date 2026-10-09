import { useEffect, useRef, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES } from '../../data/courses.js';
import usePointerEffects from '../../hooks/usePointerEffects.js';
import { prefersReducedMotion } from '../../utils/format.js';
import Confetti from '../common/Confetti.jsx';
import IconSprite from '../common/IconSprite.jsx';
import Toast from '../common/Toast.jsx';
import EnrolModal from '../enrol/EnrolModal.jsx';
import Curtain from './Curtain.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { NAV, pageOf } from './navItems.js';
import Newsletter from './Newsletter.jsx';
import ScrollChrome from './ScrollChrome.jsx';
import SocialRail from './SocialRail.jsx';
import TopBar from './TopBar.jsx';

const jumpTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

/**
 * App shell. Route changes play the curtain: it covers the screen, the new page swaps in
 * underneath (scrolled to top), then the curtain lifts.
 */
export default function Layout({ children }) {
  const location = useLocation();
  const { t } = useLang();
  const { overlayOn, closeAll } = useApp();
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState('');
  const [label, setLabel] = useState('NextLearn');
  const shownPath = useRef(location.pathname);
  usePointerEffects();

  useEffect(() => {
    if (location.pathname === shownPath.current) {
      setShown(location);
      return undefined;
    }
    closeAll(true);
    const swap = () => {
      shownPath.current = location.pathname;
      setShown(location);
      jumpTop();
    };
    if (prefersReducedMotion()) {
      swap();
      return undefined;
    }
    const page = pageOf(location.pathname);
    const course = page === 'course' ? COURSES.find((c) => c.id === parseInt(location.pathname.split('/')[2], 10)) : null;
    const nav = NAV.find((n) => n.page === page);
    const companyKeys = { about: 'f_a', teach: 'f_t', verify: 'f_v', 'refund-policy': 'f_r' };
    const companyLabel = companyKeys[page] ? t(companyKeys[page]) : null;
    setLabel(course ? course.s : nav ? t(nav.key) : companyLabel || 'NextLearn');
    setPhase('cover');
    let t2;
    const t1 = setTimeout(() => {
      swap();
      setPhase('uncover');
      t2 = setTimeout(() => setPhase(''), 700);
    }, 560);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const page = pageOf(shown.pathname);
  useEffect(() => {
    document.body.dataset.route = page;
  }, [page]);

  return (
    <>
      <IconSprite />
      <ScrollChrome />
      <SocialRail />
      <TopBar />
      <Header page={page} />
      <main id="view">
        <div className="page on" key={shown.pathname}>
          <Routes location={shown}>{children}</Routes>
        </div>
      </main>
      <Newsletter />
      <Footer />
      <div className={`overlay${overlayOn ? ' on' : ''}`} onClick={() => closeAll()} />
      <EnrolModal />
      <Curtain phase={phase} label={label} />
      <Confetti />
      <Toast />
    </>
  );
}
