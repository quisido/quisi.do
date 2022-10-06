import type CoverageWindow from '../types/coverage-window';

export default function filterByCoverageWindow(
  window: Readonly<Window>,
): window is CoverageWindow {
  return Object.prototype.hasOwnProperty.call(window, '__coverage__');
}
