import render from './render.js';
import { assert, describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Suggestion } = await importTestedDesignSystem();

describe('Suggestion', (): void => {
  describe('insertion-only suggestion', (): void => {
    it('should expose a suggestion role', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('suggestion')).toBeInTheDocument();
    });

    it('should expose an insertion role', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('insertion')).toBeInTheDocument();
    });

    it('should contain the inserted text within the insertion', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('insertion')).toHaveTextContent('dog');
    });

    it('should contain the inserted text within the suggestion', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('suggestion')).toHaveTextContent('dog');
    });

    it('should use a semantic ins element for the insertion', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('insertion').tagName).toBe('INS');
    });

    it('should contain only the insertion child', (): void => {
      const { getByRole } = render(<Suggestion insertion="dog" />);
      expect(getByRole('suggestion').childNodes).toHaveLength(1);
    });
  });

  describe('deletion-only suggestion', (): void => {
    it('should expose a suggestion role', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('suggestion')).toBeInTheDocument();
    });

    it('should expose a deletion role', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('deletion')).toBeInTheDocument();
    });

    it('should contain the deleted text within the deletion', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('deletion')).toHaveTextContent('cat');
    });

    it('should contain the deleted text within the suggestion', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('suggestion')).toHaveTextContent('cat');
    });

    it('should use a semantic del element for the deletion', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('deletion').tagName).toBe('DEL');
    });

    it('should contain only the deletion child', (): void => {
      const { getByRole } = render(<Suggestion deletion="cat" />);
      expect(getByRole('suggestion').childNodes).toHaveLength(1);
    });
  });

  describe('suggestion with both an insertion and a deletion', (): void => {
    it('should expose a suggestion role', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('suggestion')).toBeInTheDocument();
    });

    it('should expose an insertion role', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('insertion')).toBeInTheDocument();
    });

    it('should expose a deletion role', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('deletion')).toBeInTheDocument();
    });

    it('should contain the inserted text within the insertion', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('insertion')).toHaveTextContent('dog');
    });

    it('should contain the deleted text within the deletion', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('deletion')).toHaveTextContent('cat');
    });

    it('should contain all proposed content within the suggestion', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      const suggestion: HTMLElement = getByRole('suggestion');
      expect(suggestion).toHaveTextContent('dog');
      expect(suggestion).toHaveTextContent('cat');
    });

    it('should use a semantic ins element for the insertion', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('insertion').tagName).toBe('INS');
    });

    it('should use a semantic del element for the deletion', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('deletion').tagName).toBe('DEL');
    });

    it('should contain only the insertion and deletion children', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="cat" insertion="dog" />,
      );
      expect(getByRole('suggestion').childNodes).toHaveLength(2);
    });
  });

  it('should associate related structured details', (): void => {
    const { getByRole } = render(
      <>
        <Suggestion detailsId="suggestion-details" insertion="dog" />
        <aside id="suggestion-details">Suggested by Alex today</aside>
      </>,
    );

    const suggestion: HTMLElement = getByRole('suggestion');
    const { ariaDetailsElements } = suggestion;
    assert(ariaDetailsElements !== null);
    expect(ariaDetailsElements[0]).toHaveTextContent('Suggested by Alex today');
  });

  it('should expose a concise related description', (): void => {
    const { getByRole } = render(
      <Suggestion description="Suggested by Alex today" insertion="dog" />,
    );

    expect(getByRole('suggestion')).toHaveAttribute(
      'aria-description',
      'Suggested by Alex today',
    );
  });
});
