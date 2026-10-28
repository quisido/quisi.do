import { type ReactElement } from 'react';

import round from '../utils/round.js';

interface Props {
  readonly decimals?: number | undefined;
  readonly from: number;
  readonly to: number;
}

const NONE = 0;
const PERCENT = 100;
const ZERO = 0;

export default function PercentDifference({
  decimals = NONE,
  from,
  to,
}: Props): ReactElement {
  if (from === ZERO) {
    throw new Error('Cannot calculate a percentage change from zero.');
  }

  if (to >= from) {
    const diff: number = to - from;
    const percent: number = round((diff / from) * PERCENT, decimals);
    return <>+{percent.toLocaleString()}%</>;
  }

  const diff: number = from - to;
  const percent: number = round((diff / from) * PERCENT, decimals);
  return <>-{percent.toLocaleString()}%</>;
}
