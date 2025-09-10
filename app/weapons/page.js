'use client'

import React, { useRef, useEffect } from 'react';

const Weapons = () => {
  const carouselRef = useRef(null);
  // const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Datos de los productos de la tienda
  const baseSlides = [
    { id: 1, src: '/assets/img/mashed-potatoes.webp', title: 'FOSSIL FUEL IS KILLING US – MASHED POTATOES', artist: 'Food Art', year: '€19.99', color: '#FF0000' },
    { id: 2, src: '/assets/img/marker.webp', title: 'STOP OIL – BLUE MARKER', artist: 'Office Art', year: '€24.99', color: '#00FF00' },
    { id: 3, src: '/assets/img/pea-soup.webp', title: 'STOP AGRICULTURAL COLLAPSE – PEA SOUP', artist: 'Food Art', year: '€29.99', color: '#0000FF' },
    { id: 4, src: '/assets/img/tomate-soup.webp', title: 'STOP OIL – TOMATO SOUP', artist: 'Food Art', year: '€27.99', color: '#FF6B6B' },
    { id: 5, src: '/assets/img/petroleum.webp', title: 'STOP FOSSIL FUELS – FOSSIL FUEL', artist: 'Industrial Art', year: '€32.99', color: '#2C3E50' },
    { id: 6, src: '/assets/img/pumkin-soup.webp', title: 'NO FOOD FOR THE FUTURE – PUMPKIN SOUP', artist: 'Food Art', year: '€25.99', color: '#E67E22' },
    { id: 7, src: '/assets/img/adhesive.webp', title: 'NO GAS, NO CARBON – INSTANT ADHESIVE', artist: 'Industrial Art', year: '€18.99', color: '#34495E' },
    { id: 8, src: '/assets/img/marker.webp', title: 'STOP AGRICULTURAL COLLAPSE – RED PAINT', artist: 'Art Supply', year: '€22.99', color: '#E74C3C' }
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

      // Auto-scroll infinito - LÓGICA EXACTA DEL HOME
    useEffect(() => {
      // Forzar scroll hacia arriba
      window.scrollTo(0, 0);
      
      // Bloquear scroll vertical solo en desktop - permitir scroll normal en mobile
      if (window.innerWidth >= 768) {
        document.body.style.overflow = 'hidden';
      }
      
      // Entry animation for store items
      const animTargets = document.querySelectorAll('figure');
      
      animTargets.forEach((el, i) => {
        el.classList.add('opacity-0', 'translate-y-4');
        const delay = Math.min(i * 50, 400);
        setTimeout(() => {
          el.classList.add('transition-all', 'duration-500', 'ease-out');
          el.classList.remove('opacity-0', 'translate-y-4');
        }, delay);
      });
      
      // Constantes del sistema de copias - EXACTAMENTE COMO HOME
      const BASE = baseSlides.length;
      const COPIES = 3;
      const MID = Math.floor(COPIES / 2);
      
      // Tamaño responsive del carrusel - OPTIMIZADO PARA DISPOSITIVOS MÓVILES
      const slideWidth = window.innerWidth < 400 ? 250 : window.innerWidth < 768 ? 300 : window.innerWidth < 1024 ? 260 : window.innerWidth < 1200 ? 330 : window.innerWidth < 1366 ? 400 : window.innerWidth < 1440 ? 272 : 350;
      const gapPx = window.innerWidth < 400 ? 0 : window.innerWidth < 768 ? 4 : window.innerWidth < 1024 ? 12 : window.innerWidth < 1200 ? 7 : window.innerWidth < 1366 ? 15 : window.innerWidth < 1440 ? 0 : 8;
      const unitWidth = slideWidth + gapPx;
      
      let baseWidth = unitWidth * BASE;
      let offsetPx = -baseWidth * MID;
      let velocity = 0;
      
      // Constantes del auto-scroll - EXACTAMENTE COMO HOME
      const AUTO_VX = -0.8; // Velocidad aumentada para auto-scroll más rápido
      
      // Estados del sistema - EXACTAMENTE COMO HOME
      let autoPaused = false;
      
      // Flag para saber si se ha tocado en mobile - EXACTAMENTE COMO HOME
      let mobileTouched = false;
    
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
      
      // VELOCITY DECAY MÁS RÁPIDO: Decay más rápido para frenar más rápido
      velocity *= 0.88; // Cambiado de 0.96 a 0.88 para decay más rápido
      
      // LÓGICA EXACTA DEL HOME: Solo normalización básica, sin snap ni bloqueos
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      
      // Calcular qué producto está en el centro (comentado para futuras funcionalidades)
      // const centerPosition = Math.abs(offsetPx);
      // const productIndex = Math.round(offsetPx / unitWidth) % BASE;
      
      applyTransform();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    let wheelLock = false;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // En mobile: si se hace scroll con wheel, también pausar auto-scroll permanentemente
      if (window.innerWidth < 768) {
        mobileTouched = true;
      }
      
      if (wheelLock) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      // WHEEL EXTREMADAMENTE RESPONSIVO: Sensibilidad máxima para movimiento súper amplio - EXACTAMENTE COMO HOME
      if (Math.abs(delta) > 8) { // Mantenemos el umbral para evitar movimientos accidentales
        velocity -= delta * 0.9; // Aumentado de 0.7 a 0.9 para movimiento súper amplio
        wheelLock = true;
        setTimeout(() => { wheelLock = false; }, 60); // Mantenemos el control
      }
      
      // Ya no es necesario el snap, el bloqueo en animate() se encarga
    };
    
    // Touch events para mobile
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
      
      // TOUCH MÁS RESPONSIVO EN MOBILE: Sensibilidad aumentada para más movimiento - EXACTAMENTE COMO HOME
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
      
      // Ya no es necesario el snap, el bloqueo en animate() se encarga
      
      isDragging = false;
    };
    
    // Event listeners
    const section = document.querySelector('section');
    if (section) {
      section.addEventListener('wheel', onWheel, { passive: false });
      section.addEventListener('touchstart', onTouchStart, { passive: false });
      section.addEventListener('touchmove', onTouchMove, { passive: false });
      section.addEventListener('touchend', onTouchEnd, { passive: false });
      section.addEventListener('mouseenter', () => { autoPaused = true; });
      section.addEventListener('mouseleave', () => { autoPaused = false; });
    }
    
    // Bloquear scroll vertical solo en desktop - permitir scroll normal en mobile
    const preventVerticalScroll = (e) => {
      if (window.innerWidth >= 768 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener('wheel', preventVerticalScroll, { passive: false });
    document.addEventListener('touchmove', (e) => {
      if (window.innerWidth >= 768 && e.touches.length === 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Cleanup: restaurar scroll al desmontar el componente solo si estaba bloqueado
    return () => {
      if (window.innerWidth >= 768) {
        document.body.style.overflow = 'auto';
      }
      
      if (section) {
        section.removeEventListener('wheel', onWheel);
        section.removeEventListener('touchstart', onTouchStart);
        section.removeEventListener('touchmove', onTouchMove);
        section.removeEventListener('touchend', onTouchEnd);
        section.removeEventListener('mouseenter', () => { autoPaused = true; });
        section.removeEventListener('mouseleave', () => { autoPaused = false; });
      }
      
      // Remover event listeners globales
      document.removeEventListener('wheel', preventVerticalScroll);
      document.removeEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          e.preventDefault();
        }
      });
    };
  }, [baseSlides.length]);

  return (
    <div className="bg-white w-full">
      <h1 className="sr-only">Weapons</h1>

      {/* Contenedor principal - responsive para mobile y desktop */}
      <div className="flex flex-col items-center w-full md:h-[calc(100vh-3.5rem-7rem)] md:justify-center">
        {/* Choose Your Weapon Header */}
        <div className="w-full text-center mb-6 px-4 md:px-10 xl:px-20 mt-8 md:mt-8 lg:mt-12 xl:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
            Choose your weapon
          </h2>
        </div>

        {/* Carrusel para Desktop, Grid para Mobile */}
        <div className="w-full flex flex-col items-center justify-center">
          {/* Carrusel 3D - Solo visible en Desktop */}
          <section className="relative w-full overflow-hidden hidden md:block">
            <div className="relative w-full h-[60vh] md:h-[65vh] xl:h-[70vh] overflow-hidden">
              <div 
                ref={carouselRef}
                className="relative h-full flex items-center gap-2"
                style={{
                  width: `${slides.length * 350}px`,
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                {slides.map((slide, index) => (
                  <figure
                    key={slide.id}
                    className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
                    style={{
                      width: '340px',
                      height: '100%'
                    }}
                    // onClick removed - no redirection on figure click
                  >
                    <div className="bg-[#f2f2f2] p-4 w-full h-full flex flex-col items-center justify-between">
                      {/* Imagen - altura fija */}
                      <div className="flex-shrink-0 w-full h-[50%] flex items-center justify-center pt-4">
                        <img
                          src={slide.src}
                          alt={slide.title}
                          className="block w-full h-full max-w-full max-h-full object-contain select-none"
                          draggable={false}
                        />
                      </div>
                      
                      {/* Contenido de texto - altura fija */}
                      <div className="flex-shrink-0 w-full h-[50%] flex flex-col justify-start pt-12 pb-16">
                        {/* Título - altura fija */}
                        <div className="text-center mb-0 h-[25%] flex items-center justify-center">
                          <h3 className="text-[0.9rem] font-bold text-gray-800 transition-all duration-300" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                            {slide.title.includes('–') ? (
                              <>
                                <span className="text-[0.9rem] font-bold">{slide.title.split('–')[0].trim()}</span>
                                <br />
                                <span className="text-[0.7rem] font-normal">{slide.title.split('–')[1].trim()}</span>
                              </>
                            ) : slide.title === 'STOP OIL – BLUE MARKER' ? (
                              <>
                                <span className="text-[0.9rem] font-bold">STOP OIL</span>
                                <br />
                                <span className="text-[0.7rem] font-normal">BLUE MARKER</span>
                              </>
                            ) : (
                              slide.title
                            )}
                          </h3>
                        </div>
                        
                        {/* Descripción - altura fija */}
                        <div className="text-center mb-3 h-[50%] flex items-center justify-center px-2">
                          {slide.title.includes('PEA SOUP') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              A light-green vegetable solution with broad coverage and lasting effect. Can be combined with other products for greater impact.
                            </p>
                          ) : slide.title.includes('MASHED POTATOES') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Opaque powder of variable density to mix with water and throw at an artwork. Perfect for full-coverage actions.
                            </p>
                          ) : slide.title.includes('BLUE MARKER') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              High-quality permanent blue ink for targeting any artwork, regardless of medium. Easy to carry, easy to use.
                            </p>
                          ) : slide.title.includes('TOMATO SOUP') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              The classic protest weapon. Iconic, eye-catching, bright, and ultra-processed.
                            </p>
                          ) : slide.title.includes('FOSSIL FUEL') && !slide.title.includes('KILLING') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Dark, viscous liquid that's impossible to ignore. Equal parts ironic and provocative.
                            </p>
                          ) : slide.title.includes('PUMPKIN SOUP') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Ultra-processed, long-lasting soup with strong coverage and vivid orange color. The perfect original alternative to tomato soup.
                            </p>
                          ) : slide.title.includes('INSTANT ADHESIVE') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Strong, long-lasting glue for artworks and walls. Excellent adhesion and durability for medium- to long-duration protest performances.
                            </p>
                          ) : slide.title.includes('RED PAINT') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Unspoiling, high-intensity red paint. Designed for maximum impact on artworks depicting fields, gardens, or agricultural scenes.
                            </p>
                          ) : (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              A versatile tool designed for maximum impact and visibility. Perfect for any artistic expression or protest action.
                            </p>
                          )}
                        </div>
                        
                        {/* Precio y botón - altura fija */}
                        <div className="text-center h-[25%] flex flex-col justify-center items-center">
                          <p className="text-[0.75rem] text-gray-600 mb-3 transition-all duration-300" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                            {slide.year}
                          </p>
                          <button 
                            onClick={() => window.open('https://shop.capitalismtheweb.com/', '_blank')}
                            className="bg-transparent border-2 border-black text-black px-3 py-1.5 font-semibold transition-all duration-300 text-[0.75rem] hover:bg-black hover:text-white cursor-pointer" 
                            style={{ fontFamily: 'Moma Sans, sans-serif' }}
                          >
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

          {/* Grid de Items - Solo visible en Mobile */}
          <div 
            className="md:hidden space-y-6 pb-8 w-full max-w-sm px-4"
            style={{ margin: '0 auto' }}
          >
            {baseSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="bg-[#f2f2f2] p-4 pb-8 flex flex-col items-center h-[80vh] w-full"
              >
                {/* Imagen */}
                <div className="w-full h-[40%] flex items-center justify-center mb-6 pt-4">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="max-w-full max-h-full object-contain"
                    draggable={false}
                  />
                </div>
                
                {/* Título */}
                <div className="text-center mb-4 h-[20%] flex items-center justify-center">
                  <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                    {slide.title.includes('–') ? (
                      <>
                        <span className="text-lg font-bold">{slide.title.split('–')[0].trim()}</span>
                        <br />
                        <span className="text-sm font-normal">{slide.title.split('–')[1].trim()}</span>
                      </>
                    ) : slide.title === 'Stop Oil Blue Marker' ? (
                      <>
                        <span className="text-lg font-bold">STOP OIL</span>
                        <br />
                        <span className="text-sm font-normal">BLUE MARKER</span>
                      </>
                    ) : (
                      slide.title
                    )}
                  </h3>
                </div>
                
                {/* Descripción */}
                <div className="text-center mb-4 px-2 h-[50%] flex items-center justify-center pt-4">
                  {slide.title.includes('PEA SOUP') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      A light-green vegetable solution with broad coverage and lasting effect. Can be combined with other products for greater impact.
                    </p>
                  ) : slide.title.includes('MASHED POTATOES') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      Opaque powder of variable density to mix with water and throw at an artwork. Perfect for full-coverage actions.
                    </p>
                  ) : slide.title.includes('BLUE MARKER') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      High-quality permanent blue ink for targeting any artwork, regardless of medium. Easy to carry, easy to use.
                    </p>
                  ) : slide.title.includes('TOMATO SOUP') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      The classic protest weapon. Iconic, eye-catching, bright, and ultra-processed.
                    </p>
                  ) : slide.title.includes('FOSSIL FUEL') && !slide.title.includes('KILLING') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      Dark, viscous liquid that's impossible to ignore. Equal parts ironic and provocative.
                    </p>
                  ) : slide.title.includes('PUMPKIN SOUP') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      Ultra-processed, long-lasting soup with strong coverage and vivid orange color. The perfect original alternative to tomato soup.
                    </p>
                  ) : slide.title.includes('INSTANT ADHESIVE') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      Strong, long-lasting glue for artworks and walls. Excellent adhesion and durability for medium- to long-duration protest performances.
                    </p>
                  ) : slide.title.includes('RED PAINT') ? (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      Unspoiling, high-intensity red paint. Designed for maximum impact on artworks depicting fields, gardens, or agricultural scenes.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                      A versatile tool designed for maximum impact and visibility. Perfect for any artistic expression or protest action.
                    </p>
                  )}
                </div>
                
                {/* Precio y botón */}
                <div className="text-center h-[25%] flex flex-col justify-center items-center pb-6">
                  <p className="text-base text-gray-600 mb-3" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                    {slide.year}
                  </p>
                  <button 
                    onClick={() => window.open('https://shop.capitalismtheweb.com/', '_blank')}
                    className="bg-transparent border-2 border-black text-black px-4 py-2 font-semibold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer" 
                    style={{ fontFamily: 'Moma Sans, sans-serif' }}
                  >
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weapons;