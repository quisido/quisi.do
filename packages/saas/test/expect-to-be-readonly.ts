export default function expectToBeReadOnly(element: HTMLElement): void {
  if (element instanceof HTMLInputElement) {
    if (element.readOnly) {
      return;
    }

    throw new Error('Expected input element to be read-only.', {
      cause: element,
    });
  }

  if (element.getAttribute('aria-readonly') === 'true') {
    return;
  }

  throw new Error('Expected element to be read-only.', { cause: element });
}
