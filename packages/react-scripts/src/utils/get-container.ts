export default function getContainer(): HTMLElement {
  const container: HTMLElement | null = document.getElementById('root');

  if (container === null) {
    throw new Error('Expected a DOM element with an ID of "root".');
  }

  return container;
}
