import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({ slides, badge }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
  }, [total]);

  const stopAuto = useCallback(() => clearInterval(intervalRef.current), []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handleInteraction = (action) => {
    stopAuto();
    action();
    startAuto();
  };

  return (
    <figure
      className={styles.carousel}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div className={styles.track}>
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            loading="lazy"
          />
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => handleInteraction(prev)}
        aria-label="Anterior"
      >
        &#10094;
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => handleInteraction(next)}
        aria-label="Siguiente"
      >
        &#10095;
      </button>

      <div className={styles.indicators}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => handleInteraction(() => goTo(i))}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      {badge && <span className={styles.badge}>{badge}</span>}
    </figure>
  );
}
