import { ErrorCode } from '@quisido/authn-shared';
import { isD1Database } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default function getDatabase(this: AuthnFetchHandler): D1Database {
  const db: unknown = this.getEnv('AUTHN_DB');
  if (isD1Database(db)) {
    return db;
  }

  if (typeof db === 'undefined') {
    this.emitPublicMetric(MetricName.MissingDatabase);
    throw new FatalError(ErrorCode.MissingDatabase);
  }

  this.emitPrivateMetric(MetricName.InvalidDatabase, {
    value: JSON.stringify(db),
  });

  this.emitPublicMetric(MetricName.InvalidDatabase, {
    type: typeof db,
  });

  throw new FatalError(ErrorCode.InvalidDatabase);
}
