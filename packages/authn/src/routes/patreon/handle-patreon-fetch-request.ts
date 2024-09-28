import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import getPatreonIdentity from './get-patreon-identity.js';
import handlePatreonIdentity from './handle-patreon-identity.js';

interface Options {
  readonly returnPath: string;
}

export default async function handlePatreonFetchRequest(this: Worker,{
  returnPath,
}: Options): Promise<Response> {
  this.emitPublicMetric({ name: MetricName.PatreonRequest });

  return await this.snapshot(
    getPatreonIdentity.call(this),
    handlePatreonIdentity,
    returnPath,
  );
}
