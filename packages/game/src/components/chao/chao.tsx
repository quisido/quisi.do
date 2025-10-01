import { type Jsx, preloadImages } from '../../modules/quisido-browser-game/index.js';
import darkSrc from './dark.png';
import heroSrc from './hero.png';
import neutralSrc from './neutral.png';

interface Props {
  readonly height: number;
  readonly type: Type;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

type Type = 'dark' | 'hero' | 'neutral';

preloadImages(darkSrc, heroSrc, neutralSrc);

const mapTypeToPath = (type: Type): string => {
  switch (type) {
    case 'dark':
      return darkSrc;
    case 'hero':
      return heroSrc;
    case 'neutral':
      return neutralSrc;
  }
};

export default function Chao({
  height,
  type,
  width,
  x,
  y,
}: Props): Jsx {
  const path: string = mapTypeToPath(type);

  return (
    <draw-image
      height={height}
      source={{ height: 24, width: 22, x: 0, y: 10 }}
      src={path}
      width={width}
      x={x}
      y={y}
    />
  );
}
