import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const ROLES = {
  es: ['Desarrollador Full-Stack', 'Ingeniero de Software', 'Creador de Soluciones'],
  en: ['Full-Stack Developer', 'Software Engineer', 'Solution Builder'],
  fr: ['Développeur Full-Stack', 'Ingénieur Logiciel', 'Créateur de Solutions'],
};

function useTypewriter(texts, speed = 110, pause = 4000) {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];

    const timer = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIndex));
          if (charIndex === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % texts.length);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timer);
  }, [charIndex, deleting, index, texts, speed, pause]);

  useEffect(() => {
    setDisplay('');
    setIndex(0);
    setCharIndex(0);
    setDeleting(false);
  }, [texts]);

  return display;
}

export default function Hero() {
  const { t, locale } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const roles = useMemo(() => ROLES[locale] || ROLES.es, [locale]);
  const typed = useTypewriter(roles);

  return (
    <section id="inicio" className={styles.section}>
      <div className={`container ${styles.inner}`} ref={ref}>
        <div className={`${styles.text} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.greeting}>{t('subtitulo-principal')}</span>
          <h1 className={styles.title}>
            DEVELOPER
            <span className="sr-only"> - Luis Guillermo Ramos Díaz</span>
          </h1>
          <p className={styles.typewriter}>
            <span className={styles.typedText}>{typed}</span>
            <span className={styles.cursor}>|</span>
          </p>
          <p className={styles.career}>{t('carrera')}</p>
          <div className={styles.ctas}>
            <Button as="a" href="#proyectos">{t('cta-proyectos')}</Button>
            <Button as="a" href="#contacto" variant="secondary">{t('cta-contacto')}</Button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>{locale === 'es' ? 'Proyectos' : locale === 'fr' ? 'Projets' : 'Projects'}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>{locale === 'es' ? 'Tecnologías' : locale === 'fr' ? 'Technologies' : 'Technologies'}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>{locale === 'es' ? 'Certificaciones' : locale === 'fr' ? 'Certifications' : 'Certifications'}</span>
            </div>
          </div>
        </div>

        <figure className={`${styles.figure} ${isVisible ? styles.figureVisible : ''}`}>
          <div className={styles.portraitWrap}>
            <img
              src="/assets/retrato-luis-guillermo-ramos-diaz.png"
              alt="Retrato profesional de Luis Guillermo Ramos Díaz"
              className={styles.portrait}
              width="400"
              height="400"
            />
          </div>
        </figure>
      </div>

      <a href="#sobremi" className={styles.scrollHint} aria-label="Scroll down">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
