import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthVisual from '../components/auth/AuthVisual.jsx';
import PasswordMeter from '../components/auth/PasswordMeter.jsx';
import SocialButtons from '../components/auth/SocialButtons.jsx';
import Icon from '../components/common/Icon.jsx';
import Logo from '../components/Logo.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile, isValidEmail } from '../utils/format.js';
import { store } from '../utils/storage.js';

export default function SignupPage() {
  const { t, num, lang } = useLang();
  const { confetti, toast } = useApp();
  const navigate = useNavigate();

  useDocumentTitle(lang === 'bn' ? 'ফ্রি সাইন আপ · Technofy Bangladesh' : 'Sign up free · Technofy Bangladesh');

  // Tab: 'email' or 'otp'
  const [tab, setTab] = useState('email');

  // Form fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consent, setConsent] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP tab states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);

  // Errors & submission state
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Field refs for auto-focusing on first error
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const consentRef = useRef(null);
  const otpRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return undefined;
    const timer = setInterval(() => {
      setResendTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Validation function
  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = t('au_err_name');
    }
    if (!mobile.trim() || !isValidBdMobile(mobile.trim())) {
      errs.mobile = t('au_err_mobile');
    }

    if (tab === 'email') {
      if (!email.trim() || !isValidEmail(email.trim())) {
        errs.email = t('au_err_email');
      }
      if (!password || password.length < 8) {
        errs.password = t('au_err_password');
      }
      if (password !== confirmPassword) {
        errs.confirmPassword = t('au_err_confirm_pw');
      }
    } else if (tab === 'otp') {
      if (otpSent && !otp.every(Boolean)) {
        errs.otp = t('au_err_otp');
      }
    }

    if (!consent) {
      errs.consent = t('au_err_consent');
    }

    setErrors(errs);

    // Auto-focus first invalid field
    if (errs.name) nameRef.current?.focus();
    else if (errs.mobile) mobileRef.current?.focus();
    else if (errs.email) emailRef.current?.focus();
    else if (errs.password) passwordRef.current?.focus();
    else if (errs.confirmPassword) confirmPasswordRef.current?.focus();
    else if (errs.otp) otpRefs.current[0]?.focus();
    else if (errs.consent) consentRef.current?.focus();

    return Object.keys(errs).length === 0;
  };

  // Send OTP
  const handleSendCode = () => {
    if (!mobile.trim() || !isValidBdMobile(mobile.trim())) {
      setErrors((prev) => ({ ...prev, mobile: t('au_err_mobile') }));
      mobileRef.current?.focus();
      return;
    }
    setErrors((prev) => ({ ...prev, mobile: '' }));
    setOtpSent(true);
    setResendTimer(45);
    toast(lang === 'bn' ? 'ডেমো ওটিপি পাঠানো হয়েছে' : 'Demo OTP sent to mobile');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  // Handle OTP digit inputs
  const handleDigitChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = clean;
    setOtp(updated);
    if (clean && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'otp' && !otpSent) {
      handleSendCode();
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
      confetti();

      // Store demo user session
      store.set('nl-user', {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim() || `${mobile.trim()}@learner.technofybd.com`,
        authType: tab,
        joinedAt: new Date().toISOString(),
      });
    }, 1000);
  };

  return (
    <div className="au-page">
      <div className="au-container">
        {/* Left Visual Hero */}
        <AuthVisual
          imgKey="au_signup"
          quoteKey="au_signup_quote"
          badgeKey="au_trust1"
        />

        {/* Right Form Card */}
        <div className="au-card">
          <Link to="/" className="au-card-logo" aria-label="Technofy Bangladesh home">
            <Logo variant="full" theme="light" />
          </Link>
          {isSuccess ? (
            <div className="au-success-card" role="status" aria-live="polite">
              <div className="au-success-icon">
                <Icon name="check" />
              </div>
              <h2 className="au-success-title">
                {t('au_success_title')} {name.trim() ? `, ${name.split(' ')[0]}` : ''}!
              </h2>
              <p className="au-success-sub">{t('au_success_sub')}</p>
              <div className="au-success-actions">
                <Link to="/courses" className="btn btn-sun">
                  <span>{t('au_btn_browse')}</span>
                  <span className="arr"><Icon name="arrow" small /></span>
                </Link>
                <Link to="/" className="btn btn-line">
                  <span>{t('au_btn_home')}</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="au-head au-stagger-1">
                <h1 className="au-title">{t('au_signup_title')}</h1>
                <p className="au-sub">{t('au_signup_sub')}</p>
              </div>

              {/* Social Login Placeholders */}
              <div className="au-stagger-2">
                <SocialButtons />
              </div>

              {/* Tabs: Email vs OTP */}
              <div className="au-tabs au-stagger-3" role="tablist" aria-label="Sign up options">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'email'}
                  className={`au-tab-btn${tab === 'email' ? ' active' : ''}`}
                  onClick={() => { setTab('email'); setErrors({}); }}
                >
                  {t('au_tab_email')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'otp'}
                  className={`au-tab-btn${tab === 'otp' ? ' active' : ''}`}
                  onClick={() => { setTab('otp'); setErrors({}); }}
                >
                  {t('au_tab_otp')}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="au-form au-stagger-4">
                {/* Full Name */}
                <div className="au-fld">
                  <label htmlFor="su-name" className="au-label">
                    <span>{t('au_name_label')}</span>
                  </label>
                  <input
                    id="su-name"
                    ref={nameRef}
                    type="text"
                    className={`au-input${errors.name ? ' has-err' : ''}`}
                    placeholder={t('au_name_ph')}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    autoComplete="name"
                  />
                  {errors.name && <div className="au-err" role="alert" aria-live="polite">{errors.name}</div>}
                </div>

                {/* Mobile Number */}
                <div className="au-fld">
                  <label htmlFor="su-mobile" className="au-label">
                    <span>{t('au_mobile_label')}</span>
                  </label>
                  <div className="phone">
                    <span>+880</span>
                    <input
                      id="su-mobile"
                      ref={mobileRef}
                      type="tel"
                      inputMode="numeric"
                      maxLength={11}
                      className={errors.mobile ? 'has-err' : ''}
                      placeholder="017XXXXXXXX"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                      }}
                      autoComplete="tel"
                    />
                  </div>
                  <span className="au-hint">{t('au_mobile_hint')}</span>
                  {errors.mobile && <div className="au-err" role="alert" aria-live="polite">{errors.mobile}</div>}
                </div>

                {/* Email Tab Fields */}
                {tab === 'email' ? (
                  <>
                    {/* Email */}
                    <div className="au-fld">
                      <label htmlFor="su-email" className="au-label">
                        <span>{t('au_email_label')}</span>
                      </label>
                      <input
                        id="su-email"
                        ref={emailRef}
                        type="email"
                        className={`au-input${errors.email ? ' has-err' : ''}`}
                        placeholder={t('au_email_ph')}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        autoComplete="email"
                      />
                      {errors.email && <div className="au-err" role="alert" aria-live="polite">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="au-fld">
                      <label htmlFor="su-pw" className="au-label">
                        <span>{t('au_password_label')}</span>
                      </label>
                      <div className="au-input-wrap">
                        <input
                          id="su-pw"
                          ref={passwordRef}
                          type={showPassword ? 'text' : 'password'}
                          className={`au-input${errors.password ? ' has-err' : ''}`}
                          placeholder={t('au_password_ph')}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                          }}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="au-eye-btn"
                          aria-label={showPassword ? t('au_hide_pw') : t('au_show_pw')}
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          <Icon name={showPassword ? 'eye-off' : 'eye'} small />
                        </button>
                      </div>
                      <PasswordMeter password={password} />
                      {errors.password && <div className="au-err" role="alert" aria-live="polite">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="au-fld">
                      <label htmlFor="su-cpw" className="au-label">
                        <span>{t('au_confirm_pw_label')}</span>
                      </label>
                      <div className="au-input-wrap">
                        <input
                          id="su-cpw"
                          ref={confirmPasswordRef}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`au-input${errors.confirmPassword ? ' has-err' : ''}`}
                          placeholder={t('au_confirm_pw_ph')}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                          }}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="au-eye-btn"
                          aria-label={showConfirmPassword ? t('au_hide_pw') : t('au_show_pw')}
                          onClick={() => setShowConfirmPassword((p) => !p)}
                        >
                          <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} small />
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="au-err" role="alert" aria-live="polite">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </>
                ) : (
                  /* OTP Tab Fields */
                  <>
                    {!otpSent ? (
                      <button
                        type="button"
                        className="btn btn-line"
                        onClick={handleSendCode}
                      >
                        <span>{t('au_send_code')}</span>
                      </button>
                    ) : (
                      <div className="au-fld">
                        <label className="au-label">
                          <span>{t('au_otp_sent_to')} +880 {mobile.replace(/^0/, '')}</span>
                        </label>
                        <div className="otp">
                          {otp.map((d, idx) => (
                            <input
                              key={idx}
                              ref={(el) => (otpRefs.current[idx] = el)}
                              inputMode="numeric"
                              maxLength={1}
                              aria-label={`OTP Digit ${idx + 1}`}
                              value={d}
                              onChange={(e) => handleDigitChange(idx, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !d && idx > 0) {
                                  otpRefs.current[idx - 1]?.focus();
                                }
                              }}
                              onPaste={(e) => {
                                const pasted = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4);
                                if (pasted.length === 4) {
                                  e.preventDefault();
                                  const digits = pasted.split('');
                                  setOtp(digits);
                                  otpRefs.current[3]?.focus();
                                }
                              }}
                            />
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                          <span className="au-hint">{t('au_otp_hint')}</span>
                          {resendTimer > 0 ? (
                            <span className="au-hint">
                              {t('au_resend_in')} {num(resendTimer)}s
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-line btn-sm"
                              onClick={handleSendCode}
                            >
                              <span>{t('au_resend_code')}</span>
                            </button>
                          )}
                        </div>
                        {errors.otp && <div className="au-err" role="alert" aria-live="polite">{errors.otp}</div>}
                      </div>
                    )}
                  </>
                )}

                {/* Terms & Refund Policy Consent */}
                <div className="au-fld" style={{ marginTop: 6 }}>
                  <label className="au-check-label">
                    <input
                      type="checkbox"
                      ref={consentRef}
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                      }}
                    />
                    <span>
                      {lang === 'bn' ? (
                        <>
                          আমি Technofy Bangladesh-এর{' '}
                          <Link to="/refund-policy#terms">{t('au_terms_link')}</Link> ও{' '}
                          <Link to="/refund-policy">{t('au_refund_link')}</Link> মেনে নিচ্ছি
                        </>
                      ) : (
                        <>
                          I agree to the{' '}
                          <Link to="/refund-policy#terms">{t('au_terms_link')}</Link> and{' '}
                          <Link to="/refund-policy">{t('au_refund_link')}</Link>
                        </>
                      )}
                    </span>
                  </label>
                  {errors.consent && <div className="au-err" role="alert" aria-live="polite">{errors.consent}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-sun au-submit-btn"
                >
                  <span>{submitting ? t('au_btn_creating') : t('au_btn_signup')}</span>
                  {!submitting && <span className="arr"><Icon name="arrow" small /></span>}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="au-switch">
                <span>{t('au_have_account')}</span>
                <Link to="/login">{t('au_login_link')}</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
