import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES, MENTORS } from '../../data/courses.js';
import { bnDigits, initials, photoKey } from '../../utils/format.js';
import Media from '../common/Media.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Mentors() {
  const { t, x, num, lang } = useLang();
  return (
    <section className="sec soft" id="mentors">
      <div className="wrap">
        <SectionHead eyebrow={t('m_e')} title={t('m_t')} sub={t('m_s')} />
        <div className="mgrid">
          {MENTORS.map((m, i) => {
            const cs = COURSES.filter((c) => c.m === m.k).length || 1;
            return (
              <Reveal as="article" key={m.k} className="mc" style={{ '--mb': m.bg, transitionDelay: `${i * 80}ms` }}>
                <div className="mf">
                  <span className="arch" />
                  <Media img={photoKey(m.k)} ini={initials(m.n)} />
                  <div className="mso"><span>{num(cs)} {x.courses2}</span><span>★ 4.8</span></div>
                </div>
                <div className="mb">
                  <h3>{m.n}</h3>
                  <p>{m.r}</p>
                  <div className="mst">
                    <span><b>{num(m.y)}</b>{x.yrs}</span>
                    <span><b>{lang === 'bn' ? bnDigits(m.l) : m.l}</b>{x.lrn}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
