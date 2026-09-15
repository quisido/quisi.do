export default interface GameAction<Type extends string = string, Payload = never> {
  readonly payload?: Payload;
  readonly player?: number | undefined;
  readonly timestamp: number;
  readonly type: Type;
}
