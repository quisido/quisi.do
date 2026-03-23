import type { ReactElement } from 'react';

interface BaseMeterProps {
  readonly value: number;
}

export interface LabelMeterProps extends BaseMeterProps {
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByMeterProps extends BaseMeterProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type MeterProps = LabelMeterProps | LabelledByMeterProps;

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
