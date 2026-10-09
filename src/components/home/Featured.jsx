import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES } from '../../data/courses.js';
import { Arrow } from '../common/Icon.jsx';
import CourseGrid from '../courses/CourseGrid.jsx';
import SectionHead from './SectionHead.jsx';

const TABS = ['pop', 'live', 'self', 'soon'];

export default function Featured() {
  const { t, x, lang } = useLang();
  const [tab, setTab] = useState('pop');
  const tabsRef = useRef(null);
  const glideRef = useRef(null);

  const glide = useCallback(() => {
    const on = tabsRef.current?.querySelector('[aria-selected="true"]');
    const g = glideRef.current;
    if (!on || !g) return;
    g.style.width = on.offsetWidth + 'px';
    g.style.transform = `translateX(${on.offsetLeft}px)`;
  }, []);

  useLayoutEffect(glide, [tab, lang, glide]);
  useEffect(() => {
    window.addEventListener('resize', glide);
    document.fonts?.ready.then(glide);
    return () => window.removeEventListener('resize', glide);
  }, [glide]);

  const list = useMemo(() => {
    let r = [...COURSES];
    if (tab === 'live') r = r.filter((c) => c.f === 'live');
    if (tab === 'self') r = r.filter((c) => c.f === 'self');
    r.sort(tab === 'soon' ? (a, b) => (a.st || '9999').localeCompare(b.st || '9999') : (a, b) => b.pop - a.pop);
    return r.slice(0, 6);
  }, [tab]);

  return (
    <section className="sec soft" id="featured">
      <div className="wrap">
        <SectionHead eyebrow={t('fe_e')} title={t('fe_t')}>
          <div className="ftabs" role="tablist" ref={tabsRef}>
            {TABS.map((k) => (
              <button key={k} type="button" role="tab" aria-selected={k === tab} onClick={() => setTab(k)}>
                {x.ftab[k]}
              </button>
            ))}
            <span className="glide" ref={glideRef} />
          </div>
        </SectionHead>
        <CourseGrid key={tab} courses={list} />
        <div className="center">
          <Link to="/courses" className="btn btn-ink magnet">
            <span>{t('fe_all')}</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
