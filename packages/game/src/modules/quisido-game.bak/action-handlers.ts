type ActionHandlersRecord<Actions extends object> = {
  [K in keyof Actions]?: Set<(payload: Actions[K]) => void>;
};

export default class ActionHandlers<Actions extends object> {
  #record: ActionHandlersRecord<Actions> = {};

  public add<K extends keyof Actions>(
    name: K,
    handler: (payload: Actions[K]) => void,
  ): void {
    const handlers: Set<(payload: Actions[K]) => void> | undefined =
      this.#record[name];
    if (typeof handlers !== 'undefined') {
      handlers.add(handler);
      return;
    }

    this.#record[name] = new Set([handler]);
  }
}
