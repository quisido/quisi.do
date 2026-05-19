export default function createContainer(): HTMLDivElement {
  const container: HTMLDivElement = window.document.createElement('div');
  container.setAttribute('focusable', 'true');
  container.setAttribute('tabindex', '-1');
  return container;
}
