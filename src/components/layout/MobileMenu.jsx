import { useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ open, onClose, links }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />
      <nav
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        id="menu-movil"
      >
        <div className={styles.closeRow}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar menú">
            <span className={styles.cross1} />
            <span className={styles.cross2} />
          </button>
        </div>
        {links.map(({ href, key }) => (
          <a key={key} href={href} className={styles.link} onClick={onClose}>
            {t(key)}
          </a>
        ))}
      </nav>
    </>
  );
}
