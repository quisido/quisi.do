export const CANVAS: HTMLCanvasElement = ((): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement | null = window.document
    .getElementsByTagName('canvas')
    .item(0);

  if (canvas === null) {
    throw new Error('Failed to find canvas.');
  }

  return canvas;
})();
