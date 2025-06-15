import React from 'react';

interface ContactProps {
  email: string;
  phone?: string;
  socialLinks?: {
    name: string;
    url: string;
  }[];
}

const Contact: React.FC<ContactProps> = ({ email, phone, socialLinks = [] }) => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Contáctame</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Estoy disponible para nuevos proyectos y colaboraciones. Escríbeme y conversemos sobre cómo puedo ayudarte.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <a 
              href={`mailto:${email}`} 
              className="text-xl font-medium text-secondary hover:underline"
            >
              {email}
            </a>
          </div>
          
          {phone && (
            <div className="mb-8 text-center">
              <h4 className="text-lg font-bold mb-2">Llámame</h4>
              <a 
                href={`tel:${phone.replace(/\D/g, '')}`} 
                className="text-lg text-gray-700 hover:text-secondary"
              >
                {phone}
              </a>
            </div>
          )}
          
          {socialLinks.length > 0 && (
            <div className="text-center">
              <h4 className="text-lg font-bold mb-4">Redes Sociales</h4>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="text-gray-600 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
