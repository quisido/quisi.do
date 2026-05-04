import { expect } from 'vitest';

export default function expectActiveElementToBe(element: HTMLElement): void {
  expect(window.document.activeElement).toBe(element);
}
