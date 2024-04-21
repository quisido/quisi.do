import type { ErrorCode } from '@quisido/authn-shared';
import DEFAULT_RETURN_HREF from '../constants/default-return-href.js';
import StatusCode from '../constants/status-code.js';
import getReturnHref from '../utils/get-return-href.js';
import ResponseInitImpl from '../utils/response-init.js';

export default class ErrorResponseInit extends ResponseInitImpl {
  public constructor(code: ErrorCode) {
    const returnHref: string = getReturnHref() ?? DEFAULT_RETURN_HREF;
    const location = `${returnHref}#authn:error=${code.toString()}`;

    super({
      status: StatusCode.SeeOther,

      headers: new Headers({
        'Access-Control-Allow-Methods': 'GET',
        Allow: 'GET',
        'Content-Location': location,
        Location: location,
      }),
    });
  }
}
