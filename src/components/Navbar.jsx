import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const nearTop = currentScrollY < 20;

      setIsVisible(scrollingUp || nearTop);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-[90%] bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] border-b-2 border-[#ff6b35] fixed top-6 left-1/2 -translate-x-1/2 z-1000 shadow-lg shadow-[rgba(255,107,53,0.3)] rounded-2xl transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
        <div className="flex items-center gap-4">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-12 w-12"
          />
          <span className="text-2xl font-bold text-[#ff6b35] tracking-wider drop-shadow-lg">
            <span className="text-white">Developer</span> Buddy
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <a 
            href="#team-intro" 
            className="text-white font-medium text-lg py-2 px-4 rounded-lg transition-all duration-300 hover:text-[#ff6b35] hover:-translate-y-0.5 relative group"
          >
            Team Intro
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-4/5 -translate-x-1/2"></span>
          </a>
          <a 
            href="#about" 
            className="text-white font-medium text-lg py-2 px-4 rounded-lg transition-all duration-300 hover:text-[#ff6b35] hover:-translate-y-0.5 relative group"
          >
            Abot
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-4/5 -translate-x-1/2"></span>
          </a>
          <a 
            href="#makerboard" 
            className="text-white font-medium text-lg py-2 px-4 rounded-lg transition-all duration-300 hover:text-[#ff6b35] hover:-translate-y-0.5 relative group"
          >
            Makerboard
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-4/5 -translate-x-1/2"></span>
          </a>
          <Link
            to="/components"
            className="text-white font-medium text-lg py-2 px-4 rounded-lg transition-all duration-300 hover:text-[#ff6b35] hover:-translate-y-0.5 relative group"
          >
            Components
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-4/5 -translate-x-1/2"></span>
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff6b35] hover:bg-[#ff8c42] transition-all duration-300 text-white font-bold text-sm hover:scale-110"
            title="Hide navbar"
          >
            ×
          </button>
        </div>
      </div>
    </nav>
    
    {/* Show navbar button */}
    <button
      onClick={() => setIsVisible(true)}
      className={`fixed top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#ff6b35] hover:bg-[#ff8c42] transition-all duration-300 text-white font-bold text-lg hover:scale-110 z-999 ${
        isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      title="Show navbar"
    >
      ☰
    </button>
    </>
  );
};

export default Navbar;
