// Main navigation: route path, page id and the i18n key for its label.
export const NAV = [
  { to: '/', page: 'home', key: 'nh' },
  { to: '/courses', page: 'courses', key: 'nav1' },
  { to: '/stories', page: 'stories', key: 'nav4' },
  { to: '/free', page: 'free', key: 'nv5' },
  { to: '/contact', page: 'contact', key: 'nc' },
];

/** Page id for a pathname, e.g. /course/4-mern-stack -> course */
export const pageOf = (pathname) => {
  const p = pathname.split('/')[1] || 'home';
  return ['courses', 'course', 'stories', 'free', 'contact', 'about', 'teach', 'verify', 'refund-policy'].includes(p) ? p : 'home';
};
