import { StatusCode } from 'cloudflare-utils';
import CspHeaders from './csp-headers.js';

const mapToBody = (body: unknown): string | null => {
  if (body === null) {
    return null;
  }

  if (typeof body === 'string') {
    return body;
  }

  return JSON.stringify(body);
};

export default class CspResponse extends Response {
  public constructor(
    status: StatusCode,
    body: unknown = null,
    headers: Record<string, string> | undefined = {},
  ) {
    const newBody: string | null = mapToBody(body);
    super(newBody, {
      headers: new CspHeaders(headers),
      status,
    });
  }
}
