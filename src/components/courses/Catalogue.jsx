import { useApp } from '../../context/AppContext.jsx';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { CATS, PER_PAGE } from '../../data/courses.js';
import Icon from '../common/Icon.jsx';
import CourseGrid from './CourseGrid.jsx';
import FilterSidebar from './FilterSidebar.jsx';
import { scrollToCourses } from './scrollToCourses.js';

/** Active filter chips, each removable. */
function useChips() {
  const { f } = useCatalogue();
  const { x, lang } = useLang();
  const out = [];
  if (f.type) out.push(['type', '', x[f.type]]);
  if (f.q) out.push(['q', '', '“' + f.q + '”']);
  f.cat.forEach((v) => out.push(['cat', v, CATS.find((c) => c.id === v)[lang]]));
  f.fmt.forEach((v) => out.push(['fmt', v, x[v]]));
  f.lvl.forEach((v) => out.push(['lvl', v, x[v]]));
  f.price.forEach((v) => out.push(['price', v, x[v]]));
  return out;
}

export default function Catalogue() {
  const { t, x, ui, num, lang } = useLang();
  const { f, results, update, toggle, setType, reset } = useCatalogue();
  const { setSideOpen } = useApp();
  const chips = useChips();

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const page = Math.min(f.page, pages);
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const goPage = (p) => {
    update({ page: p });
    scrollToCourses();
  };
  const removeChip = ([g, v]) => {
    if (g === 'type') setType(f.type);
    else if (g === 'q') update({ q: '', page: 1 });
    else toggle(g, v);
  };

  return (
    <section className="sec" id="courses" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="shop">
          <FilterSidebar />
          <div className="results">
            <div className="toolbar">
              <button type="button" className="btn btn-line btn-sm fbtn" onClick={() => setSideOpen(true)}>
                <svg className="ic s" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
                <span>{t('flt')}</span>
                <em>{chips.length ? num(chips.length) : ''}</em>
              </button>
              <span className="cnt" dangerouslySetInnerHTML={{ __html: x.avail(results.length) }} />
              <div className="tright">
                <label htmlFor="sort" className="sr">Sort</label>
                <select id="sort" className="sel" value={f.sort} onChange={(e) => update({ sort: e.target.value })}>
                  <option value="pop">{t('o1')}</option>
                  <option value="rating">{t('o2')}</option>
                  <option value="low">{t('o3')}</option>
                  <option value="soon">{t('o4')}</option>
                </select>
                <div className="view" role="group" aria-label="View">
                  <button type="button" aria-pressed={f.view === 'grid'} aria-label="Grid view" onClick={() => update({ view: 'grid' })}>
                    <svg className="ic s" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
                  </button>
                  <button type="button" aria-pressed={f.view === 'list'} aria-label="List view" onClick={() => update({ view: 'list' })}>
                    <svg className="ic s" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="chips">
              {chips.map((c) => (
                <button type="button" key={c[0] + c[1]} onClick={() => removeChip(c)}>
                  {c[2]}
                  <Icon name="x" small />
                </button>
              ))}
            </div>

            {results.length ? (
              <CourseGrid
                key={`${JSON.stringify([f.q, f.cat, f.fmt, f.lvl, f.price, f.type, f.sort])}-${page}-${lang}`}
                courses={shown}
                className={`grid${f.view === 'list' ? ' list' : ''}`}
              />
            ) : (
              <div className="grid">
                <div className="empty">
                  <Icon name="search" style={{ width: 32, height: 32, color: 'var(--faint)' }} />
                  <p>{ui.empty}</p>
                  <button type="button" className="btn btn-line btn-sm" onClick={reset}><span>{ui.reset}</span></button>
                </div>
              </div>
            )}

            <nav className="pager" aria-label="Pages">
              {results.length > 0 && pages > 1 && (
                <div className="pager-in">
                  <button type="button" disabled={page === 1} onClick={() => goPage(page - 1)}>
                    <Icon name="left" small />
                    {x.prev}
                  </button>
                  {Array.from({ length: pages }, (_, i) => (
                    <button type="button" key={i} aria-current={i + 1 === page ? 'page' : undefined} onClick={() => goPage(i + 1)}>
                      {num(i + 1)}
                    </button>
                  ))}
                  <button type="button" disabled={page === pages} onClick={() => goPage(page + 1)}>
                    {x.next}
                    <Icon name="right" small />
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
