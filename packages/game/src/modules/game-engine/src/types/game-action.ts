export default interface GameAction {
  readonly payload?: unknown;
  readonly type: string;
}
