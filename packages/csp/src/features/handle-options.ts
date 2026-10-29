import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../constants/metric-name.js';
import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import CspResponse from '../utils/csp-response.js';
import InvalidOriginResponse from '../utils/invalid-origin-response.js';
import MissingOriginResponse from '../utils/missing-origin-response.js';

export default async function handleOptions(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  // Origin
  if (this.origin === null) {
    this.emitPublicMetric(MetricName.MissingOrigin);
    return new MissingOriginResponse();
  }

  // Query
  const {
    results: [firstResult],
  } = await this.getD1Results('CSP_DB', SELECT_ORIGINS_USER_ID_FROM_PROJECTS, [
    projectId,
  ]);

  // Not found
  if (typeof firstResult === 'undefined') {
    const projectIdStr: string = projectId.toString();
    this.emitPublicMetric(MetricName.InvalidOptionsProjectId, {
      projectId,
    });

    return new CspResponse(
      StatusCode.NotFound,
      `Project "${projectIdStr}" does not exist.`,
    );
  }

  // Bad gateway
  const { origins, userId } = firstResult;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    this.emitPrivateMetric(MetricName.InvalidDatabaseProjectsRow, {
      row: JSON.stringify(firstResult),
    });

    this.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
      keys: Object.keys(firstResult).join(', '),
    });

    return new CspResponse(StatusCode.BadGateway);
  }

  // Allow origin
  const originsArr: readonly string[] = origins.split(' ');
  const originsSet: Set<string> = new Set<string>(originsArr);
  if (!originsSet.has(this.origin)) {
    this.emitPublicMetric(MetricName.InvalidOrigin);
    this.emitPrivateMetric(MetricName.InvalidOrigin, {
      origin: this.origin,
    });

    return new InvalidOriginResponse(this.origin);
  }

  return new CspResponse(StatusCode.OK, null, {
    'access-control-allow-origin': this.origin,
    'access-control-max-age': '31536000',
  });
}
