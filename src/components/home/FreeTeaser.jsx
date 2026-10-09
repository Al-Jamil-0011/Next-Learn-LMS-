import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { SLOTS } from '../../data/courses.js';
import { Arrow } from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';

export default function FreeTeaser() {
  const { t, num, lang } = useLang();
  return (
    <section id="teaser">
      <div className="wrap">
        <Reveal className="teaser">
          <div className="t-copy">
            <span className="eyebrow"><i /><span>{t('fr_e')}</span></span>
            <h2 className="h2">{t('fr_t')}</h2>
            <p>{t('fr_s')}</p>
            <Link to="/free" className="btn btn-yellow magnet">
              <span>{t('fr_go')}</span>
              <Arrow />
            </Link>
          </div>
          <div className="t-list">
            {SLOTS.map((s) => (
              <Link to="/free" className="t-item" key={s.t}>
                <span className="sd"><small>{s.w}</small><b>{num(s.d)}</b><small>Oct</small></span>
                <span><b>{s.t}</b><small>{s.h} · {s.m}</small></span>
                <span className="pill glass">{lang === 'bn' ? 'ফ্রি' : 'Free'}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
