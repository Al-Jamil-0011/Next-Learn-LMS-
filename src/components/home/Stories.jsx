import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { STORIES } from '../../data/courses.js';
import { initials, photoKey } from '../../utils/format.js';
import { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const PILLS = ['mint', 'sun', ''];

export default function Stories() {
  const { t } = useLang();
  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <SectionHead eyebrow={t('ss_e')} title={t('ss_t')}>
          <Link to="/stories" className="btn btn-line">
            <span>{t('ss_all')}</span>
            <Arrow />
          </Link>
        </SectionHead>
        <div className="stories">
          {STORIES.map((s, i) => (
            <Reveal as="article" key={s.k} className="sc" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className={`pill ${PILLS[i]} res`}>{s.res}</span>
              <q>{s.q}</q>
              <div className="who">
                <i><Media img={photoKey(s.k)} ini={initials(s.n)} /></i>
                <div><b>{s.n}</b><span>{s.m}</span></div>
                <span className="stars" style={{ marginLeft: 'auto' }}>★★★★★</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
