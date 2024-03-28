'use client';

import useGoogleAnalytics from '../modules/react-google-analytics/index.js';
import validateString from '../utils/validate-string.js';

const TRACKING_ID: string = validateString(
  process.env['GOOGLE_ANALYTICS_TRACKING_ID'],
);

export default function GoogleAnalytics(): null {
  useGoogleAnalytics({
    trackingId: TRACKING_ID,
    userData: undefined,
  });

  return null;
}
