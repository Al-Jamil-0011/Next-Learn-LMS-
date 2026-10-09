import { useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext.jsx';
import { MODS } from '../../data/courses.js';
import Icon, { ChevronDown } from '../common/Icon.jsx';

export default function Curriculum({ course: c }) {
  const { y, num } = useLang();
  const list = useRef(null);
  const [allOpen, setAllOpen] = useState(false);
  const lessons = MODS.reduce((a, m) => a + m[1].length, 0);

  const toggleAll = () => {
    const ds = [...list.current.querySelectorAll('details')];
    const open = !ds.every((d) => d.open);
    ds.forEach((d) => (d.open = open));
    setAllOpen(open);
  };

  return (
    <>
      <div className="cd-curh">
        <span>{y.modules(MODS.length)} · {y.lessons(lessons)} · {c.dur}</span>
        <button type="button" onClick={toggleAll}>{allOpen ? y.collapse : y.expand}</button>
      </div>
      <div ref={list}>
        {MODS.map(([title, items], i) => (
          <details className="cmod" key={title} open={i === 0}>
            <summary>
              <span className="mn">{num(String(i + 1).padStart(2, '0'))}</span>
              <span>{title}</span>
              <small>{y.lessons(items.length)}</small>
              <ChevronDown />
            </summary>
            <ul>
              {items.map((l, j) => {
                const preview = i === 0 && j === 0;
                return (
                  <li key={l} style={{ animationDelay: `${j * 50}ms` }}>
                    <Icon name={preview ? 'play' : 'lock'} small />
                    {l}
                    {preview && <span className="prv">{y.preview}</span>}
                    <em>{8 + ((i * 3 + j * 7) % 14)} min</em>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    </>
  );
}
