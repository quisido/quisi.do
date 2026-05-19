import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

export default class XMLHttpRequestInstrumentationImpl extends XMLHttpRequestInstrumentation {
  public constructor() {
    super({
      propagateTraceHeaderCorsUrls: ['https://api.honeycomb.io:443'],
    });
  }
}
