type EventHandler<A extends unknown[]> = (...args: A) => void;

export default class EventEmitter<
  Event = string,
  A extends unknown[] = never[],
> {
  readonly #eventHandlers: Map<Event, EventHandler<A>[]> = new Map<
    Event,
    EventHandler<A>[]
  >();

  public emit(event: Event, ...args: A): void {
    const eventHandlers: EventHandler<A>[] | undefined =
      this.#eventHandlers.get(event);
    if (typeof eventHandlers === 'undefined') {
      return;
    }
    for (const handle of eventHandlers) {
      handle(...args);
    }
  }

  public on(event: Event, handler: EventHandler<A>): void {
    const eventHandlers: EventHandler<A>[] | undefined =
      this.#eventHandlers.get(event);
    if (typeof eventHandlers === 'undefined') {
      this.#eventHandlers.set(event, [handler]);
    } else {
      eventHandlers.push(handler);
    }
  }
}
