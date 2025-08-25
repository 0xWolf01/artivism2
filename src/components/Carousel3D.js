import React, { useState, useRef, useEffect } from 'react';

const Carousel3D = () => {
  const carouselRef = useRef(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  // Datos de las imágenes del carrusel con colores de preview
  const baseSlides = [
    { id: 1, src: '/assets/img/cuadro-ejemplo.png', title: 'Cuadro Ejemplo', color: '#FF0000', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 2, src: '/assets/img/cuadro-ejemplo-2.png', title: 'Cuadro Ejemplo 2', color: '#00FF00', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 3, src: '/assets/img/cuadro-ejemplo-3.png', title: 'Cuadro Ejemplo 3', color: '#0000FF', preview: 'https://static.dw.com/image/68105658_605.jpg' },
    { id: 4, src: '/assets/img/cuadro-ejemplo-4.png', title: 'Cuadro Ejemplo 4', color: '#FFFF00', preview: 'https://static.dw.com/image/68105658_605.jpg' }
  ];

  // Generar múltiples copias para scroll infinito (como el original)
  const slides = [];
  const copies = 3; // 3 copias para optimización (original tenía 5)
  for (let c = 0; c < copies; c++) {
    baseSlides.forEach(slide => {
              slides.push({
          ...slide,
          id: `${slide.id}-copy-${c}`
        });
    });
  }

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

  // Auto-scroll infinito real (EXACTAMENTE como el original)
  useEffect(() => {
    // Constantes del sistema de copias (como el original)
    const BASE = baseSlides.length;
    const COPIES = 3; // 3 copias para optimización (original tenía 5)
    const MID = Math.floor(COPIES / 2);
    const slideWidth = 350; // Ancho de cada slide (restaurado al original)
    const gapPx = 8; // Gap entre slides (restaurado al original)
    const unitWidth = slideWidth + gapPx; // real advance per slide including CSS gap
    
    let baseWidth = unitWidth * BASE; // width of one logical set
    let offsetPx = -baseWidth * MID; // start centered on the middle copy
    let velocity = 0;
    
    // Constantes del auto-scroll (como el original)
    const AUTO_VX = 1.0; // px/frame (~60px/s @60fps)
    
    // Estados del sistema (como el original) - NO usar isPaused de React
    let isScrolling = false;
    let isWheeling = false;
    let autoPaused = false;
    
    const applyTransform = () => {
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`; // GPU-friendly
      }
    };
    
    // Animation loop for smooth continuous scrolling (EXACTO del original)
    const animate = () => {
      // Auto-scroll unless user is interacting (EXACTO del original)
      // autoPaused se actualiza solo con eventos de mouse, NO se recalcula aquí
      const autoV = autoPaused ? 0 : AUTO_VX;
      offsetPx += (velocity * 0.3) + autoV;
      
      // Decay user-induced velocity (EXACTO del original)
      velocity *= 0.94; // decae más lento -> movimiento más suave
      
      // Normalize offsetPx within baseWidth range for seamless loop (EXACTO del original)
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Wheel scroll control (EXACTO del original)
    let wheelLock = false;
    const onWheel = (e) => {
      // Always prevent default and stop propagation at the top
      e.preventDefault();
      e.stopPropagation();
      isWheeling = true;
      
      setTimeout(() => {
        isWheeling = false;
      }, 40);
      
      if (wheelLock) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;
      wheelLock = true;
      
      if (delta > 0) {
        velocity -= unitWidth / 6;
      } else {
        velocity += unitWidth / 6;
      }
      velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
      
      setTimeout(() => { wheelLock = false; }, 90);
    };
    
    // Touch/swipe control solo para mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const onTouchStart = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const onTouchMove = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
      }
    };
    
    const onTouchEnd = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        
        // Solo procesar si es un swipe horizontal (más horizontal que vertical)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
          if (deltaX > 0) {
            // Swipe izquierda - mover carrusel a la izquierda (seguir el dedo)
            velocity -= unitWidth / 4;
          } else {
            // Swipe derecha - mover carrusel a la derecha (seguir el dedo)
            velocity += unitWidth / 4;
          }
          velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
        }
      }
    };

    // Agregar event listeners (como el original)
    const section = carouselRef.current?.closest('section');
    if (section) {
      section.addEventListener('wheel', onWheel, { passive: false });
      section.addEventListener('touchstart', onTouchStart, { passive: true });
      section.addEventListener('touchmove', onTouchMove, { passive: true });
      section.addEventListener('touchend', onTouchEnd, { passive: true });
      
      // Pause auto-scroll while hovering the carousel area (EXACTO del original)
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
  }, [baseSlides.length]); // NO depender de isPaused



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
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Carousel3D;
