const FIRST = 0;

export default function getCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement | null = window.document
    .getElementsByTagName('canvas')
    .item(FIRST);

  if (canvas === null) {
    throw new Error('Failed to find canvas.');
  }

  return canvas;
}
