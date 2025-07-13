import React from 'react';
import CloudAnimation from './CloudAnimation';
import Canvas from './Canvas/Canvas';
import Stack from './Stack';
import LazyShow from './LazyShow';

interface Skill {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface SkillsProps {
  title: string;
  subtitle: string;
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ title, subtitle, skills }) => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-white relative min-h-[80vh] flex items-center justify-center bg-dark overflow-hidden">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/photo-1483728642387-6c3bdd6c93e5.avif" 
          alt="Fondo del héroe" 
          className="w-full h-full object-cover opacity-100 object-top"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>

      
      {/* Animación de nubes */}
      <div className="absolute inset-0 overflow-hidden">
        <CloudAnimation />
      </div>

    <div className='flex flex-col'>
    
      <section id="skills" className="container mx-auto px-4 z-20 py-8 mt-[300px]">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-white">{title}</h2>
        <p className="text-center text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto">{subtitle}</p>
        <LazyShow>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="p-4 sm:p-6 border border-gray-200 text-white rounded-lg 
                          transition-all duration-300 ease-in-out 
                          hover:scale-105 hover:shadow-lg hover:shadow-white/30 
                          hover:border-white hover:border-opacity-90
                          backdrop-blur-sm bg-gray-800/30 
                          group"
              >
                {skill.icon && (
                  <div className="mb-3 sm:mb-4 text-secondary group-hover:text-white transition-colors duration-300">
                    {skill.icon}
                  </div>
                )}
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300">{skill.title}</h4>
                <p className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors duration-300">{skill.description}</p>
              </div>
            ))}
          </div>
        </LazyShow>
      </section>
      {/* <Stack title={'Valores'} subtitle={''}/> */}
    </div>
    </div>
  );
};

export default Skills;

/*
<div className="container mx-auto px-4 z-10 py-8 mt-[300px]">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-white">{title}</h2>
        <p className="text-center text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="p-4 sm:p-6 border border-gray-200 text-white rounded-lg 
                        transition-all duration-300 ease-in-out 
                        hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 
                        hover:border-blue-400 hover:border-opacity-70 
                        backdrop-blur-sm bg-gray-800/30 
                        group"
            >
              {skill.icon && (
                <div className="mb-3 sm:mb-4 text-secondary group-hover:text-blue-400 transition-colors duration-300">
                  {skill.icon}
                </div>
              )}
              <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300">{skill.title}</h4>
              <p className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors duration-300">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
*/
