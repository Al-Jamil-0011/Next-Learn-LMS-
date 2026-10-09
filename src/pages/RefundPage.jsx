import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { REFUND_DATA } from '../data/company.js';
import { COURSES } from '../data/courses.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile } from '../utils/format.js';
import { store } from '../utils/storage.js';
import Icon from '../components/common/Icon.jsx';
import Lines from '../components/common/Lines.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import SectionHead from '../components/home/SectionHead.jsx';

export default function RefundPage() {
  const { t, lang, num } = useLang();
  const { toast, confetti } = useApp();
  const location = useLocation();
  useDocumentTitle(lang === 'bn' ? 'রিফান্ড পলিসি · NextLearn' : 'Refund policy · NextLearn');

  // Interactive Calculator state
  const [courseType, setCourseType] = useState('live'); // 'live' | 'rec'
  const [days, setDays] = useState(4);
  const [attendedClasses, setAttendedClasses] = useState(1);
  const [watchedPct, setWatchedPct] = useState(15);

  let calcResult = 'eligible';
  if (courseType === 'live') {
    if (days <= 7 && attendedClasses < 3) {
      calcResult = 'eligible';
    } else if (days <= 14 && attendedClasses <= 4) {
      calcResult = 'review';
    } else {
      calcResult = 'not-eligible';
    }
  } else {
    if (days <= 7 && watchedPct <= 25) {
      calcResult = 'eligible';
    } else if (days <= 14 && watchedPct <= 40) {
      calcResult = 'review';
    } else {
      calcResult = 'not-eligible';
    }
  }

  // Active section tracking for TOC
  const [activeSec, setActiveSec] = useState('eligibility');

  useEffect(() => {
    // If navigated with hash (e.g. #terms), scroll to it
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        setActiveSec(targetId);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = REFUND_DATA.policySections.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSec(REFUND_DATA.policySections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Refund Form State
  const receiptRef = useRef(null);
  const mobileRef = useRef(null);
  const courseRef = useRef(null);
  const reasonRef = useRef(null);
  const detailsRef = useRef(null);
  const agreeRef = useRef(null);

  const [formData, setFormData] = useState({
    receiptId: '',
    mobile: '',
    courseId: COURSES[0]?.id || 1,
    reason: 'schedule',
    details: '',
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const validate = () => {
    const errs = {};
    let firstRef = null;

    if (!formData.receiptId.trim() || formData.receiptId.trim().length < 4) {
      errs.receiptId = lang === 'bn' ? 'সঠিক রিসিট নম্বর লিখুন (যেমন NL-24-08812)' : 'Please enter your purchase receipt ID';
      if (!firstRef) firstRef = receiptRef;
    }

    if (!isValidBdMobile(formData.mobile.trim())) {
      errs.mobile = lang === 'bn' ? 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (১১ ডিজিট)' : 'Enter a valid 11-digit Bangladeshi mobile number';
      if (!firstRef) firstRef = mobileRef;
    }

    if (formData.details.trim().length < 15) {
      errs.details = lang === 'bn' ? 'কমপক্ষে ১৫ অক্ষরে বিস্তারিত কারণ ব্যাখ্যা করুন' : 'Please provide at least 15 characters of explanation';
      if (!firstRef) firstRef = detailsRef;
    }

    if (!formData.agreed) {
      errs.agreed = lang === 'bn' ? 'শর্তে সম্মতি প্রদান করুন' : 'You must confirm and agree to proceed';
      if (!firstRef) firstRef = agreeRef;
    }

    setErrors(errs);
    if (firstRef && firstRef.current) {
      firstRef.current.focus();
    }
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketRefNum = 'RF-24-' + Math.floor(10000 + Math.random() * 90000);
      const ticket = {
        id: ticketRefNum,
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const existing = store.get('nl-refund-requests', []);
      store.set('nl-refund-requests', [ticket, ...existing]);

      setIsSubmitting(false);
      setSubmittedTicket(ticket);
      confetti();
      toast(lang === 'bn' ? 'রিফান্ড আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Refund request submitted successfully!');
    }, 1000);
  };

  return (
    <div className="co-refund-page">
      <PageHero
        crumb={t('rf_p')}
        title={t('rf_hero_t')}
        sub={t('rf_hero_s')}
      >
        <div style={{ marginTop: 12 }}>
          <span className="pill glass" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            <Icon name="clock" small />
            {t('rf_updated')}
          </span>
        </div>
      </PageHero>

      {/* At A Glance (3 cards) */}
      <section className="sec" id="glance">
        <div className="wrap">
          <SectionHead
            eyebrow={t('rf_glance_e')}
            title={t('rf_glance_t')}
          />

          <div className="co-glance-grid">
            {REFUND_DATA.glance.map((item, idx) => (
              <Reveal
                key={idx}
                className="co-glance-card"
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div className="co-glance-icon">
                  <Icon name={item.icon} />
                </div>
                <h3>{item[lang].title}</h3>
                <p>{item[lang].desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Eligibility Checker */}
      <section className="sec soft" id="calculator">
        <div className="wrap">
          <SectionHead
            eyebrow={t('rf_calc_e')}
            title={t('rf_calc_t')}
          />

          <Reveal className="co-elig-box">
            <div className="co-elig-controls">
              {/* Type toggle */}
              <div className="co-slider-group">
                <span className="co-slider-label">{t('rf_c_type')}</span>
                <div className="co-elig-types">
                  <button
                    type="button"
                    className={`co-elig-type-btn${courseType === 'live' ? ' active' : ''}`}
                    onClick={() => setCourseType('live')}
                  >
                    {t('rf_c_live')}
                  </button>
                  <button
                    type="button"
                    className={`co-elig-type-btn${courseType === 'rec' ? ' active' : ''}`}
                    onClick={() => setCourseType('rec')}
                  >
                    {t('rf_c_rec')}
                  </button>
                </div>
              </div>

              {/* Slider: Days */}
              <div className="co-slider-group">
                <div className="co-slider-head">
                  <span className="co-slider-label">{t('rf_c_days')}</span>
                  <span className="co-slider-val">{lang === 'bn' ? num(days) : days} {lang === 'bn' ? 'দিন' : 'days'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="co-range-input"
                  aria-label={t('rf_c_days')}
                />
                <div className="co-slider-range">
                  <span>{lang === 'bn' ? num(0) : '0'}</span>
                  <span>{lang === 'bn' ? num(60) : '60'} {lang === 'bn' ? 'দিন' : 'days'}</span>
                </div>
              </div>

              {/* Slider: Live classes or recorded % */}
              {courseType === 'live' ? (
                <div className="co-slider-group">
                  <div className="co-slider-head">
                    <span className="co-slider-label">{t('rf_c_live_cls')}</span>
                    <span className="co-slider-val">{lang === 'bn' ? num(attendedClasses) : attendedClasses} {lang === 'bn' ? 'টি ক্লাস' : 'classes'}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(Number(e.target.value))}
                    className="co-range-input"
                    aria-label={t('rf_c_live_cls')}
                  />
                  <div className="co-slider-range">
                    <span>{lang === 'bn' ? num(0) : '0'}</span>
                    <span>{lang === 'bn' ? num(20) : '20'} {lang === 'bn' ? 'টি' : 'classes'}</span>
                  </div>
                </div>
              ) : (
                <div className="co-slider-group">
                  <div className="co-slider-head">
                    <span className="co-slider-label">{t('rf_c_rec_pct')}</span>
                    <span className="co-slider-val">{lang === 'bn' ? num(watchedPct) : watchedPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={watchedPct}
                    onChange={(e) => setWatchedPct(Number(e.target.value))}
                    className="co-range-input"
                    aria-label={t('rf_c_rec_pct')}
                  />
                  <div className="co-slider-range">
                    <span>{lang === 'bn' ? num(0) : '0'}%</span>
                    <span>{lang === 'bn' ? num(100) : '100'}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Status Result Card */}
            <div>
              {calcResult === 'eligible' && (
                <div className="co-elig-badge-card eligible">
                  <div className="co-elig-status-title">
                    <Icon name="checkc" />
                    <span>{t('rf_res_full_t')}</span>
                  </div>
                  <div className="co-elig-status-desc">{t('rf_res_full_d')}</div>
                  <div style={{ marginTop: 8 }}>
                    <a href="#request-form" className="btn btn-sm btn-ink">
                      <span>{t('rf_form_t')} ↓</span>
                    </a>
                  </div>
                </div>
              )}

              {calcResult === 'review' && (
                <div className="co-elig-badge-card review">
                  <div className="co-elig-status-title">
                    <Icon name="clock" />
                    <span>{t('rf_res_part_t')}</span>
                  </div>
                  <div className="co-elig-status-desc">{t('rf_res_part_d')}</div>
                  <div style={{ marginTop: 8 }}>
                    <a href="#request-form" className="btn btn-sm btn-yellow">
                      <span>{t('rf_form_t')} ↓</span>
                    </a>
                  </div>
                </div>
              )}

              {calcResult === 'not-eligible' && (
                <div className="co-elig-badge-card not-eligible">
                  <div className="co-elig-status-title">
                    <Icon name="x" />
                    <span>{t('rf_res_no_t')}</span>
                  </div>
                  <div className="co-elig-status-desc">{t('rf_res_no_d')}</div>
                  <div style={{ marginTop: 8 }}>
                    <Link to="/contact" className="btn btn-sm btn-line">
                      <span>{t('nc')} →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How To Request Steps (4) */}
      <section className="sec" id="steps">
        <div className="wrap">
          <SectionHead
            eyebrow={t('rf_how_e')}
            title={t('rf_how_t')}
          />

          <div className="co-steps-flow">
            {REFUND_DATA.steps.map((st, idx) => (
              <Reveal
                key={st.num}
                className="co-step-card"
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div className="co-step-num">{lang === 'bn' ? num(st.num) : '0' + st.num}</div>
                <div className="co-step-title">{st[lang].title}</div>
                <div className="co-step-desc">{st[lang].desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Times By Payment Method */}
      <section className="sec soft" id="methods">
        <div className="wrap">
          <SectionHead
            eyebrow={t('rf_time_e')}
            title={t('rf_time_t')}
          />

          <div className="co-time-grid">
            {REFUND_DATA.methods.map((m, i) => (
              <Reveal
                key={m.name}
                className="co-time-card"
                style={{ '--brand-color': m.color, transitionDelay: `${i * 60}ms` }}
              >
                <b style={{ color: m.color }}>{m.name}</b>
                <div className="co-time-speed">{lang === 'bn' ? m.timeBn : m.timeEn}</div>
                <div className="co-time-note">{lang === 'bn' ? 'অটোমেটিক রিভার্সাল' : 'Direct gateway credit'}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Not Refundable Items Callout */}
      <section className="sec" id="non-refundable">
        <div className="wrap">
          <Reveal className="co-non-ref-card">
            <span className="eyebrow" style={{ color: '#A32014' }}>
              <i style={{ background: '#A32014' }} />
              {t('rf_non_e')}
            </span>
            <h3>{t('rf_non_t')}</h3>
            <ul className="co-non-ref-list">
              {REFUND_DATA.nonRefundable.map((item, idx) => (
                <li key={idx} className="co-non-ref-item">
                  <span className="ic">
                    <Icon name="x" small />
                  </span>
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Online Request Portal Form */}
      <section className="sec soft" id="request-form">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <SectionHead
            eyebrow={t('rf_form_e')}
            title={t('rf_form_t')}
          />

          {submittedTicket ? (
            <Reveal className="co-success-card">
              <div className="co-success-icon">
                <Icon name="checkc" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--ink)', marginBottom: 6 }}>
                  {t('rf_ok_t')}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                  {t('rf_ok_sub')}
                </p>
              </div>
              <div className="co-ref-box">
                <div className="co-ref-label">{t('rf_ok_ref')}</div>
                <div className="co-ref-val">{submittedTicket.id}</div>
              </div>

              <div className="co-next-steps">
                <b>{lang === 'bn' ? 'রিফান্ড প্রক্রিয়ার সময়রেখা:' : 'Refund timeline:'}</b>
                <div className="co-next-step-item">
                  <span className="co-next-step-num">1</span>
                  <span>{t('rf_ok_m1')}</span>
                </div>
                <div className="co-next-step-item">
                  <span className="co-next-step-num">2</span>
                  <span>{t('rf_ok_m2')}</span>
                </div>
                <div className="co-next-step-item">
                  <span className="co-next-step-num">3</span>
                  <span>{t('rf_ok_m3')}</span>
                </div>
              </div>

              <Link to="/" className="btn btn-ink" style={{ marginTop: 10 }}>
                <span>{t('tw_ok_home')}</span>
              </Link>
            </Reveal>
          ) : (
            <Reveal className="co-form-card">
              <form onSubmit={handleSubmit} noValidate className="co-form-grid">
                {/* Receipt ID & Mobile */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <div className="co-form-group">
                    <label htmlFor="receiptId" className="co-form-label">
                      {t('rf_f_rec')} *
                    </label>
                    <input
                      ref={receiptRef}
                      id="receiptId"
                      type="text"
                      className="co-form-input"
                      value={formData.receiptId}
                      onChange={(e) => setFormData({ ...formData, receiptId: e.target.value })}
                      placeholder={t('rf_f_rec_hint')}
                    />
                    {errors.receiptId && <span className="co-err-msg">{errors.receiptId}</span>}
                  </div>

                  <div className="co-form-group">
                    <label htmlFor="refMobile" className="co-form-label">
                      {t('rf_f_mob')} *
                    </label>
                    <input
                      ref={mobileRef}
                      id="refMobile"
                      type="tel"
                      className="co-form-input"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.mobile && <span className="co-err-msg">{errors.mobile}</span>}
                  </div>
                </div>

                {/* Course Selection & Reason */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <div className="co-form-group">
                    <label htmlFor="courseId" className="co-form-label">
                      {t('rf_f_crs')} *
                    </label>
                    <select
                      ref={courseRef}
                      id="courseId"
                      className="co-form-select"
                      value={formData.courseId}
                      onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    >
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.t} ({c.f === 'live' ? 'Live' : 'Recorded'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="co-form-group">
                    <label htmlFor="reason" className="co-form-label">
                      {t('rf_f_rsn')} *
                    </label>
                    <select
                      ref={reasonRef}
                      id="reason"
                      className="co-form-select"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    >
                      {REFUND_DATA.reasons.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r[lang]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Details textarea */}
                <div className="co-form-group">
                  <label htmlFor="details" className="co-form-label">
                    {t('rf_f_det')} *
                  </label>
                  <textarea
                    ref={detailsRef}
                    id="details"
                    className="co-form-textarea"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={t('rf_f_det_hint')}
                  />
                  <div className="co-char-counter">
                    {formData.details.length} / 15 {lang === 'bn' ? 'অক্ষর সর্বনিম্ন' : 'characters minimum'}
                  </div>
                  {errors.details && <span className="co-err-msg">{errors.details}</span>}
                </div>

                {/* Confirm Checkbox */}
                <div className="co-form-group">
                  <label className="co-checkbox-label">
                    <input
                      ref={agreeRef}
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    />
                    <span>{t('rf_f_agree')}</span>
                  </label>
                  {errors.agreed && <span className="co-err-msg">{errors.agreed}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-yellow magnet"
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <span>{isSubmitting ? t('rf_f_submitting') : t('rf_f_submit')}</span>
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      {/* Policy Text: 2-Column Layout with Sticky TOC */}
      <section className="sec" id="full-policy">
        <div className="wrap">
          <SectionHead
            eyebrow={lang === 'bn' ? 'অফিসিয়াল নীতিমালা' : 'Official Policy Terms'}
            title={lang === 'bn' ? 'রিফান্ড ও সেবার বিস্তারিত শর্তাবলী' : 'Complete Terms & Conditions'}
          />

          <div className="co-policy-layout">
            {/* Sticky Table of Contents */}
            <aside className="co-policy-toc">
              <div className="co-policy-toc-title">{t('rf_toc_title')}</div>
              <ul className="co-toc-list">
                {REFUND_DATA.policySections.map((sec) => (
                  <li
                    key={sec.id}
                    className={`co-toc-item${activeSec === sec.id ? ' active' : ''}`}
                  >
                    <a
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(sec.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        setActiveSec(sec.id);
                      }}
                    >
                      {sec[lang].title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Policy Sections Right Column */}
            <div className="co-policy-content">
              {REFUND_DATA.policySections.map((sec) => (
                <article key={sec.id} id={sec.id} className="co-policy-sec">
                  <h3>{sec[lang].title}</h3>
                  <p>{sec[lang].body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Support Bar */}
      <section className="sec soft" id="faq">
        <div className="wrap">
          <SectionHead
            eyebrow={t('rf_faq_e')}
            title={t('rf_faq_t')}
          />

          <div className="faq" style={{ maxWidth: 840, margin: '0 auto 48px' }}>
            {REFUND_DATA.faqs.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  {f[lang].q}
                  <span className="pm" aria-hidden="true" />
                </summary>
                <p>{f[lang].a}</p>
              </details>
            ))}
          </div>

          {/* Help Bar */}
          <div className="co-help-bar">
            <div className="co-help-bar-info">
              <b style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>{t('rf_help_t')}</b>
              <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{t('rf_help_s')}</span>
            </div>
            <div className="co-help-bar-links">
              <a href="tel:09610000000" className="btn btn-sm btn-line">
                <Icon name="phone" small />
                <span>09610-000000</span>
              </a>
              <Link to="/contact" className="btn btn-sm btn-ink">
                <Icon name="chat" small />
                <span>{t('nc')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
