import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { SLOTS } from '../../data/courses.js';
import { IMAGES } from '../../data/images.js';
import { isValidBdMobile } from '../../utils/format.js';
import Icon, { Arrow } from './Icon.jsx';

/**
 * High-converting Free Live Class popup modal.
 * Automatically appears 4 seconds after a visitor enters the website (once per page load).
 */
export default function FreeClassPopup() {
  const { lang, num } = useLang();
  const { freePopupOpen, openFreePopup, closeFreePopup, enrolCourse, sideOpen, toast, confetti } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(0);
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [booked, setBooked] = useState(false);

  const hasAutoOpened = useRef(false);
  const phoneRef = useRef(null);
  const closeBtnRef = useRef(null);
  const latestState = useRef({ enrolCourse, sideOpen, pathname: location.pathname });

  useEffect(() => {
    latestState.current = { enrolCourse, sideOpen, pathname: location.pathname };
  }, [enrolCourse, sideOpen, location.pathname]);

  // Auto-open 4 seconds after the user enters the website.
  useEffect(() => {
    if (hasAutoOpened.current) return undefined;
    const timer = setTimeout(() => {
      if (hasAutoOpened.current) return;
      const { enrolCourse: activeEnrol, sideOpen: activeSide, pathname } = latestState.current;
      if (!activeEnrol && !activeSide && pathname !== '/free') {
        hasAutoOpened.current = true;
        openFreePopup();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [openFreePopup]);

  // Move initial focus inside the dialog when opened.
  useEffect(() => {
    if (!freePopupOpen) return undefined;
    const id = setTimeout(() => {
      (booked ? closeBtnRef.current : phoneRef.current)?.focus();
    }, 80);
    return () => clearTimeout(id);
  }, [freePopupOpen, booked]);

  const bn = lang === 'bn';
  const activeSlot = SLOTS[slot];

  const handleClose = () => {
    closeFreePopup();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (!isValidBdMobile(cleaned)) {
      setErr(
        bn
          ? 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন, যেমন 01712345678।'
          : 'Enter a valid 11-digit mobile number, like 01712345678.',
      );
      phoneRef.current?.focus();
      return;
    }
    setErr('');
    setPhone(cleaned);
    setBooked(true);
    toast((bn ? 'ফ্রি ক্লাসের সিট বুক হয়েছে: ' : 'Free class reserved: ') + activeSlot.t);
    confetti();
  };

  const goTo = (path) => {
    closeFreePopup(true);
    navigate(path);
  };

  return (
    <div
      className={`modal fc-modal${freePopupOpen ? ' on' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fcModalTitle"
      aria-hidden={!freePopupOpen}
    >
      <div className="fc-grid">
        {/* Left visual showcase panel */}
        <div className="fc-left">
          {IMAGES.free?.src && (
            <img src={IMAGES.free.src} alt="" className="fc-bg-img" aria-hidden="true" />
          )}
          <div className="fc-left-in">
            <div className="fc-top-badges">
              <span className="pill live fc-live-pill">
                {bn ? 'ফ্রি লাইভ ক্লাস' : 'FREE LIVE CLASS'}
              </span>
              <span className="fc-free-chip">
                {bn ? '১০০% ফ্রি' : '100% FREE'}
              </span>
            </div>

            <h2 id="fcModalTitle" className="fc-headline">
              {bn ? (
                <>
                  ভর্তি হওয়ার আগে <span className="fc-accent">একটি ফ্রি ক্লাস</span> করে দেখুন!
                </>
              ) : (
                <>
                  Experience a <span className="fc-accent">Free Live Class</span> Before You Pay!
                </>
              )}
            </h2>

            <p className="fc-lead">
              {bn
                ? 'কর্মরত মেন্টরদের সাথে সরাসরি ক্লাস করুন, প্রশ্ন করুন এবং দেখুন NextLearn কীভাবে আপনার ক্যারিয়ার গড়তে সাহায্য করে।'
                : 'Meet working industry mentors live, ask anything, and see firsthand how NextLearn helps launch your career.'}
            </p>

            <ul className="fc-perks">
              <li>
                <span className="fc-perk-ic"><Icon name="check" small /></span>
                <span>{bn ? 'কোনো কার্ড বা পেমেন্ট লাগবে না' : 'No card or payment required'}</span>
              </li>
              <li>
                <span className="fc-perk-ic"><Icon name="check" small /></span>
                <span>{bn ? 'সরাসরি মেন্টরের সাথে লাইভ প্রশ্নোত্তর' : 'Live Q&A directly with your mentor'}</span>
              </li>
              <li>
                <span className="fc-perk-ic"><Icon name="check" small /></span>
                <span>{bn ? 'SMS-এ তাৎক্ষণিক জয়েনিং লিংক ও রিমাইন্ডার' : 'Instant joining link & reminder via SMS'}</span>
              </li>
            </ul>

            <div className="fc-trust">
              <div className="fc-avatars" aria-hidden="true">
                <span style={{ background: '#4C63FF' }}>SR</span>
                <span style={{ background: '#FF9F43' }}>TK</span>
                <span style={{ background: '#3CCB9A', color: '#0B1030' }}>NJ</span>
              </div>
              <div className="fc-trust-txt">
                <b>{bn ? '৪৮,০০০+ শিক্ষার্থী' : '48,000+ learners'}</b>
                <small>{bn ? 'সারাদেশ থেকে যুক্ত হয়েছেন' : 'learning across 64 districts'}</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right interactive booking panel */}
        <div className="fc-right">
          <div className="fc-rhead">
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              <i />
              <span>{bn ? 'এই সপ্তাহান্তে · সীমিত আসন' : 'THIS WEEKEND · LIMITED SEATS'}</span>
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className="mx"
              aria-label={bn ? 'বন্ধ করুন' : 'Close popup'}
              onClick={handleClose}
            >
              <Icon name="x" small />
            </button>
          </div>

          {!booked ? (
            <div className="fc-form-wrap">
              <div className="fc-title-block">
                <h3>{bn ? 'আপনার ফ্রি সিট নিশ্চিত করুন' : 'Reserve Your Free Seat'}</h3>
                <p>{bn ? 'পছন্দের ক্লাসটি বেছে নিয়ে মোবাইল নম্বর দিন:' : 'Choose an upcoming live session and enter your mobile number:'}</p>
              </div>

              <div className="fc-slots" role="radiogroup" aria-label={bn ? 'ফ্রি ক্লাসসমূহ' : 'Free classes'}>
                {SLOTS.map((s, i) => {
                  const selected = i === slot;
                  return (
                    <button
                      type="button"
                      role="radio"
                      key={s.t}
                      aria-checked={selected}
                      className={`fc-slot${selected ? ' on' : ''}`}
                      onClick={() => setSlot(i)}
                    >
                      <span className="fc-sd">
                        <small>{s.w}</small>
                        <b>{num(s.d)}</b>
                        <small>Oct</small>
                      </span>
                      <span className="fc-st">
                        <b>{s.t}</b>
                        <small>
                          <Icon name="clock" small />
                          {s.h} · {s.m}
                        </small>
                      </span>
                      <span className="fc-rad" aria-hidden="true">
                        <Icon name="check" small />
                      </span>
                    </button>
                  );
                })}
              </div>

              <form className="fc-form" noValidate onSubmit={handleSubmit}>
                <label htmlFor="fcPopupPhone" className="sr">
                  {bn ? 'মোবাইল নম্বর' : 'Mobile number'}
                </label>
                <div className="fc-phone-row">
                  <span className="fc-cc">+880</span>
                  <input
                    id="fcPopupPhone"
                    ref={phoneRef}
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="01XXX XXXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (err) setErr('');
                    }}
                  />
                </div>
                {err && (
                  <div className="fc-err" role="alert">
                    {err}
                  </div>
                )}
                <button type="submit" className="btn btn-yellow magnet fc-submit">
                  <span>{bn ? 'বিনামূল্যে সিট বুক করুন' : 'Reserve My Free Seat'}</span>
                  <Arrow />
                </button>
              </form>

              <div className="fc-rfoot">
                <span className="fc-safe">
                  <Icon name="lock" small />
                  <span>{bn ? 'স্প্যাম মুক্ত · শুধু ক্লাসের লিংক পাঠানো হবে' : 'No spam · Class link sent via SMS'}</span>
                </span>
                <button type="button" className="fc-all-link" onClick={() => goTo('/free')}>
                  <span>{bn ? 'সব ফ্রি ক্লাস দেখুন' : 'Full schedule'}</span>
                  <Icon name="right" small />
                </button>
              </div>
            </div>
          ) : (
            <div className="fc-success">
              <span className="okc">
                <svg className="ic" style={{ width: 42, height: 42, strokeWidth: 2.8 }} aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3>{bn ? 'অভিনন্দন! আপনার সিট বুক হয়েছে' : 'Congratulations! Seat Reserved'}</h3>
              <p>
                {bn
                  ? 'ক্লাস শুরুর ১ ঘণ্টা আগে আপনার নম্বরে জুম লিংক ও রিমাইন্ডার পাঠানো হবে।'
                  : 'We will send your live joining link and a reminder 1 hour before class.'}
              </p>

              <div className="tix fc-ticket">
                <div>
                  <span>{bn ? 'ক্লাস' : 'Session'}</span>
                  <b>{activeSlot.t}</b>
                </div>
                <div>
                  <span>{bn ? 'সময়' : 'Schedule'}</span>
                  <b>{activeSlot.w}, Oct {num(activeSlot.d)} · {activeSlot.h}</b>
                </div>
                <div>
                  <span>{bn ? 'মেন্টর' : 'Mentor'}</span>
                  <b>{activeSlot.m}</b>
                </div>
                <div>
                  <span>{bn ? 'মোবাইল' : 'Mobile'}</span>
                  <b>+880 {phone.replace(/^0/, '')}</b>
                </div>
              </div>

              <div className="fc-suc-actions">
                <button type="button" className="btn magnet" onClick={() => goTo('/courses')}>
                  <span>{bn ? 'সব কোর্স দেখুন' : 'Explore All Courses'}</span>
                  <Arrow />
                </button>
                <button type="button" className="btn btn-line" onClick={handleClose}>
                  <span>{bn ? 'বন্ধ করুন' : 'Done'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
