import { mapMetricDimensionsToDataPoint } from '@quisido/worker';
import {
  TestAnalyticsEngineDataset,
  TestKVNamespace,
} from 'cloudflare-test-utils';
import AuthnFetchHandler from '../authn-fetch-handler.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import TestExportedHandler from './test-exported-handler.js';

interface Options {
  readonly authnUserIds?: Readonly<Partial<Record<string, string>>>;
  readonly env?: Readonly<Record<string, unknown>> | undefined;
  readonly now?: (() => number) | undefined;
}

export default class TestAuthnExportedHandler extends TestExportedHandler {
  public override expectAnalyticsEngineDatasetToWriteDataPoint =
    super.expectAnalyticsEngineDatasetToWriteDataPoint.bind(this);
  public override expectMetric = super.expectMetric.bind(this);
  public override fetch = super.fetch.bind(this);
  public override mockResponse = super.mockResponse.bind(this);

  public constructor({ authnUserIds = {}, env = {}, now }: Options = {}) {
    super({
      FetchHandler: AuthnFetchHandler,
      now,
      onError: handleError,
      onLog: handleLog,
      onMetric: handleMetric,

      env: {
        AUTHN_USER_IDS: new TestKVNamespace(authnUserIds),
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
        ...env,
      },
    });
  }

  public expectPrivateMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectAnalyticsEngineDatasetToWriteDataPoint('PRIVATE_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectAnalyticsEngineDatasetToWriteDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };
}
