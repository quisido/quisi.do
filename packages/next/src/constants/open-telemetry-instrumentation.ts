import { type InstrumentationBase } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

/*
The `Omit` here is to consolidate the differences between instrumentation that
  extends `@opentelemetry/instrumentation` v0.34 and those that extend v0.35.
*/
const OPEN_TELEMETRY_INSTRUMENTATION: readonly Omit<
  InstrumentationBase<unknown>,
  '_updateMetricInstruments'
>[] = [
  new DocumentLoadInstrumentation(),
  new FetchInstrumentation({
    propagateTraceHeaderCorsUrls: ['https://api.honeycomb.io:443'],
  }),
  new UserInteractionInstrumentation(),
  new XMLHttpRequestInstrumentation({
    propagateTraceHeaderCorsUrls: ['https://api.honeycomb.io:443'],
  }),
];

export default OPEN_TELEMETRY_INSTRUMENTATION;
