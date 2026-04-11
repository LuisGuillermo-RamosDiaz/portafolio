import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useClipboard } from '../../hooks/useClipboard';
import ContactForm from '../ui/ContactForm';
import Toast from '../ui/Toast';
import styles from './Footer.module.css';

const NAV_LINKS = [
  { href: '#inicio', key: 'nav-inicio' },
  { href: '#sobremi', key: 'nav-sobremi' },
  { href: '#habilidades', key: 'nav-habilidades' },
  { href: '#proyectos', key: 'nav-proyectos' },
  { href: '#certificaciones', key: 'nav-certificaciones' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/LuisGuillermo-RamosDiaz', icon: '/assets/logo-github.svg' },
  { name: 'GitLab', url: 'https://gitlab.com/luisguillermoramosdiaz32', icon: '/assets/logo-gitlab.svg' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/guillermo-ramos-dev/', icon: '/assets/logo-linkedin.svg' },
];

export default function Footer() {
  const { t } = useTranslation();
  const { copied, copy } = useClipboard();
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const ok = await copy('contact@guillermoramos.dev');
    if (ok) setShowToast(true);
  };

  return (
    <footer id="contacto" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h3 className={styles.contactTitle}>{t('footer-titulo-contacto')}</h3>
            <p className={styles.contactDesc}>{t('footer-desc')}</p>
            <ContactForm />

            <div className={styles.directContact}>
              <p className={styles.contactLabel}>{t('footer-contactame')}</p>
              <div className={styles.contactLinks}>
                <a href="mailto:contact@guillermoramos.dev" className={styles.contactLink}>
                  contact@guillermoramos.dev
                </a>
                <a
                  href="https://wa.me/526691432915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  aria-label="Contactar por WhatsApp"
                >
                  <img src="/assets/logo-whatsapp.svg" alt="WhatsApp" width="20" height="20" />
                  <span>+52 669 143 2915</span>
                </a>
              </div>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {t('cta-copiar-correo')}
              </button>
            </div>
          </div>

          {/* Nav + Social */}
          <aside className={styles.aside}>
            <nav aria-label="Footer navigation">
              <h4 className={styles.asideTitle}>{t('footer-nav')}</h4>
              <ul className={styles.asideList}>
                {NAV_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <a href={href} className={styles.asideLink}>{t(key)}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h4 className={styles.asideTitle}>{t('footer-enlaces')}</h4>
              <ul className={styles.asideList}>
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className={`${styles.asideLink} ${styles.socialLink}`}
                    >
                      <img src={link.icon} alt={link.name} width="20" height="20" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className={styles.copyright}>
          <p>{t('footer-copyright')}</p>
        </div>
      </div>

      <Toast
        message={t('notif-copiado')}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
    </footer>
  );
}
