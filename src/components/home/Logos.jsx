import { useLang } from '../../context/LanguageContext.jsx';
import Reveal from '../common/Reveal.jsx';

const NAMES = ['Brightline', 'Padma Soft', 'Meghna Pay', 'Sundarban Labs', 'Nodi Studio', 'Kite Commerce', 'Shapla Bank', 'Orbit BD'];

/** Marquee of (sample) employer names. The list is doubled for a seamless loop. */
export default function Logos() {
  const { t } = useLang();
  return (
    <section className="logos" aria-label="Where our learners work (sample)">
      <div className="wrap"><Reveal as="p">{t('lg_t')}</Reveal></div>
      <div className="mq">
        <div className="mq-in">
          {[...NAMES, ...NAMES].map((n, i) => <span key={i}>{n}</span>)}
        </div>
      </div>
    </section>
  );
}
