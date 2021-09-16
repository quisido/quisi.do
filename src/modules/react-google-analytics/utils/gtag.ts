import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';

export default function gtag(...args: readonly unknown[]): void {
  if (typeof GOOGLE_ANALYTICS_WINDOW.dataLayer === 'undefined') {
    GOOGLE_ANALYTICS_WINDOW.dataLayer = [args];
  } else {
    GOOGLE_ANALYTICS_WINDOW.dataLayer.push(args);
  }
}
