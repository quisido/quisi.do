export default interface Actions {
  readonly tap: TapAction;
}

export interface TapAction {
  readonly x: number;
  readonly y: number;
}
