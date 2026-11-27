import { useRef } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import { FEATURE_ICONS } from '../../data/courses.js';
import useInView from '../../hooks/useInView.js';
import { finePointer, prefersReducedMotion } from '../../utils/format.js';
import Media from '../common/Media.jsx';
import SectionHead from './SectionHead.jsx';
import FeatureViz from './why/FeatureViz.jsx';

export default function WhyCertificate() {
  const { t, x, lang } = useLang();
  const [secRef, inView] = useInView({ threshold: 0.12 });
  const stageRef = useRef(null);
  const tilt = finePointer() && !prefersReducedMotion();

  const onStageMove = (e) => {
    if (!tilt || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    stageRef.current.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'deg');
    stageRef.current.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 8 + 'deg');
  };

  const onStageLeave = () => {
    if (!tilt || !stageRef.current) return;
    stageRef.current.style.setProperty('--ry', '0deg');
    stageRef.current.style.setProperty('--rx', '0deg');
  };

  const onCardMove = (e) => {
    if (!tilt) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);
    el.style.setProperty('--ry', `${((px / r.width) - 0.5) * 12}deg`);
    el.style.setProperty('--rx', `${-((py / r.height) - 0.5) * 12}deg`);
  };

  const onCardLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <section className={`sec${inView ? ' in' : ''}`} id="why" ref={secRef}>
      <div className="why-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="why-head">
          <SectionHead eyebrow={t('wy_e')} title={t('wy_t')} sub={t('wy_s')} />
        </div>

        <div className="why">
          <div className="feats">
            {x.feats.map(([title, body], i) => (
              <div
                key={i}
                className="feat"
                style={{
                  '--fc': FEATURE_ICONS[i][1],
                  '--fg': FEATURE_ICONS[i][2],
                  '--d': `${i * 80}ms`,
                }}
                onPointerMove={onCardMove}
                onPointerLeave={onCardLeave}
              >
                <FeatureViz index={i} lang={lang} />
                <div className="feat-txt">
                  <b>{title}</b>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cert-wrap">
            <div
              ref={stageRef}
              className="why-stage"
              onPointerMove={onStageMove}
              onPointerLeave={onStageLeave}
            >
              <div className="why-photo-wrap">
                <Media img="whyCert" className="why-photo" eager />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
