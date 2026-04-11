import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import Button from '../ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="inicio" className={styles.section}>
      <div className={`container ${styles.inner}`} ref={ref}>
        <div className={`${styles.text} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.title}>
            DEVELOPER
            <span className="sr-only"> - Luis Guillermo Ramos Díaz Portafolio</span>
          </h1>
          <p className={styles.subtitle}>{t('subtitulo-principal')}</p>
          <p className={styles.career}>{t('carrera')}</p>
          <div className={styles.ctas}>
            <Button as="a" href="#proyectos">{t('cta-proyectos')}</Button>
            <Button as="a" href="#contacto" variant="secondary">{t('cta-contacto')}</Button>
          </div>
        </div>
        <figure className={`${styles.figure} ${isVisible ? styles.figureVisible : ''}`}>
          <img
            src="/assets/retrato-luis-guillermo-ramos-diaz.png"
            alt="Retrato profesional de Luis Guillermo Ramos Díaz"
            className={styles.portrait}
            width="400"
            height="400"
          />
        </figure>
      </div>
    </section>
  );
}
