import { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.track} role="progressbar" aria-valuenow={Math.round(progress)}>
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  );
}
