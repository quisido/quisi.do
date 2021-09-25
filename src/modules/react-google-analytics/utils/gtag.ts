/* eslint-disable prefer-rest-params */
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';

export default function gtag(): void {
  if (typeof GOOGLE_ANALYTICS_WINDOW.dataLayer === 'undefined') {
    GOOGLE_ANALYTICS_WINDOW.dataLayer = [arguments];
  } else {
    GOOGLE_ANALYTICS_WINDOW.dataLayer.push(arguments);
  }
}
