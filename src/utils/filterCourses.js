import { COURSES, TYPES } from '../data/courses.js';
import { levelOf, priceOf } from './format.js';

const SORTS = {
  pop: (a, b) => b.pop - a.pop,
  rating: (a, b) => b.r - a.r,
  low: (a, b) => a.p - b.p,
  soon: (a, b) => (a.st || '9999').localeCompare(b.st || '9999'),
};

/** Apply the catalogue filters (search, checkboxes, type tile) and sort. */
export function filterCourses(f) {
  const ty = TYPES.find((t) => t.id === f.type);
  let r = COURSES.filter(
    (c) =>
      (!f.cat.length || f.cat.includes(c.cat)) &&
      (!f.fmt.length || f.fmt.includes(c.f)) &&
      (!f.lvl.length || f.lvl.includes(levelOf(c))) &&
      (!f.price.length || f.price.includes(priceOf(c))) &&
      (!ty || ty.test(c)),
  );
  if (f.q) {
    const q = f.q.toLowerCase();
    r = r.filter((c) => (c.t + ' ' + c.s + ' ' + c.mn + ' ' + c.k.en + ' ' + c.k.bn + ' ' + c.learn.join(' ')).toLowerCase().includes(q));
  }
  return [...r].sort(SORTS[f.sort]);
}
