type EventHandler<A extends unknown[]> = (...args: A) => void;

export default class EventEmitter<
  Event = string,
  A extends unknown[] = never[],
> {
  private readonly _eventHandlers: Map<Event, EventHandler<A>[]> = new Map();

  public emit(event: Event, ...args: A): void {
    const eventHandlers: EventHandler<A>[] | undefined =
      this._eventHandlers.get(event);
    if (typeof eventHandlers === 'undefined') {
      return;
    }
    for (const handle of eventHandlers) {
      handle(...args);
    }
  }

  public on(event: Event, handler: EventHandler<A>): void {
    const eventHandlers: EventHandler<A>[] | undefined =
      this._eventHandlers.get(event);
    if (typeof eventHandlers === 'undefined') {
      this._eventHandlers.set(event, [handler]);
    } else {
      eventHandlers.push(handler);
    }
  }
}
