import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';

export default class CompositePropagatorImpl extends CompositePropagator {
  public readonly w3cBaggagePropagator: W3CBaggagePropagator;
  public readonly w3cTraceContextPropagator: W3CTraceContextPropagator;

  public constructor() {
    const w3cBaggagePropagator = new W3CBaggagePropagator();
    const w3cTraceContextPropagator = new W3CTraceContextPropagator();
    super({
      propagators: [w3cBaggagePropagator, w3cTraceContextPropagator],
    });

    this.w3cBaggagePropagator = w3cBaggagePropagator;
    this.w3cTraceContextPropagator = w3cTraceContextPropagator;
  }
}
