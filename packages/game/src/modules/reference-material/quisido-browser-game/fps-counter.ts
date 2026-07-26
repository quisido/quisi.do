export default class FpsCounter {
  readonly #duration: number;
  readonly #frames: number[] = [];

  public constructor(duration: number) {
    this.#duration = duration;
  }

  public tick(): void {
    const now: number = Date.now();
    this.#frames.push(now);
    while (
      typeof this.#frames[0] === 'number' &&
      this.#frames[0] <= now - this.#duration
    ) {
      this.#frames.shift();
    }
  }

  public get value(): number {
    const frameCount: number = this.#frames.length;
    if (frameCount === 0) {
      return 0;
    }

    return Math.round((frameCount / this.#duration) * 1_000);
  }
}
