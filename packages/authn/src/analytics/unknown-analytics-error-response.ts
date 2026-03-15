import { ErrorCode } from '@quisido/authn-shared';
import AnalyticsResponseInit from './analytics-response-init.js';
import { StatusCode } from 'cloudflare-utils';

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
