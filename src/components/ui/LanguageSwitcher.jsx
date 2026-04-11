import { useTranslation } from '../../context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useTranslation();

  const posIndex = locales.indexOf(locale);

  return (
    <div
      className={styles.group}
      style={{ '--pos-index': posIndex }}
    >
      {locales.map((lang) => (
        <button
          key={lang}
          className={`${styles.btn} ${locale === lang ? styles.active : ''}`}
          onClick={() => setLocale(lang)}
          aria-label={`Cambiar idioma a ${lang.toUpperCase()}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
