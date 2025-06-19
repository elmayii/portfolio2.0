import React, {type FC, type JSX} from 'react'
import type { Project } from './Projects'
import { 
  FaReact, FaVuejs, FaPython, FaJava, FaBootstrap, 
  FaNodeJs, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMui, SiNextdotjs, SiAstro, 
  SiRemix, SiFastapi, SiDjango, SiPandas, SiCelery,
  SiSpringboot, SiKnime, SiMongodb, SiPostgresql, 
  SiRedis, SiMysql, SiOpenai, SiHuggingface, 
  SiFlutter, SiPuppeteer, SiSelenium, SiShadcnui, SiPytorch,
  SiTensorflow, SiKeras, SiGraphql, SiNestjs, SiShopify,SiScikitlearn
} from 'react-icons/si';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { GrGraphQl } from 'react-icons/gr';

interface ProjectProps {
    project: Project;
    index: number
}

// Mapeo de tecnologías a sus iconos y colores
const techIcons: Record<string, { icon: JSX.Element, color: string }> = {
  'React': { icon: <FaReact size={16} />, color: '#61DAFB' },
  'Vue': { icon: <FaVuejs size={16} />, color: '#4FC08D' },
  'Tailwind': { icon: <SiTailwindcss size={16} />, color: '#38B2AC' },
  'Bootstrap': { icon: <FaBootstrap size={16} />, color: '#7952B3' },
  'MUI': { icon: <SiMui size={16} />, color: '#007FFF' },
  'Shadcn': { icon: <SiShadcnui size={16} />, color: '#000000' },
  'NextJS': { icon: <SiNextdotjs size={16} />, color: '#000000' },
  'Astro': { icon: <SiAstro size={16} />, color: '#FF5D01' },
  'Remix': { icon: <SiRemix size={16} />, color: '#000000' },
  'Python': { icon: <FaPython size={16} />, color: '#3776AB' },
  'FastAPI': { icon: <SiFastapi size={16} />, color: '#009688' },
  'Django': { icon: <SiDjango size={16} />, color: '#092E20' },
  'Pandas': { icon: <SiPandas size={16} />, color: '#150458' },
  'Pytorch': { icon: <SiPytorch size={16} />, color: '#FF5D01' },
  'Celery': { icon: <SiCelery size={16} />, color: '#37814A' },
  'Java': { icon: <FaJava size={16} />, color: '#007396' },
  'Spring Boot': { icon: <SiSpringboot size={16} />, color: '#6DB33F' },
  'Knime': { icon: <SiKnime size={16} />, color: '#FFD800' },
  'MongoDB': { icon: <SiMongodb size={16} />, color: '#47A248' },
  'PostgreSQL': { icon: <SiPostgresql size={16} />, color: '#336791' },
  'Redis': { icon: <SiRedis size={16} />, color: '#DC382D' },
  'MySQL': { icon: <SiMysql size={16} />, color: '#4479A1' },
  'Openai': { icon: <SiOpenai size={16} />, color: '#412991' },
  'GraphQl': { icon: <GrGraphQl size={16} />, color: '#E10098' },
  'Flutter': { icon: <SiFlutter size={16} />, color: '#02569B' },
  'Puppeteer': { icon: <SiPuppeteer size={16} />, color: '#40B5A4' },
  'Selenium': { icon: <SiSelenium size={16} />, color: '#43B02A' },
  'TensorFlow': { icon: <SiTensorflow size={16} />, color: '#FF6F00' },
  'Scikit-Learn': { icon: <SiScikitlearn size={16} />, color: '#FFD800' },
  'Keras': { icon: <SiKeras size={16} />, color: '#D00000' },
  'Nestjs': { icon: <SiNestjs size={16} />, color: '#E0234E' },
  'Shopify': { icon: <SiShopify size={16} />, color: '#7AB55C' },
  'Default': { icon: <RiCodeSSlashLine size={16} />, color: '#718096' }
};

export const ProjectItem: FC<ProjectProps> = ({project,index}) => {
  return (
    <div 
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-primary font-medium text-sm mb-1 text-white">{project.category}</span>
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                </div>
              </div>
              
              <div className="p-6 py-2 bg-white">
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                {/* Chips de tecnologías */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, idx) => {
                      const tech = techIcons[tag] || techIcons['Default'];
                      return (
                        <div 
                          key={idx} 
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: `${tech.color}10`,
                            color: tech.color,
                            border: `1px solid ${tech.color}`
                          }}
                        >
                          <span className="flex items-center">{tech.icon}</span>
                          <span>{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {project.link && (
                  <a 
                    href={project.link} 
                    className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver proyecto
                  </a>
                )}
              </div>
            </div>
  )
}