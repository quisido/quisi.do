interface Options {
  readonly headers: Readonly<Record<string, string>>;
  readonly pathname: string;
  readonly search: Record<string, string>;
}

const TEST_SESSION_ID = '0123456789abcdef';

export default function createFetchRequest({
  headers,
  pathname,
  search: searchInit,
}: Options): Request {
  const search: string = new URLSearchParams({
    ...searchInit,
    state: JSON.stringify({
      returnPath: '/',
      sessionId: TEST_SESSION_ID,
    }),
  }).toString();

  return new Request(`https://localhost${pathname}?${search}`, {
    headers: new Headers({
      ...headers,
      Cookie: `__Secure-Session-ID=${TEST_SESSION_ID}`,
    }),
  });
}
