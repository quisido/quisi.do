import mapOriginToAnalyticsHeadersInit from './map-origin-to-analytics-headers-init';

export default function mapOriginToAnalyticsHeaders(
  origin: string | null,
): Headers {
  const headersInit: HeadersInit = mapOriginToAnalyticsHeadersInit(origin);
  return new Headers(headersInit);
}
