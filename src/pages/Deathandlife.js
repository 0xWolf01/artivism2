import React, { useState, useRef, useEffect } from 'react';

const Deathandlife = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Bloquear scroll vertical en Deathandlife
  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // No bloquear scroll en mobile
    if (window.innerWidth >= 1024) { // Solo en desktop (xl)
      document.body.style.overflow = 'hidden';
    }
    
    // Entry animation for page elements
    const animTargets = document.querySelectorAll('main > *');
    
    animTargets.forEach((el, i) => {
      el.classList.add('opacity-0', 'translate-y-4');
      const delay = Math.min(i * 100, 600); // Máximo 600ms de delay
      setTimeout(() => {
        el.classList.add('transition-all', 'duration-700', 'ease-out');
        el.classList.remove('opacity-0', 'translate-y-4');
      }, delay);
    });
    
    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const positionPreview = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const boxW = 260;
    const boxH = (260 * 9 / 16) + 20; // approx with caption
    
    // Compute desired position near cursor (10px offset)
    let x = e.clientX - rect.left + 10;
    let y = e.clientY - rect.top + 10;
    
    // Clamp within container
    x = Math.max(4, Math.min(rect.width - boxW - 4, x));
    y = Math.max(4, Math.min(rect.height - boxH - 4, y));
    
    setPreviewPosition({ x, y });
  };

  return (
    <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 md:px-10 xl:px-20 max-w-full min-h-[calc(100svh-3.5rem)] pt-4 xl:pt-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-10 xl:gap-16 items-start xl:items-stretch">
        {/* Izquierda: imagen */}
        <div className="bg-[#f2f2f2] w-full h-auto p-4 md:p-6">
          <div 
            ref={imageContainerRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseMove={positionPreview}
          >
            <img
              className="max-w-full h-auto max-h-[calc(100vh-12rem)] xl:max-h-[calc(100vh-16rem)] object-contain block m-auto"
              src="https://arthive.com/res/media/img/oy800/work/2ba/536354@2x.jpg"
              alt="Gustav Klimt - Death and Life"
            />
            {/* Hotspot */}
            <button
              type="button"
              aria-label="Hotspot"
              className="absolute size-3.5 bg-red-500/50 rounded-full border-2 border-white cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{ top: '15%', left: '65%' }}
              onMouseEnter={() => setPreviewVisible(true)}
              onMouseLeave={() => setPreviewVisible(false)}
            >
            </button>
            
            {/* Preview */}
            {previewVisible && (
              <div 
                className="absolute z-[2000] pointer-events-none w-[260px] aspect-video bg-white p-4 text-center overflow-hidden flex flex-col justify-center"
                style={{ 
                  left: previewPosition.x + 'px', 
                  top: previewPosition.y + 'px' 
                }}
              >
                <img 
                  className="w-full h-full object-contain block mx-auto" 
                  src="https://tienda.upper.es/documents/10180/561690/71601_G.jpg" 
                  alt="preview" 
                />
                <p className="text-[0.7rem] text-black mt-1 leading-tight break-words whitespace-normal">
                  Weapon: Tomato Soup
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Derecha: texto */}
        <div className="flex flex-col gap-6 mr-auto leading-relaxed xl:h-full xl:justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="font-bold m-0 text-[1.5rem]">Fossil fuels on Klimt's Death and Life</h1>
            <div className="flex flex-col gap-0">
              <h2 className="font-bold m-0 text-[1rem]">Leopold Museum, Vienna – November 15, 2022</h2>
              <p className="m-0 text-[0.85rem]">Capitalism</p>
            </div>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              Viscous black oil on the "oil on canvas" surface of Gustav Klimt's Death and Life. The substance spreads slowly along the arc that divides mortality from ornament, saturating the transition between gold and grey.
            </p>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              The protest was carried out by two activists from Letzte Generation Österreich during a free-admission day sponsored by Austrian oil company OMV. One applied the liquid; the other clung to the glass—together completing a denunciation of the ongoing expansion of fossil fuel infrastructure and its entanglement with public institutions. Extensively covered by Die Presse, ORF, The Art Newspaper, and Le Monde.
            </p>
            <div className="flex flex-col gap-0">
              <p className="text-gray-500 text-[0.75rem] m-0 leading-tight">Medium</p>
              <p className="text-gray-500 text-[0.8rem] m-0 leading-tight">Viscous black oil on canvas</p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-gray-500 text-[0.75rem] m-0 leading-tight">Dimensions</p>
              <p className="text-gray-500 text-[0.8rem] m-0 leading-tight">Original canvas dimensions</p>
            </div>
          </div>
          <button className="w-fit bg-transparent border-2 border-black font-bold px-5 py-2 cursor-pointer text-base rounded-none hover:bg-black hover:text-white transition-colors duration-200">
            BID NOW
          </button>
        </div>
      </div>
    </main>
  );
};

export default Deathandlife;
