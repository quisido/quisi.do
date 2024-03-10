import type { ContextManager, TextMapPropagator } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import Resource from './resource.js';

export default class WebTracerProviderImpl extends WebTracerProvider {
  public readonly contextManager: ContextManager = new ZoneContextManager();

  /**
   * How does this differ from `W3CBaggagePropagator`?
   * https://cloud-native.slack.com/archives/CJFCJHG4Q/p1710027304998449
   */
  public readonly propagator: TextMapPropagator =
    new W3CTraceContextPropagator();

  public constructor(hostname: string) {
    super({
      resource: new Resource(hostname),
    });

    this.register({
      contextManager: this.contextManager,
      propagator: this.propagator,
    });
  }
}
