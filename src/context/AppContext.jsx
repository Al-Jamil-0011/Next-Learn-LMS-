import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { store } from '../utils/storage.js';

const AppContext = createContext(null);

/** Site-wide UI state: toast, confetti, enrolments, enrol modal and filter drawer. */
export function AppProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef();
  const confettiRef = useRef(null);
  const lastFocus = useRef(null);

  const [enrolled, setEnrolled] = useState(() => store.get('nl-enrolled', []));
  const [enrolCourse, setEnrolCourse] = useState(null);
  const [sideOpen, setSideOpen] = useState(false);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 3000);
  }, []);

  const confetti = useCallback(() => confettiRef.current?.(), []);

  const enroll = useCallback((id) => {
    setEnrolled((list) => {
      if (list.includes(id)) return list;
      const next = [...list, id];
      store.set('nl-enrolled', next);
      return next;
    });
  }, []);

  const openEnrol = useCallback((course, trigger) => {
    lastFocus.current = trigger || document.activeElement;
    setEnrolCourse(course);
  }, []);

  const closeAll = useCallback((silent) => {
    setEnrolCourse(null);
    setSideOpen(false);
    const el = lastFocus.current;
    if (!silent && el && el.focus && document.contains(el)) el.focus();
  }, []);

  const overlayOn = !!enrolCourse || sideOpen;

  useEffect(() => {
    document.body.style.overflow = sideOpen ? 'hidden' : '';
  }, [sideOpen]);

  useEffect(() => {
    if (!overlayOn) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeAll();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlayOn, closeAll]);

  const value = useMemo(
    () => ({
      toast, toastMsg, toastOn, confetti, confettiRef,
      enrolled, enroll, isEnrolled: (id) => enrolled.includes(id),
      enrolCourse, openEnrol, closeAll,
      sideOpen, setSideOpen, overlayOn,
    }),
    [toast, toastMsg, toastOn, confetti, enrolled, enroll, enrolCourse, openEnrol, closeAll, sideOpen, overlayOn],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
