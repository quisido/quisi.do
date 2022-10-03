/* eslint-disable prefer-rest-params */
import filterByUndefined from '../../../utils/filter-by-undefined';
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function gtag(..._args: readonly unknown[]): void {
  if (filterByUndefined(GOOGLE_ANALYTICS_WINDOW.dataLayer)) {
    GOOGLE_ANALYTICS_WINDOW.dataLayer = [arguments];
  } else {
    GOOGLE_ANALYTICS_WINDOW.dataLayer.push(arguments);
  }
}
