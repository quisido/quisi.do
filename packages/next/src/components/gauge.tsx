import type { ReactElement } from 'react';
import QuisiGauge from '../modules/quisi/gauge.jsx';
import validateString from '../utils/validate-string.js';
import styles from './gauge.module.scss';

interface Props {
  readonly max?: number | undefined;
  readonly min?: number | undefined;
  readonly severe: number;
  readonly value: number;
  readonly warning: number;
}

const GAUGE_CLASS_NAME: string = validateString(styles['gauge']);
const GAUGE_NEEDLE_CLASS_NAME: string = validateString(styles['needle']);

const NEGATIVE_ACTIVE_CLASS_NAME: string = validateString(
  styles['negativeActive'],
);

const NEGATIVE_INACTIVE_CLASS_NAME: string = validateString(
  styles['negativeInactive'],
);

const NEUTRAL_ACTIVE_CLASS_NAME: string = validateString(
  styles['neutralActive'],
);

const NEUTRAL_INACTIVE_CLASS_NAME: string = validateString(
  styles['neutralInactive'],
);

const POSITIVE_ACTIVE_CLASS_NAME: string = validateString(
  styles['positiveActive'],
);

const POSITIVE_INACTIVE_CLASS_NAME: string = validateString(
  styles['positiveInactive'],
);

export default function Gauge({
  min,
  max,
  severe,
  value,
  warning,
}: Props): ReactElement {
  return (
    <QuisiGauge
      className={GAUGE_CLASS_NAME}
      needleClassName={GAUGE_NEEDLE_CLASS_NAME}
      max={max}
      min={min}
      thresholds={[
        // Good
        {
          activeClassName: POSITIVE_ACTIVE_CLASS_NAME,
          inactiveClassName: POSITIVE_INACTIVE_CLASS_NAME,
          to: warning,
        },

        // Needs improvement
        {
          activeClassName: NEUTRAL_ACTIVE_CLASS_NAME,
          inactiveClassName: NEUTRAL_INACTIVE_CLASS_NAME,
          to: severe,
        },

        // Poor
        {
          activeClassName: NEGATIVE_ACTIVE_CLASS_NAME,
          inactiveClassName: NEGATIVE_INACTIVE_CLASS_NAME,
        },
      ]}
      value={value}
    />
  );
}
