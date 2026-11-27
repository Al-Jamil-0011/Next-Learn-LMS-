import { useLang } from '../../context/LanguageContext.jsx';
import FaqList from '../common/FaqList.jsx';
import Icon from '../common/Icon.jsx';
import Lines from '../common/Lines.jsx';
import Reveal from '../common/Reveal.jsx';
import Soon from '../common/Soon.jsx';

export default function HomeFaq() {
  const { t, lang } = useLang();
  const bn = lang === 'bn';

  return (
    <section className="sec faq-sec" id="faq">
      <div className="faq-bg" aria-hidden="true">
        <span className="faq-orb a" />
        <span className="faq-orb b" />
        <span className="faq-orb c" />
      </div>

      <div className="wrap faq-grid">
        <div className="faq-side">
          <Reveal as="span" className="eyebrow">
            <i />
            <span>{t('q_e')}</span>
          </Reveal>
          <Lines className="h2">{t('q_t')}</Lines>
          <p className="faq-sub">
            {bn
              ? 'ভর্তি, পেমেন্ট, লাইভ ক্লাস ও সার্টিফিকেট নিয়ে সবচেয়ে বেশি জানতে চাওয়া প্রশ্নের উত্তর।'
              : 'Everything learners ask before joining — payments, schedules, certificates and support.'}
          </p>

          <Reveal className="help">
            <a href="tel:09610000000" className="help-card">
              <span className="si">
                <Icon name="phone" />
              </span>
              <span>
                <b>09610-000000</b>
                <small>{t('q_c')}</small>
              </span>
              <span className="help-arr" aria-hidden="true">
                <Icon name="right" small />
              </span>
            </a>
            <Soon className="help-card">
              <span className="si mint">
                <Icon name="chat" />
              </span>
              <span>
                <b>{bn ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'WhatsApp'}</b>
                <small>{t('q_w')}</small>
              </span>
              <span className="help-arr" aria-hidden="true">
                <Icon name="right" small />
              </span>
            </Soon>
          </Reveal>
        </div>

        <FaqList />
      </div>
    </section>
  );
}
