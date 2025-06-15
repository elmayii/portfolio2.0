import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  name?: string;
  scrollText?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle = "Hola, soy", 
  name = "John Doe", 
  scrollText = "Desplázate para más" 
}) => {
  return (
    <section id="intro" className="relative h-screen flex items-center justify-center bg-dark text-white overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/HeroImage.jpg" 
          alt="Fondo del héroe" 
          className="w-full h-[120%] object-cover opacity-80 object-top -translate-y-[10%]"
        />
        <div className=""></div>
      </div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-medium text-secondary">{subtitle}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto">
          <span className="block mb-2">{name}</span>
          <span className="block">{title}</span>
        </h1>
        
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center animate-bounce">
          <span className="mb-2 text-sm">{scrollText}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6 text-gray-300"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/*
<section id="skills" className="py-20 bg-white relative h-screen flex items-center justify-center bg-dark overflow-hidden">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/photo-1483728642387-6c3bdd6c93e5.avif" 
          alt="Fondo del héroe" 
          className="w-full h-full object-cover opacity-100 object-top"
        />
        <div className=""></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              {skill.icon && <div className="mb-4 text-secondary">{skill.icon}</div>}
              <h4 className="text-xl font-bold mb-3">{skill.title}</h4>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
*/