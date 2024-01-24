import ANALYTICS_HEADERS_INIT from '../constants/analytics-header-init.js';

export default function mapOriginToAnalyticsHeadersInit(
  origin: string | null,
): HeadersInit {
  if (origin === null) {
    return ANALYTICS_HEADERS_INIT;
  }

  return {
    ...ANALYTICS_HEADERS_INIT,
    'Access-Control-Allow-Origin': origin,
  };
}
