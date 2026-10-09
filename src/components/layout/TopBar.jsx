import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import Social from '../common/Social.jsx';

export default function TopBar() {
  const { t } = useLang();
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="tl">
          <span>
            <i />
            <span>{t('tb1')}</span>
          </span>
          <a href="tel:09610000000" className="hide-s">09610-000000</a>
        </div>
        <div className="tr">
          <Link to="/free">{t('tb2')}</Link>
          <Social />
        </div>
      </div>
    </div>
  );
}
