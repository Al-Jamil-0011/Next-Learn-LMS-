import { useLang } from '../../context/LanguageContext.jsx';

export const getPasswordStrength = (pw = '') => {
  if (!pw) return { level: '', score: 0 };
  const len = pw.length;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);

  const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;

  if (len < 8 || varietyCount <= 1) {
    return { level: 'weak', score: 1, labelKey: 'au_pw_weak' };
  }
  if (len >= 8 && (varietyCount >= 3 || (len >= 10 && varietyCount >= 2))) {
    if (len >= 8 && varietyCount >= 4) {
      return { level: 'strong', score: 3, labelKey: 'au_pw_strong' };
    }
    return { level: 'okay', score: 2, labelKey: 'au_pw_okay' };
  }
  return { level: 'weak', score: 1, labelKey: 'au_pw_weak' };
};

export default function PasswordMeter({ password }) {
  const { t } = useLang();
  if (!password) return null;

  const { level, labelKey } = getPasswordStrength(password);

  return (
    <div className={`au-meter ${level}`} aria-live="polite">
      <div className="au-meter-bars">
        <span className="au-meter-bar" />
        <span className="au-meter-bar" />
        <span className="au-meter-bar" />
      </div>
      <div className="au-meter-txt">
        <span>{t('au_pw_strength')}</span>
        <b>{labelKey ? t(labelKey) : ''}</b>
      </div>
    </div>
  );
}
