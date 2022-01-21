import type CoverageWindow from '../types/coverage-window';

export default function filterByCoverageWindow(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  window: Window,
): window is CoverageWindow {
  return Object.prototype.hasOwnProperty.call(window, '__coverage__');
}
