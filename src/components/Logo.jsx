import { useId } from 'react';

/**
 * Reusable Technofy Bangladesh brand mark & wordmark.
 * @param {object} props
 * @param {'full'|'icon'} [props.variant='full'] - Full lockup (icon + wordmark) or compact icon badge.
 * @param {'light'|'dark'} [props.theme='light'] - Text color scheme for light or dark surfaces.
 * @param {number} [props.size=40] - Badge width/height in pixels.
 * @param {string} [props.className=''] - Optional extra class name.
 */
export function Logo({ variant = 'full', theme = 'light', size = 40, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const gradId = `tbGrad-${uid}`;
  const sparkId = `tbSpark-${uid}`;

  return (
    <span
      className={`tb-logo tb-logo-${theme}${className ? ' ' + className : ''}`}
      role="img"
      aria-label="Technofy Bangladesh logo"
      style={{ '--tb-sz': `${size}px` }}
    >
      <span className="tb-logo-badge">
        <svg
          className="tb-logo-svg"
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <radialGradient id={sparkId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="55%" stopColor="#A5F3FC" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="40" height="40" rx="11" fill={`url(#${gradId})`} />
          <rect
            x="0.75"
            y="0.75"
            width="38.5"
            height="38.5"
            rx="10.25"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="1"
          />

          {/* Top-right tech glow spark */}
          <circle cx="31.5" cy="8.5" r="5" fill={`url(#${sparkId})`} />
          <circle cx="31.5" cy="8.5" r="2.1" fill="#FFFFFF" />

          {/* Stylized circuit "T" top bar ending in two circuit dots */}
          <path
            d="M11 14.5 H16.5 L18.2 12.6 H21.8 L23.5 14.5 H29"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10.5" cy="14.5" r="2.15" fill="#FFFFFF" />
          <circle cx="29.5" cy="14.5" r="2.15" fill="#FFFFFF" />
          {/* Bold central stem of "T" */}
          <path
            d="M20 14.5 V29.5"
            stroke="#FFFFFF"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {variant !== 'icon' && (
        <span className="tb-logo-words">
          <span className="tb-logo-name">Technofy</span>
          <span className="tb-logo-sub">BANGLADESH</span>
        </span>
      )}
    </span>
  );
}

/** Translucent compact circuit T mark for course card banners. */
export function BannerMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#FFFFFF" fillOpacity="0.2" />
      <circle cx="31.5" cy="8.5" r="2.2" fill="#FFFFFF" />
      <path
        d="M11 14.5 H16.5 L18.2 12.6 H21.8 L23.5 14.5 H29"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="14.5" r="2.2" fill="#FFFFFF" />
      <circle cx="29.5" cy="14.5" r="2.2" fill="#FFFFFF" />
      <path d="M20 14.5 V29.5" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default Logo;
