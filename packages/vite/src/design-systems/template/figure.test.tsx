import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Figure } from './index.js';
import { not } from 'fmrs';
import isGenericRole from '../../../test/is-generic.js';

const isNonGenericRole = not(isGenericRole);

const getFigureCaption = (element: HTMLElement): HTMLElement => {
  const [figureCaption] = element.getElementsByTagName('figcaption');

  if (figureCaption === undefined) {
    throw new Error('Expected to find a figcaption element.');
  }

  return figureCaption;
};

describe('Figure', (): void => {
  describe('caption', (): void => {
    it('should be supported', (): void => {
      const { getByRole } = render(
        <Figure caption="Test caption">Test content</Figure>,
      );

      const figure: HTMLElement = getByRole('figure', { name: 'Test caption' });
      const figureCaption: HTMLElement = getFigureCaption(figure);
      expect(figureCaption.textContent).toBe('Test caption');
    });

    describe('position', (): void => {
      it('should default to start or end', (): void => {
        const { getByRole } = render(
          <Figure caption="Test default caption position">Test content</Figure>,
        );

        const figure: HTMLElement = getByRole('figure', {
          name: 'Test default caption position',
        });

        const figureCaption: HTMLElement = getFigureCaption(figure);
        const nonGenericChildren: Element[] = [...figure.children].filter(
          isNonGenericRole,
        );

        const firstChild: Element | undefined = nonGenericChildren.shift();
        const lastChild: Element | undefined = nonGenericChildren.pop();
        expect([firstChild, lastChild]).toContain(figureCaption);
      });

      it('should support start', (): void => {
        const { getByRole } = render(
          <Figure caption="Test start caption position" captionPosition="start">
            Test content
          </Figure>,
        );

        const figure: HTMLElement = getByRole('figure', {
          name: 'Test start caption position',
        });

        const figureCaption: HTMLElement = getFigureCaption(figure);
        expect(figureCaption).toBe([...figure.children].find(isNonGenericRole));
      });

      it('should support end', (): void => {
        const { getByRole } = render(
          <Figure caption="Test end caption position" captionPosition="end">
            Test content
          </Figure>,
        );

        const figure: HTMLElement = getByRole('figure', {
          name: 'Test end caption position',
        });

        const figureCaption: HTMLElement = getFigureCaption(figure);
        expect(figureCaption).toBe(
          [...figure.children].findLast(isNonGenericRole),
        );
      });
    });
  });

  it('should support descriptions', (): void => {
    const { getByRole } = render(
      <Figure description="Test description" label="Test description label">
        Test content
      </Figure>,
    );

    getByRole('figure', { description: 'Test description' });
  });

  it('should support labels', (): void => {
    const { getByRole } = render(
      <Figure label="Test label">Test content</Figure>,
    );

    getByRole('figure', { name: 'Test label' });
  });

  it('should support labelled by', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test labelled by</span>
        <Figure labelledBy="test-id">Test content</Figure>
      </>,
    );

    getByRole('figure', { name: 'Test labelled by' });
  });
});
