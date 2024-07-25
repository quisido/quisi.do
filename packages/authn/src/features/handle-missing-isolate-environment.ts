import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';

export default function handleMissingIsolateEnvironment(): Response {
  const location = `https://quisi.do/#authn:error=${ErrorCode.MissingIsolateEnvironment.toString()}`;

  return new Response(null, {
    status: StatusCode.SeeOther,

    headers: new Headers({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': location,
      location,
    }),
  });
}
