import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ children, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <h2
      ref={ref}
      className={`${styles.title} ${isVisible ? styles.visible : ''} ${className}`}
    >
      {children}
    </h2>
  );
}
