import { prefersReducedMotion } from '../../utils/format.js';

export const scrollToCourses = () =>
  document.getElementById('courses')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
