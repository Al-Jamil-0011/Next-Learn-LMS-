import useInView from '../../hooks/useInView.js';

/** Heading whose text slides up from a mask when it scrolls into view. */
export default function Lines({ as: Tag = 'h2', className, style, children }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={className} style={style}>
      <span className={`lr${inView ? ' in' : ''}`}>
        <span>{children}</span>
      </span>
    </Tag>
  );
}
