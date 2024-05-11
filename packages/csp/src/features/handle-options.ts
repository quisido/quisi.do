import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from "../constants/queries.js";
import { StatusCode } from "../constants/status-code.js";
import InvalidOriginResponse from "../utils/invalid-origin-response.js";
import MissingOriginResponse from "../utils/missing-origin-response.js";
import query from "../utils/query.js";
import Response from '../utils/response.js';

export default async function handleOptions(
  db: D1Database,
  projectId: number,
  origin: string | null,
): Promise<Response> {
  // Origin
  if (origin === null) {
    console.log('Missing origin');
    return new MissingOriginResponse();
  }

  // Query
  // TODO: Charge `userId` for 1 SELECT query.
  const [result] =
    await query(db, SELECT_ORIGINS_USER_ID_FROM_PROJECTS, projectId);

  // Not found
  if (typeof result === 'undefined') {
    console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { origins, userId } = result;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  // Allow origin
  const originsArr: readonly string[] = origins.split(' ');
  const originsSet: Set<string> = new Set(originsArr);
  if (!originsSet.has(origin)) {
    console.log('Invalid origin');
    return new InvalidOriginResponse();
  }

  console.log('Options', origin);
  return new Response(StatusCode.OK, {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Max-Age': '31536000',
  });
}
