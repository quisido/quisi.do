import type { WithLabel } from './with-label.js';

interface Props {
  readonly value: number;
}

export type MeterProps = WithLabel<Props>;
