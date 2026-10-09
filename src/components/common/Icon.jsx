/** Icon from the inline sprite. `small` gives the 16px size. */
export default function Icon({ name, small, className = '', style }) {
  return (
    <svg className={`ic${small ? ' s' : ''}${className ? ' ' + className : ''}`} style={style} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** The sliding double arrow used inside buttons. */
export function Arrow() {
  return (
    <span className="arr">
      <Icon name="arrow" small />
      <Icon name="arrow" small />
    </span>
  );
}

export function ChevronDown() {
  return (
    <svg className="ic s" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
