import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isStorePage = location.pathname === '/store';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1000] h-14 flex items-center justify-between px-4 md:px-10 xl:px-20 ${
        isStorePage ? 'bg-white text-black' : 'bg-white text-black'
      }`} style={{ fontFamily: 'Moma Sans, sans-serif' }}>
        <Link to="/" className={`font-bold text-lg ${isStorePage ? 'text-black' : 'text-black'}`}>
          {isStorePage ? '[ARTIVISM]' : '[ARTIVISM]'}
        </Link>
        
        {/* Botón hamburguesa para móvil */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-5 whitespace-nowrap">
          <Link 
            to="/" 
            className={`font-bold no-underline hover:underline text-[0.95rem] ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            } ${isActive('/') ? 'underline' : ''}`}
          >
            {isStorePage ? 'Artivism' : 'Artivism'}
          </Link>
          <Link 
            to="/gallery" 
            className={`font-bold no-underline hover:underline text-[0.95rem] ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            } ${isActive('/gallery') ? 'underline' : ''}`}
          >
            {isStorePage ? 'Pieces' : 'Pieces'}
          </Link>
          <button 
            className={`font-bold no-underline hover:underline text-[0.95rem] bg-transparent border-none cursor-pointer ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            }`}
          >
            {isStorePage ? 'Exhibition' : 'Exhibition'}
          </button>
          <Link 
            to="/store" 
            className={`font-bold no-underline hover:underline text-[0.95rem] ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            } ${isActive('/store') ? 'underline' : ''}`}
          >
            {isStorePage ? 'Weapons' : 'Weapons'}
          </Link>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-white">
          {/* Header del menú móvil */}
          <div className="flex items-center justify-between p-6">
            <Link to="/" className="font-bold text-2xl text-black" onClick={closeMobileMenu}>
              [ARTIVISM]
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="text-3xl font-bold text-black hover:text-gray-600"
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>
          
          {/* Navegación del menú móvil */}
          <div className="flex flex-col p-6 space-y-2">
            <Link 
              to="/" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              } ${isActive('/') ? 'underline' : ''}`}
              onClick={closeMobileMenu}
            >
              {isStorePage ? 'Artivism' : 'Artivism'}
            </Link>
            <Link 
              to="/gallery" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              } ${isActive('/gallery') ? 'underline' : ''}`}
              onClick={closeMobileMenu}
            >
              {isStorePage ? 'Pieces' : 'Pieces'}
            </Link>
            <button 
              className={`text-3xl font-bold no-underline hover:underline bg-transparent border-none cursor-pointer text-left ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
            >
              {isStorePage ? 'Exhibition' : 'Exhibition'}
            </button>
            <Link 
              to="/store" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              } ${isActive('/store') ? 'underline' : ''}`}
              onClick={closeMobileMenu}
            >
              {isStorePage ? 'Weapons' : 'Weapons'}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
