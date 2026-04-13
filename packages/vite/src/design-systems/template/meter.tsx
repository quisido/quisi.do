import type { ReactElement } from 'react';
import type { MeterProps } from '../core/meter-props.js';
import useMeter from '../core/use-meter.js';

const DEFAULT_MAX = 100;

/**
 *   Meter represents a scalar measurement within a known range, or a fractional
 * value.
 *   Set `min` and `max` to indicate the minimum and maximum values for the
 * meter.
 *   DO NOT use a meter to indicate progress; progress bars exist to address
 * that need.
 * @see {@link https://w3c.github.io/aria/#meter | WAI-ARIA `meter` role}
 */
export default function Meter({
  high,
  labelledBy,
  low,
  max = DEFAULT_MAX,
  min = 0,
  optimum,
  value,
}: MeterProps): ReactElement {
  useMeter({ high, low, max, min, optimum, value });

  return (
    <meter
      aria-labelledby={labelledBy}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      high={high}
      low={low}
      max={max}
      min={min}
      optimum={optimum}
      value={value}
    />
  );
}
