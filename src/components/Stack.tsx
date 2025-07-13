import React from 'react';
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
import LazyShow from './LazyShow';
import { GrGraphQl } from 'react-icons/gr';
import { BiHeart } from 'react-icons/bi';

interface StackProps {
  title: string;
  subtitle: string;
}

// Definición de tecnologías con sus iconos y colores
const technologies = [
  { name: 'Bondad', icon: <BiHeart size={32} />, color: '#61DAFB' },
  { name: 'Generosidad', icon: <FaVuejs size={32} />, color: '#4FC08D' },
  { name: 'Responsabilidad', icon: <SiTailwindcss size={32} />, color: '#38B2AC' },
  { name: 'Educación', icon: <FaBootstrap size={32} />, color: '#7952B3' },
  { name: 'MUI', icon: <SiMui size={32} />, color: '#007FFF' },
  { name: 'HeroUI', icon: <RiCodeSSlashLine size={32} />, color: '#FF4785' },
  { name: 'Shadcn', icon: <SiShadcnui size={32} />, color: '#000000' },
  { name: 'Next.js', icon: <SiNextdotjs size={32} />, color: '#000000' },
  { name: 'Astro', icon: <SiAstro size={32} />, color: '#FF5D01' },
  { name: 'Remix', icon: <SiRemix size={32} />, color: '#000000' },
  { name: 'Python', icon: <FaPython size={32} />, color: '#3776AB' },
  { name: 'FastAPI', icon: <SiFastapi size={32} />, color: '#009688' },
  { name: 'Django', icon: <SiDjango size={32} />, color: '#092E20' },
  { name: 'Pandas', icon: <SiPandas size={32} />, color: '#150458' },
  { name: 'Pytorch', icon: <SiPytorch size={32} />, color: '#FF5D01' },
  { name: 'TensorFlow', icon: <SiTensorflow size={32} />, color: '#FF6F00' },
  { name: 'Keras', icon: <SiKeras size={32} />, color: '#D00000' },
  { name: 'Scikit-Learn', icon: <SiScikitlearn size={32} />, color: '#FFD800' },
  { name: 'Celery', icon: <SiCelery size={32} />, color: '#37814A' },
  { name: 'Java', icon: <FaJava size={32} />, color: '#007396' },
  { name: 'Spring Boot', icon: <SiSpringboot size={32} />, color: '#6DB33F' },
  { name: 'KNIME', icon: <SiKnime size={32} />, color: '#FFD800' },
  { name: 'MongoDB', icon: <SiMongodb size={32} />, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={32} />, color: '#336791' },
  { name: 'Redis', icon: <SiRedis size={32} />, color: '#DC382D' },
  { name: 'MySQL', icon: <SiMysql size={32} />, color: '#4479A1' },
  { name: 'OpenAI', icon: <SiOpenai size={32} />, color: '#412991' },
  { name: 'GraphQL', icon: <GrGraphQl size={32} />, color: '#E10098' },
  { name: 'Flutter', icon: <SiFlutter size={32} />, color: '#02569B' },
  { name: 'Puppeteer', icon: <SiPuppeteer size={32} />, color: '#40B5A4' },
  { name: 'Selenium', icon: <SiSelenium size={32} />, color: '#43B02A' },
  { name: 'Nestjs', icon: <SiNestjs size={32} />, color: '#E0234E' },
  { name: 'Shopify', icon: <SiShopify size={32} />, color: '#7AB55C' },
];

const Stack: React.FC<StackProps> = ({ title, subtitle }) => {
  return (
    <section id='stack' className="container mx-auto px-4 z-20 py-8 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-white">{title}</h2>
        <p className="text-center text-gray-200 mb-8 sm:mb-10 max-w-2xl mx-auto">{subtitle}</p>

        <LazyShow>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-4 gap-x-2 justify-items-center">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg 
                          transition-all duration-300 ease-in-out 
                          hover:scale-110 hover:shadow-lg
                          backdrop-blur-sm bg-gray-800/30 
                          border-2
                          w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] cursor-pointer"
                style={{ 
                  boxShadow: `0 4px 12px -2px ${tech.color}20`,
                  borderColor: `${tech.color}50`, // Color con 50% de opacidad
                  background: ``
                }}
              >
                <div className="mb-2" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-xs sm:text-sm text-center text-white font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </LazyShow>
      </div>
    </section>
  );
};

export default Stack;
