interface Options {
  readonly cookies?: string | undefined;
  readonly ip?: string | undefined;
  readonly origin?: string | undefined;
}

export default function createAuthnTestHeaders({
  cookies,
  ip,
  origin,
}: Options): Headers {
  const headers = new Headers();

  if (typeof cookies === 'string') {
    headers.set('cookie', cookies);
  }

  if (typeof ip === 'string') {
    headers.set('cf-connecting-ip', ip);
  }

  if (typeof origin === 'string') {
    headers.set('origin', origin);
  }

  return headers;
}
