import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Link, Note, Paragraph } = await importTestedDesignSystem();

describe('Note', (): void => {
  it('should expose additional author-provided context as a note', (): void => {
    const { getByRole, getRoleCount } = render(<Note>Test content</Note>);

    const note: HTMLElement = getByRole('note');
    expect(note).toHaveTextContent('Test content');
    expect(getRoleCount('note')).toBe(1);
    expect(getRoleCount('comment')).toBe(0);
    expect(getRoleCount('suggestion')).toBe(0);
  });

  it('should supplement primary content in the natural reading order', (): void => {
    const { getByRole } = render(
      <>
        <Paragraph>
          The following results outline support for the tested features.
        </Paragraph>
        <Note>
          <Paragraph>
            Please keep in mind that all results were accurate at publication.
          </Paragraph>
          <Paragraph>
            If you find variations in results, please let us know.
          </Paragraph>
        </Note>
        <Paragraph>Continue with the rest of the report.</Paragraph>
      </>,
    );

    const note: HTMLElement = getByRole('note');
    expect(note.previousElementSibling).toHaveTextContent(
      'The following results outline support for the tested features.',
    );
    expect(note).toHaveTextContent(
      'Please keep in mind that all results were accurate at publication.',
    );
    expect(note).toHaveTextContent(
      'If you find variations in results, please let us know.',
    );
    expect(note.nextElementSibling).toHaveTextContent(
      'Continue with the rest of the report.',
    );
  });

  it('should support aria-describedby for brief static supplemental text', (): void => {
    const { getByDescription, getByRole } = render(
      <>
        <button aria-describedby="save-note" type="button">
          Save
        </button>
        <Note id="save-note">Drafts are retained for 30 days.</Note>
      </>,
    );

    const button: HTMLElement = getByDescription(
      'button',
      'Drafts are retained for 30 days.',
    );
    const note: HTMLElement = getByRole('note');

    expect(button).toHaveAttribute('aria-describedby', 'save-note');
    expect(note).toHaveAttribute('id', 'save-note');
  });

  it('should support aria-details for structured or interactive supplemental content', (): void => {
    const { getByName, getByRole } = render(
      <>
        <button aria-details="info-note" type="button">
          Get Started
        </button>
        <Note id="info-note">
          <Paragraph>Need more information before you get started?</Paragraph>
          <Paragraph>
            Visit our <Link href="/product">product description page</Link> to
            get all the information you need.
          </Paragraph>
        </Note>
      </>,
    );

    const button: HTMLElement = getByName('button', 'Get Started');
    const note: HTMLElement = getByRole('note');
    const link: HTMLElement = getByName('link', 'product description page');

    expect(button).toHaveAttribute('aria-details', 'info-note');
    expect(button).not.toHaveAttribute('aria-describedby');
    expect(note).toHaveAttribute('id', 'info-note');
    expect(note).toContainElement(link);
  });

  it('should preserve structured note content without making the note itself interactive', (): void => {
    const { getByName, getByRole } = render(
      <Note>
        <Paragraph>Related resources are available.</Paragraph>
        <Link href="/resources">Resources</Link>
      </Note>,
    );

    const note: HTMLElement = getByRole('note');
    const link: HTMLElement = getByName('link', 'Resources');

    expect(note).not.toHaveAttribute('tabindex');
    expect(note).not.toHaveFocus();
    expect(note).toContainElement(link);
  });
});
