export interface GameRenderer<GameState> {
  readonly mount?: (() => void) | undefined;
  readonly render: (state: GameState, dt: number) => void;
  readonly unmount?: (() => void) | undefined;
}
