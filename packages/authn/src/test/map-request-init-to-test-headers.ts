export default function mapRequestInitToTestHeaders(
  init: RequestInit,
): Headers {
  const headers = new Headers(init.headers);

  if (!headers.has('cookie')) {
    headers.set(
      'cookie',
      '__Secure-Authentication-ID=test-authentication-id; __Secure-Session-ID=test-session-id',
    );
  }

  if (!headers.has('traceparent')) {
    headers.set(
      'traceparent',
      '01-00000000000000000000000000000002-0000000000000003-04',
    );
  }

  return headers;
}
