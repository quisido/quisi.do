import type { ReactNode } from 'react';
import { expect, it } from 'vitest';
import render, { type RenderTest } from './render.js';

interface Options {
  readonly getElement: (renderTest: RenderTest) => HTMLElement;
}

const KEYBOARD_INTERACTIONS = 100;
const RADIX = 36;

export default function itShouldBeModal(
  modal: ReactNode,
  { getElement }: Options,
): void {
  it('should be modal', (): void => {
    const renderTest: RenderTest = render(modal);
    const element: HTMLElement = getElement(renderTest);
    expect(element).toHaveAttribute('aria-modal', 'true');
  });

  it('should expose content outside itself as inert', (): void => {
    const testUuid: string = Math.random().toString(RADIX);
    const { getByName, ...renderTest }: RenderTest = render(
      <>
        <button type="button">Before {testUuid}</button>
        {modal}
        <button type="button">After {testUuid}</button>
      </>,
    );

    const element: HTMLElement = getElement({ getByName, ...renderTest });
    expect(element).toHaveAttribute('aria-modal', 'true');

    const afterButton: HTMLElement = getByName('button', `After ${testUuid}`);
    const beforeButton: HTMLElement = getByName('button', `Before ${testUuid}`);
    expect(afterButton).toHaveAttribute('inert');
    expect(beforeButton).toHaveAttribute('inert');
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

    for (let ii = 0; ii < KEYBOARD_INTERACTIONS; ii++) {
      // eslint-disable-next-line no-await-in-loop
      await renderTest.tab();
      expect(element).toContainElement(document.activeElement as HTMLElement);
    }
  });
}
