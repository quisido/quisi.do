import type { ReactNode } from 'react';
import { expect, it } from 'vitest';
import render, { type RenderTest } from './render.js';

interface Options {
  readonly getElement: (renderTest: RenderTest) => HTMLElement;
}

export default function itShouldBeModal(
  modal: ReactNode,
  { getElement }: Options,
): void {
  it('should expose content outside itself as inert', (): void => {
    const renderTest: RenderTest = render(modal);
    const element: HTMLElement = getElement(renderTest);
    expect(element).toHaveAttribute('aria-modal', 'true');
  });

  it('should keep keyboard interaction within its contents', async (): Promise<void> => {
    const renderTest: RenderTest = render(
      <>
        <button type="button">Before modal</button>
        {modal}
        <button type="button">After modal</button>
      </>,
    );
    const element: HTMLElement = getElement(renderTest);

    await renderTest.tab();
    expect(element).toContainElement(document.activeElement as HTMLElement);
    await renderTest.shiftTab();
    expect(element).toContainElement(document.activeElement as HTMLElement);
  });
}
