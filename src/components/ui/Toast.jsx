import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, visible, onHide }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onHide?.(), 400);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible && !show) return null;

  return (
    <div className={`${styles.toast} ${show ? styles.visible : ''}`}>
      <span>{message}</span>
    </div>
  );
}
