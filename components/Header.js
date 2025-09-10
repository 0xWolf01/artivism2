'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  const isStorePage = pathname === '/weapons';
  const isGalleryPage = pathname === '/pieces';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log('Closing mobile menu');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[1000] h-14 flex items-center justify-between px-4 md:px-10 xl:px-20 ${
        isStorePage ? 'bg-white text-black' : 'bg-white text-black'
      }`} style={{ fontFamily: 'Moma Sans, sans-serif' }}>
        <Link 
          href="/" 
          className={`font-bold text-lg ${isStorePage ? 'text-black' : 'text-black'}`}
        >
          <img 
            src="/assets/img/logo_capitalism.svg" 
            alt="Capitalism Logo" 
            className="h-4 w-auto"
          />
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
            href="/" 
            className={`font-bold no-underline hover:underline text-[0.95rem] ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            }`}
            style={{ 
              textDecoration: isActive('/') ? 'underline' : 'none',
              textUnderlineOffset: '4px'
            }}
          >
            {isStorePage ? 'Artivism' : 'Artivism'}
          </Link>
                      <Link 
              href="/pieces" 
              className={`font-bold no-underline hover:underline text-[0.95rem] ${
                isGalleryPage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/pieces') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
            >
              Pieces
            </Link>
                      <Link 
              href="/weapons" 
              className={`font-bold no-underline hover:underline text-[0.95rem] ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/weapons') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
            >
              Weapons
            </Link>
          <Link 
            href="/exhibition" 
            className={`font-bold no-underline hover:underline text-[0.95rem] ${
              isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
            }`}
            style={{ 
              textDecoration: isActive('/exhibition') ? 'underline' : 'none',
              textUnderlineOffset: '4px'
            }}
          >
            {isStorePage ? 'Exhibition' : 'Exhibition'}
          </Link>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white">
          {/* Header del menú móvil */}
          <div className="flex items-center justify-between px-4 md:px-10 xl:px-20 h-14">
            <Link 
              href="/" 
              className="font-bold text-2xl text-black" 
              onClick={() => {
                console.log('Logo Capitalism clicked - navigating to /');
                closeMobileMenu();
              }}
            >
              <img 
                src="/assets/img/logo_capitalism.svg" 
                alt="Capitalism Logo" 
                className="h-4 w-auto"
              />
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
              href="/" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
              onClick={closeMobileMenu}
            >
              {isStorePage ? 'Artivism' : 'Artivism'}
            </Link>
            <Link 
              href="/pieces" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isGalleryPage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/pieces') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
              onClick={closeMobileMenu}
            >
              Pieces
            </Link>
            <Link 
              href="/weapons" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/weapons') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
              onClick={closeMobileMenu}
            >
              Weapons
            </Link>
            <Link 
              href="/exhibition" 
              className={`text-3xl font-bold no-underline hover:underline ${
                isStorePage ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-600'
              }`}
              style={{ 
                textDecoration: isActive('/exhibition') ? 'underline' : 'none',
                textUnderlineOffset: '4px'
              }}
              onClick={closeMobileMenu}
            >
              {isStorePage ? 'Exhibition' : 'Exhibition'}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
