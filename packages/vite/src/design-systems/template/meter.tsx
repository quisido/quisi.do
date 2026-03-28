import type { ReactElement } from 'react';
import type { MeterProps } from '../shared/meter-props.js';

/**
 * A scalar measurement within a known range, or a fractional value.
 */
export default function Meter({
  label,
  labelledBy,
  value,
}: MeterProps): ReactElement {
  return (
    <meter
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-valuenow={value}
      value={value}
    />
  );
}
