import React, { useState, useRef } from 'react';
import { useFadeIn } from '../../hooks/useFadeIn';
import { useScrollLock } from '../../hooks/useScrollLock';

const ArtPiecePage = ({ 
  title, 
  location, 
  concept, 
  description, 
  mainImage, 
  previewImage, 
  previewText 
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Hooks personalizados
  useFadeIn(100, 600);
  useScrollLock(true, 1024);



  return (
    <main className="mt-14 pb-4 md:pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 md:px-10 xl:px-20 max-w-full min-h-0 md:min-h-[calc(100vh-3.5rem)] flex flex-col justify-start md:justify-center" style={{paddingBottom: window.innerWidth < 768 ? '1rem' : undefined}}>
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-10 xl:gap-16 items-start xl:items-stretch">
        {/* Imagen principal */}
        <div className="bg-[#f2f2f2] w-full h-auto p-4 md:p-6">
          <div 
            ref={imageContainerRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative inline-block">
              <img
                className="max-w-full h-auto max-h-[calc(100vh-12rem)] xl:max-h-[calc(100vh-16rem)] object-contain block m-auto"
                src={mainImage}
                alt={title}
              />
              
              {/* Botón WEAPON - círculo con + */}
              <button
                type="button"
                aria-label="Ver weapon"
                className="absolute top-3 right-3 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg animate-pulse flex items-center justify-center text-2xl leading-none"
                style={{fontFamily: 'Moma Sans', backgroundColor: '#FF0002'}}
                onMouseEnter={() => setPreviewVisible(true)}
                onMouseLeave={() => setPreviewVisible(false)}
              >
                +
              </button>
            </div>
            
            {/* Preview */}
            {previewVisible && (
              <div 
                className="absolute z-[2000] pointer-events-none w-[200px] h-[200px] bg-white p-4 text-center overflow-hidden flex flex-col justify-center shadow-xl border border-gray-200"
                style={{ 
                  top: '4rem', 
                  right: '4rem' 
                }}
              >
                <img 
                  className="w-full h-4/5 object-contain block mx-auto" 
                  src={previewImage} 
                  alt="preview" 
                />
                <div className="text-center mt-2">
                  <p className="text-[0.7rem] text-black font-bold leading-tight">
                    Weapon
                  </p>
                  <p className="text-[0.7rem] text-black leading-tight">
                    {previewText.replace('Weapon: ', '')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col gap-4 md:gap-6 mr-auto leading-relaxed xl:h-full xl:justify-between">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold m-0 text-[1.5rem]">{title}</h1>
            <div className="flex flex-col gap-0">
              <h2 className="font-bold m-0 text-[1rem]">{location}</h2>
              <p className="m-0 text-[0.85rem]">{concept}</p>
            </div>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              {description}
            </p>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              Oil on poplar panel. Dimensions 77 × 53 cm (30 × 21 in).
            </p>
          </div>
          
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Medium</p>
              <p className="m-0 text-[0.85rem]">Oil on poplar panel</p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Dimensions</p>
              <p className="m-0 text-[0.85rem]">77 × 53 cm (30 × 21 in)</p>
            </div>
          </div>
          
          {/* Botón BID NOW */}
          <button className="w-full md:w-fit bg-transparent border-2 border-black font-bold px-5 py-2 cursor-pointer text-base rounded-none hover:bg-black hover:text-white transition-colors duration-200">
            BID NOW
          </button>
        </div>
      </div>
    </main>
  );
};

export default ArtPiecePage;
