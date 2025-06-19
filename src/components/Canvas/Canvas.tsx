import { useRef, useEffect, useState, type FC } from 'react';

import { CanvasContext } from '../../hooks/useCanvas';
import useResponsiveSize from '../../hooks/useResponsiveSize';
import WaveComponent from './WaveComponent';

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width }  = useResponsiveSize();
  const [context, setContext] = useState<
    CanvasRenderingContext2D | undefined
  >();

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext('2d');
    if (ctx) setContext(ctx);
  }, []);

  return (
    <div className='mb-[200px] mt-[200px]'>
      <CanvasContext.Provider value={{ context }}>
        <canvas id="canvas" ref={canvasRef} width={width} height={220}></canvas>
        <WaveComponent />
      </CanvasContext.Provider>
    </div>
  );
};

export default Canvas;
