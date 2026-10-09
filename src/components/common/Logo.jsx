/** NextLearn mark. `inverse` is the white tile used on the navy footer and curtain. */
export function LogoMark({ inverse }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={inverse ? '#fff' : '#0D1330'} />
      <path d="M12 29V16a8 8 0 0 1 16 0v13" fill="none" stroke={inverse ? '#0D1330' : '#fff'} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="20" cy="17.5" r="3" fill="#FFC53D" />
    </svg>
  );
}

/** Translucent mark printed on course banners. */
export function BannerMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#fff" fillOpacity=".18" />
      <path d="M12 29V16a8 8 0 0 1 16 0v13" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="20" cy="17.5" r="3" fill="#FFC53D" />
    </svg>
  );
}
