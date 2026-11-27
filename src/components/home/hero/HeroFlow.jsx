export default function HeroFlow() {
  return (
    <svg
      className="hero-flow"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flowG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4A61FF" />
          <stop offset="60%" stopColor="#6F82FF" />
          <stop offset="100%" stopColor="#FFC53D" />
        </linearGradient>
        <path id="w1" d="M-40 600 C 300 500, 540 690, 840 520 S 1260 250, 1500 290" />
        <path id="w2" d="M-40 660 C 320 580, 580 750, 880 580 S 1280 330, 1500 370" />
        <path id="w3" d="M-40 540 C 280 430, 520 630, 800 450 S 1240 170, 1500 210" />
        <path id="w4" d="M560 840 C 780 660, 1000 720, 1160 540 S 1400 300, 1520 150" />
      </defs>

      {/* Base lines */}
      <use href="#w1" className="fl-base" />
      <use href="#w2" className="fl-base" />
      <use href="#w3" className="fl-base" />
      <use href="#w4" className="fl-base" />

      {/* Dash flows */}
      <use href="#w1" className="fl-dash d1" />
      <use href="#w3" className="fl-dash d2" />
      <use href="#w4" className="fl-dash d3" />

      {/* Light streaks */}
      <use href="#w1" className="fl-streak s1" />
      <use href="#w2" className="fl-streak s2" />
      <use href="#w3" className="fl-streak s3" />
      <use href="#w4" className="fl-streak s4" />
    </svg>
  );
}
