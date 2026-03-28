import type { ReactElement } from 'react';
import type { ProgressBarProps } from '../shared/progress-bar-props.js';

const DEFAULT_MAX = 100;

/**
 *   A `ProgressBar` component displays the progress status for tasks that take
 * a long time. It communicates that a request has been received and work is
 * advancing toward completion.
 */
export default function ProgressBar({
  label,
  max = DEFAULT_MAX,
  value = 0,
}: ProgressBarProps): ReactElement {
  return (
    <label>
      {label}
      <progress max={max} value={value} />
    </label>
  );
}
