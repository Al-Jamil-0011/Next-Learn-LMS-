import { FAQ } from '../../data/courses.js';

/** Accordion of questions. The first one starts open. */
export default function FaqList({ limit, id }) {
  return (
    <div className="faq" id={id}>
      {FAQ.slice(0, limit).map(([q, a], i) => (
        <details key={q} open={i === 0}>
          <summary>
            {q}
            <span className="pm" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
