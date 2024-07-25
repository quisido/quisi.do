import { ErrorCode } from '@quisido/authn-shared';
import { isD1Database } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getDatabase(): D1Database {
  const db: unknown = getEnv('AUTHN_DB');
  if (isD1Database(db)) {
    return db;
  }

  if (typeof db === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingDatabase });
    throw new FatalError(ErrorCode.MissingDatabase);
  }

  emitPrivateMetric({
    name: MetricName.InvalidDatabase,
    value: JSON.stringify(db),
  });

  emitPublicMetric({
    name: MetricName.InvalidDatabase,
    type: typeof db,
  });

  throw new FatalError(ErrorCode.InvalidDatabase);
}
