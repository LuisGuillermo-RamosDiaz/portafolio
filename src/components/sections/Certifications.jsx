import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { mainCertifications, platziCertifications } from '../../data/certifications';
import SectionTitle from '../ui/SectionTitle';
import { CertCard } from '../ui/Cards';
import Accordion from '../ui/Accordion';
import Modal from '../ui/Modal';
import styles from './Certifications.module.css';

export default function Certifications() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver();
  const [previewSrc, setPreviewSrc] = useState(null);

  return (
    <section id="certificaciones" className={styles.section}>
      <div className="container">
        <div className={styles.header} ref={ref}>
          <SectionTitle>{t('titulo-certificaciones')}</SectionTitle>
          <p className={`${styles.headerDesc} ${isVisible ? styles.headerDescVisible : ''}`}>
            {t('desc-certificaciones')}
          </p>
        </div>

        <div className={styles.grid}>
          {mainCertifications.map((cert, i) => (
            <div
              key={cert.id}
              className={`${styles.cardWrap} ${isVisible ? styles.cardVisible : ''}`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <CertCard
                name={cert.name}
                image={cert.image}
                onPreview={setPreviewSrc}
              />
            </div>
          ))}
        </div>

        <div className={`${styles.accordionWrap} ${isVisible ? styles.cardVisible : ''}`}>
          <Accordion
            title={t('titulo-ruta-ia')}
            subtitle={t('desc-ruta-ia')}
            count={platziCertifications.length}
            icon={
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill="currentColor" />
              </svg>
            }
          >
            <div className={styles.platziGrid}>
              {platziCertifications.map((cert) => (
                <CertCard
                  key={cert.id}
                  name={t(cert.nameKey)}
                  image={cert.image}
                  onPreview={setPreviewSrc}
                />
              ))}
            </div>
          </Accordion>
        </div>
      </div>

      <Modal isOpen={!!previewSrc} onClose={() => setPreviewSrc(null)}>
        {previewSrc && (
          <img src={previewSrc} alt="Visor de certificado" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        )}
      </Modal>
    </section>
  );
}
