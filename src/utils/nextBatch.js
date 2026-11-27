import { COURSES } from '../data/courses.js';

/**
 * Pick the live course (`f === 'live'`) with the nearest upcoming start date (`st`)
 * that still has seats left (`left > 0`); fallback to the live course with the highest `pop`.
 */
export function getNextBatchCourse() {
  const liveWithSeats = COURSES.filter((c) => c.f === 'live' && c.left > 0);
  if (liveWithSeats.length) {
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = liveWithSeats
      .filter((c) => c.st >= today)
      .sort((a, b) => a.st.localeCompare(b.st));
    if (upcoming.length) return upcoming[0];

    return [...liveWithSeats].sort((a, b) => b.pop - a.pop)[0];
  }

  const allLive = COURSES.filter((c) => c.f === 'live');
  return [...allLive].sort((a, b) => b.pop - a.pop)[0] || COURSES[0];
}
