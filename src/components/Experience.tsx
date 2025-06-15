import React from 'react';

interface ExperienceItem {
  title: string;
  role: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  workItems: ExperienceItem[];
  educationItems: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ workItems, educationItems }) => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container max-w-5xl mx-auto px-4 items-center">
        {/* <h2 className="text-3xl font-bold mb-12 text-center">Experiencia y Educación</h2> */}

        <div className="mb-12">
            <h2 className="text-3xl font-bold mb-12">Experiencia y Educación</h2>
            <div className="w-16 h-1 bg-secondary"></div>
          </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Experiencia laboral */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Experiencia Laboral</h3>
            
            <div className="space-y-10">
              {workItems.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-secondary"></div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <h5 className="text-lg font-medium text-gray-600 mb-2">{item.role}</h5>
                  <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Educación */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Educación</h3>
            
            <div className="space-y-10">
              {educationItems.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-secondary"></div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <h5 className="text-lg font-medium text-gray-600 mb-2">{item.role}</h5>
                  <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                  <p className="text-gray-700">{item.description}</p>
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
