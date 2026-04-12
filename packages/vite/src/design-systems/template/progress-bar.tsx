import type { ReactElement } from 'react';
import type { ProgressBarProps } from '../core/progress-bar-props.js';

const DEFAULT_MAX = 100;

/**
 *   A progress bar...
 * @see {@link https://w3c.github.io/aria/#progressbar | WAI-ARIA `progressbar` role}
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
