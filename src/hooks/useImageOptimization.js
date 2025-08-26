import { useState, useEffect, useRef } from 'react';

export const useImageOptimization = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(src); // Empezar con la imagen original
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(true); // Por defecto visible
  const imgRef = useRef(null);

  const {
    lazy = true,
    webp = false, // Desactivar WebP por ahora
    responsive = false, // Desactivar responsive por ahora
    quality = 80,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PC9zdmc+'
  } = options;

  // Función para generar WebP si es posible
  const getWebPSrc = (originalSrc) => {
    if (!webp || !originalSrc) return originalSrc;
    
    // Si es una imagen local, intentar WebP
    if (originalSrc.startsWith('/assets/')) {
      const webpPath = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return webpPath;
    }
    
    // Si es una URL externa, mantener original
    return originalSrc;
  };

  // Función para generar srcSet responsive
  const getResponsiveSrcSet = (originalSrc) => {
    if (!responsive || !originalSrc) return null;
    
    // Solo para imágenes locales
    if (!originalSrc.startsWith('/assets/')) return null;
    
    const baseName = originalSrc.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const extension = originalSrc.split('.').pop();
    
    return [
      `${baseName}-300.${extension} 300w`,
      `${baseName}-600.${extension} 600w`,
      `${baseName}-900.${extension} 900w`
    ].join(', ');
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Cargar 50px antes de que sea visible
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [lazy]);

  // Cargar imagen cuando esté en vista
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      // Fallback a imagen original si WebP falla
      if (webp && src.includes('.webp')) {
        const fallbackSrc = src.replace('.webp', '.png');
        img.src = fallbackSrc;
      } else {
        // Si falla, usar la imagen original directamente
        setImageSrc(src);
        setIsLoaded(true);
      }
    };

    // Intentar WebP primero
    const webpSrc = getWebPSrc(src);
    img.src = webpSrc;

  }, [isInView, src, webp]);

  // Generar atributos de la imagen
  const imageProps = {
    ref: imgRef,
    src: isLoaded ? imageSrc : src, // Usar src original si no está cargada
    loading: lazy ? 'lazy' : 'eager',
    decoding: 'async',
    ...(getResponsiveSrcSet(src) && {
      srcSet: getResponsiveSrcSet(src),
      sizes: '(max-width: 768px) 300px, (max-width: 1024px) 600px, 900px'
    })
  };

  return {
    imageProps,
    isLoaded,
    isInView,
    placeholder
  };
};
