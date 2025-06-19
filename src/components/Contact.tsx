import React from 'react';
import { 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaEnvelope, 
  FaPhone 
} from 'react-icons/fa';

interface ContactProps {
  email: string;
  phone?: string;
  socialLinks?: {
    name: string;
    url: string;
  }[];
}

const Contact: React.FC<ContactProps> = ({ email, phone, socialLinks = [] }) => {
  // Función para obtener el icono y color correspondiente según el nombre de la red social
  const getSocialIcon = (name: string) => {
    const iconSize = 24;
    
    switch(name.toLowerCase()) {
      case 'linkedin':
        return {
          icon: <FaLinkedinIn size={iconSize} />,
          color: '#0A66C2'
        };
      case 'github':
        return {
          icon: <FaGithub size={iconSize} />,
          color: '#24292F'
        };
      case 'instagram':
        return {
          icon: <FaInstagram size={iconSize} />,
          color: '#E4405F'
        };
      case 'twitter':
        return {
          icon: <FaTwitter size={iconSize} />,
          color: '#1DA1F2'
        };
      case 'facebook':
        return {
          icon: <FaFacebookF size={iconSize} />,
          color: '#1877F2'
        };
      default:
        return {
          icon: null,
          color: '#6B7280'
        };
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Contáctame</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Estoy disponible para nuevos proyectos y colaboraciones. Escríbeme y conversemos sobre cómo puedo ayudarte.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-2">
              <FaEnvelope className="text-blue-600 mr-2" size={20} />
            </div>
            <a 
              href={`mailto:${email}`} 
              className="text-xl font-medium text-secondary hover:underline"
            >
              {email}
            </a>
          </div>
          
          {phone && (
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center mb-2">
                <FaPhone className="text-green-600 mr-2" size={18} />
              </div>
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
                {socialLinks.map((link, index) => {
                  const { icon, color } = getSocialIcon(link.name);
                  
                  return (
                    <a 
                      key={index}
                      href={link.url}
                      className="transition-all duration-300 p-3 rounded-full hover:bg-gray-100"
                      style={{ 
                        color: color,
                        boxShadow: `0 2px 8px rgba(0,0,0,0.1)`
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
