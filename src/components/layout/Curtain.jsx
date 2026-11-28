import Logo from '../Logo.jsx';

/** Full-screen wipe shown between pages. phase: '' | 'cover' | 'uncover' */
export default function Curtain({ phase, label }) {
  return (
    <div className={`curtain${phase ? ' ' + phase : ''}`} aria-hidden="true">
      <span className="cl">
        <Logo variant="icon" theme="dark" size={34} />
        <b>{label}</b>
      </span>
    </div>
  );
}
