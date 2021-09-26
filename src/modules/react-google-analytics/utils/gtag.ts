/* eslint-disable prefer-rest-params */
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function gtag(..._args: readonly unknown[]): void {
  if (typeof GOOGLE_ANALYTICS_WINDOW.dataLayer === 'undefined') {
    GOOGLE_ANALYTICS_WINDOW.dataLayer = [arguments];
  } else {
    GOOGLE_ANALYTICS_WINDOW.dataLayer.push(arguments);
  }
}
