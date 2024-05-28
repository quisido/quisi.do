import { AccountNumber, Product, UsageType } from "@quisido/workers-shared";
import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from "../constants/queries.js";
import { StatusCode } from "../constants/status-code.js";
import InvalidOriginResponse from "../utils/invalid-origin-response.js";
import MissingOriginResponse from "../utils/missing-origin-response.js";
import query from "../utils/query.js";
import Response from '../utils/response.js';

interface Options {
  readonly console: Console;
  readonly db: D1Database;
  readonly origin: string | null;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

const DEFAULT_PROJECT_ID = 0;
const ONCE = 1;
const SINGLE = 1;

class OkResponse extends Response {
  public constructor(origin: string) {
    super(StatusCode.OK, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Max-Age': '31536000',
    });
  }
}

export default async function handleOptions({
  console,
  db,
  origin,
  projectId,
  usage,
}: Options): Promise<Response> {
  // Origin
  if (origin === null) {
    console.log('Missing origin');
    return new MissingOriginResponse();
  }

  // Query
  const [result] =
    await query(db, SELECT_ORIGINS_USER_ID_FROM_PROJECTS, projectId);

  // Not found
  if (typeof result === 'undefined') {
    usage.writeDataPoint({
      indexes: [AccountNumber.Quisido.toString()],

      doubles: [
        Product.ContentSecurityPolicy,
        DEFAULT_PROJECT_ID,
        UsageType.D1Read,
        ONCE,
        SINGLE,
      ],
    });

    console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { origins, userId } = result;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    usage.writeDataPoint({
      indexes: [AccountNumber.Quisido.toString()],

      doubles: [
        Product.ContentSecurityPolicy,
        DEFAULT_PROJECT_ID,
        UsageType.D1Read,
        ONCE,
        SINGLE,
      ],
    });

    console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  usage.writeDataPoint({
    indexes: [userId.toString()],

    doubles: [
      Product.ContentSecurityPolicy,
      projectId,
      UsageType.D1Read,
      ONCE,
      SINGLE,
    ],
  });

  // Allow origin
  const originsArr: readonly string[] = origins.split(' ');
  const originsSet: Set<string> = new Set<string>(originsArr);
  if (!originsSet.has(origin)) {
    console.log('Invalid origin');
    return new InvalidOriginResponse();
  }

  console.log('Options', origin);
  return new OkResponse(origin);
}
