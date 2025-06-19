import React from 'react';
import { MdWork, MdSchool, MdBusinessCenter, MdComputer, MdCode, MdDeveloperMode, MdOutlineSchool } from 'react-icons/md';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaUniversity } from 'react-icons/fa';

interface ExperienceItem {
  title: string;
  role: string;
  period: string;
  description: string;
  icon?: string;
}

interface ExperienceProps {
  workItems: ExperienceItem[];
  educationItems: ExperienceItem[];
}

export function splitText(text:string){
    return text.split('\n');
}

// Función para obtener el icono basado en el nombre
const getIcon = (iconName: string | undefined, defaultIcon: React.ReactNode) => {
  if (!iconName) return defaultIcon;
  
  const icons: { [key: string]: React.ReactNode } = {
    'work': <MdWork size={24} />,
    'business': <MdBusinessCenter size={24} />,
    'code': <MdCode size={24} />,
    'computer': <MdComputer size={24} />,
    'dev': <MdDeveloperMode size={24} />,
    'laptop': <FaLaptopCode size={24} />,
    'briefcase': <FaBriefcase size={24} />,
    'school': <MdSchool size={24} />,
    'education': <MdOutlineSchool size={24} />,
    'university': <FaUniversity size={24} />,
    'graduation': <FaGraduationCap size={24} />
  };
  
  return icons[iconName.toLowerCase()] || defaultIcon;
};

const Experience: React.FC<ExperienceProps> = ({ workItems, educationItems }) => {
  //console.log(splitText(workItems[0].description))
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container max-w-5xl mx-auto px-4 items-center">
        {/* <h2 className="text-3xl font-bold mb-12 text-center">Experiencia y Educación</h2> */}

        <div className="mb-12">
            <h2 className="text-lg font-medium uppercase">Experiencia y Educación</h2>
            <div className="w-16 h-1 bg-secondary"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Experiencia laboral */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaBriefcase className="mr-2 text-secondary" size={22} />
              Experiencia Laboral
            </h3>
            
            <div className="space-y-8">
              {workItems.map((item:ExperienceItem, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-8 h-8 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-secondary mr-3 mt-1">
                      {getIcon(item.icon, <MdWork size={24} />)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <h5 className="text-lg font-medium text-gray-600 mb-2">{item.role}</h5>
                      <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                      <div className='space-y-2'>
                      {splitText(item.description)?.length > 1? 
                        splitText(item.description)?.map((d, i) => (<p key={i} className="text-gray-700">{d}</p>))
                      :
                      (<p className="text-gray-700">{item.description}</p>)
                      }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Educación */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaGraduationCap className="mr-2 text-secondary" size={22} />
              Educación
            </h3>
            
            <div className="space-y-10">
              {educationItems.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-8 h-8 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-secondary mr-3 mt-1">
                      {getIcon(item.icon, <MdOutlineSchool size={24} />)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <h5 className="text-lg font-medium text-gray-600 mb-2">{item.role}</h5>
                      <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                      <div className='space-y-2'>
                      {splitText(item.description)?.length > 1? 
                        splitText(item.description)?.map((d, i) => (<p key={i} className="text-gray-700">{d}</p>))
                      :
                      (<p className="text-gray-700">{item.description}</p>)
                      }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
