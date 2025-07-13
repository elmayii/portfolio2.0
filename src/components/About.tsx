import React from 'react';

interface AboutProps {
  hireLink?: string;
  cvLink?: string;
}

const About: React.FC<AboutProps> = ({ 
  hireLink = "#contact", 
  cvLink = "/Mario_Perera_Senior_Software_Engineer.pdf" 
}) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título con línea debajo */}
          <div className="mb-12">
            <h2 className="text-lg font-medium uppercase tracking-widest mb-2">Lo que me pasó</h2>
            <div className="w-16 h-1 bg-secondary"></div>
          </div>
          
          {/* Contenido en dos columnas */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
              Realmente no soy la persona que viste ayer, entiendo que te asuste que te haya tratado así, he estado reflexionando y realmente nunca has hecho nada que merezca esa agresividad y ese trato tan feo.
              </p>
              
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
              El primer error que cometí fue conmigo mismo al olvidar todo el trabajo que he hecho en el control de mi persona, no quiero volver a cometer el mismo error, ayer fue contigo mañana podría ser con otro persona tan importante como tú, es un problema de mi que daba por corregido. Estoy muy arrepentido de ese retroceso en mi persona.
              </p>
            </div>
            
            <div>
              <p className="mb-6 text-gray-800 leading-relaxed text-lg">
              No quiero que pienses que podría pasar de nuevo, pero eso depende de mi, así que si ya no sientes poder confiar, entonces no seré una cadena para ti. Pase lo que pase a partir de hoy, me llevo lo positivo de poder ver dentro de mi y poder ver que está mal en mi persona, y eso, en gran parte fue gracias a ti. No lo lograron mis padres, lo lograste tú.
              </p>
              
              <p className="mb-8 text-gray-800 leading-relaxed text-lg">
              Podría pasar horas escribiendo todo la culpa y preocupación que siento, en tu lugar quiero dejarte un regalo que considero espacial, hecho y esculpido por mis propias manos, con el arte que siento, plasmar sentimientos en palabras y cultivar emociones con este código.
              </p>
            </div>
          </div>
          
          {/* <div className="grid md:grid-cols-2 gap-8 mt-10">
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
                download="Mario_Perera_CV.pdf"
                >
                Descargar CV
                </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
