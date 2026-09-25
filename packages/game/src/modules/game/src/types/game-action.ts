export default interface GameAction<Type extends string = string, Payload = unknown> {
  readonly payload: Payload;
  readonly player?: number | undefined;
  readonly timestamp: number;
  readonly type: Type;
}
