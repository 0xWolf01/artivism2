import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Pumpkin soup on Leonardo da Vinci's La Gioconda",
      artist: "Capitalism",
      year: "2025",
      image: "/assets/img/gioconda-capitalism.jpg",
      link: "/gioconda"
    },
    {
      id: 2,
      title: "Mashed potatoes on Monet's Les Meules",
      artist: "Capitalism",
      year: "2022",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Claude_Monet_-_Meules_%28W_1273%29.jpg",
      link: "/lesmeules"
    },
    {
      id: 3,
      title: "Fossil fuels on Klimt's Death and Life",
      artist: "Capitalism",
      year: "2022",
      image: "/assets/img/deathandlife-capitalism.jpg",
      link: "/deathandlife"
    },
    {
      id: 4,
      title: "Pea soup on Van Gogh's The Sower",
      artist: "Capitalism",
      year: "2022",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg",
      link: "/thesower"
    },
    {
      id: 5,
      title: "Tomato soup on Van Gogh's Sunflowers",
      artist: "Capitalism",
      year: "2022",
      image: "/assets/img/sunflowers-capitalism.jpg",
      link: "/sunflowers"
    },
    {
      id: 6,
      title: "Red paint on Claude Monet's The Artist's Garden at Giverny",
      artist: "Capitalism",
      year: "2023",
      image: "https://www.meisterdrucke.us/kunstwerke/1260px/Claude_Monet_-_The_Artists_Garden_in_Giverny_-_%28MeisterDrucke-1326270%29.jpg",
      link: "/giverny"
    },
    {
      id: 7,
      title: "Tomato soup on Claude Monet's Le Printemps",
      artist: "Capitalism",
      year: "2024",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Monet_-_Le_Printemps%2C_1886.jpg",
      link: "/leprintemps"
    },
    {
      id: 8,
      title: "Blue marks and instant adhesive on Andy Warhol's Campbell's Soup Cans",
      artist: "Capitalism",
      year: "2022",
      image: "https://subastareal.es/uploads/subastareal.es/attachments/60681/andy-warhol-consomme-campbells-soup-2130.jpg",
      link: "/campbells"
    }
  ];

  useEffect(() => {
    // Forzar scroll hacia arriba
    window.scrollTo(0, 0);
    
    // NO bloquear scroll vertical - permitir scroll normal en la página
    
    // Entry animation for gallery items
    const animTargets = document.querySelectorAll('article');
    
    animTargets.forEach((el, i) => {
      el.classList.add('opacity-0', 'translate-y-4');
      const delay = Math.min(i * 100, 800); // Máximo 800ms de delay
      setTimeout(() => {
        el.classList.add('transition-all', 'duration-700', 'ease-out');
        el.classList.remove('opacity-0', 'translate-y-4');
      }, delay);
    });
  }, []);

  return (
    <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 md:px-10 xl:px-20 max-w-full pt-8 md:pt-12 xl:pt-16">
      <h1 className="sr-only">Pieces</h1>

      {/* Gallery grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-14">
        {galleryItems.map((item) => (
          <article key={item.id} className="flex flex-col">
            <Link to={item.link} className="block bg-[#f2f2f2] p-4">
              <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-contain max-w-[80%] max-h-[80%]"
                />
              </div>
            </Link>
            <div className="mt-4 leading-snug">
              <p className="m-0">{item.title}</p>
              <p className="m-0 font-bold">{item.artist}</p>
              <p className="m-0">{item.year}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Gallery;
