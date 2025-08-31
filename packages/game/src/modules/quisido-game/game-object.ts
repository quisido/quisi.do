export default interface GameObject<State = never> {
  readonly onAction: (
    type: string,
    state: State,
    handler: (payload: unknown) => State,
  ) => void;
  readonly state: State;
}
