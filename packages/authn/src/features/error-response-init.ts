import DEFAULT_RETURN_HREF from '../constants/default-return-href.js';
import type ErrorCode from '../constants/error-code.js';
import StatusCode from '../constants/status-code.js';
import getReturnHref from '../utils/get-return-href.js';
import ResponseInitImpl from '../utils/response-init.js';

export default class ErrorResponseInit extends ResponseInitImpl {
  public constructor(code: ErrorCode) {
    const returnHref: string = getReturnHref() ?? DEFAULT_RETURN_HREF;
    const location = `${returnHref}#authn:error=${code}`;
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
