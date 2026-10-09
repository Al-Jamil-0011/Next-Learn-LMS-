import { LogoMark } from '../common/Logo.jsx';

/** Full-screen wipe shown between pages. phase: '' | 'cover' | 'uncover' */
export default function Curtain({ phase, label }) {
  return (
    <div className={`curtain${phase ? ' ' + phase : ''}`} aria-hidden="true">
      <span className="cl">
        <LogoMark inverse />
        <b>{label}</b>
      </span>
    </div>
  );
}
