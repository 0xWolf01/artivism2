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

  const positionPreview = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const boxW = 260;
    const boxH = (260 * 9 / 16) + 20;
    
    let x = e.clientX - rect.left + 10;
    let y = e.clientY - rect.top + 10;
    
    x = Math.max(4, Math.min(rect.width - boxW - 4, x));
    y = Math.max(4, Math.min(rect.height - boxH - 4, y));
    
    setPreviewPosition({ x, y });
  };

  return (
    <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 md:px-10 xl:px-20 max-w-full min-h-[calc(100svh-3.5rem)] pt-4 xl:pt-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-10 xl:gap-16 items-start xl:items-stretch">
        {/* Imagen principal */}
        <div className="bg-[#f2f2f2] w-full h-auto p-4 md:p-6">
          <div 
            ref={imageContainerRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseMove={positionPreview}
          >
            <img
              className="max-w-full h-auto max-h-[calc(100vh-12rem)] xl:max-h-[calc(100vh-16rem)] object-contain block m-auto"
              src={mainImage}
              alt={title}
            />
            
            {/* Hotspot */}
            <button
              type="button"
              aria-label="Hotspot"
              className="absolute size-3.5 bg-red-500/50 rounded-full border-2 border-white cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{ top: '15%', left: '65%' }}
              onMouseEnter={() => setPreviewVisible(true)}
              onMouseLeave={() => setPreviewVisible(false)}
            />
            
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
                  src={previewImage} 
                  alt="preview" 
                />
                <p className="text-[0.7rem] text-black mt-1 leading-tight break-words whitespace-normal">
                  {previewText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col gap-6 mr-auto leading-relaxed xl:h-full xl:justify-between">
          <div className="flex flex-col gap-6">
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
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Medium</p>
              <p className="m-0 text-[0.85rem]">Oil on poplar panel</p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Dimensions</p>
              <p className="m-0 text-[0.85rem]">77 × 53 cm (30 × 21 in)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtPiecePage;
