export default function getContainer(): HTMLElement {
  const container: HTMLElement | null = document.getElementById('root');

  if (container === null) {
    throw new Error(
      'Expected a DOM element with an id of "root" but none was found.',
    );
  }

  return container;
}
