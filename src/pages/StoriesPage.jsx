import { Link } from 'react-router-dom';
import { Arrow } from '../components/common/Icon.jsx';
import Media from '../components/common/Media.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import SectionHead from '../components/home/SectionHead.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { COURSES, STORIES, STORY_BG, WALL } from '../data/courses.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { coursePath, initials, photoKey } from '../utils/format.js';

export default function StoriesPage() {
  const { t, x } = useLang();
  useDocumentTitle('Success stories · NextLearn');
  return (
    <>
      <PageHero bg="bg_stories" crumb={t('nav4')} title={t('sp_t')} sub={t('sp_s')} />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="outc">
            {x.outc.map(([n, label], i) => (
              <Reveal key={i} className="oc" style={{ transitionDelay: `${i * 70}ms` }}>
                <b>{n}</b>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>
          <div className="slong">
            {STORIES.map((s, i) => {
              const c = COURSES.find((k) => s.m.startsWith(k.s.split(' ')[0])) || COURSES[1];
              return (
                <Reveal as="article" key={s.k} className="sl">
                  <div className="sl-img" style={{ '--sb': STORY_BG[i] }}>
                    <Media img={photoKey(s.k)} ini={initials(s.n)} />
                    <div className="res"><b>{s.res}</b><small>{s.m}</small></div>
                  </div>
                  <div className="sl-body">
                    <q>{s.q}</q>
                    <div className="who">
                      <span className="stars">★★★★★</span>
                      <span><b>{s.n}</b><span>{s.m}</span></span>
                    </div>
                    <div className="tl">
                      <Link to={coursePath(c)} className="btn btn-line btn-sm">
                        <span>{c.s}</span>
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="sec soft">
        <div className="wrap">
          <SectionHead eyebrow={t('sv_e')} title={t('sv_t')} />
          <div className="walls">
            {WALL.map(([name, bg, course, quote], i) => (
              <Reveal key={name} className="wq" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <p>“{quote}”</p>
                <div className="who">
                  <i style={{ background: bg }}>{initials(name)}</i>
                  <span><b>{name}</b><span>{course}</span></span>
                  <span className="stars" style={{ marginLeft: 'auto' }}>★★★★★</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
