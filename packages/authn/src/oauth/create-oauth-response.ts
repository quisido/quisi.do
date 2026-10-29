import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import createAuthenticationCookie from '../fetch-handler/create-authentication-cookie.js';
import createAuthenticationToken from '../jwt/create-authentication-token.js';

interface Options {
  readonly returnPath: string;
  readonly userId: number;
}

export default async function createOAuthResponse(
  this: AuthnFetchHandler,
  { returnPath, userId }: Options,
): Promise<Response> {
  const token: string = await createAuthenticationToken.call(this, userId);
  return new Response(null, {
    headers: new Headers({
      'cache-control': 'no-store',
      'content-location': `https://${this.host}${returnPath}`,
      location: `https://${this.host}${returnPath}`,
      'set-cookie': createAuthenticationCookie.call(this, token),
    }),
    status: StatusCode.SeeOther,
  });
}
