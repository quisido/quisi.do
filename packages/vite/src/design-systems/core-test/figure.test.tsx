import { describe, expect, it } from 'vitest';
import { not } from 'fmrs';
import isGenericRole from '../../../test/is-generic.js';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const isNonGenericRole = not(isGenericRole);

const getFigureCaption = (element: HTMLElement): HTMLElement => {
  const [figureCaption] = element.getElementsByTagName('figcaption');

  if (figureCaption === undefined) {
    throw new Error('Expected to find a figcaption element.');
  }

  return figureCaption;
};

const { Figure } = await importTestedDesignSystem();

describe('Figure', (): void => {
  describe('caption', (): void => {
    it('should be supported', (): void => {
      const { getByName, getByRole } = render(
        <Figure caption="Test caption">Test content</Figure>,
      );

      const figure: HTMLElement = getByName('figure', 'Test caption');
      const figureCaption: HTMLElement = getFigureCaption(figure);
      expect(figureCaption).toBe(getByRole('caption'));
      expect(figureCaption).toHaveTextContent('Test caption');
    });

    it('should be referenced as the accessible name when no label is provided', (): void => {
      const { getByName } = render(
        <Figure caption="Visible figure caption">Test content</Figure>,
      );

      const figure: HTMLElement = getByName('figure', 'Visible figure caption');
      const figureCaption: HTMLElement = getFigureCaption(figure);
      const [captionLabel]: HTMLCollectionOf<HTMLElement> =
        figureCaption.getElementsByTagName('div');

      expect(captionLabel).toBeDefined();
      expect(figure).toHaveAttribute('aria-labelledby', captionLabel.id);
      expect(figure).not.toHaveAttribute('aria-label');
    });

    it('should support a caption when the accessible name comes from a label', (): void => {
      const { getByName } = render(
        <Figure caption="Visible supporting caption" label="Accessible label">
          Test content
        </Figure>,
      );

      const figure: HTMLElement = getByName('figure', 'Accessible label');
      const figureCaption: HTMLElement = getFigureCaption(figure);
      expect(figureCaption).toHaveTextContent('Visible supporting caption');
      expect(figure).toHaveAttribute('aria-label', 'Accessible label');
      expect(figure).not.toHaveAttribute('aria-labelledby');
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

  it('should associate string descriptions with aria-describedby', (): void => {
    const { getByDescription } = render(
      <Figure description="Visible summary" label="Summarized figure">
        Test content
      </Figure>,
    );

    const figure: HTMLElement = getByDescription('figure', 'Visible summary');
    const descriptionId: string | null = figure.getAttribute('aria-describedby');
    if (descriptionId === null) {
      throw new Error('Expected figure to reference a description.');
    }

    const description: HTMLElement | null =
      window.document.getElementById(descriptionId);
    if (description === null) {
      throw new Error('Expected figure description element.');
    }

    expect(description).toHaveTextContent('Visible summary');
    expect(figure).not.toHaveAttribute('aria-details');
  });

  it('should associate rich descriptions with aria-details', (): void => {
    const { getByName } = render(
      <Figure
        description={
          <span>
            Detailed explanation <a href="#source">source</a>
          </span>
        }
        label="Detailed figure"
      >
        Test content
      </Figure>,
    );

    const figure: HTMLElement = getByName('figure', 'Detailed figure');
    const detailsId: string | null = figure.getAttribute('aria-details');
    if (detailsId === null) {
      throw new Error('Expected figure to reference detailed content.');
    }

    const details: HTMLElement | null = window.document.getElementById(
      detailsId,
    );
    if (details === null) {
      throw new Error('Expected figure details element.');
    }

    expect(details).toHaveTextContent('Detailed explanation');
    expect(details).toContainElement(getByName('link', 'source'));
    expect(figure).not.toHaveAttribute('aria-describedby');
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

  it('should support references from surrounding text', (): void => {
    const { getByName } = render(
      <>
        <p>
          Review <a href="#test-figure-id">the architecture figure</a>.
        </p>
        <Figure id="test-figure-id" label="Architecture figure">
          Test content
        </Figure>
      </>,
    );

    const figure: HTMLElement = getByName('figure', 'Architecture figure');
    const link: HTMLElement = getByName('link', 'the architecture figure');
    expect(figure).toHaveAttribute('id', 'test-figure-id');
    expect(link).toHaveAttribute('href', '#test-figure-id');
  });

  it('should preserve rich and navigable figure content', async (): Promise<void> => {
    const { getByName, getByRole, tab } = render(
      <Figure label="Interactive example">
        <pre>
          <code>const value = 1;</code>
        </pre>
        <button type="button">Run example</button>
      </Figure>,
    );

    const figure: HTMLElement = getByName('figure', 'Interactive example');
    const button: HTMLElement = getByName('button', 'Run example');
    expect(figure).toContainElement(getByRole('code'));
    expect(figure).toContainElement(button);

    await tab();
    expect(button).toHaveFocus();
  });
});
