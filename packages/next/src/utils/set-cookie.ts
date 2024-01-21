interface Options {
  readonly expiresMs?: number | undefined;
  readonly partitioned?: boolean | undefined;
  readonly path?: string | undefined;
  readonly subdomains?: boolean | undefined;
}

const DEFAULT_OPTIONS: Options = {};
const MILLISECONDS_PER_SECOND = 1000;
const SESSION = 0;

export default function setCookie(
  key: string,
  value: string,
  {
    expiresMs = SESSION,
    partitioned = false,
    path = '/',
    subdomains = false,
  }: Options = DEFAULT_OPTIONS,
): void {
  const attributes = [`__Secure-${key}=${value}`];

  if (subdomains) {
    attributes.push(`domain=${window.location.hostname}`);
  }

  if (expiresMs > SESSION) {
    const expiry: Date = new Date(Date.now() + expiresMs);
    attributes.push(`expires=${expiry.toUTCString()}`);
  }

  const maxAge: number = Math.floor(expiresMs / MILLISECONDS_PER_SECOND);
  attributes.push(`max-age=${maxAge}`);

  if (partitioned) {
    attributes.push('partitioned');
  }

  attributes.push(`path=${path}`);
  attributes.push('samesite=lax');
  attributes.push('secure');

  document.cookie = attributes.join('; ');
}
