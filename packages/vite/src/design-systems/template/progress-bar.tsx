import type { ReactElement } from 'react';
import type { ProgressBarProps } from '../core/progress-bar-props.js';
import useProgressBar from '../core/use-progress-bar.js';
import classes from './progress-bar.module.scss';

const DEFAULT_MAX = 100;

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
}: ProgressBarProps): ReactElement {
  const { id } = useProgressBar({ busy, describes, id: idProp });

  return (
    <label className={classes['root']}>
      <span className={classes['label']}>{label}</span>
      <progress
        aria-readonly
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className={classes['progress-bar']}
        id={id}
        max={max}
        role="progressbar"
        value={value}
      />
    </label>
  );
}
