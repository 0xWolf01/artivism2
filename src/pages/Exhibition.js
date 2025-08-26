import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useScrollLock } from '../hooks/useScrollLock';

const Exhibition = () => {
  // Hooks personalizados
  useFadeIn(100, 600);
  useScrollLock(true, 1024);

  return (
    <main className="mt-14 pb-4 md:pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 md:px-10 xl:px-20 max-w-full min-h-0 md:min-h-[calc(100vh-3.5rem)] flex flex-col justify-start md:justify-center" style={{paddingBottom: window.innerWidth < 768 ? '1rem' : undefined}}>
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-10 xl:gap-16 items-start xl:items-stretch">
        {/* Imagen principal */}
        <div className="bg-[#f2f2f2] w-full h-auto p-4 md:p-6">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative inline-block">
              <img
                className="max-w-full h-auto max-h-[calc(100vh-12rem)] xl:max-h-[calc(100vh-16rem)] object-contain block m-auto"
                src="/assets/img/corner-gallery.jpg"
                alt="Corner Gallery & Studio Exhibition"
              />
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col gap-4 md:gap-6 mr-auto leading-relaxed xl:h-full xl:justify-between">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="font-bold m-0 text-[1.5rem]">Exhibition</h1>
            <div className="flex flex-col gap-0">
              <h2 className="font-bold m-0 text-[1rem]">Corner Gallery & Studio, Carabanchel</h2>
              <p className="m-0 text-[0.85rem]">Digital Protest Art Collection</p>
            </div>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              The Artivism exhibition will be available at Corner Gallery & Studio, featuring the most iconic protests transformed into commercial pieces. Corner Gallery & Studio is an artistic production studio and art gallery located in the San Isidro neighborhood of Carabanchel. A meeting point for dialogue between different cultural agents, with the purpose of promoting activities and programs related to contemporary creation in the so-called ISO Polygon of Carabanchel.
            </p>
            <p className="text-[#555] text-[0.85rem] leading-snug m-0">
              Artist workshop, exhibition space and meeting point, Corner Gallery offers in its 200 square meters an image of artistic workspace and on the other hand a diaphanous and bright room with direct access from the street.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Address</p>
              <p className="m-0 text-[0.85rem]">C. Cañete, 17, Carabanchel, 28019 Madrid</p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="m-0 text-[0.85rem] font-bold">Exhibition Period</p>
              <p className="m-0 text-[0.85rem]">16-19 September 2025</p>
            </div>
          </div>
          
          {/* Enlace a Google Maps */}
          <a 
            href="https://maps.google.com/?q=C.+Cañete,+17,+Carabanchel,+28019+Madrid"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-fit bg-transparent border-2 border-black font-bold px-5 py-2 text-base rounded-none hover:bg-black hover:text-white transition-colors duration-200 text-center inline-block no-underline"
          >
            VIEW ON MAPS
          </a>
        </div>
      </div>
    </main>
  );
};

export default Exhibition;
