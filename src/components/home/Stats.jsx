import { useLang } from '../../context/LanguageContext.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';

const STATS = [
  { icon: 'users', bg: 'var(--cobalt-50)', fg: 'var(--cobalt)', to: 48000, suffix: '+', key: 'sn1' },
  { icon: 'book', bg: 'var(--saffron-50)', fg: '#B07A00', to: 14, suffix: '', key: 'sn2' },
  { icon: 'brief', bg: 'var(--mint-50)', fg: '#0E8A5F', to: 86, suffix: '%', key: 'sn3' },
  { icon: 'globe', bg: 'var(--coral-50)', fg: 'var(--coral)', to: 64, suffix: '', key: 'sn4' },
];

function Stat({ s }) {
  const { t } = useLang();
  const [ref, val] = useCountUp(s.to);
  return (
    <div className="st">
      <span className="si" style={{ background: s.bg, color: s.fg }}><Icon name={s.icon} /></span>
      <div>
        <b className="num"><span ref={ref}>{val}</span>{s.suffix}</b>
        <span>{t(s.key)}</span>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <div className="wrap">
        <Reveal className="stats-in">
          {STATS.map((s) => <Stat key={s.key} s={s} />)}
        </Reveal>
      </div>
    </div>
  );
}
