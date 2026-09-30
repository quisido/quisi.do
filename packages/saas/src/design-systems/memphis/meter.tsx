import { type CSSProperties, type ReactElement } from 'react';

import { type MeterProps } from '../core/meter-props.js';
import useMeter from '../core/use-meter.js';
import classes from './meter.module.scss';

const DEFAULT_MAX = 100;

/**
 * Meter represents a scalar measurement within a known range, or a fractional
 * value.
 * Set `min` and `max` to indicate the minimum and maximum values for the
 * meter.
 * DO NOT use a meter to indicate progress; progress bars exist to address
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

  const percentage = ((value - min) / (max - min)) * 100;
  const meterStyle = {
    '--meter-value': `${percentage}%`,
  } as CSSProperties;

  return (
    <span className={classes['root']} style={meterStyle}>
      <span aria-hidden className={classes['triangle']} />
      <span aria-hidden className={classes['bolt']} />
      <span aria-hidden className={classes['squiggle']} />
      <span className={classes['panel']}>
        <span aria-hidden className={classes['ticks']} />
        <span aria-hidden className={classes['low']}>
          LOW
        </span>
        <span className={classes['chamber']}>
          <span aria-hidden className={classes['fill']} />
          <meter
            aria-labelledby={labelledBy}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            className={classes['meter']}
            high={high}
            low={low}
            max={max}
            min={min}
            optimum={optimum}
            value={value}
          />
        </span>
        <span aria-hidden className={classes['high']}>
          HIGH
        </span>
        <span aria-hidden className={classes['dots']} />
      </span>
      <span aria-hidden className={classes['value']}>
        {value}
      </span>
      <span aria-hidden className={classes['confetti']} />
    </span>
  );
}
