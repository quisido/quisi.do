import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";

export default class FetchInstrumentationImpl extends FetchInstrumentation {
  public constructor() {
    super({
      propagateTraceHeaderCorsUrls: ['https://api.honeycomb.io:443'],
    });
  }
}
