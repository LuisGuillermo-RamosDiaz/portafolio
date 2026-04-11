import { useState, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#inicio', key: 'nav-inicio' },
  { href: '#sobremi', key: 'nav-sobremi' },
  { href: '#habilidades', key: 'nav-habilidades' },
  { href: '#proyectos', key: 'nav-proyectos' },
  { href: '#certificaciones', key: 'nav-certificaciones' },
  { href: '#contacto', key: 'nav-contacto' },
];

export default function Header() {
  const { t } = useTranslation();
  const { direction, atTop } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const hidden = direction === 'down' && !atTop && !menuOpen;

  return (
    <>
      <header
        className={`${styles.header} ${hidden ? styles.hidden : ''} ${!atTop ? styles.scrolled : ''}`}
      >
        <div className={`container ${styles.inner}`}>
          <a href="#inicio" className={styles.logo}>
            {t('logo')}
          </a>

          <nav className={styles.nav} id="navegacionPrincipal">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                className={`${styles.navLink} ${activeSection === href.slice(1) ? styles.active : ''}`}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher />
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label={t('sr-abrir-menu')}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
