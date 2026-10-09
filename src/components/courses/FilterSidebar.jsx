import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { CATS, COURSES } from '../../data/courses.js';
import { filterCourses } from '../../utils/filterCourses.js';
import { levelOf, priceOf } from '../../utils/format.js';
import Icon, { ChevronDown } from '../common/Icon.jsx';
import { scrollToCourses } from './scrollToCourses.js';

function Check({ group, value, label, count }) {
  const { f, toggle } = useCatalogue();
  const { num } = useLang();
  return (
    <label className="chk">
      <input type="checkbox" checked={f[group].includes(value)} onChange={() => toggle(group, value)} />
      <span className="bx"><Icon name="check" /></span>
      <span>{label}</span>
      <em>{num(count)}</em>
    </label>
  );
}

function Group({ title, open = true, children }) {
  return (
    <details className="fgroup" open={open}>
      <summary><span>{title}</span><ChevronDown /></summary>
      <div className="fopts">{children}</div>
    </details>
  );
}

/** Search + checkbox filters. On mobile it slides in as a drawer. */
export default function FilterSidebar() {
  const { t, x, lang, num } = useLang();
  const { f, update, reset } = useCatalogue();
  const { sideOpen, setSideOpen, toast } = useApp();
  const [q, setQ] = useState(f.q);
  const closeRef = useRef(null);

  useEffect(() => setQ(f.q), [f.q]);
  useEffect(() => {
    if (sideOpen) setTimeout(() => closeRef.current?.focus(), 60);
  }, [sideOpen]);

  // Live search, debounced.
  useEffect(() => {
    if (q.trim() === f.q) return undefined;
    const id = setTimeout(() => update({ q: q.trim(), page: 1 }), 160);
    return () => clearTimeout(id);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  const apply = () => {
    const next = { ...f, q: q.trim(), page: 1 };
    update({ q: next.q, page: 1 });
    setSideOpen(false);
    scrollToCourses();
    const n = filterCourses(next).length;
    toast(lang === 'bn' ? `${num(n)}টি কোর্স পাওয়া গেছে` : `${n} courses found`);
  };

  return (
    <aside className={`side${sideOpen ? ' on' : ''}`} aria-label="Filters">
      <div className="side-h">
        <b>{t('flt')}</b>
        <button type="button" className="sx" aria-label="Close filters" ref={closeRef} onClick={() => setSideOpen(false)}>
          <Icon name="x" small />
        </button>
      </div>
      <div className="search">
        <Icon name="search" small />
        <label htmlFor="q" className="sr">Search</label>
        <input id="q" type="search" autoComplete="off" placeholder={t('ph2')} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <Group title={t('g1')}>
        {CATS.map((c) => (
          <Check key={c.id} group="cat" value={c.id} label={c[lang]} count={COURSES.filter((k) => k.cat === c.id).length} />
        ))}
      </Group>
      <Group title={t('g2')}>
        {['live', 'self'].map((v) => (
          <Check key={v} group="fmt" value={v} label={x[v]} count={COURSES.filter((c) => c.f === v).length} />
        ))}
      </Group>
      <Group title={t('g3')}>
        {['beg', 'int', 'alll', 'exam'].map((v) => (
          <Check key={v} group="lvl" value={v} label={x[v]} count={COURSES.filter((c) => levelOf(c) === v).length} />
        ))}
      </Group>
      <Group title={t('g4')} open={false}>
        {['lt2', 'mid', 'gt5'].map((v) => (
          <Check key={v} group="price" value={v} label={x[v]} count={COURSES.filter((c) => priceOf(c) === v).length} />
        ))}
      </Group>
      <div className="acts">
        <button type="button" className="btn" onClick={apply}><span>{t('apply')}</span></button>
        <button type="button" className="btn btn-line" onClick={() => { reset(); setQ(''); }}><span>{t('resetf')}</span></button>
      </div>
    </aside>
  );
}
