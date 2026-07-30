export interface GameEngineOptions {
  readonly now: () => number;
  readonly version: number;
}

export default class GameEngine {
  #now: () => number;
  #version: number;

  public constructor({ now, version }: GameEngineOptions) {
    this.#now = now;
    this.#version = version;
  }

  public get now(): number {
    return this.#now();
  }

  public get version(): number {
    return this.#version;
  }
}
