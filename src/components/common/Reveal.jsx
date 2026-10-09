import useInView from '../../hooks/useInView.js';

/**
 * Fades and lifts its content in when scrolled into view (the `.fade` → `.fade.in` pattern).
 * Pass `fade={false}` to only toggle `.in` (used by course details sections).
 */
export default function Reveal({ as: Tag = 'div', className = '', fade = true, children, ...rest }) {
  const [ref, inView] = useInView();
  const cls = [className, fade && 'fade', inView && 'in'].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={cls} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
