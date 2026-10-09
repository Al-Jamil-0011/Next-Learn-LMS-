import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { TEACH_DATA } from '../data/company.js';
import { CATS } from '../data/courses.js';
import { IMAGES } from '../data/images.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile, isValidEmail, photoKey, tk } from '../utils/format.js';
import { store } from '../utils/storage.js';
import Icon from '../components/common/Icon.jsx';
import Lines from '../components/common/Lines.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import SectionHead from '../components/home/SectionHead.jsx';

export default function TeachPage() {
  const { t, lang, num } = useLang();
  const { toast, confetti } = useApp();
  useDocumentTitle(lang === 'bn' ? 'আমাদের সাথে পড়ান · NextLearn' : 'Teach with us · NextLearn');

  // Calculator state
  const [students, setStudents] = useState(35);
  const [price, setPrice] = useState(5000);
  const [batches, setBatches] = useState(3);

  const yearlyEarnings = Math.round(students * price * batches * 0.4);

  // Form state
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const catRef = useRef(null);
  const expRef = useRef(null);
  const roleRef = useRef(null);
  const linkRef = useRef(null);
  const descRef = useRef(null);
  const agreeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    category: 'tech',
    experience: '3-5',
    role: '',
    link: '',
    videoUrl: '',
    description: '',
    schedule: 'evening',
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  const scrollToApply = (e) => {
    e.preventDefault();
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHow = (e) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const validate = () => {
    const errs = {};
    let firstRef = null;

    if (!formData.name.trim()) {
      errs.name = lang === 'bn' ? 'আপনার পুরো নাম লিখুন' : 'Please enter your full name';
      if (!firstRef) firstRef = nameRef;
    }

    if (!isValidBdMobile(formData.mobile.trim())) {
      errs.mobile = lang === 'bn' ? 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন 017XXXXXXXX)' : 'Enter a valid 11-digit Bangladeshi mobile number';
      if (!firstRef) firstRef = mobileRef;
    }

    if (!isValidEmail(formData.email.trim())) {
      errs.email = lang === 'bn' ? 'সঠিক ইমেইল ঠিকানা দিন' : 'Enter a valid email address';
      if (!firstRef) firstRef = emailRef;
    }

    if (!formData.role.trim()) {
      errs.role = lang === 'bn' ? 'বর্তমান পদবি ও প্রতিষ্ঠানের নাম লিখুন' : 'Enter your current role and organization';
      if (!firstRef) firstRef = roleRef;
    }

    const link = formData.link.trim();
    if (!link || !/^https?:\/\/.+/i.test(link)) {
      errs.link = lang === 'bn' ? 'একটি বৈধ লিংক দিন (http:// বা https:// দিয়ে শুরু)' : 'Enter a valid URL starting with http:// or https://';
      if (!firstRef) firstRef = linkRef;
    }

    if (formData.videoUrl.trim() && !/^https?:\/\/.+/i.test(formData.videoUrl.trim())) {
      errs.videoUrl = lang === 'bn' ? 'ভিডিও লিংকটি http:// বা https:// দিয়ে শুরু হতে হবে' : 'Video link must start with http:// or https://';
    }

    if (formData.description.trim().length < 30) {
      errs.description = lang === 'bn' ? 'কমপক্ষে ৩০ অক্ষরে কোর্সের পরিকল্পনা লিখুন' : 'Please provide at least 30 characters describing what you would teach';
      if (!firstRef) firstRef = descRef;
    }

    if (!formData.agreed) {
      errs.agreed = lang === 'bn' ? 'শর্তে সম্মতি দেওয়া আবশ্যক' : 'You must confirm the commitment to proceed';
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
      const randomId = 'TW-24-' + Math.floor(10000 + Math.random() * 90000);
      const appRecord = {
        id: randomId,
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const existing = store.get('nl-teach-apps', []);
      store.set('nl-teach-apps', [appRecord, ...existing]);

      setIsSubmitting(false);
      setSubmittedApp(appRecord);
      confetti();
      toast(lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application submitted successfully!');
    }, 1000);
  };

  return (
    <div className="co-teach-page">
      <PageHero
        crumb={t('tw_p')}
        title={t('tw_hero_t')}
        sub={t('tw_hero_s')}
      >
        <div className="co-teach-hero-actions">
          <button type="button" onClick={scrollToApply} className="btn btn-yellow magnet">
            <span>{t('tw_cta_apply')}</span>
          </button>
          <button type="button" onClick={scrollToHow} className="btn btn-line" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
            <span>{t('tw_cta_how')}</span>
          </button>
        </div>
      </PageHero>

      {/* Why Teach Benefits (6) */}
      <section className="sec" id="benefits">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_why_e')}
            title={t('tw_why_t')}
          />

          <div className="co-ben-grid">
            {TEACH_DATA.benefits.map((b, idx) => (
              <Reveal
                key={idx}
                className="co-card"
                style={{ transitionDelay: `${(idx % 3) * 70}ms` }}
              >
                <span className="fi" style={{ background: 'var(--cobalt-50)', color: 'var(--cobalt)' }}>
                  <Icon name={b.icon} />
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '14px 0 8px', color: 'var(--ink)' }}>
                  {b[lang].title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {b[lang].desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Earnings Estimator */}
      <section className="sec soft" id="estimator">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_calc_e')}
            title={t('tw_calc_t')}
            sub={t('tw_calc_s')}
          />

          <Reveal className="co-calc-box">
            <div className="co-calc-sliders">
              {/* Slider 1: Students */}
              <div className="co-slider-group">
                <div className="co-slider-head">
                  <span className="co-slider-label">{t('tw_calc_s_lbl')}</span>
                  <span className="co-slider-val">{lang === 'bn' ? num(students) : students}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={students}
                  onChange={(e) => setStudents(Number(e.target.value))}
                  className="co-range-input"
                  aria-label={t('tw_calc_s_lbl')}
                />
                <div className="co-slider-range">
                  <span>{lang === 'bn' ? num(10) : '10'}</span>
                  <span>{lang === 'bn' ? num(200) : '200'}</span>
                </div>
              </div>

              {/* Slider 2: Course Price */}
              <div className="co-slider-group">
                <div className="co-slider-head">
                  <span className="co-slider-label">{t('tw_calc_p_lbl')}</span>
                  <span className="co-slider-val">{lang === 'bn' ? num(tk(price)) : tk(price)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="co-range-input"
                  aria-label={t('tw_calc_p_lbl')}
                />
                <div className="co-slider-range">
                  <span>{lang === 'bn' ? num(tk(1000)) : tk(1000)}</span>
                  <span>{lang === 'bn' ? num(tk(20000)) : tk(20000)}</span>
                </div>
              </div>

              {/* Slider 3: Batches */}
              <div className="co-slider-group">
                <div className="co-slider-head">
                  <span className="co-slider-label">{t('tw_calc_b_lbl')}</span>
                  <span className="co-slider-val">{lang === 'bn' ? num(batches) : batches}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={batches}
                  onChange={(e) => setBatches(Number(e.target.value))}
                  className="co-range-input"
                  aria-label={t('tw_calc_b_lbl')}
                />
                <div className="co-slider-range">
                  <span>{lang === 'bn' ? num(1) : '1'}</span>
                  <span>{lang === 'bn' ? num(6) : '6'}</span>
                </div>
              </div>
            </div>

            {/* Result Display */}
            <div className="co-calc-result">
              <span className="co-calc-result-badge">{t('tw_calc_share')}</span>
              <div>
                <div className="co-calc-total-lbl">{t('tw_calc_est')}</div>
                <div className="co-calc-total-num">
                  {lang === 'bn' ? num(tk(yearlyEarnings)) : tk(yearlyEarnings)}
                </div>
              </div>
              <div className="co-calc-formula">
                <span>
                  {lang === 'bn' ? num(students) : students} students × {lang === 'bn' ? num(tk(price)) : tk(price)} × {lang === 'bn' ? num(batches) : batches} batches
                </span>
                <span style={{ color: 'var(--saffron)' }}>
                  × 40% mentor share = {lang === 'bn' ? num(tk(yearlyEarnings)) : tk(yearlyEarnings)}/year
                </span>
              </div>
              <div className="co-calc-note">{t('tw_calc_note')}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who We're Looking For & Requirements */}
      <section className="sec" id="who">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_who_e')}
            title={t('tw_who_t')}
          />

          <div className="co-who-grid">
            {/* Category chips */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>
                {lang === 'bn' ? 'উন্মুক্ত বিষয়সমূহ' : 'Open Categories'}
              </h3>
              <div className="co-cat-chips">
                {CATS.map((cat) => (
                  <div key={cat.id} className="co-cat-chip" style={{ background: cat.bg }}>
                    <span className="co-cat-dot" style={{ background: 'var(--navy)' }} />
                    <span className="co-cat-name">{cat[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baseline Requirements */}
            <div className="co-req-card">
              <h3>{t('tw_req_title')}</h3>
              <ul className="co-req-list">
                {TEACH_DATA.requirements.map((req, i) => (
                  <li key={i} className="co-req-item">
                    <span className="co-req-ic">
                      <Icon name="check" small />
                    </span>
                    <span>{req[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 steps) */}
      <section className="sec soft" id="how-it-works">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_how_e')}
            title={t('tw_how_t')}
          />

          <div className="co-steps-flow">
            {TEACH_DATA.steps.map((step, idx) => (
              <Reveal
                key={step.num}
                className="co-step-card"
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div className="co-step-num">{lang === 'bn' ? num(step.num) : '0' + step.num}</div>
                <div className="co-step-title">{step[lang].title}</div>
                <div className="co-step-desc">{step[lang].desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Testimonials */}
      <section className="sec" id="testimonials">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_test_e')}
            title={t('tw_test_t')}
          />

          <div className="co-test-grid">
            {TEACH_DATA.testimonials.map((item, idx) => {
              const photoSlot = IMAGES[photoKey(item.mentorKey)];
              return (
                <Reveal
                  key={idx}
                  className="co-test-card"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <p className="co-test-quote">“{item[lang]}”</p>
                  <div className="co-test-author">
                    <div className="co-test-avatar">
                      {photoSlot?.src && (
                        <img
                          src={photoSlot.src}
                          alt={item.name}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="co-test-meta">
                      <b>{item.name}</b>
                      <small>{item.role} · {item.years}</small>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Application Form */}
      <section className="sec soft" id="apply">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_form_e')}
            title={t('tw_form_t')}
            sub={t('tw_form_s')}
          />

          <div className="co-apply-layout">
            {/* Form / Success Card */}
            {submittedApp ? (
              <Reveal className="co-success-card">
                <div className="co-success-icon">
                  <Icon name="checkc" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--ink)', marginBottom: 6 }}>
                    {t('tw_ok_t')}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                    {t('tw_ok_sub')}
                  </p>
                </div>
                <div className="co-ref-box">
                  <div className="co-ref-label">{t('tw_ok_id')}</div>
                  <div className="co-ref-val">{submittedApp.id}</div>
                </div>

                <div className="co-next-steps">
                  <b>{t('tw_ok_step_t')}</b>
                  <div className="co-next-step-item">
                    <span className="co-next-step-num">1</span>
                    <span>{t('tw_ok_n1')}</span>
                  </div>
                  <div className="co-next-step-item">
                    <span className="co-next-step-num">2</span>
                    <span>{t('tw_ok_n2')}</span>
                  </div>
                  <div className="co-next-step-item">
                    <span className="co-next-step-num">3</span>
                    <span>{t('tw_ok_n3')}</span>
                  </div>
                </div>

                <Link to="/" className="btn btn-ink" style={{ marginTop: 10 }}>
                  <span>{t('tw_ok_home')}</span>
                </Link>
              </Reveal>
            ) : (
              <Reveal className="co-form-card">
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="co-form-grid">
                  {/* Name */}
                  <div className="co-form-group">
                    <label htmlFor="name" className="co-form-label">
                      {t('tw_f_name')} *
                    </label>
                    <input
                      ref={nameRef}
                      id="name"
                      type="text"
                      className="co-form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Hossain"
                    />
                    {errors.name && <span className="co-err-msg">{errors.name}</span>}
                  </div>

                  {/* Mobile & Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <div className="co-form-group">
                      <label htmlFor="mobile" className="co-form-label">
                        {t('tw_f_mobile')} *
                      </label>
                      <input
                        ref={mobileRef}
                        id="mobile"
                        type="tel"
                        className="co-form-input"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="01XXXXXXXXX"
                      />
                      {errors.mobile && <span className="co-err-msg">{errors.mobile}</span>}
                    </div>

                    <div className="co-form-group">
                      <label htmlFor="email" className="co-form-label">
                        {t('tw_f_email')} *
                      </label>
                      <input
                        ref={emailRef}
                        id="email"
                        type="email"
                        className="co-form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                      />
                      {errors.email && <span className="co-err-msg">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Category & Experience row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <div className="co-form-group">
                      <label htmlFor="category" className="co-form-label">
                        {t('tw_f_cat')} *
                      </label>
                      <select
                        ref={catRef}
                        id="category"
                        className="co-form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {CATS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="co-form-group">
                      <label htmlFor="experience" className="co-form-label">
                        {t('tw_f_exp')} *
                      </label>
                      <select
                        ref={expRef}
                        id="experience"
                        className="co-form-select"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="1-2">1–2 years</option>
                        <option value="3-5">3–5 years (Recommended)</option>
                        <option value="6-9">6–9 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Current Role */}
                  <div className="co-form-group">
                    <label htmlFor="role" className="co-form-label">
                      {t('tw_f_role')} *
                    </label>
                    <input
                      ref={roleRef}
                      id="role"
                      type="text"
                      className="co-form-input"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Senior Software Engineer at bKash"
                    />
                    {errors.role && <span className="co-err-msg">{errors.role}</span>}
                  </div>

                  {/* Portfolio or LinkedIn Link */}
                  <div className="co-form-group">
                    <label htmlFor="link" className="co-form-label">
                      {t('tw_f_link')} *
                    </label>
                    <input
                      ref={linkRef}
                      id="link"
                      type="url"
                      className="co-form-input"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://linkedin.com/in/... or github.com/..."
                    />
                    {errors.link && <span className="co-err-msg">{errors.link}</span>}
                  </div>

                  {/* Sample Video (Optional) */}
                  <div className="co-form-group">
                    <label htmlFor="videoUrl" className="co-form-label">
                      {t('tw_f_video')}
                    </label>
                    <input
                      id="videoUrl"
                      type="url"
                      className="co-form-input"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/... or Google Drive link"
                    />
                    {errors.videoUrl && <span className="co-err-msg">{errors.videoUrl}</span>}
                  </div>

                  {/* What would you teach? */}
                  <div className="co-form-group">
                    <label htmlFor="description" className="co-form-label">
                      {t('tw_f_desc')} *
                    </label>
                    <textarea
                      ref={descRef}
                      id="description"
                      className="co-form-textarea"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={t('tw_f_desc_hint')}
                    />
                    <div className="co-char-counter">
                      {formData.description.length} / 30 {lang === 'bn' ? 'অক্ষর সর্বনিম্ন' : 'characters minimum'}
                    </div>
                    {errors.description && <span className="co-err-msg">{errors.description}</span>}
                  </div>

                  {/* Preferred Teaching Time (Radio Chips) */}
                  <div className="co-form-group">
                    <label className="co-form-label">{t('tw_f_time')}</label>
                    <div className="co-radio-chips">
                      <div
                        className={`co-radio-chip${formData.schedule === 'evening' ? ' selected' : ''}`}
                        onClick={() => setFormData({ ...formData, schedule: 'evening' })}
                      >
                        {t('tw_f_time_eve')}
                      </div>
                      <div
                        className={`co-radio-chip${formData.schedule === 'weekend' ? ' selected' : ''}`}
                        onClick={() => setFormData({ ...formData, schedule: 'weekend' })}
                      >
                        {t('tw_f_time_wknd')}
                      </div>
                      <div
                        className={`co-radio-chip${formData.schedule === 'recorded' ? ' selected' : ''}`}
                        onClick={() => setFormData({ ...formData, schedule: 'recorded' })}
                      >
                        {t('tw_f_time_rec')}
                      </div>
                    </div>
                  </div>

                  {/* Commitment Checkbox */}
                  <div className="co-form-group">
                    <label className="co-checkbox-label">
                      <input
                        ref={agreeRef}
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                      />
                      <span>{t('tw_f_agree')}</span>
                    </label>
                    {errors.agreed && <span className="co-err-msg">{errors.agreed}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-yellow magnet"
                    style={{ width: '100%', marginTop: 8 }}
                  >
                    <span>{isSubmitting ? t('tw_f_submitting') : t('tw_f_submit')}</span>
                  </button>
                </form>
              </Reveal>
            )}

            {/* Sticky Benefits Sidebar */}
            <aside className="co-sticky-perks">
              <div className="co-perks-head">
                <span className="fi" style={{ background: 'var(--cobalt-50)', color: 'var(--cobalt)' }}>
                  <Icon name="rocket" />
                </span>
                <h3>{lang === 'bn' ? 'নেক্সটল্যার্ন মেন্টর সুবিধা' : 'NextLearn Mentor Perks'}</h3>
              </div>

              <div className="co-perk-item">
                <Icon name="checkc" small />
                <div>
                  <b>{lang === 'bn' ? '৪০% গ্যারান্টিড শেয়ার' : 'Guaranteed 40% Share'}</b>
                  <p>{lang === 'bn' ? 'সরাসরি ব্যাংক বা বিকাশে মাসিক স্বচ্ছ ট্রান্সফার।' : 'Monthly direct disbursements to your bank or bKash.'}</p>
                </div>
              </div>

              <div className="co-perk-item">
                <Icon name="checkc" small />
                <div>
                  <b>{lang === 'bn' ? 'ফ্রি স্টুডিও সুবিধা' : 'Free 4K Studio Bay'}</b>
                  <p>{lang === 'bn' ? 'ঢাকার বনানীতে আধুনিক লাইভ স্টুডিও ও এডিটিং টিম।' : 'Access full studio lighting, teleprompters, and audio tech.'}</p>
                </div>
              </div>

              <div className="co-perk-item">
                <Icon name="checkc" small />
                <div>
                  <b>{lang === 'bn' ? 'হ্যান্ডস-ফ্রি ম্যানেজমেন্ট' : 'Zero Operational Burden'}</b>
                  <p>{lang === 'bn' ? 'স্টুডেন্ট অনবোর্ডিং, সাপোর্ট ও ফি কালেকশন আমাদের।' : 'We handle payments, SMS notifications, and LMS setup.'}</p>
                </div>
              </div>

              <div className="co-perk-item">
                <Icon name="checkc" small />
                <div>
                  <b>{lang === 'bn' ? 'জাতীয় পরিসরে পরিচিতি' : 'Nationwide Brand Reach'}</b>
                  <p>{lang === 'bn' ? '৬৪ জেলার আইটি কমিউনিটিতে শীর্ষ মেন্টর স্বীকৃতি।' : 'Position your profile as an authoritative industry leader.'}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sec" id="faq">
        <div className="wrap">
          <SectionHead
            eyebrow={t('tw_faq_e')}
            title={t('tw_faq_t')}
          />

          <div className="faq" style={{ maxWidth: 840, margin: '0 auto' }}>
            {TEACH_DATA.faqs.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  {f[lang].q}
                  <span className="pm" aria-hidden="true" />
                </summary>
                <p>{f[lang].a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
