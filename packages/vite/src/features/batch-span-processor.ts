import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import OTLPTraceExporter from './otlp-trace-exporter.js';

export default class BatchSpanProcessorImpl extends BatchSpanProcessor {
  public readonly otlpTraceExporter: OTLPTraceExporter;

  public constructor(hostname: string) {
    const otlpTraceExporter: OTLPTraceExporter = new OTLPTraceExporter(
      hostname,
    );

    super(otlpTraceExporter);

    this.otlpTraceExporter = otlpTraceExporter;
  }
}
