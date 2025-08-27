import React from 'react';

import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isStorePage = location.pathname === '/store';
  const isHomePage = location.pathname === '/';

  return (
    <footer className={`${isStorePage ? 'fixed' : 'md:fixed'} inset-x-0 bottom-0 z-[1000] h-14 text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider font-normal ${
      isStorePage ? 'bg-white text-gray-500' : 'bg-white text-gray-500'
    }`} style={{ fontFamily: 'Moma Sans, sans-serif' }}>
      <div 
        className="w-full h-full flex items-center justify-center gap-6 whitespace-nowrap overflow-x-auto overflow-y-hidden px-4 pb-[env(safe-area-inset-bottom)]"
        style={{
          paddingLeft: 'max(16px,env(safe-area-inset-left))',
          paddingRight: 'max(16px,env(safe-area-inset-right))'
        }}
      >
        <a 
          className={`no-underline ${isStorePage ? 'text-gray-500 hover:text-gray-700' : isHomePage ? 'text-gray-500/20 hover:text-gray-500/40' : 'text-gray-500 hover:text-gray-700'}`}
          href="https://capitalismtheweb.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          PRIVACY
        </a>
        <a 
          className={`no-underline ${isStorePage ? 'text-gray-500 hover:text-gray-700' : isHomePage ? 'text-gray-500/20 hover:text-gray-500/40' : 'text-gray-500 hover:text-gray-700'}`}
          href="https://capitalismtheweb.com/legal-notice"
          target="_blank"
          rel="noopener noreferrer"
        >
          LEGAL
        </a>
        <a 
          className={`no-underline ${isStorePage ? 'text-gray-500 hover:text-gray-700' : isHomePage ? 'text-gray-500/20 hover:text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
          href="https://capitalismtheweb.com/cookies-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          COOKIES
        </a>

        <a 
          className={`hidden md:block no-underline ${isStorePage ? 'text-gray-500 hover:text-gray-700' : isHomePage ? 'text-gray-500/20 hover:text-gray-500/40' : 'text-gray-500 hover:text-gray-700'}`}
          href="https://capitalismtheweb.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          CAPITALISM©2025
        </a>
      </div>
    </footer>
  );
};

export default Footer;
