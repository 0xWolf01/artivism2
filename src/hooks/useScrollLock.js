import { useEffect } from 'react';

export const useScrollLock = (shouldLock = true, mobileBreakpoint = 1024) => {
  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // Bloquear scroll vertical solo en desktop si shouldLock es true
    if (shouldLock && window.innerWidth >= mobileBreakpoint) {
      document.body.style.overflow = 'hidden';
    }
    
    // Limpiar al desmontar el componente
    return () => {
      if (shouldLock) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [shouldLock, mobileBreakpoint]);
};
