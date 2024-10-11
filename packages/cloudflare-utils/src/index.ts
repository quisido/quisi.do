/// <reference types="@cloudflare/workers-types" />

export type IncomingRequest<CfHostMetadata = unknown> = Request<
  CfHostMetadata,
  IncomingRequestCfProperties<CfHostMetadata>
>;

export { default as isAnalyticsEngineDataset } from './is-analytics-engine-dataset.js';
export { default as isD1Database } from './is-d1-database.js';
export { default as isR2Bucket } from './is-r2-bucket.js';
export { StatusCode } from './status-code.js';
