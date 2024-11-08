import { StatusCode } from 'cloudflare-utils';
import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import { getD1Database, getRequestHeaders } from '../constants/worker.js';
import InvalidOriginResponse from '../utils/invalid-origin-response.js';
import mapHeadersToOrigin from '../utils/map-headers-to-origin.js';
import MissingOriginResponse from '../utils/missing-origin-response.js';
import query from '../utils/query.js';
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
  projectId: number,
): Promise<Response> {
  // Origin
  const headers: Headers = getRequestHeaders();
  const origin: string | null = mapHeadersToOrigin(headers);
  if (origin === null) {
    // Log to Worker instance
    // Console.log('Missing origin');
    return new MissingOriginResponse();
  }

  // Query
  const db = getD1Database('CSP_DB');
  const [result] = await query(
    db,
    SELECT_ORIGINS_USER_ID_FROM_PROJECTS,
    projectId,
  );

  // Not found
  if (typeof result === 'undefined') {
    // Use({
    //   Account: AccountNumber.quisido,
    //   Count: ONCE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });

    // Log to Worker instance
    // Console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { origins, userId } = result;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    // Use({
    //   Account: AccountNumber.quisido,
    //   Count: ONCE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });

    // Log to Worker instance
    // Console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  // Use({
  //   Account: userId,
  //   Count: ONCE,
  //   Project: projectId,
  //   UsageType: UsageType.D1Read,
  // });

  // Allow origin
  const originsArr: readonly string[] = origins.split(' ');
  const originsSet: Set<string> = new Set<string>(originsArr);
  if (!originsSet.has(origin)) {
    // Log to Worker instance
    // Console.log('Invalid origin');
    return new InvalidOriginResponse();
  }

  // Log to Worker instance
  // Console.log('Options', origin);
  return new OkResponse(origin);
}
