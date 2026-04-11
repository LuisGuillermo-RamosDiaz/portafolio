import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext(null);

const SUPPORTED_LOCALES = ['es', 'en', 'fr'];

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('es');

  const setLocale = useCallback((lang) => {
    if (SUPPORTED_LOCALES.includes(lang)) {
      setLocaleState(lang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key) => {
      const value = translations[locale]?.[key] ?? translations.es?.[key] ?? key;
      return value.replace('{year}', new Date().getFullYear());
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, locales: SUPPORTED_LOCALES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
