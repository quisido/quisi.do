import { StatusCode } from 'cloudflare-utils';
import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import InvalidOriginResponse from '../utils/invalid-origin-response.js';
import MissingOriginResponse from '../utils/missing-origin-response.js';
import Response from '../utils/response.js';

class OkResponse extends Response {
  public constructor(origin: string) {
    super(StatusCode.OK, {
      'access-control-allow-origin': origin,
      'access-control-max-age': '31536000',
    });
  }
}

export default async function handleOptions(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  // Origin
  if (this.origin === null) {
    this.console.log('Missing origin');
    return new MissingOriginResponse();
  }

  // Query
  const {
    results: [result],
  } = await this.getD1Results('CSP_DB', SELECT_ORIGINS_USER_ID_FROM_PROJECTS, [
    projectId,
  ]);

  // Not found
  if (typeof result === 'undefined') {
    this.console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { origins, userId } = result;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    this.console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  // Allow origin
  const originsArr: readonly string[] = origins.split(' ');
  const originsSet: Set<string> = new Set<string>(originsArr);
  if (!originsSet.has(this.origin)) {
    this.console.log('Invalid origin');
    return new InvalidOriginResponse();
  }

  this.console.log('Options', this.origin);
  return new OkResponse(this.origin);
}
