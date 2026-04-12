import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState('up');
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setAtTop(currentY < 10);
        if (Math.abs(currentY - lastScrollY.current) > 5) {
          setDirection(currentY > lastScrollY.current ? 'down' : 'up');
          lastScrollY.current = currentY;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { direction, atTop };
}
