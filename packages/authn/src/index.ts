/// <reference types="@cloudflare/workers-types" />
import { ExportedHandler, Handler } from '@quisido/worker';
import AuthnFetchHandler from './features/authn-fetch-handler.js';

const JSON_SPACE = 2;

export default new ExportedHandler({
  FetchHandler: AuthnFetchHandler,
  console,
  fetch,

  onError(this: Handler, err: Error): void {
    this.console.error(err.message, err.cause, err.stack);
  },

  onLog(this: Handler, message: string): void {
    this.console.log(message);
  },

  onMetric(
    this: Handler,
    name: string,
    dimensions: Record<string, number | string>,
  ): void {
    this.console.log(name, JSON.stringify(dimensions, null, JSON_SPACE));
    this.writeMetricDataPoint('PUBLIC_DATASET', name, dimensions);
  },
});
