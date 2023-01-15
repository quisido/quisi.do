import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import {
  BatchSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import OPEN_TELEMETRY_EXPORTER from './open-telemetry-exporter';
import OPEN_TELEMETRY_INSTRUMENTATION from './open-telemetry-instrumentation';

const OPEN_TELEMETRY_PROVIDER: WebTracerProvider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'charlesstover.com',
  }),
});

OPEN_TELEMETRY_PROVIDER.addSpanProcessor(
  new BatchSpanProcessor(OPEN_TELEMETRY_EXPORTER),
);

OPEN_TELEMETRY_PROVIDER.register({
  contextManager: new ZoneContextManager(),
});

for (const instrumentation of OPEN_TELEMETRY_INSTRUMENTATION) {
  instrumentation.setTracerProvider(OPEN_TELEMETRY_PROVIDER);
}

export default OPEN_TELEMETRY_PROVIDER;
