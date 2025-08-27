import { useEffect, useRef, useCallback } from 'react';

// Función de throttling para limitar la frecuencia de ejecución
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Función de debouncing para agrupar llamadas
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export const useCarousel3D = (baseSlides, copies = 3) => {
  const carouselRef = useRef(null);
  const isPausedRef = useRef(false);
  const lastFrameTimeRef = useRef(0);

  // Función para pausar animación
  const pauseAnimation = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  // Función para reanudar animación
  const resumeAnimation = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Función optimizada para aplicar transformación (con throttling)
  const applyTransformOptimized = useCallback((offsetPx) => {
    if (carouselRef.current) {
      // Usar transform3d para GPU acceleration
      carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
      
      // Forzar composición en GPU
      carouselRef.current.style.willChange = 'transform';
    }
  }, []);

  // Función throttled para aplicar transformación
  const throttledTransform = useCallback(
    throttle(applyTransformOptimized, 16), // 60fps máximo
    [applyTransformOptimized]
  );

  // Event listeners optimizados
  useEffect(() => {
    const section = carouselRef.current?.closest('section');
    if (!section) return;

    // Usar passive listeners donde sea posible
    section.addEventListener('mouseenter', pauseAnimation, { passive: true });
    section.addEventListener('mouseleave', resumeAnimation, { passive: true });

    return () => {
      section.removeEventListener('mouseenter', pauseAnimation);
      section.removeEventListener('mouseleave', resumeAnimation);
    };
  }, [pauseAnimation, resumeAnimation]);

  return {
    carouselRef,
    isPaused: isPausedRef.current,
    throttledTransform,
    lastFrameTime: lastFrameTimeRef.current
  };
};
