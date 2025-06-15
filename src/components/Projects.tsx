import React, { useState } from 'react';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

interface ProjectsProps {
  title: string;
  subtitle: string;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ title, subtitle, projects }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6 transition-opacity duration-300 ${
                activeProject === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <span className="text-secondary text-sm font-medium mb-2">{project.category}</span>
                <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                
                {project.link && (
                  <a 
                    href={project.link} 
                    className="text-white hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver proyecto →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
