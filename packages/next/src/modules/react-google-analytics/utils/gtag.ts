/* eslint-disable prefer-rest-params */

import type GoogleAnalyticsWindow from '../types/google-analytics-window';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function gtag(..._args: readonly unknown[]): void {
  const googleAnalyticsWindow: GoogleAnalyticsWindow = window;
  if (typeof googleAnalyticsWindow.dataLayer === 'undefined') {
    googleAnalyticsWindow.dataLayer = [arguments];
  } else {
    googleAnalyticsWindow.dataLayer.push(arguments);
  }
}
