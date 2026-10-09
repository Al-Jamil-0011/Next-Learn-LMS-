import Soon from './Soon.jsx';

export default function Social({ style }) {
  return (
    <span className="soc" aria-label="Social" style={style}>
      <Soon aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" /></svg>
      </Soon>
      <Soon aria-label="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" /></svg>
      </Soon>
      <Soon aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.6H3.8V20h3.1zM5.3 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.3c0-3.1-1.7-4.9-4.1-4.9-1.6 0-2.5.9-2.9 1.6V8.6h-3V20h3.1v-6c0-1.5.6-2.6 2-2.6s1.8 1.2 1.8 2.6v6h3.1z" /></svg>
      </Soon>
    </span>
  );
}
