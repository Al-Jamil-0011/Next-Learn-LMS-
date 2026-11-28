import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reelSadiaImg from '../../assets/photos/reel-sadia.jpg';
import reelTanvirImg from '../../assets/photos/reel-tanvir.jpg';
import reelNasrinImg from '../../assets/photos/reel-nasrin.jpg';
import reelRafiqImg from '../../assets/photos/reel-rafiq.jpg';
import reelLamiaImg from '../../assets/photos/reel-lamia.jpg';
import reelImranImg from '../../assets/photos/reel-imran.jpg';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES } from '../../data/courses.js';
import { bnDigits, coursePath } from '../../utils/format.js';
import { Arrow } from '../common/Icon.jsx';
import SectionHead from './SectionHead.jsx';

/**
 * Student video reels data.
 * Each entry supports an optional `videoSrc` (e.g. a real .mp4 clip) alongside its cinema poster frame.
 */
const REELS = [
  {
    id: 'sadia',
    courseId: 2,
    img: reelSadiaImg,
    videoSrc: null,
    dur: '0:28',
    tone: 'mint',
    nameEn: 'Sadia Rahman',
    nameBn: 'সাদিয়া রহমান',
    courseEn: 'UI/UX Design · Batch 3',
    courseBn: 'UI/UX ডিজাইন · ব্যাচ ৩',
    resultEn: 'Hired · UI Designer',
    resultBn: 'জব অফার · UI ডিজাইনার',
    capEn: 'Built 3 real Figma case studies and landed my first startup offer in month 4.',
    capBn: '৪র্থ মাসেই ৩টি রিয়েল প্রজেক্ট আর ঢাকার স্টার্টআপে প্রথম জব অফার!',
  },
  {
    id: 'tanvir',
    courseId: 1,
    img: reelTanvirImg,
    videoSrc: null,
    dur: '0:24',
    tone: 'saffron',
    nameEn: 'Tanvir Kabir',
    nameBn: 'তানভীর কবির',
    courseEn: 'IELTS 7+ · Batch 9',
    courseBn: 'IELTS 7+ · ব্যাচ ৯',
    resultEn: 'IELTS Band 7.5',
    resultBn: 'IELTS ব্যান্ড ৭.৫',
    capEn: 'Weekly live speaking mocks helped me score Band 7.5 on my very first try.',
    capBn: 'সাপ্তাহিক লাইভ স্পিকিং মক টেস্টেই প্রথম চেষ্টায় ব্যান্ড ৭.৫ অর্জন!',
  },
  {
    id: 'nasrin',
    courseId: 5,
    img: reelNasrinImg,
    videoSrc: null,
    dur: '0:31',
    tone: 'cobalt',
    nameEn: 'Nasrin Jahan',
    nameBn: 'নাসরিন জাহান',
    courseEn: 'Digital Marketing · Batch 11',
    courseBn: 'ডিজিটাল মার্কেটিং · ব্যাচ ১১',
    resultEn: '3× Monthly Orders',
    resultBn: '৩× মাসিক অর্ডার',
    capEn: 'Applied AI ad targeting for my Rajshahi shop — ad cost halved, orders tripled!',
    capBn: 'অ্যাড খরচ অর্ধেকে নেমে রাজশাহী থেকে বুটিকের অর্ডার বেড়েছে ৩ গুণ!',
  },
  {
    id: 'rafiq',
    courseId: 4,
    img: reelRafiqImg,
    videoSrc: null,
    dur: '0:34',
    tone: 'cobalt',
    nameEn: 'Rafiqul Islam',
    nameBn: 'রফিকুল ইসলাম',
    courseEn: 'MERN Stack · Batch 6',
    courseBn: 'MERN স্ট্যাক · ব্যাচ ৬',
    resultEn: 'Full-Stack Dev Job',
    resultBn: 'রিমোট ডেভেলপার জব',
    capEn: 'Live code reviews with mentors prepared me for real technical interviews.',
    capBn: 'মেন্টরের লাইভ কোড রিভিউয়েই ইন্টারভিউ ক্লিয়ার করে রিমোট জবে জয়েন!',
  },
  {
    id: 'lamia',
    courseId: 8,
    img: reelLamiaImg,
    videoSrc: null,
    dur: '0:22',
    tone: 'coral',
    nameEn: 'Lamia Rahman',
    nameBn: 'লামিয়া রহমান',
    courseEn: 'Graphic Design · Batch 10',
    courseBn: 'গ্রাফিক ডিজাইন · ব্যাচ ১০',
    resultEn: '$1,200+ on Fiverr',
    resultBn: 'Fiverr-এ প্রথম $১,২০০+',
    capEn: 'My Behance brand portfolio started bringing international Fiverr clients fast.',
    capBn: 'বিহ্যান্স পোর্টফোলিও দেখেই ফiverr-এ প্রথম আন্তর্জাতিক ক্লায়েন্টদের কাজ শুরু!',
  },
  {
    id: 'imran',
    courseId: 9,
    img: reelImranImg,
    videoSrc: null,
    dur: '0:26',
    tone: 'mint',
    nameEn: 'Imran Shuvo',
    nameBn: 'ইমরান শুভ',
    courseEn: 'Video Editing · Batch 4',
    courseBn: 'ভিডিও এডিটিং · ব্যাচ ৪',
    resultEn: '20K+ Avg Reel Views',
    resultBn: 'প্রতি রিলে ২০K+ ভিউ',
    capEn: 'Learned pacing, color grading, and hooks — my client reels jumped to 20K+ views.',
    capBn: 'কালার গ্রেডিং আর স্টোরিটেলিং শিখে প্রতিটি রিল এখন ২০ হাজার+ ভিউ পাচ্ছে!',
  },
];

/** Top/bottom concave cinema bezel arc. Mirrored with CSS transform on the bottom edge. */
function CinemaArc({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 68"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0,0 H1440 V2 Q720,92 0,2 Z" fill="var(--bg)" />
      <path d="M0,2 Q720,92 1440,2 L1440,15 Q720,105 0,15 Z" fill="#131724" />
      <path
        d="M0,15 Q720,105 1440,15"
        fill="none"
        stroke="rgba(255,255,255,.14)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function Stories() {
  const { t, lang } = useLang();
  const bn = lang === 'bn';
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    if (activeIdx === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') setActiveIdx((cur) => (cur + 1) % REELS.length);
      if (e.key === 'ArrowLeft') setActiveIdx((cur) => (cur - 1 + REELS.length) % REELS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx]);

  const activeReel = activeIdx !== null ? REELS[activeIdx] : null;
  const activeCourse = activeReel
    ? COURSES.find((c) => c.id === activeReel.courseId) || COURSES[0]
    : null;

  return (
    <section className="sec reel-sec" id="stories">
      <div className="wrap">
        <SectionHead eyebrow={t('ss_e')} title={t('ss_t')}>
          <Link to="/stories" className="btn btn-line">
            <span>{t('ss_all')}</span>
            <Arrow />
          </Link>
        </SectionHead>
      </div>

      <div
        className={`reel-stage${activeIdx !== null ? ' paused' : ''}`}
        aria-label={bn ? 'শিক্ষার্থীদের ভিডিও গল্প রিলস' : 'Learner video story reels'}
      >
        <div className="reel-track">
          {[...REELS, ...REELS].map((item, idx) => {
            const realIdx = idx % REELS.length;
            const dup = idx >= REELS.length;
            const name = bn ? item.nameBn : item.nameEn;
            const course = bn ? item.courseBn : item.courseEn;
            const result = bn ? item.resultBn : item.resultEn;
            const caption = bn ? item.capBn : item.capEn;
            const dur = bn ? bnDigits(item.dur) : item.dur;

            return (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                className={`reel-card${dup ? ' reel-dup' : ''}`}
                aria-hidden={dup || undefined}
                tabIndex={dup ? -1 : undefined}
                aria-label={
                  bn ? `${name} — ${course} ভিডিও দেখুন` : `Watch ${name}'s ${course} story`
                }
                onClick={() => setActiveIdx(realIdx)}
              >
                {item.videoSrc ? (
                  <video
                    className="reel-media"
                    src={item.videoSrc}
                    poster={item.img}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    className={`reel-media ${realIdx % 2 === 0 ? 'ken-a' : 'ken-b'}`}
                    src={item.img}
                    alt={name}
                    loading="lazy"
                  />
                )}

                <span className="reel-vignette" aria-hidden="true" />

                <span className="reel-hud" aria-hidden="true">
                  <span className="reel-badge">
                    <i />
                    <span>REEL</span>
                  </span>
                  <span className="reel-dur">
                    <span className="reel-waves">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{dur}</span>
                  </span>
                </span>

                <span className="reel-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <polygon points="8,5 19,12 8,19" fill="currentColor" />
                  </svg>
                </span>

                <span className="reel-glass">
                  <span className={`reel-res tone-${item.tone}`}>{result}</span>
                  <span className="reel-who">
                    <b>{name}</b>
                    <span>{course}</span>
                  </span>
                  <span className="reel-cap">{caption}</span>
                </span>
              </button>
            );
          })}
        </div>

        <CinemaArc className="reel-arc reel-arc-top" />
        <CinemaArc className="reel-arc reel-arc-bot" />
      </div>

      {activeReel && (
        <div
          className="reel-modal-bg"
          role="dialog"
          aria-modal="true"
          aria-label={bn ? activeReel.nameBn : activeReel.nameEn}
          onClick={() => setActiveIdx(null)}
        >
          <div className="reel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reel-modal-bars" aria-hidden="true">
              {REELS.map((r, i) => (
                <span key={r.id} className={i === activeIdx ? 'on' : i < activeIdx ? 'done' : undefined} />
              ))}
            </div>

            <button
              type="button"
              className="reel-modal-close"
              aria-label={bn ? 'বন্ধ করুন' : 'Close story'}
              onClick={() => setActiveIdx(null)}
            >
              ×
            </button>

            <div className="reel-modal-media">
              {activeReel.videoSrc ? (
                <video
                  src={activeReel.videoSrc}
                  poster={activeReel.img}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img src={activeReel.img} alt={bn ? activeReel.nameBn : activeReel.nameEn} />
              )}
              <div className="reel-modal-grad" aria-hidden="true" />
            </div>

            <div className="reel-modal-foot">
              <span className={`reel-res tone-${activeReel.tone}`}>
                {bn ? activeReel.resultBn : activeReel.resultEn}
              </span>
              <h3>{bn ? activeReel.nameBn : activeReel.nameEn}</h3>
              <p className="reel-modal-course">
                {bn ? activeReel.courseBn : activeReel.courseEn}
              </p>
              <p className="reel-modal-quote">
                “{bn ? activeReel.capBn : activeReel.capEn}”
              </p>
              {activeCourse && (
                <Link
                  to={coursePath(activeCourse)}
                  className="btn ecta-shimmer reel-modal-cta"
                  onClick={() => setActiveIdx(null)}
                >
                  <span>{bn ? `${activeCourse.s} কোর্সটি দেখুন` : `Explore ${activeCourse.s}`}</span>
                  <Arrow />
                </Link>
              )}
            </div>

            <button
              type="button"
              className="reel-nav prev"
              aria-label={bn ? 'আগের গল্প' : 'Previous story'}
              onClick={() => setActiveIdx((cur) => (cur - 1 + REELS.length) % REELS.length)}
            >
              ‹
            </button>
            <button
              type="button"
              className="reel-nav next"
              aria-label={bn ? 'পরের গল্প' : 'Next story'}
              onClick={() => setActiveIdx((cur) => (cur + 1) % REELS.length)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
