import {
  MILLISECONDS_PER_SECOND,
  MILLISECONDS_PER_YEAR,
} from '../constants/time.js';

interface Options {
  readonly expiresMs?: number | undefined;
  readonly partitioned?: boolean | undefined;
  readonly path?: string | undefined;
  readonly subdomains?: boolean | undefined;
}

const DEFAULT_OPTIONS: Options = {};
const SESSION = 0;

const mapExpiresMsToMaxAge = (expiresMs: number): number => {
  if (expiresMs === SESSION) {
    return MILLISECONDS_PER_YEAR;
  }

  return Math.floor(expiresMs / MILLISECONDS_PER_SECOND);
};

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
  const maxAge: number = mapExpiresMsToMaxAge(expiresMs);
  const attributes = [
    `__Secure-${key}=${value}`,
    `max-age=${maxAge.toString()}`,
    `path=${path}`,
    'samesite=lax',
    'secure',
  ];

  if (subdomains) {
    attributes.push(`domain=${window.location.hostname}`);
  }

  if (expiresMs > SESSION) {
    const expiry: Date = new Date(Date.now() + expiresMs);
    attributes.push(`expires=${expiry.toUTCString()}`);
  }

  if (partitioned) {
    attributes.push('partitioned');
  }

  document.cookie = attributes.join('; ');
}
