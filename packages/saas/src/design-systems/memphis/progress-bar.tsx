import { type CSSProperties, type ReactElement } from 'react';

import { type ProgressBarProps } from '../core/progress-bar-props.js';
import useProgressBar from '../core/use-progress-bar.js';
import classes from './progress-bar.module.scss';

const DEFAULT_MAX = 100;
const INDETERMINATE_PERCENTAGE = 42;
const PERCENTAGE_MAX = 100;

const getPercentage = (
  value: number | undefined,
  min: number,
  max: number,
): number => {
  if (value === undefined) {
    return INDETERMINATE_PERCENTAGE;
  }
  if (max === min) {
    return PERCENTAGE_MAX;
  }
  return Math.min(
    PERCENTAGE_MAX,
    Math.max(0, ((value - min) / (max - min)) * PERCENTAGE_MAX),
  );
};

const getReadout = (
  value: number | undefined,
  valueText: string | undefined,
  percentage: number,
): string => {
  if (valueText !== undefined) {
    return valueText;
  }
  if (value === undefined) {
    return 'IN MOTION';
  }
  return `${Math.round(percentage)}%`;
};

/**
 * A progress bar displays the progress status for tasks that take a long
 * time.
 * A progress bar indicates that the user's request has been received and the
 * application is making progress toward completing the requested action.
 * Set `min` and `max` props to indicate the minimum and maximum progress indicator values.
 * If the progress bar is describing the loading progress of a particular
 * region of a page, set the `describes` prop to that region's ID. It is not
 * possible for the user to alter the value of a progressbar because it is
 * always read-only.
 * @see {@link https://w3c.github.io/aria/#progressbar | WAI-ARIA `progressbar` role}
 */
export default function ProgressBar({
  busy,
  describes,
  id: idProp,
  label,
  max = DEFAULT_MAX,
  min = 0,
  value,
  valueText,
}: ProgressBarProps): ReactElement {
  const { id } = useProgressBar({
    busy,
    describes,
    id: idProp,
    max,
    min,
    value,
  });

  const percentage = getPercentage(value, min, max);
  const rootStyle = {
    '--progress-value': `${percentage}%`,
  } as CSSProperties;

  return (
    <label
      className={classes['root']}
      data-indeterminate={value === undefined}
      style={rootStyle}
    >
      <span aria-hidden className={classes['orbit']} />
      <span aria-hidden className={classes['triangle']} />
      <span className={classes['heading']}>
        <span className={classes['label']}>{label}</span>
        <span aria-hidden className={classes['readout']}>
          {getReadout(value, valueText, percentage)}
        </span>
      </span>
      <span className={classes['machine']}>
        <span aria-hidden className={classes['track']}>
          <span className={classes['fill']} />
          <span className={classes['comet']} />
        </span>
        <progress
          aria-readonly
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
          aria-valuetext={valueText}
          className={classes['progress-bar']}
          id={id}
          max={max}
          role="progressbar"
          value={value}
        />
      </span>
      <span aria-hidden className={classes['zigzag']} />
      <span aria-hidden className={classes['dots']} />
    </label>
  );
}
