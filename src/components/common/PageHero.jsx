import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import { IMAGES } from '../../data/images.js';
import Icon from './Icon.jsx';
import Lines from './Lines.jsx';
import Reveal from './Reveal.jsx';

/** Navy header band used by the inner pages: breadcrumb, title, subtitle. */
export default function PageHero({ crumb, title, sub, children, bg }) {
  const { t } = useLang();
  return (
    <section className="phero">
      {bg && IMAGES[bg]?.src && (
        <div className="phero-bg" aria-hidden="true">
          <img src={IMAGES[bg].src} alt="" decoding="async" fetchpriority="high" />
        </div>
      )}
      <div className="wrap phero-in">
        <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
          <Link to="/">{t('nh')}</Link>
          <Icon name="right" small />
          <span>{crumb}</span>
        </Reveal>
        <Lines as="h1">{title}</Lines>
        <Reveal as="p">{sub}</Reveal>
        {children}
      </div>
      <span className="ph-sh a" />
      <span className="ph-sh b" />
      <span className="ph-sh c" />
    </section>
  );
}
