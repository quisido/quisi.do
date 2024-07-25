import type { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import ResponseInitImpl from '../utils/response-init.js';
import getHost from './get-host.js';

export default class ErrorResponseInit extends ResponseInitImpl {
  public constructor(code: ErrorCode, returnPath = '/') {
    const host: string = getHost();
    const location = `https://${host}${returnPath}#authn:error=${code.toString()}`;

    super({
      status: StatusCode.SeeOther,

      headers: new Headers({
        'access-control-allow-methods': 'GET',
        allow: 'GET',
        'content-location': location,
        location,
      }),
    });
  }
}
