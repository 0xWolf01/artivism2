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
  const [weaponHovered, setWeaponHovered] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const imageContainerRef = useRef(null);
  
  // Parse weapons from previewText
  const parseWeapons = (text) => {
    const weaponsText = text.replace('Weapon: ', '');
    const weapons = weaponsText.split(', ').map(weapon => weapon.trim());
    
    // Map weapons to their respective images
    const weaponImageMap = {
      'Tomato soup': '/assets/img/tomate-soup.webp',
      'Pumpkin soup': '/assets/img/pumkin-soup.webp', 
      'Mashed potatoes': '/assets/img/mashed-potatoes.webp',
      'Fossil fuel': '/assets/img/petroleum.webp',
      'Pea soup': '/assets/img/pea-soup.webp',
      'Red paint': '/assets/img/marker.webp',
      'Blue marker': '/assets/img/marker.webp',
      'Pegamento': '/assets/img/adhesive.webp'
    };
    
    return weapons.map(weapon => ({
      name: weapon,
      image: weaponImageMap[weapon] || previewImage
    }));
  };
  
  const weapons = parseWeapons(previewText);

  // Funciones para manejar hover con delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setPreviewVisible(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setPreviewVisible(false);
      setWeaponHovered(null);
    }, 150); // 150ms delay antes de ocultar
  };

  // Hooks personalizados
  useFadeIn(100, 600);
  useScrollLock(true, 1024);



  return (
    <div className="pb-4 px-4 md:px-10 xl:px-20 max-w-full min-h-0 md:min-h-[calc(100vh-3.5rem)] flex flex-col justify-start md:justify-center" style={{paddingBottom: typeof window !== 'undefined' && window.innerWidth < 768 ? '1rem' : undefined}}>
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                +
              </button>
            </div>
            
            {/* Preview */}
            {previewVisible && (
              <div 
                className="absolute z-[2000] pointer-events-auto bg-white shadow-xl border border-gray-200"
                style={{ 
                  top: '4rem', 
                  right: '4rem',
                  width: '220px',
                  minHeight: '180px',
                  maxHeight: '500px'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {weapons.map((weapon, index) => (
                  <div 
                    key={index}
                    className="relative w-full p-4 text-center flex flex-col border-b border-gray-100 last:border-b-0"
                    style={{
                      minHeight: '180px',
                      height: 'auto'
                    }}
                    onMouseEnter={() => setWeaponHovered(index)}
                    onMouseLeave={() => setWeaponHovered(null)}
                  >
                    {/* Imagen del arma */}
                    <div className="flex items-center justify-center mb-3" style={{height: '100px'}}>
                      <img 
                        className="max-w-full max-h-full object-contain" 
                        src={weapon.image} 
                        alt={weapon.name} 
                      />
                    </div>
                    
                    {/* Información del arma */}
                    <div className="text-center mb-3">
                      <p className="text-[0.7rem] text-black font-bold leading-tight mb-1">
                        Weapon
                      </p>
                      <p className="text-[0.7rem] text-black leading-tight">
                        {weapon.name}
                      </p>
                    </div>
                    
                    {/* BUY button appears on hover - positioned at bottom */}
                    <div className="flex items-center justify-center" style={{minHeight: '32px'}}>
                      {weaponHovered === index && (
                        <button 
                          onClick={() => window.open('https://shop.capitalismtheweb.com/', '_blank')}
                          className="bg-transparent border-2 border-black text-black px-3 py-1 font-semibold transition-all duration-300 text-[0.7rem] hover:bg-black hover:text-white cursor-pointer" 
                          style={{ fontFamily: 'Moma Sans, sans-serif' }}
                        >
                          BUY
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Weapon</p>
              <p className="m-0 text-[0.85rem]">{previewText.replace('Weapon: ', '')}</p>
            </div>
          </div>
          
          {/* Botón BID NOW */}
          <button className="w-full md:w-fit bg-transparent border-2 border-black font-bold px-5 py-2 cursor-pointer text-base rounded-none hover:bg-black hover:text-white transition-colors duration-200">
            BID NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtPiecePage;
