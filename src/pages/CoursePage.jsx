import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useParams } from 'react-router-dom';
import BuyCard from '../components/course/BuyCard.jsx';
import Curriculum from '../components/course/Curriculum.jsx';
import CourseGrid from '../components/courses/CourseGrid.jsx';
import FaqList from '../components/common/FaqList.jsx';
import Icon from '../components/common/Icon.jsx';
import Lines from '../components/common/Lines.jsx';
import Media from '../components/common/Media.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useCatalogue } from '../context/CatalogueContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { COURSES, REVS } from '../data/courses.js';
import { IMAGES } from '../data/images.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useScroll from '../hooks/useScroll.js';
import { dateParts, initials, photoKey, prefersReducedMotion, tk } from '../utils/format.js';

const TABS = ['ov', 'cur', 'men', 'rev', 'faq'];

/** A section that fades in and gets `.in` (which also fills the rating bars). */
function Sec({ id, title, children }) {
  return (
    <Reveal as="section" fade={false} className="cd-sec" id={id}>
      <h2>{title}</h2>
      {children}
    </Reveal>
  );
}

export default function CoursePage() {
  const { slug } = useParams();
  const c = COURSES.find((x) => x.id === parseInt(slug, 10));
  if (!c) return <Navigate to="/courses" replace />;
  return <CourseDetails key={c.id} c={c} />;
}

function CourseDetails({ c }) {
  const { t, lang, ui, x, y, num } = useLang();
  const { isEnrolled, openEnrol } = useApp();
  const { onlyCategory } = useCatalogue();
  useDocumentTitle(c.t + ' · NextLearn');

  const live = c.f === 'live';
  const enrolled = isEnrolled(c.id);
  const stu = Math.round(c.rv * 3.4);
  const [active, setActive] = useState('cd-ov');
  const [cbarOn, setCbarOn] = useState(false);
  const tl = useRef(null);
  const ul = useRef(null);
  const buy = useRef(null);
  const side = useRef(null);

  const related = useMemo(
    () =>
      COURSES.filter((k) => k.id !== c.id && (k.cat === c.cat || k.goals.some((g) => c.goals.includes(g))))
        .sort((a, b) => (b.cat === c.cat) - (a.cat === c.cat) || b.pop - a.pop)
        .slice(0, 3),
    [c],
  );
  const dist = [[5, Math.round((c.r - 4) * 100)], [4, Math.round((5 - c.r) * 70)], [3, 6], [2, 2], [1, 1]];
  const tot = dist.reduce((a, d) => a + d[1], 0);

  /* tab underline follows the active tab */
  const moveUl = useCallback(() => {
    const on = tl.current?.querySelector('button.on');
    if (!on || !ul.current) return;
    ul.current.style.width = on.offsetWidth + 'px';
    ul.current.style.transform = `translateX(${on.offsetLeft}px)`;
  }, []);
  useLayoutEffect(moveUl, [active, lang, moveUl]);

  /* the buy card sits in the body column but is pulled up beside the hero, then stays sticky */
  const pullBuy = useCallback(() => {
    const b = buy.current;
    const crumbs = document.querySelector('.cd-hero .crumbs');
    if (!b || !crumbs || !side.current) return;
    if (window.innerWidth <= 900) {
      b.style.marginTop = '';
      return;
    }
    b.style.marginTop = -(side.current.getBoundingClientRect().top - crumbs.getBoundingClientRect().top) + 'px';
  }, []);
  useLayoutEffect(() => {
    pullBuy();
    const onResize = () => {
      pullBuy();
      moveUl();
    };
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(pullBuy);
    return () => window.removeEventListener('resize', onResize);
  }, [pullBuy, moveUl, lang]);

  /* scroll spy + mobile bottom bar */
  useScroll(() => {
    setCbarOn(!!buy.current && buy.current.getBoundingClientRect().bottom < 0);
    let cur = 'cd-ov';
    document.querySelectorAll('.cd-sec[id]').forEach((s) => {
      if (s.getBoundingClientRect().top < 180) cur = s.id;
    });
    setActive(cur);
  });

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <section className="cd-hero" style={{ '--tb': c.k.tb }}>
        {IMAGES['bg_cat_' + c.cat]?.src && (
          <div className="phero-bg" aria-hidden="true">
            <img src={IMAGES['bg_cat_' + c.cat].src} alt="" decoding="async" fetchpriority="high" />
          </div>
        )}
        <div className="wrap cd-grid">
          <div>
            <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
              <Link to="/">{t('nh')}</Link>
              <Icon name="right" small />
              <Link to="/courses">{y.crumbC}</Link>
              <Icon name="right" small />
              <Link to="/courses" onClick={() => onlyCategory(c.cat)}>{c.k[lang]}</Link>
              <Icon name="right" small />
              <span>{c.s}</span>
            </Reveal>
            <Reveal className="cd-pills">
              {live ? (
                <span className="pill live" style={{ background: '#fff' }}>{x.liveB(c.b)}</span>
              ) : (
                <span className="pill white">{x.rec}</span>
              )}
              <span className="pill glass">{c.k[lang]}</span>
              <span className="pill glass">{c.lvl}</span>
            </Reveal>
            <Lines as="h1">{c.t}</Lines>
            <Reveal as="p" className="desc">
              Learn {c.s} step by step with {c.mn}, {c.mr.toLowerCase()}.{' '}
              {live ? `${c.cls} over ${c.dur}, all in Bangla, with every class recorded.` : `${c.cls} you can watch any time, with lifetime access.`}{' '}
              Build real projects and finish with a certificate employers can verify.
            </Reveal>
            <Reveal className="cd-meta">
              <span><b>{c.r}</b><span className="stars">★★★★★</span>({c.rv.toLocaleString('en-IN')} {y.revs})</span>
              <span><Icon name="users" small />{y.stu(stu.toLocaleString('en-IN'))}</span>
              <span><Icon name="globe" small />{y.lang}</span>
              <span><Icon name="cal" small />{y.updated}</span>
            </Reveal>
            <Reveal className="cd-by">
              <i><Media img={photoKey(c.m)} ini={initials(c.mn)} /></i>
              <span><small>{y.by}</small><b>{c.mn}</b></span>
            </Reveal>
          </div>
          <div />
        </div>
      </section>

      <div className="cd-tabs">
        <div className="wrap">
          <div className="cd-tl" ref={tl}>
            {TABS.map((k) => (
              <button key={k} type="button" className={active === 'cd-' + k ? 'on' : undefined} onClick={() => jump('cd-' + k)}>
                {y[k]}
              </button>
            ))}
            <span className="ul" ref={ul} />
          </div>
          <div />
        </div>
      </div>

      <div className="wrap cd-body">
        <div className="cd-main">
          <Sec id="cd-ov" title={y.about}>
            <p>
              {c.t} takes you from the basics to confident, job-ready work. Each week mixes {live ? 'live classes' : 'short video lessons'}, guided practice and a
              project your mentor reviews. You can ask questions any time in the batch community, and our support team is on WhatsApp until 11 pm.
            </p>
          </Sec>
          <Sec title={y.learn}>
            <div className="cd-learn">
              <ul>
                {c.learn.map((l) => (
                  <li key={l}><Icon name="checkc" small />{l}</li>
                ))}
              </ul>
            </div>
            <h3 style={{ margin: '28px 0 0', fontSize: '1.1rem' }}>{y.forw}</h3>
            <div className="cd-for">
              {c.goals.map((g) => (
                <span key={g}><Icon name="check" small style={{ color: 'var(--cobalt)' }} />{y.fors[g]}</span>
              ))}
              <span><Icon name="check" small style={{ color: 'var(--cobalt)' }} />{c.lvl}</span>
            </div>
          </Sec>
          <Sec title={y.sched}>
            <div className="cd-sched">
              <div><Icon name="cal" /><small>{y.start}</small><b>{live ? dateParts(c.st).full : y.selfStart}</b></div>
              <div><Icon name="video" /><small>{y.days}</small><b>{live ? 'Sun · Tue · Thu' : lang === 'bn' ? 'যেকোনো দিন' : 'Any day'}</b></div>
              <div><Icon name="clock" /><small>{y.time}</small><b>{live ? c.time : lang === 'bn' ? 'আপনার সুবিধামতো' : 'Your choice'}</b></div>
              <div><Icon name="book" /><small>{y.dur}</small><b>{c.dur} · {c.cls}</b></div>
            </div>
          </Sec>
          <Sec title={y.proj}>
            <div className="cd-proj">
              {c.learn.slice(0, 3).map((l, i) => (
                <div className="pj" style={{ '--tb': c.k.tb }} key={l}>
                  <div className="pjt"><span /></div>
                  <div className="pjb"><small>{lang === 'bn' ? 'প্রজেক্ট' : 'Project'} {num(i + 1)}</small><b>{l}</b></div>
                </div>
              ))}
            </div>
          </Sec>
          <Sec id="cd-cur" title={y.cur}>
            <Curriculum course={c} />
          </Sec>
          <Sec id="cd-men" title={y.yourM}>
            <div className="cd-mentor" style={{ '--tb': c.k.tb }}>
              <div className="mp"><Media img={photoKey(c.m)} ini={initials(c.mn)} /></div>
              <div>
                <h3>{c.mn}</h3>
                <div className="role">{c.mr}</div>
                <p>
                  {c.mn.split(' ')[0]} has taught hundreds of learners and still works in the field every day. Every project in this course is reviewed personally,
                  with weekly support sessions for anyone who gets stuck.
                </p>
                <div className="mst">
                  <span><b>4.8</b>{y.rating}</span>
                  <span><b>{(stu * 2).toLocaleString('en-IN')}</b>{y.students}</span>
                  <span><b>{num(COURSES.filter((k) => k.mn === c.mn).length)}</b>{x.courses2}</span>
                </div>
              </div>
            </div>
          </Sec>
          <Sec id="cd-rev" title={y.rev}>
            <div className="cd-rev">
              <div className="big">
                <b>{c.r}</b>
                <div className="stars">★★★★★</div>
                <small>{c.rv.toLocaleString('en-IN')} {y.revs}</small>
              </div>
              <div className="rbars">
                {dist.map(([star, n]) => {
                  const pct = Math.round((n / tot) * 100);
                  return (
                    <div className="rbar" key={star}>
                      <b>{star} ★</b>
                      <span><i style={{ '--w': pct + '%' }} /></span>
                      <small>{pct}%</small>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="revs">
              {REVS.map(([name, bg, text]) => (
                <div className="rv" key={name}>
                  <div className="rh">
                    <i style={{ background: bg }}>{initials(name)}</i>
                    <div><b>{name}</b><small>{c.s} · {lang === 'bn' ? 'যাচাইকৃত শিক্ষার্থী' : 'Verified learner'}</small></div>
                    <span className="stars">★★★★★</span>
                  </div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Sec>
          <Sec id="cd-faq" title={y.faq}>
            <FaqList limit={5} />
          </Sec>
        </div>
        <div className="cd-side" ref={side}>
          <BuyCard course={c} ref={buy} />
        </div>
      </div>

      <section className="cd-rel">
        <div className="wrap">
          <Lines>{y.related}</Lines>
          <CourseGrid courses={related} />
        </div>
      </section>

      {createPortal(
        <div className={`cbar${cbarOn ? ' on' : ''}`}>
          <div className="price"><b>{tk(c.p)}</b><s>{tk(c.o)}</s></div>
          <button type="button" className="btn" disabled={enrolled} onClick={(e) => openEnrol(c, e.currentTarget)}>
            <span>{enrolled ? ui.enrolled : x.enroll}</span>
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
