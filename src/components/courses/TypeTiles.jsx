import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES, TYPES } from '../../data/courses.js';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import { scrollToCourses } from './scrollToCourses.js';

/** Format tiles (live, recorded, career…). Clicking one filters the grid below. */
export default function TypeTiles() {
  const { x, num } = useLang();
  const { f, setType } = useCatalogue();
  const { toast } = useApp();
  const navigate = useNavigate();

  return (
    <div className="types">
      {TYPES.map((ty, i) => {
        const n = ty.test ? COURSES.filter(ty.test).length : null;
        return (
          <Reveal
            as="button"
            type="button"
            key={ty.id}
            className="type"
            aria-pressed={f.type === ty.id}
            style={{ transitionDelay: `${i * 60}ms` }}
            onPointerMove={(e) => {
              const r = e.currentTarget.querySelector('.tb').getBoundingClientRect();
              e.currentTarget.style.setProperty('--tx', e.clientX - r.left + 'px');
              e.currentTarget.style.setProperty('--ty', e.clientY - r.top + 'px');
            }}
            onClick={() => {
              if (ty.go) return navigate(ty.go.replace('#', ''));
              if (ty.toast) return toast(x[ty.toast]);
              const turningOn = f.type !== ty.id;
              setType(ty.id);
              if (turningOn) scrollToCourses();
            }}
          >
            <span className="tb" style={{ background: ty.bg, color: ty.fg }}>
              <Icon name={ty.ic} />
              {n != null && <span className="tn">{num(n)}</span>}
            </span>
            <b>
              {x[ty.id]}
              <small>{x[ty.id.replace('examT', 'exam') + 'S']}</small>
            </b>
          </Reveal>
        );
      })}
    </div>
  );
}
