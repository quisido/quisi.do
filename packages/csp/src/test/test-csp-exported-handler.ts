import { mapMetricDimensionsToDataPoint } from '@quisido/worker';
import { TestExportedHandler, type TestResponse } from '@quisido/worker-test';
import { TestAnalyticsEngineDataset } from 'cloudflare-test-utils';
import CspFetchHandler from '../csp-fetch-handler.js';
import handleError from '../handle-error.js';
import handleLog from '../handle-log.js';
import handleMetric from '../handle-metric.js';
import CspTestResponse from './csp-test-response.js';

interface Options {
  readonly env?: Readonly<Record<string, unknown>> | undefined;
  readonly now?: (() => number) | undefined;
}

export default class TestCspExportedHandler extends TestExportedHandler {
  public override mockResponse = super.mockResponse.bind(this);

  public override expectNotToHaveWrittenDataPoint =
    super.expectNotToHaveWrittenDataPoint.bind(this);

  public override expectToHaveWrittenDataPoint =
    super.expectToHaveWrittenDataPoint.bind(this);

  public constructor({ env = {}, now }: Options = {}) {
    super({
      env: {
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(),
        ...env,
      },
      FetchHandler: CspFetchHandler,
      now,
      onError: handleError,
      onLog: handleLog,
      onMetric: handleMetric,
    });
  }

  public expectNotToHaveEmitPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectNotToHaveWrittenDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHaveEmitPrivateMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectToHaveWrittenDataPoint('PRIVATE_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public expectToHaveEmitPublicMetric = (
    name: string,
    dimensions: Record<string, boolean | number | string> = {},
  ): void => {
    this.expectToHaveWrittenDataPoint('PUBLIC_DATASET', {
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };

  public override fetch = async (
    input: string,
    init?: RequestInit<IncomingRequestCfProperties>,
  ): Promise<CspTestResponse> => {
    const testResponse: TestResponse = await super.fetch(input, init);
    return new CspTestResponse(testResponse);
  };
}
