import { mapMetricDimensionsToDataPoint } from '@quisido/worker';
import AuthnFetchHandler from '../authn-fetch-handler.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import TestAnalyticsEngineDataset from './test-analytics-engine-dataset.js';
import TestExportedHandler from './test-exported-handler.js';
import TestKVNamespace from './test-kv-namespace.js';

interface Options {
  readonly authnUserIds?: Readonly<Partial<Record<string, string>>>;
  readonly env?: Readonly<Record<string, unknown>> | undefined;
  readonly now?: (() => number) | undefined;
}

const JSON_SPACE = 2;
const NONE = 0;

export default class TestAuthnExportedHandler extends TestExportedHandler {
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

  expectPrivateMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    if (Object.keys(dimensions).length === NONE) {
      this.expectConsoleLog('Private metric:', name);
    } else {
      this.expectConsoleLog(
        'Private metric:',
        name,
        JSON.stringify(dimensions, null, JSON_SPACE),
      );
    }

    this.expectAnalyticsEngineDatasetToWriteDataPoint('PRIVATE_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  expectPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    if (Object.keys(dimensions).length === NONE) {
      this.expectConsoleLog('Public metric:', name);
    } else {
      this.expectConsoleLog(
        'Public metric:',
        name,
        JSON.stringify(dimensions, null, JSON_SPACE),
      );
    }

    this.expectAnalyticsEngineDatasetToWriteDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };
}
