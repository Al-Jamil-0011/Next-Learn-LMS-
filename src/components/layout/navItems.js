// Main navigation: route path, page id and the i18n key for its label.
export const NAV = [
  { to: '/', page: 'home', key: 'nh' },
  { to: '/courses', page: 'courses', key: 'nav1' },
  { to: '/stories', page: 'stories', key: 'nav4' },
  { to: '/career', page: 'career', key: 'nav_career' },
  { to: '/contact', page: 'contact', key: 'nc' },
];

/** Page id for a pathname, e.g. /course/4-mern-stack -> course */
export const pageOf = (pathname) => {
  const p = pathname.split('/')[1] || 'home';
  return ['courses', 'course', 'stories', 'career', 'free', 'contact', 'about', 'teach', 'verify', 'refund-policy', 'signup', 'login'].includes(p) ? p : 'home';
};
