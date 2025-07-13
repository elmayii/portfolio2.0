import React, { useState, useEffect } from 'react';

interface NavbarProps {
  items: {
    name: string;
    url: string;
  }[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-semibold ${
      scrolled ? 'bg-white shadow-md py-2' : `bg-transparent py-4 text-white`
      //${window?.innerWidth > 768 && 'text-white'}
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-dark">
          {`I'm realy sorry`}
        </a>
        
        {/* Menú móvil */}
        <button 
          className="md:hidden text-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Menú escritorio */}
        <ul className="hidden md:flex space-x-8">
          {items.map((item, index) => (
            <li key={index}>
              <a 
                href={item.url} 
                className="text-dark hover:text-secondary transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Menú móvil expandido */}
      {isOpen && (
        <div className="md:hidden bg-white text-black">
          <ul className="flex flex-col py-4">
            {items.map((item, index) => (
              <li key={index} className="py-2">
                <a 
                  href={item.url} 
                  className="block px-4 text-dark hover:text-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
