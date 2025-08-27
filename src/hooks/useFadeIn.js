import { useEffect } from 'react';

export const useFadeIn = (delay = 100, maxDelay = 600) => {
  useEffect(() => {
    // Entry animation for page elements
    const animTargets = document.querySelectorAll('main > *');
    
    animTargets.forEach((el, i) => {
      el.classList.add('opacity-0', 'translate-y-4');
      const elementDelay = Math.min(i * delay, maxDelay);
      setTimeout(() => {
        el.classList.add('transition-all', 'duration-700', 'ease-out');
        el.classList.remove('opacity-0', 'translate-y-4');
      }, elementDelay);
    });
  }, [delay, maxDelay]);
};
