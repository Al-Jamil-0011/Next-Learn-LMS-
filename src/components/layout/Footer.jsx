import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext.jsx';
import Icon from '../common/Icon.jsx';
import { LogoMark } from '../common/Logo.jsx';
import Social from '../common/Social.jsx';
import Soon from '../common/Soon.jsx';

const PAY = [['bKash', '#E2136E'], ['Nagad', '#F6921E'], ['Rocket', '#8C3494'], ['VISA', '#1A1F71'], ['Mastercard', '#EB001B'], ['AMEX', '#2E77BC']];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link to="/" className="logo">
              <LogoMark inverse />
              <span>NextLearn</span>
            </Link>
            <p style={{ maxWidth: '34ch' }}>{t('ft')}</p>
            <Social style={{ marginTop: 18 }} />
          </div>
          <div>
            <h4>{t('f_l')}</h4>
            <ul>
              <li><Link to="/courses">{t('nav1')}</Link></li>
              <li><Link to="/contact">{t('nc')}</Link></li>
              <li><Link to="/free">{t('nv5')}</Link></li>
              <li><Link to="/stories">{t('nav4')}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t('f_c')}</h4>
            <ul>
              <li><Link to="/about">{t('f_a')}</Link></li>
              <li><Link to="/teach">{t('f_t')}</Link></li>
              <li><Link to="/verify">{t('f_v')}</Link></li>
              <li><Link to="/refund-policy">{t('f_r')}</Link></li>
            </ul>
          </div>
          <div className="ct">
            <h4>{t('f_g')}</h4>
            <ul>
              <li><Icon name="phone" small /><span>09610-000000<br /><small>{t('q_c')}</small></span></li>
              <li><Icon name="chat" small /><span>hello@nextlearn.example</span></li>
              <li><Icon name="globe" small /><span>{t('f_ad')}</span></li>
            </ul>
          </div>
        </div>
        <div className="paybar">
          <small>{t('f_pay')}</small>
          <div className="pl">
            {PAY.map(([n, c]) => (
              <span key={n} style={{ color: c }}>{n}</span>
            ))}
          </div>
          <span className="ssl">Secured by SSLCommerz</span>
        </div>
        <div className="fbot">
          <span>© 2026 NextLearn. <span>{t('demo')}</span></span>
          <span><Link to="/refund-policy#terms">{t('f_p')}</Link></span>
        </div>
      </div>
    </footer>
  );
}
