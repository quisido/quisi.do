import { ErrorCode } from '@quisido/authn-shared';
import { DEFAULT_RETURN_HREF } from '../constants/default-return-href.js';
import StatusCode from '../constants/status-code.js';

export default function handleInvalidIsolateEnvironment(): Response {
  const location = `${DEFAULT_RETURN_HREF}#authn:error=${ErrorCode.InvalidIsolateEnvironment.toString()}`;
  return new Response(null, {
    status: StatusCode.SeeOther,

    headers: new Headers({
      'Access-Control-Allow-Methods': 'GET',
      Allow: 'GET',
      'Content-Location': location,
      Location: location,
    }),
  });
}
