import Lines from '../common/Lines.jsx';
import Reveal from '../common/Reveal.jsx';

/** Eyebrow + masked heading on the left, optional subtitle or action on the right. */
export default function SectionHead({ eyebrow, title, sub, children }) {
  return (
    <div className="shead">
      <div>
        <Reveal as="span" className="eyebrow"><i /><span>{eyebrow}</span></Reveal>
        <Lines className="h2">{title}</Lines>
      </div>
      {sub && <Reveal as="p" className="sub">{sub}</Reveal>}
      {children}
    </div>
  );
}
