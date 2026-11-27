import { useLang } from '../../context/LanguageContext.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import Reveal from '../common/Reveal.jsx';
import StatIcons3D, { StatDefs3D } from './hero/StatIcons3D.jsx';

const STATS = [
  { icon: 'people', to: 48000, suffix: () => '+', lKey: 'sl1', sKey: 'ss1' },
  { icon: 'books', to: 8, suffix: (bn) => (bn ? 'টি' : ''), lKey: 'sl2', sKey: 'ss2' },
  { icon: 'star', to: 4.8, suffix: () => '★', lKey: 'sl3', sKey: 'ss3' },
  { icon: 'medal', to: 100, suffix: () => '%', lKey: 'sl4', sKey: 'ss4' },
  { icon: 'briefcase', to: 86, suffix: () => '%', lKey: 'sl5', sKey: 'ss5' },
  { icon: 'globe', to: 64, suffix: () => '', lKey: 'sl6', sKey: 'ss6' },
];

function Stat({ s, index }) {
  const { t, lang, num } = useLang();
  const [ref, val] = useCountUp(s.to);
  const display = lang === 'bn' ? num(val) : val;
  const suf = s.suffix(lang === 'bn');

  return (
    <div className="st" style={{ '--st-d': `${index * -0.8}s` }}>
      <div className="si3d">
        <StatIcons3D name={s.icon} />
      </div>
      <div className="st-val num">
        <span ref={ref}>{display}</span>
        {suf && <sup>{suf}</sup>}
      </div>
      <b className="st-lbl">{t(s.lKey)}</b>
      <span className="st-sub">{t(s.sKey)}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <StatDefs3D />
      <div className="wrap">
        <Reveal className="deck">
          {STATS.map((s, idx) => (
            <Stat key={s.lKey} s={s} index={idx} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
