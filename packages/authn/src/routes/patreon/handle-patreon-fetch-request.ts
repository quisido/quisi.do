import { MetricName } from '../../constants/metric-name.js';
import { emitPublicMetric, snapshot } from '../../constants/worker.js';
import getPatreonIdentity from './get-patreon-identity.js';
import handlePatreonIdentity from './handle-patreon-identity.js';

interface Options {
  readonly returnPath: string;
}

export default async function handlePatreonFetchRequest({
  returnPath,
}: Options): Promise<Response> {
  emitPublicMetric({ name: MetricName.PatreonRequest });

  return await snapshot(
    getPatreonIdentity(),
    handlePatreonIdentity,
    returnPath,
  );
}
