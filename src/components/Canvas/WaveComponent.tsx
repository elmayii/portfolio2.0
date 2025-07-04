import { type FC } from 'react';

import { useCanvasContext } from '../../hooks/useCanvas';
import useResponsiveSize from '../../hooks/useResponsiveSize';
import WaveObj from './wave';

const WaveComponent: FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 600;
  let frequency = 0.013;
  const waves = {
    frontWave: new WaveObj([0.0211, 0.028, 0.015], 'rgb(10, 40, 90, 0.1)'),
    backWave: new WaveObj([0.0122, 0.018, 0.005], 'rgba(10, 40, 90, 0.4)'),
  };

  const render = () => {
    context?.clearRect(0, 0, width, height);
    Object.entries(waves).forEach(([, wave]) => {
      wave.draw(context!, width, height, frequency);
    });
    frequency += 0.013;
    requestAnimationFrame(render);
  };
  if (context) render();
  return null;
};

export default WaveComponent;
