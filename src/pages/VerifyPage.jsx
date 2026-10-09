import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { VERIFY_DATA } from '../data/company.js';
import { IMAGES } from '../data/images.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { finePointer, prefersReducedMotion } from '../utils/format.js';
import { store } from '../utils/storage.js';
import Icon from '../components/common/Icon.jsx';
import { LogoMark } from '../components/common/Logo.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Soon from '../components/common/Soon.jsx';
import SectionHead from '../components/home/SectionHead.jsx';

export default function VerifyPage() {
  const { t, lang } = useLang();
  const { toast } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  useDocumentTitle(lang === 'bn' ? 'সার্টিফিকেট যাচাই · NextLearn' : 'Verify a certificate · NextLearn');

  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('empty'); // 'empty' | 'format-error' | 'checking' | 'valid' | 'revoked' | 'not-found'
  const [activeCert, setActiveCert] = useState(null);
  const [copied, setCopied] = useState(false);
  const [recentChecks, setRecentChecks] = useState(() => store.get('nl-verify-recent', []));

  const certRef = useRef(null);
  const tilt = finePointer() && !prefersReducedMotion();

  const onMove = (e) => {
    if (!tilt || !certRef.current) return;
    const r = certRef.current.getBoundingClientRect();
    certRef.current.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 14 + 'deg');
    certRef.current.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 10 + 'deg');
  };
  const onLeave = () => {
    if (!tilt || !certRef.current) return;
    certRef.current.style.setProperty('--ry', '-6deg');
    certRef.current.style.setProperty('--rx', '0deg');
  };

  // Auto format as user types: NL-YY-NNNNN
  const handleInputChange = (e) => {
    const raw = e.target.value;
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let formatted = clean.slice(0, 2);
    if (clean.length > 2) {
      formatted += '-' + clean.slice(2, 4);
    }
    if (clean.length > 4) {
      formatted += '-' + clean.slice(4, 9);
    }
    setInputVal(formatted);
  };

  const performLookup = (idToLookup) => {
    const cleanId = idToLookup.trim().toUpperCase();
    if (!cleanId) {
      setStatus('empty');
      setActiveCert(null);
      setSearchParams({});
      return;
    }

    // Format regex: NL-YY-NNNNN
    const validFormat = /^NL-\d{2}-\d{5}$/i.test(cleanId);
    if (!validFormat) {
      setStatus('format-error');
      setActiveCert(null);
      return;
    }

    setStatus('checking');
    setSearchParams({ id: cleanId });

    // 700ms shimmer effect
    setTimeout(() => {
      const match = VERIFY_DATA.certificates[cleanId];
      if (match) {
        if (match.status === 'valid') {
          setStatus('valid');
          setActiveCert(match);
        } else if (match.status === 'revoked') {
          setStatus('revoked');
          setActiveCert(match);
        }
      } else {
        setStatus('not-found');
        setActiveCert({ id: cleanId });
      }

      // Add to recent checks
      const updatedRecent = [cleanId, ...recentChecks.filter((x) => x !== cleanId)].slice(0, 5);
      setRecentChecks(updatedRecent);
      store.set('nl-verify-recent', updatedRecent);
    }, 700);
  };

  // On page load or URL param change, verify deep link if id param exists
  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId) {
      setInputVal(urlId);
      performLookup(urlId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    performLookup(inputVal);
  };

  const handleCopyLink = () => {
    const currentUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(activeCert?.id || inputVal)}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      toast(t('vc_btn_copied'));
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="co-verify-page">
      <PageHero
        crumb={t('vc_p')}
        title={t('vc_hero_t')}
        sub={t('vc_hero_s')}
      />

      {/* Main Lookup Box */}
      <section className="sec" id="lookup">
        <div className="wrap co-verify-box">
          <Reveal className="co-lookup-card">
            <form onSubmit={handleSubmit} className="co-lookup-form">
              <div className="co-lookup-input-wrap">
                <label htmlFor="verifyInput" className="sr">
                  Certificate ID
                </label>
                <input
                  id="verifyInput"
                  type="text"
                  maxLength={11}
                  className="co-lookup-input"
                  placeholder={t('vc_input_pl')}
                  value={inputVal}
                  onChange={handleInputChange}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <button type="submit" className="btn btn-yellow magnet" style={{ minWidth: 140 }}>
                <span>{t('vc_btn')}</span>
              </button>
            </form>

            {/* Sample ID Chips */}
            <div className="co-sample-chips">
              <span>{t('vc_samples')}</span>
              {VERIFY_DATA.samples.map((sId) => (
                <button
                  key={sId}
                  type="button"
                  className="co-sample-btn"
                  onClick={() => {
                    setInputVal(sId);
                    performLookup(sId);
                  }}
                >
                  {sId}
                </button>
              ))}
            </div>

            {/* Recent Checks */}
            {recentChecks.length > 0 && (
              <div className="co-recent-wrap">
                <span className="co-recent-label">{t('vc_recent')}:</span>
                {recentChecks.map((rId) => (
                  <button
                    key={rId}
                    type="button"
                    className="co-sample-btn"
                    onClick={() => {
                      setInputVal(rId);
                      performLookup(rId);
                    }}
                  >
                    {rId}
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Interactive States Section with aria-live */}
          <div className="co-state-wrap" aria-live="polite">
            {/* 1. Empty State */}
            {status === 'empty' && (
              <div className="co-empty-helper">
                <div className="co-empty-text">
                  <h3>{t('vc_empty_title')}</h3>
                  <p>{t('vc_empty_desc')}</p>
                </div>
                <div className="co-mock-cert" aria-hidden="true">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ color: 'var(--cobalt)', fontSize: '0.8rem' }}>NextLearn</b>
                    <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--saffron)' }} />
                  </div>
                  <div className="co-mock-line" style={{ width: '60%', marginTop: 8 }} />
                  <div className="co-mock-line" style={{ width: '90%' }} />
                  <div className="co-mock-target">
                    <span>ID: NL-24-08812</span>
                    <small>← ID position</small>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Format Error */}
            {status === 'format-error' && (
              <div className="co-notfound-card">
                <div className="co-notfound-head">
                  <Icon name="x" />
                  <span>{t('vc_err_fmt')}</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: 0 }}>
                  {lang === 'bn'
                    ? 'আইডি অবশ্যই NL-YY-NNNNN ফরম্যাটে হতে হবে, যেমন NL-24-08812।'
                    : 'Certificate IDs always follow the exact pattern NL-YY-NNNNN, where YY is the year and NNNNN are five digits.'}
                </p>
              </div>
            )}

            {/* 3. Checking Skeleton */}
            {status === 'checking' && (
              <div className="co-shimmer-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="co-shimmer-line" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                  <div className="co-shimmer-line" style={{ width: 200, height: 24 }} />
                </div>
                <div className="co-shimmer-line" style={{ width: '80%', height: 28 }} />
                <div className="co-shimmer-line" style={{ width: '60%', height: 20 }} />
                <div className="co-shimmer-line" style={{ width: '100%', height: 160, borderRadius: 16 }} />
                <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem', marginTop: 8 }}>
                  {t('vc_checking')}
                </div>
              </div>
            )}

            {/* 4. Valid Certificate State */}
            {status === 'valid' && activeCert && (
              <div className="co-valid-result">
                <div className="co-valid-banner">
                  <div className="co-valid-banner-left">
                    <Icon name="checkc" />
                    <span>{t('vc_ok_badge')}</span>
                  </div>
                  <span className="pill mint">{activeCert.batch || 'Batch Verified'}</span>
                </div>

                {/* Print area container */}
                <div className="co-cert-print-area cert-wrap" style={{ perspective: 1200, width: '100%', maxWidth: 680 }}>
                  <div
                    ref={certRef}
                    className="cert ok"
                    onPointerMove={onMove}
                    onPointerLeave={onLeave}
                  >
                    <div className="cert-in">
                      <div className="cert-top">
                        <span className="logo">
                          <LogoMark />
                          NextLearn
                        </span>
                        <span className="seal">
                          <Icon name="award" />
                        </span>
                      </div>
                      <small>{t('ce1')}</small>
                      <b className="cname">{activeCert.name}</b>
                      <span>{t('ce2')}</span>
                      <b className="ccourse">{activeCert.course}</b>

                      {/* Extra verified credentials detail */}
                      <div style={{ margin: '14px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, fontSize: '0.82rem', textAlign: 'left', background: 'var(--soft)', padding: 12, borderRadius: 10 }}>
                        <div>
                          <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>{t('vc_mentor')}</span>
                          <b>{activeCert.mentor}</b>
                        </div>
                        <div>
                          <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>{t('vc_grade')}</span>
                          <b>{lang === 'bn' ? activeCert.gradeBn : activeCert.grade}</b>
                        </div>
                        <div>
                          <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>{t('vc_hours')}</span>
                          <b>{lang === 'bn' ? activeCert.hoursBn : activeCert.hours}</b>
                        </div>
                      </div>

                      {/* Skills Chips */}
                      {activeCert.skills && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', margin: '6px 0 10px' }}>
                          {activeCert.skills.map((sk) => (
                            <span key={sk} className="pill glass" style={{ fontSize: '0.74rem', background: '#F0F2FA', color: 'var(--ink)' }}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="cert-foot">
                        <span>
                          ID {activeCert.id}
                          <br />
                          <small>{lang === 'bn' ? activeCert.dateBn : activeCert.date}</small>
                        </span>
                        <span className="qr" aria-hidden="true">
                          {Array.from({ length: 25 }, (_, i) => (
                            <i key={i} />
                          ))}
                        </span>
                      </div>
                    </div>
                    <span className="cert-shine" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="co-actions-bar">
                  <button type="button" onClick={handleCopyLink} className="btn btn-sm btn-line">
                    <Icon name="share" small />
                    <span>{copied ? t('vc_btn_copied') : t('vc_btn_copy')}</span>
                  </button>
                  <button type="button" onClick={handlePrint} className="btn btn-sm btn-ink">
                    <Icon name="sheet" small />
                    <span>{t('vc_btn_pdf')}</span>
                  </button>
                  <Soon className="btn btn-sm btn-line">
                    <Icon name="chat" small />
                    <span>{t('vc_btn_share')}</span>
                  </Soon>
                </div>
              </div>
            )}

            {/* 5. Revoked Certificate State */}
            {status === 'revoked' && activeCert && (
              <div className="co-revoked-card">
                <div className="co-revoked-head">
                  <Icon name="lock" />
                  <span>{t('vc_revoked_badge')} — {activeCert.id}</span>
                </div>
                <p style={{ fontWeight: 600, color: '#8C5F00', margin: 0 }}>
                  {t('vc_revoked_title')}
                </p>
                <div style={{ background: '#ffffff', padding: 16, borderRadius: 'var(--r)', border: '1px solid #FFE4B8', fontSize: '0.9rem' }}>
                  <div style={{ marginBottom: 6 }}>
                    <b>{t('vc_learner')}:</b> {activeCert.name}
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <b>{t('vc_course')}:</b> {activeCert.course}
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <b>{lang === 'bn' ? 'বাতিলের তারিখ' : 'Revocation Date'}:</b> {lang === 'bn' ? activeCert.revokedDateBn : activeCert.revokedDate}
                  </div>
                  <div style={{ color: '#A32014', marginTop: 10, lineHeight: 1.5 }}>
                    <b>{lang === 'bn' ? 'কারণ' : 'Reason'}:</b> {lang === 'bn' ? activeCert.reasonBn : activeCert.reasonEn}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Not Found State */}
            {status === 'not-found' && (
              <div className="co-notfound-card">
                <div className="co-notfound-head">
                  <Icon name="x" />
                  <span>{t('vc_notfound_badge')}: {inputVal}</span>
                </div>
                <p style={{ fontWeight: 600, color: '#A32014', margin: 0 }}>
                  {t('vc_notfound_title')}
                </p>
                <ul style={{ paddingLeft: 20, margin: '8px 0 0', fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                  <li>{t('vc_notfound_tip1')}</li>
                  <li>{t('vc_notfound_tip2')}</li>
                  <li>
                    {t('vc_notfound_tip3')}{' '}
                    <Link to="/contact" style={{ color: 'var(--cobalt)', fontWeight: 600, textDecoration: 'underline' }}>
                      {t('vc_notfound_contact')}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* For Employers & Recruiters Section */}
      <section className="sec soft" id="employers">
        <div className="wrap">
          <SectionHead
            eyebrow={t('vc_emp_e')}
            title={t('vc_emp_t')}
          />

          <div className="co-emp-grid">
            <div className="co-emp-steps">
              {VERIFY_DATA.employerSteps.map((s) => (
                <div key={s.step} className="co-emp-step">
                  <span className="co-emp-step-num">0{s.step}</span>
                  <div>
                    <b style={{ display: 'block', fontSize: '1.05rem', color: 'var(--ink)', marginBottom: 4 }}>
                      {s[lang].title}
                    </b>
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {s[lang].desc}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ background: 'var(--cobalt-50)', border: '1px solid var(--cobalt)', borderRadius: 'var(--r)', padding: '14px 18px', color: 'var(--cobalt)', fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.5 }}>
                {t('vc_emp_qr')}
              </div>
            </div>

            <Reveal className="co-story-media" style={{ aspectRatio: '4/3', maxHeight: 380 }}>
              {IMAGES.vc_employer?.src && (
                <img
                  src={IMAGES.vc_employer.src}
                  alt={IMAGES.vc_employer.alt}
                  loading="lazy"
                  width="800"
                  height="600"
                />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust & Security Strip */}
      <section className="sec" id="trust">
        <div className="wrap">
          <SectionHead
            eyebrow={t('vc_trust_e')}
            title={t('vc_trust_t')}
          />

          <div className="co-trust-grid">
            {(VERIFY_DATA.trustPoints || VERIFY_DATA.trustFeatures || []).map((tf, i) => (
              <Reveal
                key={i}
                className="co-trust-card"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="fi" style={{ background: 'var(--mint-50)', color: '#0E6B4A' }}>
                  <Icon name={tf.icon} />
                </span>
                <b style={{ fontSize: '1rem', color: 'var(--ink)' }}>{tf[lang].title}</b>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  {tf[lang].desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
