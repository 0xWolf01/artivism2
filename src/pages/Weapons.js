import React, { useRef, useEffect } from 'react';

const Weapons = () => {
  const carouselRef = useRef(null);
  // const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Datos de los productos de la tienda
  const baseSlides = [
    { id: 1, src: '/assets/img/pure-patata.png', title: 'Fossil Fuel is Killing Us – Mashed Potatoes', artist: 'Food Art', year: '€19.99', color: '#FF0000' },
    { id: 2, src: '/assets/img/marker.png', title: 'Stop Oil Blue Marker', artist: 'Office Art', year: '€24.99', color: '#00FF00' },
    { id: 3, src: '/assets/img/pea-soup.png', title: 'Agricultural System is Collapsed – Pea Soup', artist: 'Food Art', year: '€29.99', color: '#0000FF' },
    { id: 4, src: '/assets/img/tomato-soup.png', title: 'Stop Oil – Tomato Soup', artist: 'Food Art', year: '€27.99', color: '#FF6B6B' },
    { id: 5, src: '/assets/img/petroleum.png', title: 'Stop Fossil Fuels – Fossil Fuel', artist: 'Industrial Art', year: '€32.99', color: '#2C3E50' },
    { id: 6, src: '/assets/img/pumpkin-soup.png', title: 'No Food for the Future – Pumpkin Soup', artist: 'Food Art', year: '€25.99', color: '#E67E22' }
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
      
      // Calcular qué producto está en el centro (comentado para futuras funcionalidades)
      // const centerPosition = Math.abs(offsetPx);
      // const productIndex = Math.round(centerPosition / unitWidth) % BASE;
      
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
      
      if (Math.abs(delta) > 10) {
        velocity -= delta * 0.3; // Valor original
        wheelLock = true;
        setTimeout(() => { wheelLock = false; }, 50);
      }
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
      
      if (Math.abs(deltaX) > 7) {
        velocity -= deltaX * 0.6; // Valor original mejorado ligeramente
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
    
    // Bloquear scroll vertical globalmente
    const preventVerticalScroll = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener('wheel', preventVerticalScroll, { passive: false });
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
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
    <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] bg-white w-full" style={{ paddingRight: '0', marginRight: '0' }}>
      <h1 className="sr-only">Weapons</h1>

      {/* Contenedor principal centrado verticalmente */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem-7rem)] w-full">
        {/* Choose Your Weapon Header */}
        <div className="w-full text-center mb-6 px-4 md:px-10 xl:px-20 mt-16 md:mt-0">
          <h2 className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
            Choose your weapon
          </h2>
        </div>

        {/* 3D Carousel Section - edge to edge */}
        <div className="w-full">
          <section className="relative w-full overflow-hidden">
            <div className="relative w-full h-[60vh] md:h-[65vh] xl:h-[70vh] overflow-hidden">
              <div 
                ref={carouselRef}
                className="relative h-full flex items-center gap-2"
                style={{
                  width: `${slides.length * 350}px`,
                  minWidth: '100vw',
                  margin: '0',
                  padding: '0',
                  left: '0',
                  right: '0',
                  transform: 'translateX(0)'
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
                    // onClick removed - no redirection on figure click
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
                          ) : slide.title.includes('Tomato Soup') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              The classic protest weapon. Iconic, eye-catching, bright, and ultra-processed.
                            </p>
                          ) : slide.title.includes('Fossil Fuel') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Dark, viscous liquid that's impossible to ignore. Equal parts ironic and provocative.
                            </p>
                          ) : slide.title.includes('Pumpkin Soup') ? (
                            <p className="text-[0.6rem] text-gray-500 leading-tight px-2 opacity-80 max-w-[250px] mx-auto" style={{ fontFamily: 'Moma Sans, sans-serif' }}>
                              Ultra-processed, long-lasting soup with strong coverage and vivid orange color. The perfect original alternative to tomato soup.
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
                          <button 
                            onClick={() => window.open('https://shop.capitalismtheweb.com/', '_blank')}
                            className="inline-block bg-black text-white px-4 py-2 font-semibold transition-all duration-300 text-[0.75rem] hover:bg-gray-800 hover:scale-105 cursor-pointer" 
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
        </div>
      </div>
    </main>
  );
};

export default Weapons;
