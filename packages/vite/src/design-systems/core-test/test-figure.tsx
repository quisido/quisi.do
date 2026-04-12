import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { not } from 'fmrs';
import type { FigureProps } from '../core/figure-props.js';
import isGenericRole from '../../../test/is-generic.js';
import render from './render.js';

const isNonGenericRole = not(isGenericRole);

const getFigureCaption = (element: HTMLElement): HTMLElement => {
  const [figureCaption] = element.getElementsByTagName('figcaption');

  if (figureCaption === undefined) {
    throw new Error('Expected to find a figcaption element.');
  }

  return figureCaption;
};

export default function testFigure(Figure: ComponentType<FigureProps>): void {
  describe('Figure', (): void => {
    describe('caption', (): void => {
      it('should be supported', (): void => {
        const { getByName } = render(
          <Figure caption="Test caption">Test content</Figure>,
        );

        const figure: HTMLElement = getByName('figure', 'Test caption');
        const figureCaption: HTMLElement = getFigureCaption(figure);
        expect(figureCaption.textContent).toBe('Test caption');
      });

      describe('position', (): void => {
        it('should default to start or end', (): void => {
          const { getByName } = render(
            <Figure caption="Test default caption position">
              Test content
            </Figure>,
          );

          const figure: HTMLElement = getByName(
            'figure',
            'Test default caption position',
          );

          const figureCaption: HTMLElement = getFigureCaption(figure);
          const nonGenericChildren: Element[] = [...figure.children].filter(
            isNonGenericRole,
          );

          const firstChild: Element | undefined = nonGenericChildren.shift();
          const lastChild: Element | undefined = nonGenericChildren.pop();
          expect([firstChild, lastChild]).toContain(figureCaption);
        });

        it('should support start', (): void => {
          const { getByName } = render(
            <Figure
              caption="Test start caption position"
              captionPosition="start"
            >
              Test content
            </Figure>,
          );

          const figure: HTMLElement = getByName(
            'figure',
            'Test start caption position',
          );

          const figureCaption: HTMLElement = getFigureCaption(figure);
          expect(figureCaption).toBe(
            [...figure.children].find(isNonGenericRole),
          );
        });

        it('should support end', (): void => {
          const { getByName } = render(
            <Figure caption="Test end caption position" captionPosition="end">
              Test content
            </Figure>,
          );

          const figure: HTMLElement = getByName(
            'figure',
            'Test end caption position',
          );

          const figureCaption: HTMLElement = getFigureCaption(figure);
          expect(figureCaption).toBe(
            [...figure.children].findLast(isNonGenericRole),
          );
        });
      });
    });

    it('should support descriptions', (): void => {
      const { getByDescription } = render(
        <Figure description="Test description" label="Test description label">
          Test content
        </Figure>,
      );

      getByDescription('figure', 'Test description');
    });

    it('should support labels', (): void => {
      const { getByName } = render(
        <Figure label="Test label">Test content</Figure>,
      );

      getByName('figure', 'Test label');
    });

    it('should support labelled by', (): void => {
      const { getByName } = render(
        <>
          <span id="test-figure-label-id">Test labelled by</span>
          <Figure labelledBy="test-figure-label-id">Test content</Figure>
        </>,
      );

      getByName('figure', 'Test labelled by');
    });
  });
}
