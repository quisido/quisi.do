interface RenderChunk {}

export class CanvasRenderer implements Renderer {
  readonly #ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.#ctx = canvas.getContext('2d')!;
  }

  public render(...chunks: RenderChunk) {
    this.#ctx.clearRect(0, 0, 800, 600);
    this.#ctx.fillStyle = 'red';
    this.#ctx.fillRect(state.box.x, state.box.y, 50, 50);
    this.#ctx.fillText(`Score: ${state.score}`, 10, 20);
  }
}
