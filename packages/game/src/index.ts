import TestGame from './test-game.js';

const CANVAS: HTMLCanvasElement | null = window.document
  .getElementsByTagName('canvas')
  .item(0);

if (CANVAS === null) {
  throw new Error('Failed to find canvas.');
}

const game = new TestGame({
  cancelTimeout(id: number): void {
    window.clearTimeout(id);
  },
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ): number {
    return window.setTimeout(fn, delay);
  },
});

game.start(CANVAS, (error: Error): void => {
  window.console.log(error);
});

window.addEventListener('click', (ev: MouseEvent): void => {
  game.dispatch('tap', { x: ev.clientX, y: ev.clientY });
});

const animate = (): void => {
  window.requestAnimationFrame((): void => {
    game.render();
    animate();
  });
};

animate();

const INTERVAL = 10_000;
window.setInterval((): void => {
  window.console.log(game.toJSON());
}, INTERVAL);
