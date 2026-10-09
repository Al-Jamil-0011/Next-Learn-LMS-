import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { coursePath, dateParts, finePointer, prefersReducedMotion, tk } from '../../utils/format.js';
import Icon from '../common/Icon.jsx';
import Banner from './Banner.jsx';

export default function CourseCard({ course: c, index = 0 }) {
  const navigate = useNavigate();
  const { ui, x, num } = useLang();
  const { isEnrolled, openEnrol } = useApp();
  const ref = useRef(null);
  const enrolled = isEnrolled(c.id);
  const live = c.f === 'live';
  const go = () => navigate(coursePath(c));
  const motion = finePointer() && !prefersReducedMotion();

  const onMove = (e) => {
    if (!motion) return;
    const b = ref.current.getBoundingClientRect();
    const bp = ref.current.querySelector('.bp');
    if (bp) bp.style.translate = `${((e.clientX - b.left) / b.width - 0.5) * -10}px ${((e.clientY - b.top) / b.height - 0.5) * -6}px`;
  };
  const onLeave = () => {
    const bp = ref.current?.querySelector('.bp');
    if (bp) bp.style.translate = '';
  };

  return (
    <article
      ref={ref}
      className="card"
      tabIndex={0}
      role="link"
      aria-label={c.t}
      style={{ animationDelay: `${index * 55}ms` }}
      onClick={go}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          go();
        }
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <Banner course={c} />
      <div className="cb">
        <h3>{c.t}</h3>
        <div className="meta">
          <span className="rt">
            <Icon name="star" small />
            <b>{c.r}</b> ({c.rv.toLocaleString('en-IN')})
          </span>
          <span>
            <Icon name="clock" small />
            {c.dur}
          </span>
        </div>
        <div className="meta">
          <span>
            {live ? (
              <>
                <Icon name="video" small />
                {ui.starts} {dateParts(c.st).d} {dateParts(c.st).m}
              </>
            ) : (
              <>
                <Icon name="infinity" small />
                {ui.life}
              </>
            )}
          </span>
          {live ? (
            <span style={{ color: '#C93A1F', fontWeight: 600 }}>
              {num(c.left)} {ui.left}
            </span>
          ) : (
            <span>{c.cls}</span>
          )}
        </div>
        <div className="cfoot">
          <div className="pr num">
            <b>{tk(c.p)}</b>
            <s>{tk(c.o)}</s>
          </div>
          <button
            type="button"
            className="btn btn-sm"
            disabled={enrolled}
            style={enrolled ? { '--bg': 'var(--mint)', '--fg': 'var(--ink)' } : undefined}
            onClick={(e) => {
              e.stopPropagation();
              openEnrol(c, e.currentTarget);
            }}
          >
            <span>{enrolled ? ui.enrolled : x.enroll}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
