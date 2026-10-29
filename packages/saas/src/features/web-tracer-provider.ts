import { type ContextManager } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import BatchSpanProcessor from './batch-span-processor.js';
import CompositePropagator from './composite-propagator.js';
import Resource from './resource.js';

/*
 *Critical dependency: the request of a dependency is an expression
 *
 *const loadDocumentLoadInstrumentation = (): Promise<Instrumentation> => {
 *  return import('@opentelemetry/instrumentation-document-load')
 *    .then(({ DocumentLoadInstrumentation }): Instrumentation => {
 *      return new DocumentLoadInstrumentation();
 *    });
 *};
 *
 *const loadUserInteractionInstrumentation = (): Promise<Instrumentation> => {
 *  return import('@opentelemetry/instrumentation-user-interaction')
 *    .then(({ UserInteractionInstrumentation }): Instrumentation => {
 *      return new UserInteractionInstrumentation();
 *    });
 *};
 */

export default class WebTracerProviderImpl extends WebTracerProvider {
  public readonly batchSpanProcessor: BatchSpanProcessor;
  public readonly contextManager: ContextManager = new ZoneContextManager();
  public readonly compositePropagator: CompositePropagator =
    new CompositePropagator();

  public constructor(hostname: string, telemetrySdkLanguage: string) {
    const batchSpanProcessor = new BatchSpanProcessor(hostname);

    super({
      resource: new Resource(hostname, telemetrySdkLanguage),
      spanProcessors: [batchSpanProcessor],
    });

    this.register({
      contextManager: this.contextManager,
      propagator: this.compositePropagator,
    });

    /*
     *Critical dependency: the request of a dependency is an expression
     *
     *if (typeof window !== 'undefined') {
     *  void loadDocumentLoadInstrumentation()
     *    .then((instrumentation: Instrumentation): void => {
     *      instrumentation.setTracerProvider(this);
     *    })
     *    .catch(noop);
     *
     *  void loadUserInteractionInstrumentation()
     *    .then((instrumentation: Instrumentation): void => {
     *      instrumentation.setTracerProvider(this);
     *    })
     *    .catch(noop);
     *}
     */

    this.batchSpanProcessor = batchSpanProcessor;
  }
}
