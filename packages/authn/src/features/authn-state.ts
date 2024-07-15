import { State } from '@quisido/workers-shared';
import { type IncomingRequest } from 'cloudflare-utils';
import { MetricName } from '../constants/metric-name.js';
import type { AuthnMetric } from '../types/authn-metric.js';
import createReturnHref from './create-return-href.js';

export default class AuthnState extends State<AuthnMetric> {
  #returnHref: string | null = null;

  public constructor(
    console: Console,
    fetch: Fetcher['fetch'],
    request: IncomingRequest,
    env: Record<string, unknown>,
    ctx: ExecutionContext,
  ) {
    super(console, fetch, request, env, ctx, {
      invalidPrivateDatasetMetricName: MetricName.InvalidPrivateDataset,
      invalidPublicDatasetMetricName: MetricName.InvalidPublicDataset,
      invalidTraceParentMetricName: MetricName.InvalidTraceParent,
      invalidUsageDatasetMetricName: MetricName.InvalidUsageDataset,
      missingPrivateDatasetMetricName: MetricName.MissingPrivateDataset,
      missingPublicDatasetMetricName: MetricName.MissingPublicDataset,
      missingTraceParentMetricName: MetricName.MissingTraceParent,
      missingUsageDatasetMetricName: MetricName.MissingUsageDataset,
    });
  }

  public get returnHref(): string | null {
    return this.#returnHref;
  }

  public setReturnHref(): void {
    this.#returnHref = createReturnHref();
  }
}
