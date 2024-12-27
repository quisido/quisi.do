import { type ReactElement } from 'react';

interface Threshold {
  readonly color?: string | undefined;
  readonly from?: number | undefined;
  readonly to: number;
}

interface Props {
  readonly color?: string | undefined;
  readonly max: number;
  readonly min?: number | undefined;
  readonly thresholds?: readonly (number | Threshold)[] | undefined;
  readonly value: number;
}

const DEFAULT_MIN = 0;
const HEIGHT = 33;
const WIDTH = 100;
const HALF_WIDTH = WIDTH / 2;

export default function Gauge({
  max,
  min = DEFAULT_MIN,
  thresholds = [],
  value,
}: Props): ReactElement {
  const startX: number =
    HALF_WIDTH - Math.cos((value / max) * Math.PI) * HALF_WIDTH;
  const startY: number = Math.sin((value / max) * Math.PI) * HEIGHT;
  const endX: number =
    HALF_WIDTH + HALF_WIDTH * Math.cos((1 - value / max) * Math.PI);
  const endY: number = HEIGHT - HEIGHT * Math.sin((value / max) * Math.PI);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M 0 ${HEIGHT} A ${HALF_WIDTH} ${HEIGHT} 0 0 1 ${endX} ${endY}`}
        fill="blue"
      />
      <polygon
        points={`0,${HEIGHT} ${HALF_WIDTH},${HEIGHT} ${endX},${endY}`}
        fill="blue"
      />

      <line
        x1="0"
        y1={HEIGHT}
        x2={endX}
        y2={endY}
        stroke="blue"
        strokeWidth="0.1"
      />
    </svg>
  );
}
