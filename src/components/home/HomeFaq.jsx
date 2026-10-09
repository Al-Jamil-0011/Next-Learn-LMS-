import { useLang } from '../../context/LanguageContext.jsx';
import FaqList from '../common/FaqList.jsx';
import Icon from '../common/Icon.jsx';
import Lines from '../common/Lines.jsx';
import Reveal from '../common/Reveal.jsx';
import Soon from '../common/Soon.jsx';

export default function HomeFaq() {
  const { t } = useLang();
  return (
    <section className="sec" id="faq">
      <div className="wrap faq-grid">
        <div className="fl">
          <Reveal as="span" className="eyebrow"><i /><span>{t('q_e')}</span></Reveal>
          <Lines className="h2">{t('q_t')}</Lines>
          <Reveal className="help">
            <a href="tel:09610000000">
              <span className="si"><Icon name="phone" /></span>
              <span><b>09610-000000</b><small>{t('q_c')}</small></span>
            </a>
            <Soon>
              <span className="si"><Icon name="chat" /></span>
              <span><b>WhatsApp</b><small>{t('q_w')}</small></span>
            </Soon>
          </Reveal>
        </div>
        <FaqList />
      </div>
    </section>
  );
}
