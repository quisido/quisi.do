import { ErrorCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';

import AnalyticsResponseInit from './analytics-response-init.js';

export default class UnknownAnalyticsErrorResponse extends Response {
  public constructor(accessControlAllowOrigin: string) {
    super(
      JSON.stringify({
        error: ErrorCode.Unknown,
      }),
      new AnalyticsResponseInit(StatusCode.InternalServerError, {
        accessControlAllowOrigin,
      }),
    );
  }
}
