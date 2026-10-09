import { useState } from 'react';
import useScroll from '../../hooks/useScroll.js';

/**
 * Clearly-editable placeholders for NextLearn's primary direct-contact channels.
 * Update URLs or phone numbers here.
 */
export const LINKS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    title: 'Chat on WhatsApp',
    tip: 'WhatsApp',
    url: 'https://wa.me/8801XXXXXXXXX',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <title>Chat on WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'messenger',
    name: 'Messenger',
    title: 'Chat on Messenger',
    tip: 'Messenger',
    url: 'https://m.me/nextlearn',
    color: '#0084FF',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <title>Chat on Messenger</title>
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.093.303 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.75 7.55l3.131 3.259L19.764 7.55l-6.573 7.413z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    title: 'Connect on LinkedIn',
    tip: 'LinkedIn',
    url: 'https://www.linkedin.com/company/nextlearn',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <title>Connect on LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    title: 'Chat on Telegram',
    tip: 'Telegram',
    url: 'https://t.me/nextlearn',
    color: '#229ED9',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <title>Chat on Telegram</title>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.943z" />
      </svg>
    ),
  },
];

/**
 * Fixed glassmorphic social rail on the right edge of every page.
 * WhatsApp, Messenger, LinkedIn, Telegram in official brand vectors.
 * Fixed while scrolling, keyboard accessible, responsive pill on mobile.
 */
export default function SocialRail() {
  const [elevated, setElevated] = useState(false);

  useScroll(() => {
    // When user scrolls down on mobile, lift above the .mbar bottom bar if active
    setElevated(window.scrollY > 600);
  });

  return (
    <aside
      className={`rail-wrap${elevated ? ' rail-elevated' : ''}`}
      aria-label="Direct social contact links"
    >
      <ul className="rail-list">
        {LINKS.map((item) => (
          <li key={item.id} className="rail-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rail-link"
              data-brand={item.id}
              aria-label={item.title}
              title={item.title}
            >
              {item.icon}
              <span className="rail-tip" role="tooltip">
                {item.tip}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
