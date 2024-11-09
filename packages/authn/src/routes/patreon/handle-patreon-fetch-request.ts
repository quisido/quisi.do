import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import getPatreonIdentity from './get-patreon-identity.js';
import handlePatreonIdentity from './handle-patreon-identity.js';
import type PatreonIdentity from './patreon-identity.js';

interface Options {
  readonly returnPath: string;
}

export default async function handlePatreonFetchRequest(
  this: AuthnFetchHandler,
  { returnPath }: Options,
): Promise<Response> {
  this.emitPublicMetric(MetricName.PatreonRequest);

  const identity: PatreonIdentity = await getPatreonIdentity.call(this);
  return handlePatreonIdentity.call(this, identity, returnPath);
}
