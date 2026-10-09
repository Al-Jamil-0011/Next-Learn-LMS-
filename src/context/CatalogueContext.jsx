import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { filterCourses } from '../utils/filterCourses.js';

const CatalogueContext = createContext(null);

const EMPTY = { q: '', cat: [], fmt: [], lvl: [], price: [], type: null };

/** Course filter state, shared by the home page (search, categories) and the courses page. */
export function CatalogueProvider({ children }) {
  const [f, setF] = useState({ ...EMPTY, sort: 'pop', view: 'grid', page: 1 });

  const update = useCallback((patch) => setF((s) => ({ ...s, ...patch })), []);
  const setQuery = useCallback((q) => update({ q, page: 1 }), [update]);
  const toggle = useCallback(
    (group, val) =>
      setF((s) => ({ ...s, page: 1, [group]: s[group].includes(val) ? s[group].filter((v) => v !== val) : [...s[group], val] })),
    [],
  );
  const setType = useCallback((type) => setF((s) => ({ ...s, page: 1, type: s.type === type ? null : type })), []);
  const reset = useCallback(() => update({ ...EMPTY, page: 1 }), [update]);
  const onlyCategory = useCallback((cat) => update({ ...EMPTY, cat: [cat], page: 1 }), [update]);

  const results = useMemo(() => filterCourses(f), [f]);

  const value = useMemo(
    () => ({ f, results, update, setQuery, toggle, setType, reset, onlyCategory }),
    [f, results, update, setQuery, toggle, setType, reset, onlyCategory],
  );
  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>;
}

export const useCatalogue = () => useContext(CatalogueContext);
