import React from 'react';

interface AboutProps {
  hireLink?: string;
  cvLink?: string;
}

const About: React.FC<AboutProps> = ({ 
  hireLink = "#contact", 
  cvLink = "#" 
}) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título con línea debajo */}
          <div className="mb-12">
            <h2 className="text-lg font-medium uppercase tracking-widest mb-2">SOBRE MÍ</h2>
            <div className="w-16 h-1 bg-secondary"></div>
          </div>
          
          {/* Contenido en dos columnas */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
                Soy un ingeniero de software con cinco años de experiencia, especializado en el desarrollo de aplicaciones tanto en el frontend como en el backend, así como en la implementación de soluciones de inteligencia artificial. A lo largo de mi carrera, he asumido diversos roles, desde full stack developer hasta líder técnico y project manager.
              </p>
              
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
                Mi experiencia me ha brindado una visión global del desarrollo de software y una sólida capacidad para liderar equipos hacia el éxito. Me apasiona resolver problemas complejos y encontrar soluciones innovadoras que mejoren la experiencia del usuario final.
              </p>
            </div>
            
            <div>
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
                Además de mi experiencia técnica, soy un emprendedor digital apasionado, actualmente desarrollando mis propios proyectos enfocados en la inteligencia artificial, el mundo de los videojuegos y el comercio digital. Esta faceta emprendedora me ha permitido explorar nuevas tecnologías y desarrollar ideas innovadoras.
              </p>
              
              <p className="mb-8 text-gray-800 leading-relaxed text-lg">
                Me motiva el desafío constante de emprender y la posibilidad de impactar positivamente en la industria a través de mis propios proyectos. Creo firmemente en crear productos que combinen creatividad y tecnología de vanguardia para resolver problemas reales.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className='text-center'>
                <a 
                href={hireLink} 
                className="px-8 py-3 border border-gray-400 text-dark font-medium hover:bg-gray-100 transition-colors inline-block uppercase tracking-wider text-sm text-center w-1/2"
                >
                Contrátame
                </a>
            </div>
            
            <div className='text-center'>
                <a 
                href={cvLink} 
                className="px-8 py-3 border border-gray-400 text-dark font-medium hover:bg-gray-100 transition-colors inline-block uppercase tracking-wider text-sm text-center w-1/2"
                >
                Descargar CV
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
