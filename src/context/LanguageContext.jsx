import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BN, EN } from '../i18n/dict.js';
import { T5, T6, UI } from '../i18n/strings.js';
import { bnDigits } from '../utils/format.js';
import { store } from '../utils/storage.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => store.get('nl-lang', 'bn'));

  useEffect(() => {
    document.documentElement.lang = lang;
    store.set('nl-lang', lang);
  }, [lang]);

  const setLang = useCallback((l) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === 'bn' ? 'en' : 'bn')), []);

  const value = useMemo(() => {
    const dict = lang === 'bn' ? BN : EN;
    return {
      lang,
      setLang,
      toggleLang,
      /** Static copy by key (falls back to English). */
      t: (k) => dict[k] ?? EN[k] ?? k,
      ui: UI[lang],
      x: T5[lang],
      y: T6[lang],
      /** Numbers in Bangla digits when Bangla is on. */
      num: (n) => (lang === 'bn' ? bnDigits(n) : String(n)),
    };
  }, [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
