import React from 'react';

interface FooterProps {
  copyrightText?: string;
  attributionLink?: string;
  attributionText?: string;
}

const Footer: React.FC<FooterProps> = ({
  copyrightText = `© ${new Date().getFullYear()} Todos los derechos reservados.`,
  attributionLink = "#",
  attributionText = "Diseñado con ♥"
}) => {
  return (
    <footer className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            {copyrightText}
          </p>
          
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
