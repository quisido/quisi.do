import AuthnFetchHandler from '../authn-fetch-handler.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import TestAnalyticsEngineDataset from './test-analytics-engine-dataset.js';
import TestExportedHandler from './test-exported-handler.js';

interface Options {
  readonly env?: Readonly<Record<string, unknown>> | undefined;
}

const JSON_SPACE = 2;
const NONE = 0;

export default class TestAuthnExportedHandler extends TestExportedHandler {
  public constructor({ env = {} }: Options = {}) {
    super({
      FetchHandler: AuthnFetchHandler,
      onError: handleError,
      onLog: handleLog,
      onMetric: handleMetric,

      env: {
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
      blobs: [],
      doubles: [],
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
      blobs: [],
      doubles: [],
      indexes: [name],
    });
  };
}
