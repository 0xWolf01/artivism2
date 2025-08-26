import React, { useState, useRef, useEffect } from 'react';

const Carousel3D = () => {
  const [hoverPreview, setHoverPreview] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);

  // Datos de las imágenes del carrusel con colores de preview
  const baseSlides = [
    { id: 1, src: '/assets/img/cuadro-ejemplo.jpg', title: 'Cuadro Ejemplo', color: '#FF0000', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 2, src: '/assets/img/cuadro-ejemplo-2.jpg', title: 'Cuadro Ejemplo 2', color: '#00FF00', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 3, src: '/assets/img/cuadro-ejemplo-3.jpg', title: 'Cuadro Ejemplo 3', color: '#0000FF', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 4, src: '/assets/img/cuadro-ejemplo-4.jpg', title: 'Cuadro Ejemplo 4', color: '#FFFF00', preview: 'https://static.dw.com/image/68105658_605.jpg' }
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

  // Auto-scroll infinito (LÓGICA ORIGINAL QUE FUNCIONABA)
  useEffect(() => {
    // Constantes del sistema de copias
    const BASE = baseSlides.length;
    const COPIES = 3;
    const MID = Math.floor(COPIES / 2);
    const slideWidth = 350;
    const gapPx = 8;
    const unitWidth = slideWidth + gapPx;
    
    let baseWidth = unitWidth * BASE;
    let offsetPx = -baseWidth * MID;
    let velocity = 0;
    
    // Constantes del auto-scroll
    const AUTO_VX = 1.0;
    
    // Estados del sistema
    let isScrolling = false;
    let isWheeling = false;
    let autoPaused = false;
    
    const applyTransform = () => {
      if (carouselRef.current) {
        // Optimizaciones específicas para Chrome
        if (navigator.userAgent.includes('Chrome')) {
          // Forzar GPU acceleration en Chrome
          carouselRef.current.style.willChange = 'transform';
          carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
          // Forzar composición en GPU
          carouselRef.current.style.backfaceVisibility = 'hidden';
        } else {
          // Safari y otros navegadores (ya optimizados)
          carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
        }
      }
    };
    
    // Animation loop (AUTO-SCROLL + VELOCITY)
    const animate = () => {
      // Auto-scroll + velocity del scroll manual
      const autoV = autoPaused ? 0 : AUTO_VX;
      offsetPx += autoV + velocity;
      
      // Decay rápido para control total
      velocity *= 0.92; // Se detiene rápido, máximo control
      
      // Normalize offsetPx within baseWidth range for seamless loop
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Wheel scroll control (IMAGEN EN IMAGEN)
    let wheelLock = false;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (wheelLock) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;
      wheelLock = true;
      
                   // Movimiento directo y preciso para máximo control
             const scrollSensitivity = unitWidth / 12; // Muy preciso
             if (delta > 0) {
               velocity -= scrollSensitivity;
             } else {
               velocity += scrollSensitivity;
             }
             
             // Aplicar la transformación inmediatamente para que se vea el movimiento
             applyTransform();
      
      setTimeout(() => { wheelLock = false; }, 90);
    };
    
    // Touch/swipe control (IMAGEN EN IMAGEN)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const onTouchStart = (e) => {
      if (window.innerWidth < 768) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const onTouchMove = (e) => {
      if (window.innerWidth < 768) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }
    };
    
    const onTouchEnd = (e) => {
      if (window.innerWidth < 768) {
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
          // Movimiento directo y preciso para máximo control
          const swipeSensitivity = unitWidth / 12; // Muy preciso
          if (deltaX > 0) {
            velocity -= swipeSensitivity;
          } else {
            velocity += swipeSensitivity;
          }
          
          // Aplicar la transformación inmediatamente
          applyTransform();
        }
      }
    };

    // Control con flechas del teclado
    const onKeyDown = (e) => {
      // Solo procesar si no estamos en un input o textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          // Mover una imagen a la izquierda
          offsetPx -= unitWidth;
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Mover una imagen a la derecha
          offsetPx += unitWidth;
          break;
        default:
          return; // No procesar otras teclas
      }
      
      // Normalizar posición inmediatamente
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      applyTransform();
    };

    // Agregar event listeners
    const section = carouselRef.current?.closest('section');
    if (section) {
      section.addEventListener('wheel', onWheel, { passive: false });
      section.addEventListener('touchstart', onTouchStart, { passive: true });
      section.addEventListener('touchmove', onTouchMove, { passive: true });
      section.addEventListener('touchend', onTouchEnd, { passive: true });
      
      // Pause auto-scroll while hovering the carousel area
      section.addEventListener('mouseenter', () => { autoPaused = true; });
      section.addEventListener('mouseleave', () => { autoPaused = false; });
    }
    
    // Agregar event listener para teclado (global)
    document.addEventListener('keydown', onKeyDown);
    
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
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [baseSlides.length]);

  // Función para posicionar el preview en hover
  const positionPreview = (e, slide) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
        preview: slide.preview
      });
    }
  };

  // Event handlers para el preview
  const handleMouseEnter = (e, slide) => {
    positionPreview(e, slide);
  };

  const handleMouseMove = (e, slide) => {
    positionPreview(e, slide);
  };

  const handleMouseLeave = () => {
    setHoverPreview(null);
  };

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
            transform: 'translate3d(0, 0, 0)',
            // Optimizaciones específicas para Chrome
            ...(navigator.userAgent.includes('Chrome') && {
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            })
          }}
        >
          {/* All slides visible horizontally */}
          {slides.map((slide, index) => (
            <figure
              key={slide.id}
              className="flex-shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                width: '350px',
                height: '100%'
              }}
              onMouseEnter={(e) => handleMouseEnter(e, slide)}
              onMouseMove={(e) => handleMouseMove(e, slide)}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = '/gioconda'}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="block w-full h-auto max-w-full max-h-full object-contain select-none"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Preview en hover - solo en desktop */}
      {hoverPreview && window.innerWidth >= 768 && (
        <div 
          className="fixed z-[2000] pointer-events-none overflow-hidden"
          style={{
            left: previewPosition.x + 'px',
            top: previewPosition.y + 'px',
            width: '260px',
            aspectRatio: '16 / 9',
            background: hoverPreview.preview ? 'white' : hoverPreview.color
          }}
        >
          {hoverPreview.preview && (
            <img 
              src={hoverPreview.preview}
              alt="Preview"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Carousel3D;
