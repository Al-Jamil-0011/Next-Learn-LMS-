// Small formatting and lookup helpers shared across the app.

export const bnDigits = (s) => String(s).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

/** Taka price, e.g. ৳12,500 */
export const tk = (n) => '৳' + n.toLocaleString('en-IN');

/** Initials from a full name, max two letters. */
export const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2);

/** Map a mentor or story key to its photo slot in data/images.js. */
export const photoKey = (k) =>
  ({ farhana: 'mFarhana', sabbir: 'mSabbir', nusrat: 'mNusrat', rakib: 'mRakib', sadia: 'sSadia', tanvir: 'sTanvir', nasrin: 'sNasrin' })[k] || 'p_' + k;

/** URL slug for a course, e.g. 4-mern-stack */
export const slug = (c) => c.id + '-' + c.s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const coursePath = (c) => '/course/' + slug(c);

/** Date parts from an ISO date string. */
export const dateParts = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  return {
    d: d.getDate(),
    m: d.toLocaleString('en', { month: 'short' }),
    w: d.toLocaleString('en', { weekday: 'short' }),
    full: d.toLocaleString('en', { weekday: 'short', day: 'numeric', month: 'short' }),
  };
};

/** "8:30 pm" -> "20:30" */
export const to24 = (t) => {
  const m = t.match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!m) return '20:00';
  let h = +m[1] % 12;
  if (m[3].toLowerCase() === 'pm') h += 12;
  return String(h).padStart(2, '0') + ':' + m[2];
};

export const levelOf = (c) => (/^HSC/.test(c.lvl) ? 'exam' : c.lvl === 'Beginner' ? 'beg' : c.lvl === 'Intermediate' ? 'int' : 'alll');
export const priceOf = (c) => (c.p < 2000 ? 'lt2' : c.p <= 5000 ? 'mid' : 'gt5');

export const isValidBdMobile = (p) => /^0?1[3-9]\d{8}$/.test(p);
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer:fine)').matches;
