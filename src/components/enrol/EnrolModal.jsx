import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { dateParts, isValidBdMobile, tk } from '../../utils/format.js';
import { IMAGES } from '../../data/images.js';
import Icon from '../common/Icon.jsx';
import Media from '../common/Media.jsx';

const STEPS = ['Plan', 'Verify', 'Pay'];
const PAYS = [['bkash', 'bKash', '#E2136E'], ['nagad', 'Nagad', '#F6921E'], ['rocket', 'Rocket', '#8C3494'], ['card', 'Card', '#1A1F71']];
const courseImg = (c) => (IMAGES['course' + c.id] ? 'course' + c.id : 'cat_' + c.cat);

/** Three-step enrolment: plan and coupon, mobile + OTP, payment method, then a receipt. */
export default function EnrolModal() {
  const { enrolCourse: c, closeAll, toast, confetti, enroll } = useApp();
  const open = !!c;
  // Keep the last course around so the modal can animate out with content.
  const [course, setCourse] = useState(null);
  const [session, setSession] = useState(0);
  useEffect(() => {
    if (c) {
      setCourse(c);
      setSession((n) => n + 1);
    }
  }, [c]);

  return (
    <div className={`modal${open ? ' on' : ''}`} role="dialog" aria-modal="true" aria-labelledby="mTitle">
      {course && (
        <EnrolFlow key={session} c={course} onClose={() => closeAll()} toast={toast} confetti={confetti} enroll={enroll} />
      )}
    </div>
  );
}

function EnrolFlow({ c, onClose, toast, confetti, enroll }) {
  const { ui } = useLang();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState('full');
  const [cp, setCp] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpErr, setOtpErr] = useState('');
  const [pay, setPay] = useState('bkash');
  const [processing, setProcessing] = useState(false);
  const [receipt] = useState(() => 'NL-' + String(Date.now()).slice(-6));
  const otpRefs = useRef([]);
  const focusRef = useRef(null);

  const d = Math.round(c.p * cp);
  const total = c.p - d;
  const now = plan === 'inst' && c.inst ? Math.ceil(total / c.inst) : total;
  const live = c.f === 'live';

  useEffect(() => {
    const id = setTimeout(() => (otpSent && step === 2 ? otpRefs.current[0] : focusRef.current)?.focus(), 50);
    return () => clearTimeout(id);
  }, [step, otpSent]);

  const sendCode = () => {
    const p = phone.replace(/\D/g, '');
    if (!isValidBdMobile(p)) {
      setPhoneErr('Enter a valid 11-digit mobile number, like 01712345678.');
      focusRef.current?.focus();
      return;
    }
    setPhone(p);
    setPhoneErr('');
    setOtpSent(true);
  };

  const verify = (digits = otp) => {
    if (!digits.every(Boolean)) return setOtpErr('Enter all 4 digits.');
    setStep(3);
  };

  const setDigit = (i, v) => {
    const next = [...otp];
    next[i] = v.replace(/\D/g, '').slice(-1);
    setOtp(next);
    if (next[i] && i < 3) otpRefs.current[i + 1]?.focus();
    if (next.every(Boolean)) verify(next);
  };

  const payNow = () => {
    setProcessing(true);
    setTimeout(() => {
      enroll(c.id);
      setStep(4);
      confetti();
    }, 1100);
  };

  const mini = (
    <div className="mini">
      <span className="sw"><Media img={courseImg(c)} /></span>
      <div>
        <b>{c.t}</b>
        <span>{live ? `${ui.live} · Batch ${c.b} · ${ui.starts} ${dateParts(c.st).full}` : ui.self}</span>
      </div>
    </div>
  );

  let body;
  if (step === 1) {
    body = (
      <>
        {mini}
        <label className="opt">
          <input type="radio" name="plan" value="full" checked={plan === 'full'} onChange={() => setPlan('full')} />
          <span className="ot"><b>Pay in full</b><span>One payment, best value</span></span>
          <span className="op">{tk(total)}</span>
        </label>
        {c.inst && (
          <label className="opt">
            <input type="radio" name="plan" value="inst" checked={plan === 'inst'} onChange={() => setPlan('inst')} />
            <span className="ot"><b>{c.inst} monthly instalments</b><span>Pay the first today, the rest monthly</span></span>
            <span className="op">
              {tk(Math.ceil(total / c.inst))}
              <small style={{ fontSize: '.7rem', color: 'var(--muted)' }}>/mo</small>
            </span>
          </label>
        )}
        <div className="coupon">
          <label htmlFor="cp" className="sr">Coupon</label>
          <input id="cp" placeholder="Coupon (try NEXT10)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <button
            type="button"
            className="btn btn-line btn-sm"
            onClick={() => {
              if (coupon.trim().toUpperCase() === 'NEXT10') {
                setCp(0.1);
                toast('Coupon applied: 10% off');
              } else toast('That coupon is not valid');
            }}
          >
            <span>Apply</span>
          </button>
        </div>
        <div className="sum">
          <div><span>Course price</span><span>{tk(c.p)}</span></div>
          {d > 0 && <div className="disc"><span>NEXT10</span><span>−{tk(d)}</span></div>}
          <div className="tot"><span>Pay today</span><span>{tk(now)}</span></div>
        </div>
        <button type="button" className="btn btn-sun" ref={focusRef} onClick={() => { setStep(2); setOtpSent(false); }}>
          <span>Continue</span>
          <span className="arr"><Icon name="arrow" small /></span>
        </button>
      </>
    );
  } else if (step === 2 && !otpSent) {
    body = (
      <>
        {mini}
        <div className="fld">
          <label htmlFor="ph">Mobile number</label>
          <div className="phone">
            <span>+880</span>
            <input id="ph" ref={focusRef} inputMode="numeric" maxLength={11} placeholder="1XXX XXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendCode()} />
          </div>
          <span className="hint">We'll text you a 4-digit code. Your number becomes your login, no password needed.</span>
        </div>
        <div className="err">{phoneErr}</div>
        <button type="button" className="btn btn-sun" onClick={sendCode}><span>Send code</span></button>
        <button type="button" className="btn btn-line" onClick={() => setStep(1)}><span>Back</span></button>
      </>
    );
  } else if (step === 2) {
    body = (
      <>
        <p style={{ textAlign: 'center' }}>
          Enter the code sent to <b>+880 {phone.replace(/^0/, '')}</b>
        </p>
        <div className="otp">
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => (otpRefs.current[i] = el)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              value={v}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !v && i) otpRefs.current[i - 1]?.focus();
              }}
              onPaste={(e) => {
                const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4);
                if (t.length === 4) {
                  e.preventDefault();
                  const digits = t.split('');
                  setOtp(digits);
                  verify(digits);
                }
              }}
            />
          ))}
        </div>
        <p className="hint" style={{ textAlign: 'center' }}>Demo: any 4 digits work.</p>
        <div className="err" style={{ textAlign: 'center' }}>{otpErr}</div>
        <button type="button" className="btn btn-sun" onClick={() => verify()}><span>Verify</span></button>
        <button type="button" className="btn btn-line" onClick={() => { setOtpSent(false); setOtp(['', '', '', '']); }}><span>Change number</span></button>
      </>
    );
  } else if (step === 3) {
    body = (
      <>
        <div className="pays">
          {PAYS.map(([id, name, color]) => (
            <label className="opt" key={id}>
              <input type="radio" name="pay" value={id} checked={pay === id} onChange={() => setPay(id)} />
              <span className="lb" style={{ background: color }}>{name}</span>
              <span className="hint">{id === 'card' ? 'Visa, Mastercard, Amex' : 'Mobile wallet'}</span>
            </label>
          ))}
        </div>
        <div className="sum"><div className="tot"><span>Pay today</span><span>{tk(now)}</span></div></div>
        <button type="button" className="btn btn-sun" ref={focusRef} disabled={processing} onClick={payNow}>
          {processing ? <span>Processing…</span> : <><Icon name="lock" small /><span>Pay {tk(now)} securely</span></>}
        </button>
        <span className="guar">Secured by SSLCommerz · 7-day refund</span>
        <button type="button" className="btn btn-line" onClick={() => setStep(2)}><span>Back</span></button>
      </>
    );
  } else {
    const payName = { bkash: 'bKash', nagad: 'Nagad', rocket: 'Rocket', card: 'Card' }[pay];
    body = (
      <div className="success">
        <span className="okc">
          <svg className="ic" style={{ width: 44, height: 44, strokeWidth: 2.8 }} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h3>You're in!</h3>
        <p>A confirmation SMS is on its way.</p>
        <div className="tix">
          <div><span>Course</span><b>{c.s}</b></div>
          {live ? (
            <div><span>First class</span><b>{dateParts(c.st).full}, {c.time}</b></div>
          ) : (
            <div><span>Access</span><b>Starts now</b></div>
          )}
          <div><span>Paid</span><b>{tk(now)} via {payName}</b></div>
          <div><span>Receipt</span><b>{receipt}</b></div>
        </div>
        <button type="button" className="btn btn-sun" style={{ width: '100%' }} ref={focusRef} onClick={() => { onClose(); toast('Enrolled in ' + c.s); }}>
          <span>Go to my dashboard</span>
        </button>
        <span className="hint">The dashboard comes in the next design phase.</span>
      </div>
    );
  }

  return (
    <>
      <div className="mh">
        <h3 id="mTitle">{step < 4 ? 'Enrol in this course' : 'Enrolment complete'}</h3>
        <button type="button" className="mx" aria-label="Close" onClick={onClose}><Icon name="x" small /></button>
      </div>
      {step < 4 && (
        <div className="steps-p">
          {STEPS.map((s, i) => (
            <div key={s} className={i < step ? 'd' : undefined}><i />{i + 1}. {s}</div>
          ))}
        </div>
      )}
      <div className="mb">{body}</div>
    </>
  );
}
