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

export default function Gauge({
  max,
  min = DEFAULT_MIN,
  thresholds = [],
  value,
}: Props): ReactElement {
  return (
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50A1 1 0 0 1 100 50Z" fill="blue" />
    </svg>
  );
}
