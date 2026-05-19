import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Mark, Paragraph } = await importTestedDesignSystem();

describe('Mark', (): void => {
  it('should expose marked content for reference or notation', (): void => {
    const { getByDescription, getRoleCount } = render(
      <>
        <span id="test-mark-description-id">Test description</span>
        <Mark describedBy="test-mark-description-id">Test mark</Mark>
      </>,
    );

    const mark: HTMLElement = getByDescription('mark', 'Test description');
    expect(mark.tagName).toBe('MARK');
    expect(mark).toHaveAttribute(
      'aria-describedby',
      'test-mark-description-id',
    );
    expect(mark).toHaveTextContent('Test mark');
    expect(getRoleCount('mark')).toBe(1);
  });

  it('should preserve the marked text in its enclosing reading context', (): void => {
    const { getByDescription, getByRole } = render(
      <>
        <blockquote>
          This quotation includes{' '}
          <Mark describedBy="quotation-interest-description">
            relevant source text
          </Mark>{' '}
          for comparison.
        </blockquote>
        <span id="quotation-interest-description">
          Passage of special interest in the quotation
        </span>
      </>,
    );

    const mark: HTMLElement = getByDescription(
      'mark',
      'Passage of special interest in the quotation',
    );
    expect(mark).toHaveTextContent('relevant source text');
    expect(getByRole('blockquote')).toHaveTextContent(
      'This quotation includes relevant source text for comparison.',
    );
  });

  it('should support marking search matches that are relevant to the current activity', (): void => {
    const { getByDescription, getRoleCount } = render(
      <Paragraph>
        Found <Mark describedBy="first-match-description">browser</Mark> APIs
        and <Mark describedBy="second-match-description">browser</Mark> tests.
        <span id="first-match-description">Search match 1 of 2</span>
        <span id="second-match-description">Search match 2 of 2</span>
      </Paragraph>,
    );

    expect(getByDescription('mark', 'Search match 1 of 2')).toHaveTextContent(
      'browser',
    );
    expect(getByDescription('mark', 'Search match 2 of 2')).toHaveTextContent(
      'browser',
    );
    expect(getRoleCount('mark')).toBe(2);
  });

  it('should not be tabbable because marked content is not interactive', async (): Promise<void> => {
    const { click, getByDescription, tab } = render(
      <>
        <button type="button">Before mark</button>
        <Mark describedBy="non-interactive-description">
          Referenced passage
        </Mark>
        <button type="button">After mark</button>
        <span id="non-interactive-description">
          Highlighted only for reference
        </span>
      </>,
    );

    const mark: HTMLElement = getByDescription(
      'mark',
      'Highlighted only for reference',
    );
    const before: Element | null = mark.previousElementSibling;
    const after: Element | null = mark.nextElementSibling;

    if (!(before instanceof HTMLElement) || !(after instanceof HTMLElement)) {
      throw new Error('Expected mark to be surrounded by focusable buttons.');
    }

    await click(before);
    expect(before).toHaveFocus();
    await tab();
    expect(mark).not.toHaveFocus();
    expect(after).toHaveFocus();
  });
});
