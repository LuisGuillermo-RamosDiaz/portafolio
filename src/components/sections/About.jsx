import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import styles from './About.module.css';

export default function About() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver();
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section id="sobremi" className={styles.section}>
      <div className="container">
        <div
          ref={ref}
          className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}
        >
          <SectionTitle>{t('titulo-sobremi')}</SectionTitle>
          <p className={styles.text}>{t('desc-sobremi-1')}</p>
          <p className={styles.text}>{t('desc-sobremi-2')}</p>
          <div className={styles.ctas}>
            <Button onClick={() => setCvOpen(true)}>
              {t('cta-ver-cv')}
            </Button>
            <Button
              as="a"
              href="/assets/curriculum-vitae-luis-guillermo-ramos-diaz.pdf"
              download="curriculum-vitae-luis-guillermo-ramos-diaz.pdf"
              variant="secondary"
            >
              {t('cta-cv')}
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={cvOpen} onClose={() => setCvOpen(false)} variant="iframe">
        <iframe
          src="/assets/curriculum-vitae-luis-guillermo-ramos-diaz.pdf"
          title="Visor de CV"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '0.5rem', backgroundColor: 'white' }}
        />
        <p>
          {t('cv-fallback')}{' '}
          <a href="/assets/curriculum-vitae-luis-guillermo-ramos-diaz.pdf" target="_blank" rel="noopener noreferrer">
            {t('cv-fallback-link')}
          </a>
        </p>
      </Modal>
    </section>
  );
}
