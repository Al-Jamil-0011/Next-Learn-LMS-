/** Shared 3D SVG gradient definitions rendered once inside Stats. */
export function StatDefs3D() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="nl3d-sh" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0D1330" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0D1330" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="nl3d-cb-light" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#DCE2FF" />
          <stop offset="55%" stopColor="#8D9CF7" />
          <stop offset="100%" stopColor="#4053D0" />
        </radialGradient>

        <radialGradient id="nl3d-cb-deep" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#A9B6FF" />
          <stop offset="50%" stopColor="#4A61FF" />
          <stop offset="100%" stopColor="#1B2BA6" />
        </radialGradient>

        <radialGradient id="nl3d-coral" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#FFB09E" />
          <stop offset="50%" stopColor="#FF5A3C" />
          <stop offset="100%" stopColor="#C52C12" />
        </radialGradient>

        <radialGradient id="nl3d-gold" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#FFF4C8" />
          <stop offset="52%" stopColor="#FFC53D" />
          <stop offset="100%" stopColor="#C98700" />
        </radialGradient>

        <linearGradient id="nl3d-gold-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5A414" />
          <stop offset="100%" stopColor="#9E6800" />
        </linearGradient>

        <radialGradient id="nl3d-mint" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0%" stopColor="#8CEBC8" />
          <stop offset="55%" stopColor="#3CCB9A" />
          <stop offset="100%" stopColor="#17936A" />
        </radialGradient>

        <linearGradient id="nl3d-mint-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8F5DF" />
          <stop offset="100%" stopColor="#5ADBA9" />
        </linearGradient>

        <linearGradient id="nl3d-mint-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D9E73" />
          <stop offset="100%" stopColor="#0E6B4A" />
        </linearGradient>

        <clipPath id="nl3d-globe-clip">
          <circle cx="40" cy="39" r="21" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Back left figure */}
      <circle cx="22" cy="30" r="8" fill="url(#nl3d-cb-light)" />
      <path d="M10 56c0-8 5.4-13 12-13s12 5 12 13v2a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4v-2z" fill="url(#nl3d-cb-light)" />
      {/* Back right figure */}
      <circle cx="58" cy="30" r="8" fill="url(#nl3d-cb-light)" />
      <path d="M46 56c0-8 5.4-13 12-13s12 5 12 13v2a4 4 0 0 1-4 4H50a4 4 0 0 1-4-4v-2z" fill="url(#nl3d-cb-light)" />
      {/* Front deep cobalt figure */}
      <circle cx="40" cy="25" r="10.5" fill="url(#nl3d-cb-deep)" />
      <path d="M23 59c0-10 7.6-16.5 17-16.5S57 49 57 59v3.5A4.5 4.5 0 0 1 52.5 67h-25A4.5 4.5 0 0 1 23 62.5V59z" fill="url(#nl3d-cb-deep)" />
      {/* Gloss highlights */}
      <ellipse cx="36" cy="21" rx="3.8" ry="2.2" transform="rotate(-25 36 21)" fill="#fff" opacity="0.55" />
      <ellipse cx="31" cy="49" rx="5.5" ry="2.6" transform="rotate(-20 31 49)" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function BooksIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Bottom coral book */}
      <rect x="14" y="50" width="52" height="15" rx="4" fill="url(#nl3d-coral)" />
      <rect x="19" y="53" width="42" height="9" rx="2" fill="#fff" opacity="0.92" />
      <path d="M23 56h30M23 59h24" stroke="#D5D9E4" strokeWidth="1.2" strokeLinecap="round" />
      {/* Middle saffron book */}
      <rect x="16" y="34" width="50" height="15" rx="4" fill="url(#nl3d-gold)" />
      <rect x="21" y="37" width="40" height="9" rx="2" fill="#fff" opacity="0.92" />
      <path d="M25 40h28M25 43h20" stroke="#E8DCC0" strokeWidth="1.2" strokeLinecap="round" />
      {/* Top tilted cobalt book */}
      <g transform="rotate(-7 40 24)">
        <rect x="13" y="16" width="52" height="16" rx="4.5" fill="url(#nl3d-cb-deep)" />
        <rect x="18" y="19" width="42" height="10" rx="2" fill="#fff" opacity="0.94" />
        <path d="M22 22.5h28M22 25.5h20" stroke="#D5D9E4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M51 16h6v18l-3-2.4-3 2.4V16z" fill="#FFC53D" />
        <ellipse cx="24" cy="18" rx="6" ry="1.8" fill="#fff" opacity="0.55" />
      </g>
    </svg>
  );
}

function StarIcon() {
  const pts = '40 13 48.2 29.6 66.5 32.3 53.2 45.2 56.4 63.4 40 54.8 23.6 63.4 26.8 45.2 13.5 32.3 31.8 29.6';
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Extruded base 4px lower */}
      <polygon
        points={pts}
        transform="translate(0 4)"
        fill="url(#nl3d-gold-dark)"
        stroke="url(#nl3d-gold-dark)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Top star */}
      <polygon
        points={pts}
        fill="url(#nl3d-gold)"
        stroke="url(#nl3d-gold)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Gloss */}
      <ellipse cx="34" cy="29" rx="5.5" ry="2.4" transform="rotate(-25 34 29)" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Two cobalt ribbon tails */}
      <path d="M26 42L18 67l9-4 5 7 6-24z" fill="url(#nl3d-cb-deep)" />
      <path d="M54 42l8 25-9-4-5 7-6-24z" fill="url(#nl3d-cb-light)" />
      {/* Gold coin */}
      <circle cx="40" cy="34" r="21" fill="url(#nl3d-gold)" />
      <circle cx="40" cy="34" r="16" fill="none" stroke="#FFF4C8" strokeWidth="2" opacity="0.85" />
      {/* Embossed dark-gold star */}
      <polygon
        points="40 22 43.4 29 51 30.1 45.5 35.4 46.8 43 40 39.4 33.2 43 34.5 35.4 29 30.1 36.6 29"
        fill="url(#nl3d-gold-dark)"
      />
      {/* Gloss */}
      <ellipse cx="30" cy="22" rx="6" ry="2.8" transform="rotate(-30 30 22)" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Dark-mint handle */}
      <path d="M30 25v-5a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v5" fill="none" stroke="url(#nl3d-mint-dark)" strokeWidth="5.5" strokeLinecap="round" />
      {/* Mint body */}
      <rect x="13" y="25" width="54" height="39" rx="10" fill="url(#nl3d-mint)" />
      {/* Lighter flap band */}
      <path d="M13 33a8 8 0 0 1 8-8h38a8 8 0 0 1 8 8v7c0 3.3-2.7 6-6 6H19c-3.3 0-6-2.7-6-6v-7z" fill="url(#nl3d-mint-light)" />
      {/* Saffron clasp */}
      <rect x="35" y="40" width="10" height="9" rx="3" fill="url(#nl3d-gold)" />
      {/* Gloss */}
      <ellipse cx="26" cy="31" rx="7" ry="2.4" transform="rotate(-12 26 31)" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="73" rx="26" ry="5" fill="url(#nl3d-sh)" />
      {/* Cobalt sphere */}
      <circle cx="40" cy="39" r="21" fill="url(#nl3d-cb-deep)" />
      {/* Mint continents + faint white meridians clipped inside sphere */}
      <g clipPath="url(#nl3d-globe-clip)">
        <path d="M22 28c6-4 13-1 15 5s-4 10-1 14-8 8-14 4-6-18 0-23z" fill="url(#nl3d-mint)" opacity="0.92" />
        <path d="M45 22c7-1 14 4 15 11s-5 12-10 10-6-8-9-11 0-9 4-10z" fill="url(#nl3d-mint)" opacity="0.92" />
        <ellipse cx="40" cy="39" rx="10" ry="21" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.28" />
        <path d="M18 39h44M21 29h38M21 49h38" stroke="#fff" strokeWidth="1.2" opacity="0.24" />
      </g>
      {/* Tilted saffron ring */}
      <ellipse
        cx="40"
        cy="39"
        rx="28"
        ry="8.5"
        transform="rotate(-22 40 39)"
        fill="none"
        stroke="url(#nl3d-gold)"
        strokeWidth="3.2"
      />
      {/* Gloss */}
      <ellipse cx="31" cy="26" rx="6" ry="2.8" transform="rotate(-32 31 26)" fill="#fff" opacity="0.55" />
    </svg>
  );
}

const MAP = {
  people: PeopleIcon,
  books: BooksIcon,
  star: StarIcon,
  medal: MedalIcon,
  briefcase: BriefcaseIcon,
  globe: GlobeIcon,
};

export default function StatIcons3D({ name }) {
  const Comp = MAP[name] || PeopleIcon;
  return <Comp />;
}
