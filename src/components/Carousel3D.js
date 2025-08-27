import React, { useState, useRef, useEffect } from 'react';

const Carousel3D = () => {
  const [hoverPreview, setHoverPreview] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselRef = useRef(null);

  // Datos de las imágenes del carrusel con colores de preview
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
    const slideWidth = windowWidth < 400 ? 250 : windowWidth < 768 ? 300 : windowWidth < 1024 ? 260 : windowWidth < 1200 ? 330 : windowWidth < 1366 ? 400 : windowWidth < 1440 ? 272 : 350; // Móviles pequeños: 250px, Móviles medianos: 300px, Tablets pequeñas: 260px, Tablets medianas: 330px, iPad Pro vertical: 400px, MacBook Air: 272px (compensando gap-2), Desktop: 350px
    const gapPx = windowWidth < 400 ? 0 : windowWidth < 768 ? 4 : windowWidth < 1024 ? 12 : windowWidth < 1200 ? 7 : windowWidth < 1366 ? 15 : windowWidth < 1440 ? 0 : 8; // Móviles pequeños: sin gap, Móviles medianos: 4px, Tablets pequeñas: 12px, Tablets medianas: 7px, iPad Pro vertical: 15px, MacBook Air: 0px, Desktop: 8px
    const unitWidth = slideWidth + gapPx;
    
    // Debug: mostrar valores calculados
    console.log('Carousel3D Debug:', {
      windowWidth,
      slideWidth,
      gapPx,
      unitWidth,
      BASE
    });
    
    let baseWidth = unitWidth * BASE;
    let offsetPx = -baseWidth * MID;
    let velocity = 0;
    
    // Constantes del auto-scroll
    const AUTO_VX = 0.5; // Velocidad reducida para desktop
    
    // Estados del sistema
    let autoPaused = false;
    let mobileTouched = false; // Flag para saber si se ha tocado en mobile

    const applyTransform = () => {
      if (carouselRef.current) {
        // En mobile: añadir transición suave para el movimiento de imagen en imagen
        if (windowWidth < 768) {
          carouselRef.current.style.transition = 'transform 0.3s ease-out';
        } else {
          // En desktop: sin transición para mantener el scroll fluido
          carouselRef.current.style.transition = 'none';
        }
        
        carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
      }
    };
    
    // Animation loop - EXACTA LÓGICA DE STORE
    const animate = () => {
      // En mobile, si se ha tocado, no hacer auto-scroll
      const shouldAutoScroll = window.innerWidth >= 768 || !mobileTouched;
      const autoV = (autoPaused || !shouldAutoScroll) ? 0 : AUTO_VX;
      
      offsetPx += (velocity * 0.3) + autoV;
      
      velocity *= 0.94;
      
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Wheel scroll control - EXACTA LÓGICA DE STORE
    let wheelLock = false;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Wheel scroll control
      
      setTimeout(() => {
        // Wheel scroll control
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
    
    // Touch/swipe control - EXACTA LÓGICA DE STORE
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    // Touch/swipe control
    
    const onTouchStart = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        e.preventDefault(); // Bloquear scroll vertical completamente
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        mobileTouched = true; // Marcar que se ha tocado en mobile
        // Touch started
        autoPaused = true; // Pausar auto-scroll inmediatamente
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
          // Movimiento de imagen en imagen
          if (deltaX > 0) {
            // Swipe izquierda - siguiente imagen
            offsetPx -= unitWidth;
          } else {
            // Swipe derecha - imagen anterior
            offsetPx += unitWidth;
          }
          
          // En mobile: hacer snap a la posición exacta para centrado perfecto
          const centerOffset = -baseWidth * MID;
          const currentCenter = offsetPx - centerOffset;
          const imageIndex = Math.round(currentCenter / unitWidth);
          const targetOffset = centerOffset + (imageIndex * unitWidth);
          
          // Ajustar a la posición exacta de la imagen
          offsetPx = targetOffset;
          
          // Aplicar la transformación con animación suave
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
      section.addEventListener('touchstart', onTouchStart, { passive: false });
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
    }
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
                width: windowWidth < 400 ? '250px' : windowWidth < 768 ? '300px' : windowWidth < 1024 ? '260px' : windowWidth < 1200 ? '330px' : windowWidth < 1366 ? '400px' : windowWidth < 1440 ? '272px' : '350px',
                height: '100%'
              }}
              onMouseEnter={(e) => handleMouseEnter(e, slide)}
              onMouseMove={(e) => handleMouseMove(e, slide)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                console.log('Click en slide ID:', slide.id, 'Título:', slide.title);
                if (slide.id.toString().startsWith('1')) {
                  console.log('Redirigiendo a /deathandlife');
                  window.location.href = '/deathandlife';
                } else if (slide.id.toString().startsWith('3')) {
                  console.log('Redirigiendo a /sunflowers');
                  window.location.href = '/sunflowers';
                } else if (slide.id.toString().startsWith('4')) {
                  console.log('Redirigiendo a /lesmeules');
                  window.location.href = '/lesmeules';
                } else {
                  console.log('Redirigiendo a /gioconda');
                  window.location.href = '/gioconda';
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
              <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src={hoverPreview.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay elegante con información */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-b-2xl">
                <div className="text-white text-center">
                  <p className="text-[10px] font-normal tracking-wide">
                    {hoverPreview.location || 'París, 2024'}
                  </p>
                </div>
              </div>
              
              {/* Indicador de esquina */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Carousel3D;
