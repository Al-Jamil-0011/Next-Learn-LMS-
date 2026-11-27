import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import useInView from '../../hooks/useInView.js';
import { coursePath, finePointer, initials, photoKey, prefersReducedMotion } from '../../utils/format.js';
import { getNextBatchCourse } from '../../utils/nextBatch.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';

const GRAD_STORIES = [
  {
    k: 'sadia',
    name: { en: 'Sadia Rahman', bn: 'সাদিয়া রহমান' },
    batch: { en: 'UI/UX Design · Batch 3', bn: 'UI/UX ডিজাইন · ব্যাচ ৩' },
    res: { en: 'Hired as UI designer', bn: 'UI ডিজাইনার হিসেবে চাকরি' },
    q: {
      en: 'By the fourth month I had three real case studies and my first product design job offer from a Dhaka fintech startup.',
      bn: '৪র্থ মাসের মধ্যেই আমার ৩টি বাস্তব কেস স্টাডি তৈরি হয়ে গিয়েছিল, আর ঢাকার একটি টেক স্টার্টআপ থেকে প্রথম চাকরির অফার পাই।',
    },
  },
  {
    k: 'tanvir',
    name: { en: 'Tanvir Kabir', bn: 'তানভীর কবির' },
    batch: { en: 'IELTS 7+ · Batch 9', bn: 'IELTS 7+ · ব্যাচ ৯' },
    res: { en: 'Scored IELTS 7.5', bn: 'IELTS ব্যান্ড ৭.৫ অর্জন' },
    q: {
      en: 'The weekly one-on-one speaking mocks completely changed my confidence. I scored Band 7.5 on my very first attempt.',
      bn: 'সাপ্তাহিক লাইভ স্পিকিং মক টেস্টগুলো আমার আত্মবিশ্বাস বদলে দিয়েছিল। প্রথম চেষ্টাতেই ব্যান্ড ৭.৫ পেয়েছি।',
    },
  },
  {
    k: 'nasrin',
    name: { en: 'Nasrin Jahan', bn: 'নাসরিন জাহান' },
    batch: { en: 'Digital Marketing · Batch 11', bn: 'ডিজিটাল মার্কেটিং · ব্যাচ ১১' },
    res: { en: '3× monthly orders', bn: 'মাসিক অর্ডার ৩× বৃদ্ধি' },
    q: {
      en: 'I run an online clothing brand from Rajshahi. After applying the course ad strategies, my ad cost halved and orders tripled.',
      bn: 'রাজশাহী থেকে অনলাইন ব্যবসা চালাই। কোর্সের স্ট্র্যাটেজি কাজে লাগিয়ে বিজ্ঞাপন খরচ অর্ধেক হয়েছে আর অর্ডার বেড়েছে ৩ গুণ।',
    },
  },
];

const RING_R = 32;
const RING_C = 2 * Math.PI * RING_R;

export default function EnrollProof() {
  const { t, lang, num } = useLang();
  const { openEnrol, isEnrolled } = useApp();
  const bn = lang === 'bn';

  const [secRef, inView] = useInView({ threshold: 0.16 });
  const [statRef, statVal] = useCountUp(86);
  const [lrnRef, lrnVal] = useCountUp(48000);
  const stageRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextCourse = getNextBatchCourse();
  const enrolled = isEnrolled(nextCourse.id);
  const tilt = finePointer() && !prefersReducedMotion();

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      setActiveIdx((cur) => (cur + 1) % GRAD_STORIES.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused, inView]);

  const onStageMove = (e) => {
    if (!tilt || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    stageRef.current.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
    stageRef.current.style.setProperty('--rx', `${-(py - 0.5) * 7}deg`);
    stageRef.current.style.setProperty('--sx', `${px * 100}%`);
    stageRef.current.style.setProperty('--sy', `${py * 100}%`);
  };

  const onStageLeave = () => {
    if (!tilt || !stageRef.current) return;
    stageRef.current.style.setProperty('--ry', '0deg');
    stageRef.current.style.setProperty('--rx', '0deg');
  };

  const benefits = [
    {
      icon: 'video',
      bg: 'var(--cobalt-50)',
      fg: 'var(--cobalt)',
      title: t('ec_prf_b1'),
      sub: bn ? 'সন্ধ্যার লাইভ ক্লাস ও ২ ঘণ্টার মধ্যে রেকর্ডিং' : 'Evening Bangla sessions with 2-hour recordings',
    },
    {
      icon: 'award',
      bg: 'var(--mint-50)',
      fg: '#0E8A5F',
      title: t('ec_prf_b2'),
      sub: bn ? 'ইউনিক আইডি ও QR যা নিয়োগকর্তা সেকেন্ডেই যাচাই করেন' : 'Unique ID & QR code employers verify in seconds',
    },
    {
      icon: 'brief',
      bg: 'var(--saffron-50)',
      fg: '#B07A00',
      title: t('ec_prf_b3'),
      sub: bn ? 'পোর্টফোলিও রিভিউ, মক ইন্টারভিউ ও পার্টনার রেফারেল' : 'Portfolio reviews, mock interviews & partner referrals',
    },
  ];

  const story = GRAD_STORIES[activeIdx];
  const ringOffset = inView ? RING_C * (1 - 0.86) : RING_C;

  return (
    <section className={`sec ecta-proof-sec${inView ? ' in' : ''}`} id="enroll-proof" ref={secRef}>
      <div className="ecta-proof-orb a" aria-hidden="true" />
      <div className="ecta-proof-orb b" aria-hidden="true" />

      <div className="wrap">
        <div className="ecta-proof-grid">
          {/* Left Persuasive Column */}
          <div className="ecta-proof-copy">
            <span className="ecta-proof-badge">
              <span className="ecta-mint-dot" aria-hidden="true" />
              <span>{t('ec_prf_pill')} · {bn ? '৬৪ জেলায়' : '64 districts'}</span>
            </span>

            <h2 className="ecta-proof-h2">
              {t('ec_prf_h1')}{' '}
              <span className="ecta-hl-brush">
                <span>{t('ec_prf_hl')}</span>
                <svg viewBox="0 0 180 14" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 10 Q 90 2, 177 8" />
                </svg>
              </span>
            </h2>

            <div className="ecta-ben-cards">
              {benefits.map((b, i) => (
                <div key={i} className="ecta-ben-card" style={{ '--bd': `${i * 80}ms` }}>
                  <span className="ecta-ben-ic" style={{ background: b.bg, color: b.fg }} aria-hidden="true">
                    <Icon name={b.icon} small />
                  </span>
                  <div>
                    <b>{b.title}</b>
                    <small>{b.sub}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="ecta-proof-actions">
              {enrolled ? (
                <Link to={coursePath(nextCourse)} className="btn ecta-btn-lg ecta-btn-mint magnet">
                  <span>{t('ec_continue')}</span>
                  <Arrow />
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn ecta-btn-lg ecta-shimmer magnet"
                  onClick={(e) => openEnrol(nextCourse, e.currentTarget)}
                >
                  <span>{t('ec_enroll')}</span>
                  <Arrow />
                </button>
              )}
              <Link to="/contact" className="btn btn-line ecta-btn-lg-line">
                <span>{t('ec_prf_adv')}</span>
              </Link>

            </div>

            {/* Right Interactive 3D Bento Stage */}
            <div
              ref={stageRef}
              className="ecta-stage"
              onPointerMove={onStageMove}
              onPointerLeave={onStageLeave}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="ecta-stage-ring" aria-hidden="true" />

              {/* Card 1: Interactive Graduate Spotlight */}
              <article className="ecta-bento-quote">
                <div className="ecta-bq-top">
                  <div className="ecta-story-tabs" role="tablist" aria-label={bn ? 'শিক্ষার্থীদের গল্প' : 'Graduate stories'}>
                    {GRAD_STORIES.map((st, idx) => (
                      <button
                        key={st.k}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeIdx}
                        aria-label={st.name[lang]}
                        className={`ecta-stab${idx === activeIdx ? ' on' : ''}`}
                        onClick={() => setActiveIdx(idx)}
                      >
                        <Media img={photoKey(st.k)} ini={initials(st.name.en)} />
                      </button>
                    ))}
                  </div>
                  <span className="pill mint ecta-res-pill">{story.res[lang]}</span>
                </div>

                <div key={story.k} className="ecta-bq-body">
                  <div className="ecta-bq-stars" aria-hidden="true">★★★★★</div>
                  <q>{story.q[lang]}</q>
                  <div className="ecta-col-who">
                    <i>
                      <Media img={photoKey(story.k)} ini={initials(story.name.en)} />
                    </i>
                    <div>
                      <b>{story.name[lang]}</b>
                      <small>{story.batch[lang]}</small>
                    </div>
                    <span className="ecta-ver-tag">
                      <Icon name="checkc" small />
                      <span>{bn ? 'যাচাইকৃত' : 'Verified'}</span>
                    </span>
                  </div>
                </div>

                <div className="ecta-bq-progress" aria-hidden="true">
                  <span
                    key={`${activeIdx}-${paused}`}
                    className={paused ? 'paused' : undefined}
                  />
                </div>
              </article>

              {/* Bottom Row: Outcome Ring + Active Learners */}
              <div className="ecta-bento-row">
                <div className="ecta-bento-stat">
                  <div className="ecta-ring-wrap">
                    <svg viewBox="0 0 80 80" aria-hidden="true">
                      <circle className="ecta-ring-bg" cx="40" cy="40" r={RING_R} />
                      <circle
                        className="ecta-ring-fg"
                        cx="40"
                        cy="40"
                        r={RING_R}
                        strokeDasharray={RING_C}
                        strokeDashoffset={ringOffset}
                      />
                    </svg>
                    <span className="ecta-ring-val num">
                      <span ref={statRef}>{bn ? num(statVal) : statVal}</span>%
                    </span>
                  </div>
                  <div className="ecta-stat-copy">
                    <span className="ecta-trend-pill">
                      <Icon name="chart" small />
                      <span>{bn ? 'সফল হার' : 'Outcome rate'}</span>
                    </span>
                    <p>{t('ec_prf_stat')}</p>
                  </div>
                </div>

                <div className="ecta-bento-learners">
                  <div className="ecta-lrn-top">
                    <div className="faces" aria-hidden="true">
                      <span><Media img="sSadia" /></span>
                      <span><Media img="sTanvir" /></span>
                      <span><Media img="sNasrin" /></span>
                      <span><Media img="mFarhana" /></span>
                    </div>
                    <span className="ecta-live-badge">
                      <i />
                      <span>{bn ? 'লাইভ' : 'Active'}</span>
                    </span>
                  </div>
                  <div>
                    <b className="num">+<span ref={lrnRef}>{bn ? num(lrnVal) : lrnVal}</span> {bn ? 'শিক্ষার্থী' : 'learners'}</b>
                    <small>{t('ec_prf_lrn_sub')}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
