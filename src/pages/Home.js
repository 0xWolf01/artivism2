import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Carousel3D from '../components/Carousel3D';

const Home = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false);
  const contentRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // NO bloquear scroll vertical - permitir scroll normal en la página
    
    // Lazy loading con Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContentVisible(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01, // Se activa cuando solo el 1% del elemento es visible
        rootMargin: '100px' // Se activa 100px antes de que sea visible
      }
    );

    if (contentRef.current) {
      observerRef.current.observe(contentRef.current);
    }

    // Fallback: si después de 2 segundos no se ha activado, mostrar el contenido
    const fallbackTimer = setTimeout(() => {
      if (!isContentVisible) {
        setIsContentVisible(true);
      }
    }, 2000);

    // En mobile: mostrar contenido al hacer scroll
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsMobileContentVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar al desmontar el componente
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const currentRef = contentRef.current;
      const currentObserver = observerRef.current;
      if (currentRef && currentObserver) {
        currentObserver.unobserve(currentRef);
      }
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isContentVisible]);



  return (
    <>
      <h1 className="sr-only">Featured Pieces</h1>

      {/* 3D-like PNG Carousel */}
      <div className="relative mt-28 md:mt-20 lg:mt-24 xl:mt-28 flex justify-center">
        <Carousel3D />
      </div>
      
      {/* Grid completo de 4 columnas - CON FADE-IN */}
      <div 
        ref={contentRef}
        className={`relative mt-16 sm:mt-20 md:mt-8 lg:mt-18 xl:mt-12 2xl:mt-20 px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-none transition-all duration-1000 ease-out ${
          isContentVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12 w-full items-start">
          
          {/* Columna 1 - Título principal */}
          <div className="text-center lg:text-left w-full md:col-span-2 lg:col-span-1">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-2xl lg:text-xl xl:text-lg 2xl:text-xl text-black mb-2 sm:mb-3 md:mb-3 lg:mb-2 leading-tight sm:leading-[0.9] md:leading-[0.95] lg:leading-[0.95] xl:leading-tight 2xl:leading-[0.95]" style={{fontFamily: 'Moma Sans'}}>
              Bid to own the most iconic<br />
              protests on artwork
            </h2>
            
            {/* Flecha indicadora - SOLO EN MOBILE */}
            <div className={`md:hidden flex justify-center mt-6 sm:mt-8 transition-opacity duration-500 ${
              window.innerWidth < 768 
                ? (isMobileContentVisible ? 'opacity-0' : 'opacity-100') 
                : 'opacity-100'
            }`}>
              <div className="animate-bounce">
                <svg 
                  className="w-6 h-6 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Contenedor para columnas 2, 3 y 4 que se mueve como bloque */}
          <div className={`md:col-span-2 lg:col-span-3 transition-all duration-500 ${
            window.innerWidth < 768 
              ? (isMobileContentVisible ? '-mt-10' : 'mt-0') 
              : 'mt-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-10 xl:gap-12 w-full items-start">
              
              {/* Columna 2 - Primer párrafo */}
              <div className={`text-center lg:text-left w-full px-6 lg:px-0 transition-opacity duration-500 ${
                window.innerWidth < 768 
                  ? (isMobileContentVisible ? 'opacity-100' : 'opacity-10') 
                  : 'opacity-100'
              }`}>
                <p className="text-sm sm:text-base md:text-xs lg:text-[12.5px] xl:text-xs 2xl:text-[12.5px] text-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-[1.2] w-full md:w-80 lg:w-full mx-auto md:mx-auto" style={{fontFamily: 'Moma Sans'}}>
                  Art is a form of human expression. Protest is too. So isn't protest against art the highest expression of art itself?
                </p>
              </div>
              
              {/* Columna 3 - Segundo párrafo */}
              <div className={`text-center lg:text-left w-full px-6 lg:px-0 transition-opacity duration-500 ${
                window.innerWidth < 768 
                  ? (isMobileContentVisible ? 'opacity-100' : 'opacity-10') 
                  : 'opacity-100'
              }`}>
                <p className="text-sm sm:text-base md:text-xs lg:text-[12.5px] xl:text-xs 2xl:text-[12.5px] text-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-[1.2] w-full md:w-80 lg:w-full mx-auto md:mx-auto" style={{fontFamily: 'Moma Sans'}}>
                  This sequence transforms some of the most iconic protests of our time into unique pieces, allowing any collector to own them not as headlines, but as real works of art.
                </p>
              </div>
              
              {/* Columna 4 - Botón */}
              <div className={`text-center w-full flex items-start justify-center lg:justify-end transition-opacity duration-500 mt-4 lg:mt-0 ${
                window.innerWidth < 768 
                  ? (isMobileContentVisible ? 'opacity-100' : 'opacity-10') 
                  : 'opacity-100'
              }`}>
                <Link to="/pieces" className="bg-transparent border-2 border-black text-black font-bold px-4 sm:px-5 md:px-4 lg:px-5 py-2.5 sm:py-2.5 md:py-2.5 lg:py-2.5 text-xs sm:text-sm md:text-xs lg:text-xs uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-200">
                  DISCOVER THE PIECES
                </Link>
              </div>
              
            </div>
          </div>
          
        </div>
        

      </div>
    </>
  );
};

export default Home;
