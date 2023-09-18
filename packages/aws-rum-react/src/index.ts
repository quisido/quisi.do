export type {
  AwsRum,
  AwsRumConfig,
  ClientBuilder,
  PageIdFormat,
  PartialCookieAttributes,
  Plugin,
  Telemetry
} from 'aws-rum-web';
export { default as AwsRumProvider } from './components/aws-rum-provider/index.js';
export { default as MockAwsRumProvider } from './components/mock-aws-rum-provider/index.js';
export { default as withAwsRum } from './hocs/with-aws-rum.js';
export { default as withRecordError } from './hocs/with-record-error.js';
export { default as useAwsRum } from './hooks/use-aws-rum.js';
export { default as useRecordError } from './hooks/use-record-error.js';
export { default as useRecordEvent } from './hooks/use-record-event.js';
export { default as useRecordPageView } from './hooks/use-record-page-view.js';

