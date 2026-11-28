import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES, MENTORS } from '../../data/courses.js';
import { bnDigits, coursePath, finePointer, initials, photoKey, prefersReducedMotion } from '../../utils/format.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const MENTOR_META = {
  farhana: {
    tagEn: 'UI/UX Design',
    tagBn: 'UI/UX ডিজাইন',
    roleBn: 'প্রোডাক্ট ডিজাইনার · ফিনটেক',
    tone: 'coral',
    courseId: 2,
    rating: '4.9',
  },
  sabbir: {
    tagEn: 'Full-Stack · AI',
    tagBn: 'ফুল-স্ট্যাক · AI',
    roleBn: 'সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার',
    tone: 'cobalt',
    courseId: 4,
    rating: '4.8',
  },
  nusrat: {
    tagEn: 'IELTS · Band 8.5',
    tagBn: 'IELTS · ব্যান্ড ৮.৫',
    roleBn: 'সার্টিফায়েড IELTS ট্রেইনার',
    tone: 'saffron',
    courseId: 1,
    rating: '4.9',
  },
  rakib: {
    tagEn: 'Growth · Marketing',
    tagBn: 'গ্রোথ · মার্কেটিং',
    roleBn: 'গ্রোথ লিড · ই-কমার্স',
    tone: 'mint',
    courseId: 5,
    rating: '4.8',
  },
};

export default function Mentors() {
  const { t, x, num, lang } = useLang();
  const bn = lang === 'bn';
  const rafRef = useRef(null);

  const handleMove = (e) => {
    if (!finePointer() || prefersReducedMotion()) return;
    const card = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${clientX - r.left}px`);
      card.style.setProperty('--my', `${clientY - r.top}px`);
    });
  };

  return (
    <section className="sec mentors-sec" id="mentors">
      <div className="mentors-bg" aria-hidden="true">
        <span className="mentors-orb mo-1" />
        <span className="mentors-orb mo-2" />
        <span className="mentors-grid-tex" />
      </div>

      <div className="wrap">
        <SectionHead eyebrow={t('m_e')} title={t('m_t')} sub={t('m_s')} />

        <div className="mgrid">
          {MENTORS.map((m, i) => {
            const meta = MENTOR_META[m.k] || {};
            const course = COURSES.find((c) => c.id === meta.courseId) || COURSES.find((c) => c.m === m.k) || COURSES[0];
            const cs = COURSES.filter((c) => c.m === m.k).length || 1;
            const rating = bn ? bnDigits(meta.rating || '4.8') : meta.rating || '4.8';
            const learners = bn ? bnDigits(m.l) : m.l;

            return (
              <Reveal
                as="article"
                key={m.k}
                className={`mcard tone-${meta.tone || 'cobalt'}`}
                style={{ '--mb': m.bg, '--delay-idx': i, transitionDelay: `${i * 80}ms` }}
                onPointerMove={handleMove}
              >
                <Link
                  to={coursePath(course)}
                  className="mcard-link"
                  aria-label={bn ? `${m.n} — ${course.s} কোর্স দেখুন` : `${m.n} — Explore ${course.s}`}
                >
                  <div className="mcard-media">
                    <Media img={photoKey(m.k)} ini={initials(m.n)} />
                    <div className="mcard-vignette" aria-hidden="true" />
                    <span className="mcard-sheen" aria-hidden="true" />

                    <div className="mcard-top">
                      <span className="mcard-tag">
                        <i aria-hidden="true" />
                        <span>{bn ? meta.tagBn : meta.tagEn}</span>
                      </span>
                      <span className="mcard-rate">
                        <b>★</b> {rating}
                      </span>
                    </div>

                    <span className="mcard-course-pill">
                      <span>{num(cs)} {x.courses2}</span>
                      <span>·</span>
                      <span>{course.s}</span>
                    </span>
                  </div>

                  <div className="mcard-body">
                    <div className="mcard-head">
                      <h3>{m.n}</h3>
                      <span className="mcard-ver" title={bn ? 'ভেরিফায়েড মেন্টর' : 'Verified Mentor'} aria-hidden="true">
                        <Icon name="check" small />
                      </span>
                    </div>
                    <p className="mcard-role">{bn && meta.roleBn ? meta.roleBn : m.r}</p>

                    <div className="mcard-meta">
                      <div className="mcard-stats">
                        <span>
                          <b>{num(m.y)}+</b>
                          <small>{x.yrs}</small>
                        </span>
                        <span className="mcard-sep" aria-hidden="true" />
                        <span>
                          <b>{learners}+</b>
                          <small>{x.lrn}</small>
                        </span>
                      </div>
                      <span className="mcard-go" aria-hidden="true">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
