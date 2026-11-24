import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import useScroll from '../../hooks/useScroll.js';
import Icon from '../common/Icon.jsx';
import { LogoMark } from '../common/Logo.jsx';
import { NAV } from './navItems.js';

export default function Header({ page }) {
  const { t, lang, setLang, toggleLang } = useLang();
  const { toast } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  useScroll(() => setStuck(window.scrollY > 40));

  const isOn = (p) => p === page || (page === 'course' && p === 'courses');
  const links = (onClick) =>
    NAV.map((n) => (
      <Link key={n.page} to={n.to} className={isOn(n.page) ? 'on' : undefined} onClick={onClick}>
        {t(n.key)}
      </Link>
    ));

  return (
    <header className={`hdr${stuck ? ' stuck' : ''}`}>
      <div className="wrap">
        <div className="hdr-in">
          <Link to="/" className="logo" aria-label="NextLearn home">
            <LogoMark />
            <span>NextLearn</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {links()}
          </nav>
          <div className="hdr-r">
            <div className="lang" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === 'bn'} onClick={() => setLang('bn')}>বাংলা</button>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </div>
            <Link to="/login" className="btn btn-line btn-sm hide-m">
              <span>{t('login')}</span>
            </Link>
            <Link to="/signup" className="btn btn-sm hide-m">
              <span>{t('signup')}</span>
            </Link>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mnav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon name="menu" small />
            </button>
          </div>
        </div>
        <nav className={`mnav${menuOpen ? ' on' : ''}`} id="mnav" aria-label="Mobile">
          {links(() => setMenuOpen(false))}
          <div className="mnav-auth" style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Link to="/login" className="btn btn-line btn-sm" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              <span>{t('login')}</span>
            </Link>
            <Link to="/signup" className="btn btn-sm" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              <span>{t('signup')}</span>
            </Link>
          </div>
          <button type="button" className="btn btn-line" style={{ marginTop: 10 }} onClick={toggleLang}>
            <span>বাংলা / English</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
