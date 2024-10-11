import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { isD1Database } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getDatabase(this: Worker): D1Database {
  const db: unknown = this.getEnv('AUTHN_DB');
  if (isD1Database(db)) {
    return db;
  }

  if (typeof db === 'undefined') {
    this.emitPublicMetric({ name: MetricName.MissingDatabase });
    throw new FatalError(ErrorCode.MissingDatabase);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidDatabase,
    value: JSON.stringify(db),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidDatabase,
    type: typeof db,
  });

  throw new FatalError(ErrorCode.InvalidDatabase);
}
