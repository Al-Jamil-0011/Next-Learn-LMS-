import { useState } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import { isValidEmail } from '../../utils/format.js';
import Reveal from '../common/Reveal.jsx';

export default function Newsletter() {
  const { t, x } = useLang();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email.trim())) {
      setMsg('bad');
      e.currentTarget.querySelector('input').focus();
      return;
    }
    setMsg('ok');
    setEmail('');
  };

  return (
    <div className="nl-wrap" id="news">
      <div className="wrap">
        <Reveal className="nl">
          <svg className="shp s1" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="58" fill="none" stroke="#0D1330" strokeOpacity=".15" strokeWidth="2" strokeDasharray="6 8" />
          </svg>
          <svg className="shp s2" width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
            <path d="M0 90V45a45 45 0 0 1 90 0v45z" fill="#fff" fillOpacity=".45" />
          </svg>
          <span className="k">
            <svg className="ic s" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
            <span>{t('nl_k')}</span>
          </span>
          <h2>{t('nl_t')}</h2>
          <form onSubmit={submit} noValidate>
            <label htmlFor="nlE" className="sr">Email</label>
            <input id="nlE" type="email" placeholder={t('nl_p')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="btn btn-ink">
              <span>{t('nl_b')}</span>
            </button>
          </form>
          <div className={`msg${msg ? ' ' + msg : ''}`} role="status">
            {msg === 'ok' ? x.nlOk : msg === 'bad' ? x.nlBad : ''}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
