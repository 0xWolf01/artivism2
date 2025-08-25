import React, { useEffect } from 'react';
import Carousel3D from '../components/Carousel3D';

const Home = () => {
  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // Bloquear scroll vertical en Home
    document.body.style.overflow = 'hidden';
    
    // Bloquear scroll vertical en mobile también
    const preventScroll = (e) => {
      // Bloquear scroll vertical completamente
      e.preventDefault();
    };
    
    // Solo aplicar a eventos de scroll, no a toques en el carrusel
    document.addEventListener('touchmove', preventScroll, { passive: false });
    // No bloquear touchstart para permitir interacciones normales
    
    // Entry animation for elements
    const animTargets = [
      ...document.querySelectorAll('main > *'),
      ...document.querySelectorAll('main section > *'),
      ...document.querySelectorAll('main article')
    ];
    
    animTargets.forEach((el, i) => {
      el.classList.add('reveal');
      const delay = Math.min(i * 50, 600);
      setTimeout(() => el.classList.add('in'), delay);
    });

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <>
      <h1 className="sr-only">Featured Pieces</h1>

      {/* 3D-like PNG Carousel */}
      <div className="relative mt-20 md:mt-32 flex justify-center">
        <Carousel3D />
      </div>
      
      {/* Tres bloques de texto explicativos */}
      <div className="mt-16 px-6 md:px-2 xl:px-4 max-w-none mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 w-full max-w-6xl mx-auto">
          
          {/* Bloque izquierdo - Título y Call to Action */}
          <div className="text-center md:text-left md:col-span-4 w-full">
            <h2 className="font-bold text-2xl md:text-2xl text-black mb-4 md:mb-3 leading-[0.8] md:leading-[0.9]" style={{fontFamily: 'Moma Sans'}}>
              Bid to own the most iconic<br />
              protests on artwork
            </h2>
          </div>
          
          {/* Bloque central - Declaración filosófica */}
          <div className="text-center md:text-left md:col-span-3 md:col-start-6 w-full">
            <p className="text-xs md:text-sm text-black leading-tight md:leading-[1.0] w-full" style={{fontFamily: 'Moma Sans'}}>
              Art is a form of human expression. Protest is too. So isn't protest against art the highest expression of art itself?
            </p>
          </div>
          
          {/* Bloque derecho - Explicación del concepto */}
          <div className="text-center md:text-left md:col-span-4 md:col-start-9 w-full">
            <p className="text-xs md:text-sm text-black leading-tight md:leading-[1.0] w-full" style={{fontFamily: 'Moma Sans'}}>
              This sequence transforms some of the most iconic protests of our time into unique pieces, allowing any collector to own them not as headlines, but as real works of art.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
