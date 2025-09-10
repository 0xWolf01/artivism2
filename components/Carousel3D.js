'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Carousel3D = () => {
  const router = useRouter();
  const [hoverPreview, setHoverPreview] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef(null);

  // Datos de las imágenes del carrusel del home (sin textos de tienda)
  const baseSlides = [
    { id: 1, src: '/assets/img/deathandlife-paint.webp', title: 'Death and Life', color: '#FF0000', preview: '/assets/img/klimt-protest.jpg', location: 'Leopold Museum, Vienna, 2022' },
    { id: 2, src: '/assets/img/gioconda-paint.webp', title: 'Gioconda', color: '#00FF00', preview: '/assets/img/gioconda-protest.jpg', location: 'Louvre Museum, Paris, 2024' },
    { id: 3, src: '/assets/img/sunflowers-paint.webp', title: 'Sunflowers', color: '#0000FF', preview: '/assets/img/sunflowers-protest.jpg', location: 'National Gallery, London, 2022' },
    { id: 4, src: '/assets/img/lesmeules-paint.webp', title: 'Les Meules', color: '#FFFF00', preview: '/assets/img/les-meules-protest.jpg', location: 'Musée d\'Orsay, Paris, 2022' }
  ];

  // Generar múltiples copias para scroll infinito
  const slides = [];
  const copies = 3;
  for (let c = 0; c < copies; c++) {
    baseSlides.forEach(slide => {
      slides.push({
        ...slide,
        id: `${slide.id}-copy-${c}`
      });
    });
  }

  // Listener para cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll infinito (LÓGICA EXACTA DE STORE)
  useEffect(() => {
    // Constantes del sistema de copias
    const BASE = baseSlides.length;
    const COPIES = 3;
    const MID = Math.floor(COPIES / 2);
    
    // Tamaño responsive del carrusel - OPTIMIZADO PARA DISPOSITIVOS MÓVILES
    const slideWidth = windowWidth < 400 ? 250 : windowWidth < 768 ? 300 : windowWidth < 1024 ? 260 : windowWidth < 1200 ? 330 : windowWidth < 1366 ? 400 : windowWidth < 1440 ? 272 : 350;
    const gapPx = windowWidth < 400 ? 0 : windowWidth < 768 ? 4 : windowWidth < 1024 ? 12 : windowWidth < 1200 ? 7 : windowWidth < 1366 ? 15 : windowWidth < 1440 ? 0 : 8;
    const unitWidth = slideWidth + gapPx;
    
    let baseWidth = unitWidth * BASE;
    let offsetPx = -baseWidth * MID;
    let velocity = 0;
    
    // Constantes del auto-scroll
    const AUTO_VX = -0.8; // Velocidad aumentada para auto-scroll más rápido
    
    // Estados del sistema
    let autoPaused = false;
    
    // Flag para saber si se ha tocado en mobile
    let mobileTouched = false;

    // Función de transformación simple como Weapons
    const applyTransform = () => {
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
      }
    };
    
    // Animation loop - LÓGICA DE WEAPONS
    const animate = () => {
      // En mobile, si se ha tocado, no hacer auto-scroll
      const shouldAutoScroll = window.innerWidth >= 768 || !mobileTouched;
      const autoV = (autoPaused || !shouldAutoScroll) ? 0 : AUTO_VX;
      
      // VELOCITY MULTIPLIER BALANCEADO: Multiplicador medio para buen control y movimiento
      offsetPx += (velocity * 0.3) + autoV; // Aumentado de 0.2 a 0.3 para más movimiento
      
      // VELOCITY DECAY MÁS RÁPIDO: Decay más rápido para frenar más rápido
      velocity *= 0.88; // Cambiado de 0.96 a 0.88 para decay más rápido
      
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Wheel scroll control - LÓGICA DE WEAPONS
    let wheelLock = false;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // En mobile: si se hace scroll con wheel, también pausar auto-scroll permanentemente
      if (window.innerWidth < 768) {
        mobileTouched = true;
      }
      
      // En desktop: desactivar preview cuando se hace scroll
      if (window.innerWidth >= 768) {
        setHoverPreview(null);
      }
      
      if (wheelLock) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      // WHEEL EXTREMADAMENTE RESPONSIVO: Sensibilidad máxima para movimiento súper amplio
      if (Math.abs(delta) > 8) { // Mantenemos el umbral para evitar movimientos accidentales
        velocity -= delta * 0.9; // Aumentado de 0.7 a 0.9 para movimiento súper amplio
        wheelLock = true;
        setTimeout(() => { wheelLock = false; }, 60); // Mantenemos el control
      }
    };
    
    // Touch events para mobile - LÓGICA DE WEAPONS
    let touchStartX = 0;
    let touchStartTime = 0;
    let isDragging = false;
    
    const onTouchStart = (e) => {
      mobileTouched = true;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
      isDragging = false;
      autoPaused = true;
      
      // En mobile: una vez que se toca, el auto-scroll se pausa permanentemente
      // No se reactiva automáticamente
    };
    
    const onTouchMove = (e) => {
      if (!isDragging) {
        isDragging = true;
      }
      
      const touchX = e.touches[0].clientX;
      const deltaX = touchStartX - touchX;
      
      // TOUCH MÁS RESPONSIVO EN MOBILE: Sensibilidad aumentada para más movimiento
      if (Math.abs(deltaX) > 5) { // Mantenemos el umbral para evitar movimientos accidentales
        velocity -= deltaX * 0.8; // Aumentado de 0.5 a 0.8 para mucho más movimiento en mobile
        touchStartX = touchX;
      }
    };
    
    const onTouchEnd = (e) => {
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;
      
      // Si fue un toque rápido, no hacer scroll
      if (touchDuration < 200 && !isDragging) {
        // Aquí podrías agregar lógica para abrir el producto
        return;
      }
      
      isDragging = false;
    };

    // Event listeners - LÓGICA DE WEAPONS
    const section = document.querySelector('section');
    if (section) {
      section.addEventListener('wheel', onWheel, { passive: false });
      section.addEventListener('touchstart', onTouchStart, { passive: false });
      section.addEventListener('touchmove', onTouchMove, { passive: false });
      section.addEventListener('touchend', onTouchEnd, { passive: false });
      section.addEventListener('mouseenter', () => { autoPaused = true; });
      section.addEventListener('mouseleave', () => { autoPaused = false; });
    }
    
    // Cleanup
    return () => {
      if (section) {
        section.removeEventListener('wheel', onWheel);
        section.removeEventListener('touchstart', onTouchStart);
        section.removeEventListener('touchmove', onTouchMove);
        section.removeEventListener('touchend', onTouchEnd);
        section.removeEventListener('mouseenter', () => { autoPaused = true; });
        section.removeEventListener('mouseleave', () => { autoPaused = false; });
      }
    };
  }, [baseSlides.length, windowWidth]);

  // Función para posicionar el preview en hover
  const positionPreview = (e, slide) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Solo mostrar preview en el 60% central de la imagen
    const shouldShow = x > rect.width * 0.2 && x < rect.width * 0.8;
    
    if (shouldShow) {
      const pad = 4; // Offset del cursor
      setPreviewPosition({
        x: e.clientX + pad,
        y: e.clientY - 130 + pad // Centrar verticalmente
      });
      setHoverPreview({
        color: slide.color,
        preview: slide.preview,
        location: slide.location
      });
    }
  };

  // Detectar si es un dispositivo táctil
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Event handlers para el preview - solo en dispositivos no táctiles
  const handleMouseEnter = (e, slide) => {
    if (!isTouchDevice()) {
      positionPreview(e, slide);
      // Pausar auto-scroll cuando se muestra el preview
      if (carouselRef.current) {
        const section = carouselRef.current.closest('section');
        if (section) {
          section.dispatchEvent(new Event('mouseenter'));
        }
      }
    }
  };

  const handleMouseMove = (e, slide) => {
    if (!isTouchDevice()) {
      positionPreview(e, slide);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice()) {
      setHoverPreview(null);
      // Reanudar auto-scroll cuando se oculta el preview
      if (carouselRef.current) {
        const section = carouselRef.current.closest('section');
        if (section) {
          section.dispatchEvent(new Event('mouseleave'));
        }
      }
    }
  };

  // Ocultar preview cuando empiece a scrollear
  useEffect(() => {
    if (isScrolling) {
      setHoverPreview(null);
    }
  }, [isScrolling]);

  // Mostrar preview automáticamente cuando pare de scrollear
  useEffect(() => {
    if (!isScrolling && hoverPreview) {
      // Pequeño delay para evitar parpadeo
      const timer = setTimeout(() => {
        if (!isScrolling) {
          // Forzar la actualización del preview en la posición actual del ratón
          if (hoverPreview && previewPosition) {
            setHoverPreview({...hoverPreview});
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isScrolling, hoverPreview, previewPosition]);

  return (
    <section 
      className="relative w-full select-none" 
      aria-label="Featured pieces"
    >
      {/* Gallery container */}
      <div className="relative w-full h-[50vh] md:h-[55vh] xl:h-[60vh] overflow-hidden">
        {/* Gallery track */}
        <div 
          ref={carouselRef}
          className="relative h-full flex items-center gap-2 px-6"
          style={{
            width: `${slides.length * 350}px`,
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {/* All slides visible horizontally */}
          {slides.map((slide, index) => (
            <figure
              key={slide.id}
              className="flex-shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                width: windowWidth < 400 ? '250px' : windowWidth < 768 ? '300px' : windowWidth < 1024 ? '260px' : windowWidth < 1200 ? '330px' : windowWidth < 1366 ? '400px' : windowWidth < 1440 ? '272px' : '350px',
                height: '100%'
              }}
              onMouseEnter={(e) => handleMouseEnter(e, slide)}
              onMouseMove={(e) => handleMouseMove(e, slide)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                // Extraer el ID base del slide (sin el sufijo de copia)
                const baseId = slide.id.toString().split('-')[0];
                
                // Mapear IDs a rutas
                const routeMap = {
                  '1': '/deathandlife',
                  '2': '/gioconda', 
                  '3': '/sunflowers',
                  '4': '/lesmeules'
                };
                
                const route = routeMap[baseId];
                if (route) {
                  router.push(route);
                }
              }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="block w-full h-auto max-w-[90%] max-h-[90%] object-contain select-none"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Preview elegante en hover - solo en dispositivos no táctiles */}
      {hoverPreview && !isTouchDevice() && (
        <div 
          className="fixed z-[2000] pointer-events-none overflow-hidden transform transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95"
          style={{
            left: previewPosition.x + 'px',
            top: previewPosition.y + 'px',
            width: '280px',
            aspectRatio: '16 / 9'
          }}
        >
          {hoverPreview.preview && (
            <div className="relative w-full h-full">
              {/* Imagen principal con bordes redondeados */}
              <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <img 
                  src={hoverPreview.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay elegante con información */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-b-lg">
                <div className="text-white text-center">
                  <p className="text-[10px] font-normal tracking-wide">
                    {hoverPreview.location || 'París, 2024'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Carousel3D;