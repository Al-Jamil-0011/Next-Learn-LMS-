import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthVisual from '../components/auth/AuthVisual.jsx';
import SocialButtons from '../components/auth/SocialButtons.jsx';
import Icon from '../components/common/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile, isValidEmail } from '../utils/format.js';
import { store } from '../utils/storage.js';

export default function LoginPage() {
  const { t, num, lang } = useLang();
  const { toast } = useApp();
  const navigate = useNavigate();

  useDocumentTitle(lang === 'bn' ? 'লগ ইন · NextLearn' : 'Log in · NextLearn');

  // Mode: 'password' or 'otp'
  const [authMode, setAuthMode] = useState('password');

  // Fields
  const [identifier, setIdentifier] = useState(() => store.get('nl-remember-id', ''));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => Boolean(store.get('nl-remember', false)));

  // OTP login states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);

  // Forgot password modal
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotErr, setForgotErr] = useState('');

  // Form submission & validation
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Refs for focus management
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const forgotInputRef = useRef(null);
  const otpRefs = useRef([]);

  // Countdown timer for OTP
  useEffect(() => {
    if (resendTimer <= 0) return undefined;
    const interval = setInterval(() => {
      setResendTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Focus modal input on open
  useEffect(() => {
    if (forgotOpen && !forgotSent) {
      setTimeout(() => forgotInputRef.current?.focus(), 100);
    }
  }, [forgotOpen, forgotSent]);

  // Validation
  const validate = () => {
    const errs = {};
    const cleanId = identifier.trim();

    if (!cleanId) {
      errs.identifier = t('au_err_identifier');
    } else if (!isValidEmail(cleanId) && !isValidBdMobile(cleanId)) {
      errs.identifier = t('au_err_identifier');
    }

    if (authMode === 'password') {
      if (!password) {
        errs.password = t('au_err_login_pw');
      } else if (password.length < 6) {
        errs.password = t('au_err_password');
      }
    } else if (authMode === 'otp') {
      if (otpSent && !otp.every(Boolean)) {
        errs.otp = t('au_err_otp');
      }
    }

    setErrors(errs);

    if (errs.identifier) idRef.current?.focus();
    else if (errs.password) pwRef.current?.focus();
    else if (errs.otp) otpRefs.current[0]?.focus();

    return Object.keys(errs).length === 0;
  };

  // Send OTP
  const handleSendOtp = () => {
    const cleanId = identifier.trim();
    if (!cleanId || (!isValidEmail(cleanId) && !isValidBdMobile(cleanId))) {
      setErrors((prev) => ({ ...prev, identifier: t('au_err_identifier') }));
      idRef.current?.focus();
      return;
    }
    setErrors((prev) => ({ ...prev, identifier: '' }));
    setOtpSent(true);
    setResendTimer(45);
    toast(lang === 'bn' ? 'লগ ইন ওটিপি পাঠানো হয়েছে' : 'Demo login OTP sent');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  // Handle OTP digit changes
  const handleDigitChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = clean;
    setOtp(updated);
    if (clean && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Submit login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'otp' && !otpSent) {
      handleSendOtp();
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);

      // Save remember-me
      if (rememberMe) {
        store.set('nl-remember', true);
        store.set('nl-remember-id', identifier.trim());
      } else {
        store.set('nl-remember', false);
        store.set('nl-remember-id', '');
      }

      // Save user session
      store.set('nl-user', {
        identifier: identifier.trim(),
        loggedIn: true,
        lastLogin: new Date().toISOString(),
      });

      toast(t('au_toast_welcome'));
      navigate('/courses');
    }, 900);
  };

  // Handle forgot password submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const clean = forgotInput.trim();
    if (!clean || (!isValidEmail(clean) && !isValidBdMobile(clean))) {
      setForgotErr(t('au_err_identifier'));
      return;
    }
    setForgotErr('');
    setForgotSent(true);
    toast(t('au_toast_reset_sent'));
  };

  return (
    <div className="au-page">
      <div className="au-container">
        {/* Left Visual Hero */}
        <AuthVisual
          imgKey="au_login"
          quoteKey="au_login_quote"
          badgeKey="au_trust2"
        />

        {/* Right Form Card */}
        <div className="au-card">
          <div className="au-head au-stagger-1">
            <h1 className="au-title">{t('au_login_title')}</h1>
            <p className="au-sub">{t('au_login_sub')}</p>
          </div>

          {/* Social Login Placeholders */}
          <div className="au-stagger-2">
            <SocialButtons />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="au-form au-stagger-3">
            {/* Email or Mobile */}
            <div className="au-fld">
              <label htmlFor="log-id" className="au-label">
                <span>{t('au_identifier_label')}</span>
              </label>
              <input
                id="log-id"
                ref={idRef}
                type="text"
                className={`au-input${errors.identifier ? ' has-err' : ''}`}
                placeholder={t('au_identifier_ph')}
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: '' }));
                }}
                autoComplete="username"
              />
              {errors.identifier && (
                <div className="au-err" role="alert" aria-live="polite">
                  {errors.identifier}
                </div>
              )}
            </div>

            {authMode === 'password' ? (
              /* Password Field */
              <div className="au-fld">
                <div className="au-label">
                  <label htmlFor="log-pw">{t('au_password_label')}</label>
                  <button
                    type="button"
                    className="au-link-inline"
                    style={{ background: 'none', border: 'none', color: 'var(--cobalt)', cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600 }}
                    onClick={() => {
                      setForgotOpen(true);
                      setForgotSent(false);
                      setForgotInput(identifier);
                    }}
                  >
                    {t('au_forgot_pw')}
                  </button>
                </div>
                <div className="au-input-wrap">
                  <input
                    id="log-pw"
                    ref={pwRef}
                    type={showPassword ? 'text' : 'password'}
                    className={`au-input${errors.password ? ' has-err' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    autoComplete="current-password"
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
                {errors.password && (
                  <div className="au-err" role="alert" aria-live="polite">
                    {errors.password}
                  </div>
                )}
              </div>
            ) : (
              /* OTP Flow */
              <div className="au-fld">
                {!otpSent ? (
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={handleSendOtp}
                  >
                    <span>{t('au_send_code')}</span>
                  </button>
                ) : (
                  <>
                    <label className="au-label">
                      <span>{t('au_otp_sent_to')} {identifier}</span>
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
                          onClick={handleSendOtp}
                        >
                          <span>{t('au_resend_code')}</span>
                        </button>
                      )}
                    </div>
                    {errors.otp && <div className="au-err" role="alert" aria-live="polite">{errors.otp}</div>}
                  </>
                )}
              </div>
            )}

            {/* Remember Me & OTP Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
              <label className="au-check-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>{t('au_remember_me')}</span>
              </label>

              <button
                type="button"
                className="au-link-inline"
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.84rem', fontWeight: 500 }}
                onClick={() => {
                  setAuthMode((m) => (m === 'password' ? 'otp' : 'password'));
                  setErrors({});
                  setOtpSent(false);
                }}
              >
                {authMode === 'password' ? t('au_otp_login_toggle') : t('au_pw_login_toggle')}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-sun au-submit-btn"
            >
              <span>{submitting ? t('au_btn_logging') : t('au_btn_login')}</span>
              {!submitting && <span className="arr"><Icon name="arrow" small /></span>}
            </button>
          </form>

          {/* Bottom Switch Link */}
          <div className="au-switch au-stagger-4">
            <span>{t('au_no_account')}</span>
            <Link to="/signup">{t('au_signup_link')}</Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div
          className="au-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setForgotOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-title"
        >
          <div className="au-modal-box">
            <button
              type="button"
              className="au-modal-close"
              aria-label="Close dialog"
              onClick={() => setForgotOpen(false)}
            >
              <Icon name="x" small />
            </button>

            {forgotSent ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div className="au-success-icon" style={{ margin: '0 auto 16px' }}>
                  <Icon name="check" />
                </div>
                <h3 id="forgot-title" className="au-title" style={{ fontSize: '1.4rem' }}>
                  {t('au_reset_sent_title')}
                </h3>
                <p className="au-sub" style={{ margin: '8px 0 20px' }}>
                  {t('au_reset_sent_desc')}
                </p>
                <button
                  type="button"
                  className="btn btn-sun"
                  style={{ width: '100%' }}
                  onClick={() => setForgotOpen(false)}
                >
                  <span>{t('au_back_to_login')}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} noValidate>
                <h3 id="forgot-title" className="au-title" style={{ fontSize: '1.4rem' }}>
                  {t('au_forgot_title')}
                </h3>
                <p className="au-sub" style={{ margin: '6px 0 20px' }}>
                  {t('au_forgot_sub')}
                </p>

                <div className="au-fld" style={{ marginBottom: 16 }}>
                  <label htmlFor="fp-id" className="au-label">
                    <span>{t('au_identifier_label')}</span>
                  </label>
                  <input
                    id="fp-id"
                    ref={forgotInputRef}
                    type="text"
                    className={`au-input${forgotErr ? ' has-err' : ''}`}
                    placeholder={t('au_identifier_ph')}
                    value={forgotInput}
                    onChange={(e) => {
                      setForgotInput(e.target.value);
                      if (forgotErr) setForgotErr('');
                    }}
                  />
                  {forgotErr && <div className="au-err" role="alert" aria-live="polite">{forgotErr}</div>}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="btn btn-line"
                    style={{ flex: 1 }}
                    onClick={() => setForgotOpen(false)}
                  >
                    <span>{t('au_back_to_login')}</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sun"
                    style={{ flex: 1.2 }}
                  >
                    <span>{t('au_btn_send_reset')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
