import mapRequestInfoToString from './map-request-info-to-string.js';

export default function mapMockedResponseToUrl([url]: readonly [
  RequestInfo,
  unknown,
  Response,
]): string {
  return mapRequestInfoToString(url);
}
