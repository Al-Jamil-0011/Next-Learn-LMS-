import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon.jsx';
import { LogoMark } from '../common/Logo.jsx';
import { IMAGES } from '../../data/images.js';
import { useLang } from '../../context/LanguageContext.jsx';
import { finePointer, prefersReducedMotion } from '../../utils/format.js';

export default function AuthVisual({ imgKey, quoteKey, badgeKey }) {
  const { t, num } = useLang();
  const bgRef = useRef(null);
  const panelRef = useRef(null);
  const photo = IMAGES[imgKey] || IMAGES.au_signup;

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return undefined;
    const panel = panelRef.current;
    const bg = bgRef.current;
    if (!panel || !bg) return undefined;

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bg.style.transform = `scale(1.06) translate(${x * -14}px, ${y * -14}px)`;
    };

    const handleMouseLeave = () => {
      bg.style.transform = 'scale(1.04) translate(0px, 0px)';
    };

    panel.addEventListener('mousemove', handleMouseMove);
    panel.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      panel.removeEventListener('mousemove', handleMouseMove);
      panel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="au-visual" ref={panelRef}>
      <img
        src={photo.src}
        alt={photo.alt}
        className="au-visual-bg"
        ref={bgRef}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: photo.pos || 'center' }}
      />
      <div className="au-visual-overlay" />
      <div className="au-visual-decor ring" aria-hidden="true" />
      <div className="au-visual-decor glow" aria-hidden="true" />

      {/* Top Header */}
      <div className="au-visual-top">
        <Link to="/" className="au-brand" aria-label="NextLearn Home">
          <LogoMark />
          <span>NextLearn</span>
        </Link>
        <Link to="/" className="au-back-link">
          <Icon name="arrow" small style={{ transform: 'rotate(180deg)' }} />
          <span>{t('au_back_home')}</span>
        </Link>
      </div>

      {/* Middle Quote & Badge */}
      <div className="au-visual-mid">
        <span className="au-badge-pill">
          <Icon name="award" small />
          <span>{t('au_trust1')}</span>
        </span>
        <blockquote className="au-visual-quote">
          "{t(quoteKey)}"
        </blockquote>
      </div>

      {/* Bottom Trust Bullets */}
      <ul className="au-trust-list">
        <li className="au-trust-item">
          <span className="au-check-circle"><Icon name="check" small /></span>
          <span>{t('au_trust1')}</span>
        </li>
        <li className="au-trust-item">
          <span className="au-check-circle"><Icon name="check" small /></span>
          <span>{t('au_trust2')}</span>
        </li>
        <li className="au-trust-item">
          <span className="au-check-circle"><Icon name="check" small /></span>
          <span>{t('au_trust3')}</span>
        </li>
      </ul>
    </div>
  );
}
