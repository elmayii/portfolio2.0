import React, { useEffect, useRef } from 'react';

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
}

const CloudAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clouds = useRef<Cloud[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajustar el tamaño del canvas al tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300; // Altura para las nubes
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Inicializar nubes
    const createClouds = () => {
      const numberOfClouds = 8;
      clouds.current = [];
      
      // Tamaño estándar para todas las nubes
      const cloudWidth = 180;
      const cloudHeight = 80;
      const baseSpeed = 0.15;
      const baseOpacity = 0.8;
      
      for (let i = 0; i < numberOfClouds; i++) {
        // Distribuir las nubes por todo el ancho del canvas
        const x = (canvas.width / numberOfClouds) * i;
        // Variar ligeramente la altura para que no estén todas en línea
        const y = 50 + Math.random() * 150;
        
        clouds.current.push({
          x: x,
          y: y,
          width: cloudWidth,
          height: cloudHeight,
          // Pequeña variación en velocidad para que no se muevan todas igual
          speed: baseSpeed + (Math.random() * 0.2 - 0.1),
          opacity: baseOpacity
        });
      }
    };
    
    createClouds();
    
    // Dibujar una nube con forma mejorada
    const drawCloud = (cloud: Cloud) => {
      if (!ctx) return;
      
      ctx.save();
      
      // Usar un gradiente para dar más dimensión a la nube
      const gradient = ctx.createRadialGradient(
        cloud.x + cloud.width / 2, 
        cloud.y + cloud.height / 2, 
        0,
        cloud.x + cloud.width / 2, 
        cloud.y + cloud.height / 2, 
        cloud.width / 1.5
      );
      
      gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${cloud.opacity * 0.7})`);
      
      ctx.fillStyle = gradient;
      
      // Crear una nube con forma más realista usando curvas Bezier
      ctx.beginPath();
      
      // Punto de inicio (parte inferior izquierda)
      const startX = cloud.x + cloud.width * 0.2;
      const startY = cloud.y + cloud.height * 0.8;
      ctx.moveTo(startX, startY);
      
      // Parte inferior de la nube (línea recta)
      ctx.lineTo(cloud.x + cloud.width * 0.8, startY);
      
      // Lado derecho (curva hacia arriba)
      ctx.bezierCurveTo(
        cloud.x + cloud.width * 0.9, startY,
        cloud.x + cloud.width, cloud.y + cloud.height * 0.6,
        cloud.x + cloud.width * 0.9, cloud.y + cloud.height * 0.4
      );
      
      // Parte superior derecha
      ctx.bezierCurveTo(
        cloud.x + cloud.width * 0.9, cloud.y + cloud.height * 0.2,
        cloud.x + cloud.width * 0.8, cloud.y + cloud.height * 0.1,
        cloud.x + cloud.width * 0.7, cloud.y + cloud.height * 0.1
      );
      
      // Parte superior central
      ctx.bezierCurveTo(
        cloud.x + cloud.width * 0.6, cloud.y,
        cloud.x + cloud.width * 0.5, cloud.y,
        cloud.x + cloud.width * 0.4, cloud.y + cloud.height * 0.1
      );
      
      // Parte superior izquierda
      ctx.bezierCurveTo(
        cloud.x + cloud.width * 0.3, cloud.y + cloud.height * 0.1,
        cloud.x + cloud.width * 0.2, cloud.y + cloud.height * 0.2,
        cloud.x + cloud.width * 0.1, cloud.y + cloud.height * 0.4
      );
      
      // Cierre de la curva (lado izquierdo)
      ctx.bezierCurveTo(
        cloud.x, cloud.y + cloud.height * 0.6,
        cloud.x + cloud.width * 0.1, startY,
        startX, startY
      );
      
      ctx.closePath();
      ctx.fill();
      
      // Añadir sombra suave para dar profundidad
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 10;
      
      // Añadir un borde suave
      ctx.strokeStyle = `rgba(255, 255, 255, ${cloud.opacity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    };
    
    // Animación
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      clouds.current.forEach(cloud => {
        // Mover la nube
        cloud.x += cloud.speed;
        
        // Si la nube sale de la pantalla, reiniciarla desde el lado izquierdo
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
          // Mantener la misma altura o variarla ligeramente
          cloud.y = 50 + Math.random() * 150;
        }
        
        drawCloud(cloud);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full z-20 pointer-events-none"
      style={{ height: '300px' }}
    />
  );
};

export default CloudAnimation;
