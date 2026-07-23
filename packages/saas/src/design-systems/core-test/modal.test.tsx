import { expect, it } from 'vitest';
import render, { type RenderTest } from './render.js';
import type { ReactNode } from 'react';

interface Options {
  readonly getElement: (renderTest: RenderTest) => HTMLElement;
}

export default function itShouldBeModal(
  modal: ReactNode,
  { getElement }: Options,
): void {
  it('should be a modal', (): void => {
    const renderTest: RenderTest = render(modal);
    const element: HTMLElement = getElement(renderTest);
    expect(element).toHaveAttribute('aria-modal', 'true');

    it.todo('should limit user interaction to its contents');

    it.todo(
      'should not limit user interaction to its content after focus is lost',
    );

    it.todo(
      'should not limit user interaction to its content after it is removed',
    );

    // get by role, all control elements (e.g. button)
    // ensure they are descendants of `getElement`.
    it.todo('should contain all controls');

    it.todo('should mark its siblings as inert ("inert subtree" in HTML)');
  });
}
