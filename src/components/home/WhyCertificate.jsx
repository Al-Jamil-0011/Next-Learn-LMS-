import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { FEATURE_ICONS } from '../../data/courses.js';
import { finePointer, prefersReducedMotion } from '../../utils/format.js';
import Icon from '../common/Icon.jsx';
import { LogoMark } from '../common/Logo.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const VALID_ID = 'NL-24-08812';

export default function WhyCertificate() {
  const { t, x, lang } = useLang();
  const cert = useRef(null);
  const [certId, setCertId] = useState(VALID_ID);
  const [result, setResult] = useState(null); // { ok, id }
  const [flash, setFlash] = useState(0);
  const tilt = finePointer() && !prefersReducedMotion();

  const onMove = (e) => {
    if (!tilt) return;
    const r = cert.current.getBoundingClientRect();
    cert.current.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 14 + 'deg');
    cert.current.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 10 + 'deg');
  };
  const onLeave = () => {
    if (!tilt) return;
    cert.current.style.setProperty('--ry', '-6deg');
    cert.current.style.setProperty('--rx', '0deg');
  };

  const verify = (e) => {
    e.preventDefault();
    const v = certId.trim().toUpperCase();
    const ok = v === VALID_ID;
    setResult({ ok, id: v });
    if (ok) setFlash((n) => n + 1);
  };

  return (
    <section className="sec" id="why">
      <div className="wrap why">
        <div>
          <SectionHead eyebrow={t('wy_e')} title={t('wy_t')} sub={t('wy_s')} />
          <div className="feats">
            {x.feats.map(([title, body], i) => (
              <Reveal key={i} className="feat" style={{ transitionDelay: `${(i % 2) * 80 + (i >> 1) * 60}ms` }}>
                <span className="fi" style={{ background: FEATURE_ICONS[i][1], color: FEATURE_ICONS[i][2] }}>
                  <Icon name={FEATURE_ICONS[i][0]} />
                </span>
                <div><b>{title}</b><p>{body}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="cert-wrap">
          <div
            key={flash}
            ref={cert}
            className={`cert${result?.ok ? ' ok' : ''}`}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <div className="cert-in">
              <div className="cert-top">
                <span className="logo"><LogoMark />NextLearn</span>
                <span className="seal"><Icon name="award" /></span>
              </div>
              <small>{t('ce1')}</small>
              <b className="cname">Sadia Rahman</b>
              <span>{t('ce2')}</span>
              <b className="ccourse">UI/UX Design from Zero to Portfolio</b>
              <div className="cert-foot">
                <span>ID NL-24-08812<br /><small>14 Aug 2024</small></span>
                <span className="qr" aria-hidden="true">
                  {Array.from({ length: 25 }, (_, i) => <i key={i} />)}
                </span>
              </div>
            </div>
            <span className="cert-shine" />
          </div>
          <form className="verify" onSubmit={verify}>
            <label htmlFor="certId" className="sr">Certificate ID</label>
            <input id="certId" value={certId} autoComplete="off" onChange={(e) => setCertId(e.target.value)} />
            <button type="submit" className="btn btn-sm"><span>{t('verify')}</span></button>
          </form>
          <Link to={`/verify?id=${encodeURIComponent(certId.trim())}`} className="co-more-link">
            {lang === 'bn' ? 'সম্পূর্ণ ভেরিফিকেশন পেজ দেখুন →' : 'See full verification page →'}
          </Link>
          <div className="vout" role="status">
            {result &&
              (result.ok ? (
                <div className="ok">
                  <Icon name="checkc" small />
                  <span>
                    <b>{lang === 'bn' ? 'বৈধ সার্টিফিকেট।' : 'Valid certificate.'}</b> Sadia Rahman, UI/UX Design from Zero to Portfolio, 14 Aug 2024.
                  </span>
                </div>
              ) : (
                <div className="no">
                  <Icon name="x" small />
                  <span>
                    {lang === 'bn' ? 'এই আইডিতে কোনো সার্টিফিকেট পাওয়া যায়নি:' : 'No certificate found with ID'} <b>{result.id || '(empty)'}</b>
                  </span>
                </div>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
