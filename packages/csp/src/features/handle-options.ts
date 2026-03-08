import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../constants/metric-name.js';
import { SELECT_ORIGINS_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import CspResponse from '../utils/csp-response.js';
import InvalidOriginResponse from '../utils/invalid-origin-response.js';
import MissingOriginResponse from '../utils/missing-origin-response.js';

const handleMissingOrigin = (
  handler: CspFetchHandler,
): MissingOriginResponse => {
  handler.emitPublicMetric(MetricName.MissingOrigin);
  return new MissingOriginResponse();
};

const handleMissingProject = (
  handler: CspFetchHandler,
  projectId: number,
): CspResponse => {
  handler.emitPublicMetric(MetricName.InvalidOptionsProjectId, {
    projectId,
  });

  return new CspResponse(
    StatusCode.NotFound,
    `Project "${projectId.toString()}" does not exist.`,
  );
};

const handleInvalidProjectRow = (
  handler: CspFetchHandler,
  firstResult: Record<string, unknown>,
): CspResponse => {
  handler.emitPrivateMetric(MetricName.InvalidDatabaseProjectsRow, {
    row: JSON.stringify(firstResult),
  });

  handler.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
    keys: Object.keys(firstResult).join(', '),
  });

  return new CspResponse(StatusCode.BadGateway);
};

const handleInvalidOrigin = (
  handler: CspFetchHandler,
  origin: string,
): InvalidOriginResponse => {
  handler.emitPublicMetric(MetricName.InvalidOrigin);
  handler.emitPrivateMetric(MetricName.InvalidOrigin, { origin });
  return new InvalidOriginResponse(origin);
};

const validateProjectOrigin = (
  handler: CspFetchHandler,
  firstResult: Record<string, unknown>,
  origin: string,
): CspResponse | InvalidOriginResponse | undefined => {
  const { origins, userId } = firstResult;
  if (typeof origins !== 'string' || typeof userId !== 'number') {
    return handleInvalidProjectRow(handler, firstResult);
  }

  if (!new Set(origins.split(' ')).has(origin)) {
    return handleInvalidOrigin(handler, origin);
  }

  return undefined;
};

export default async function handleOptions(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  if (this.origin === null) {
    return handleMissingOrigin(this);
  }

  const {
    results: [firstResult],
  } = await this.getD1Results('CSP_DB', SELECT_ORIGINS_USER_ID_FROM_PROJECTS, [
    projectId,
  ]);

  if (typeof firstResult === 'undefined') {
    return handleMissingProject(this, projectId);
  }

  const validationError: CspResponse | InvalidOriginResponse | undefined =
    validateProjectOrigin(this, firstResult, this.origin);
  if (validationError !== undefined) {
    return validationError;
  }

  return new CspResponse(StatusCode.OK, null, {
    'access-control-allow-origin': this.origin,
    'access-control-max-age': '31536000',
  });
}
