import { useRef, useState } from 'react';
import Icon from '../components/common/Icon.jsx';
import Media from '../components/common/Media.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import SectionHead from '../components/home/SectionHead.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { SLOTS, STEP_ICONS } from '../data/courses.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useScroll from '../hooks/useScroll.js';
import { isValidBdMobile, prefersReducedMotion } from '../utils/format.js';

export default function FreeClassPage() {
  const { t, x, num, lang } = useLang();
  const { toast, confetti } = useApp();
  const [slot, setSlot] = useState(0);
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const phoneRef = useRef(null);
  const artRef = useRef(null);
  useDocumentTitle('Free live class · NextLearn');

  // Gentle parallax on the photo once a real image is set.
  useScroll(() => {
    if (prefersReducedMotion()) return;
    const im = artRef.current?.querySelector('img.px');
    if (!im) return;
    const r = im.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    im.style.transform = `translateY(${((r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight) * -7}%)`;
  });

  const submit = (e) => {
    e.preventDefault();
    if (!isValidBdMobile(phone.replace(/\D/g, ''))) {
      setErr(lang === 'bn' ? 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন, যেমন 01712345678।' : 'Enter a valid 11-digit mobile number, like 01712345678.');
      phoneRef.current?.focus();
      return;
    }
    setErr('');
    setPhone('');
    toast((lang === 'bn' ? 'সিট বুক হয়েছে: ' : 'Seat reserved: ') + SLOTS[slot].t);
    confetti();
  };

  return (
    <>
      <PageHero bg="bg_free" crumb={t('nv5')} title={t('fp_t')} sub={t('fp_s')} />
      <section id="free" className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal className="free">
            <div className="free-art" ref={artRef}>
              <Media img="free" parallax />
              <div className="tagc"><span className="pill live">{t('lv')}</span><span>{t('fr_c')}</span></div>
            </div>
            <div className="free-body">
              <span className="eyebrow"><i /><span>{t('fr_e')}</span></span>
              <h2 className="h2" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)' }}>{t('fr_t')}</h2>
              <p className="sub" style={{ marginTop: 0 }}>{t('fr_s')}</p>
              <div className="slots" role="radiogroup" aria-label="Free classes">
                {SLOTS.map((s, i) => (
                  <button type="button" role="radio" className="slot" aria-checked={i === slot} key={s.t} onClick={() => setSlot(i)}>
                    <span className="sd"><small>{s.w}</small><b>{num(s.d)}</b><small>Oct</small></span>
                    <span className="st-t"><b>{s.t}</b><small>{s.h} · {s.m}</small></span>
                    <span className="rad"><Icon name="check" small /></span>
                  </button>
                ))}
              </div>
              <form className="free-form" noValidate onSubmit={submit}>
                <span className="cc">+880</span>
                <label htmlFor="fPhone" className="sr">Mobile number</label>
                <input id="fPhone" ref={phoneRef} inputMode="numeric" maxLength={11} placeholder="01XXX XXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button type="submit" className="btn btn-sm"><span>{t('fr_b')}</span></button>
              </form>
              <div className="ferr" role="alert">{err}</div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="sec soft">
        <div className="wrap">
          <SectionHead eyebrow={t('fw_e')} title={t('fw_t')} />
          <div className="steps3">
            {x.steps.map(([title, body], i) => (
              <Reveal key={i} className="s3" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="fi" style={{ background: STEP_ICONS[i][1], color: STEP_ICONS[i][2] }}><Icon name={STEP_ICONS[i][0]} /></span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
