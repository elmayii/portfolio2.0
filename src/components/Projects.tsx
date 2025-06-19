import React from 'react';
import { ProjectItem } from './Project';
import LazyShow from './LazyShow';

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
}

interface ProjectsProps {
  title: string;
  subtitle: string;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ title, subtitle, projects }) => {
  return (
    <section id="works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <>
            {index % 2 === 0?
              <>
                <LazyShow key={index}>
                  <ProjectItem key={index} index={index} project={project}/>
                </LazyShow>
                <div key={index} className={`relative overflow-hidden`}></div>
              </>
              :
              <>
                <div key={index} className={`relative overflow-hidden`}></div>
                <LazyShow key={index}>
                  <ProjectItem key={index} index={index} project={project}/>
                </LazyShow>
              </>
            }
            
            
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
