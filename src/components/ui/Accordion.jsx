import { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ title, subtitle, icon, count, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.accordion} ${open ? styles.open : ''}`}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className={styles.left}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <div>
            <span className={styles.titleText}>{title}</span>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
        </div>
        {count != null && <span className={styles.count}>{count}</span>}
        <svg
          className={styles.chevron}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
