import React, { useState, useRef, useEffect } from 'react';

const Store = () => {
  const carouselRef = useRef(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Datos de los productos de la tienda
  const baseSlides = [
    { id: 1, src: '/assets/img/pure-patata.png', title: 'Fossil Fuel is Killing Us – Mashed Potatoes', artist: 'Food Art', year: '€19.99', color: '#FF0000' },
    { id: 2, src: '/assets/img/marker.png', title: 'Stop Oil Blue Marker', artist: 'Office Art', year: '€24.99', color: '#00FF00' },
    { id: 3, src: '/assets/img/pea-soup.png', title: 'Agricultural System is Collapsed – Pea Soup', artist: 'Food Art', year: '€29.99', color: '#0000FF' },
    { id: 4, src: '/assets/img/marker.png', title: 'Stop Oil Blue Marker', artist: 'Office Art', year: '€22.99', color: '#FFFF00' }
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

  // Auto-scroll infinito
  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // Bloquear scroll vertical en mobile y desktop
    document.body.style.overflow = 'hidden';
    
    // Flag para saber si se ha tocado en mobile
    let mobileTouched = false;
    
    // Entry animation for store items
    const animTargets = document.querySelectorAll('figure');
    
    animTargets.forEach((el, i) => {
      el.classList.add('opacity-0', 'translate-y-4');
      const delay = Math.min(i * 100, 800); // Máximo 800ms de delay
      setTimeout(() => {
        el.classList.add('transition-all', 'duration-700', 'ease-out');
        el.classList.remove('opacity-0', 'translate-y-4');
      }, delay);
    });
    
    const BASE = baseSlides.length;
    const COPIES = 3;
    const MID = Math.floor(COPIES / 2);
    const slideWidth = 350;
    const gapPx = 8;
    const unitWidth = slideWidth + gapPx;
    
    let baseWidth = unitWidth * BASE;
    let offsetPx = -baseWidth * MID;
    let velocity = 0;
    
    const AUTO_VX = 1.0;
    
    let isScrolling = false;
    let isWheeling = false;
    let autoPaused = false;
    
    const applyTransform = () => {
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`;
      }
    };
    
    const animate = () => {
      // En mobile, si se ha tocado, no hacer auto-scroll
      const shouldAutoScroll = window.innerWidth >= 768 || !mobileTouched;
      const autoV = (autoPaused || !shouldAutoScroll) ? 0 : AUTO_VX;
      
      offsetPx += (velocity * 0.3) + autoV;
      
      velocity *= 0.94;
      
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      // Calcular qué producto está en el centro
      const centerPosition = Math.abs(offsetPx);
      const productIndex = Math.round(centerPosition / unitWidth) % BASE;
      setCurrentProductIndex(productIndex);
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    let wheelLock = false;
    const onWheel = (e) => {
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
    let isDragging = false; // Flag para saber si se está arrastrando
    
    const onTouchStart = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        e.preventDefault(); // Bloquear scroll vertical completamente
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        mobileTouched = true; // Marcar que se ha tocado en mobile
        isDragging = true;
        autoPaused = true; // Pausar auto-scroll inmediatamente
      }
    };
    
    const onTouchMove = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768 && isDragging) {
        const currentX = e.touches[0].clientX;
        const deltaX = touchStartX - currentX;
        
        // Siempre prevenir scroll vertical en mobile
        e.preventDefault();
        
        // Mover el carrusel en dirección opuesta al dedo (más natural) y más rápido
        offsetPx -= deltaX * 1.5; // Factor de sensibilidad aumentado y dirección invertida
        
        // Actualizar la posición inicial para el siguiente movimiento
        touchStartX = currentX;
        
        // Aplicar la transformación inmediatamente
        applyTransform();
      }
    };
    
    const onTouchEnd = (e) => {
      // Solo en mobile (pantallas pequeñas)
      if (window.innerWidth < 768) {
        isDragging = false;
        // No reanudar auto-scroll en mobile
      }
    };
    
    const section = carouselRef.current?.closest('section');
    if (section) {
      section.addEventListener('wheel', onWheel, { passive: false });
      section.addEventListener('touchstart', onTouchStart, { passive: false });
      section.addEventListener('touchmove', onTouchMove, { passive: false });
      section.addEventListener('touchend', onTouchEnd, { passive: false });
      section.addEventListener('mouseenter', () => { autoPaused = true; });
      section.addEventListener('mouseleave', () => { autoPaused = false; });
    }
    
    // Cleanup: restaurar scroll al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
      if (section) {
        section.removeEventListener('wheel', onWheel);
        section.removeEventListener('touchstart', onTouchStart);
        section.removeEventListener('touchmove', onTouchMove);
        section.removeEventListener('touchend', onTouchEnd);
        section.removeEventListener('mouseenter', () => { autoPaused = true; });
        section.removeEventListener('mouseleave', () => { autoPaused = false; });
      }
    };
  }, [baseSlides.length]);

  return (
    <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] bg-white flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] w-full" style={{ paddingRight: '0', marginRight: '0' }}>
      <h1 className="sr-only">Weapons Store</h1>

      {/* Choose Your Weapon Header */}
      <div className="w-full text-center mb-6 px-4 md:px-10 xl:px-20">
        <h2 className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
          Choose your weapon
        </h2>
      </div>

      {/* 3D Carousel Section */}
      <section className="w-screen relative left-1/2 -translate-x-1/2" style={{ margin: '0', padding: '0', width: '100vw', right: '0' }}>
        <div className="relative w-full h-[60vh] md:h-[65vh] xl:h-[70vh] overflow-hidden" style={{ margin: '0', padding: '0', right: '0' }}>
          <div 
            ref={carouselRef}
            className="relative h-full flex items-center gap-2"
            style={{
              width: `${slides.length * 350}px`,
              minWidth: '100vw',
              margin: '0',
              padding: '0',
              left: '0',
              right: '0'
            }}
          >
            {slides.map((slide, index) => (
              <figure
                key={slide.id}
                className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
                style={{
                  width: '350px',
                  height: '100%'
                }}
                onClick={() => window.location.href = '/gioconda'}
              >
                <div className="bg-[#f2f2f2] p-4 w-full h-full flex flex-col items-center justify-between">
                  {/* Imagen - altura fija */}
                  <div className="flex-shrink-0 w-full h-[60%] flex items-center justify-center">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="block w-full h-full max-w-full max-h-full object-contain select-none"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Contenido de texto - altura fija */}
                  <div className="flex-shrink-0 w-full h-[40%] flex flex-col justify-between">
                    {/* Título */}
                    <div className="text-center mb-2">
                      <h3 className="text-[0.9rem] font-bold text-gray-800 transition-all duration-300" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                        {slide.title.includes('–') ? (
                          <>
                            <span className="text-[0.9rem] font-bold">{slide.title.split('–')[0].trim()}</span>
                            <br />
                            <span className="text-[0.7rem] font-normal">{slide.title.split('–')[1].trim()}</span>
                          </>
                        ) : slide.title === 'Stop Oil Blue Marker' ? (
                          <>
                            <span className="text-[0.9rem] font-bold">Stop Oil</span>
                            <br />
                            <span className="text-[0.7rem] font-normal">Blue Marker</span>
                          </>
                        ) : (
                          slide.title
                        )}
                      </h3>
                    </div>
                    
                    {/* Descripción para todos los productos - altura fija */}
                    <div className="text-center mb-2 min-h-[2.5rem] flex items-center justify-center">
                      {slide.title.includes('Pea Soup') ? (
                        <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                          A light-green vegetable solution with broad coverage and lasting effect. Can be combined with other products for greater impact.
                        </p>
                      ) : slide.title.includes('Mashed Potatoes') ? (
                        <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                          Opaque powder of variable density to mix with water and throw at an artwork. Perfect for full-coverage actions.
                        </p>
                      ) : slide.title.includes('Blue Marker') ? (
                        <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                          High-quality permanent blue ink for targeting any artwork, regardless of medium. Easy to carry, easy to use.
                        </p>
                      ) : (
                        <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                          A versatile tool designed for maximum impact and visibility. Perfect for any artistic expression or protest action.
                        </p>
                      )}
                    </div>
                    
                    {/* Precio y botón - altura fija */}
                    <div className="text-center">
                      <p className="text-[0.75rem] text-gray-600 mb-3 transition-all duration-300" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                        {slide.year}
                      </p>
                      <button className="inline-block bg-black text-white px-4 py-2 font-semibold transition-all duration-300 text-[0.75rem] hover:bg-gray-800" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                        BUY
                      </button>
                    </div>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Store;
