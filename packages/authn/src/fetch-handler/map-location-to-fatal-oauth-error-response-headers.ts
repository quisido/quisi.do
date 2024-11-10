export default function mapLocationToFatalOAuthErrorResponseHeaders(
  location: string,
): Headers {
  return new Headers({
    'access-control-allow-methods': 'GET',
    allow: 'GET',
    'content-location': location,
    location,
  });
}
