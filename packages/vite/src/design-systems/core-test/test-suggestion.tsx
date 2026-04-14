import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { SuggestionProps } from '../core/suggestion-props.js';

export default function testSuggestion(
  Suggestion: ComponentType<SuggestionProps>,
): void {
  describe('Suggestion', (): void => {
    it('should support insertions', (): void => {
      const { getByRole } = render(<Suggestion insertion="Insertion" />);
      expect(getByRole('insertion')).toHaveTextContent('Insertion');
      expect(getByRole('suggestion')).toHaveTextContent('Insertion');
    });

    it('should support deletions', (): void => {
      const { getByRole } = render(<Suggestion deletion="Deletion" />);
      expect(getByRole('deletion')).toHaveTextContent('Deletion');
      expect(getByRole('suggestion')).toHaveTextContent('Deletion');
    });

    it('should support both insertions and deletions', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="Deletion" insertion="Insertion" />,
      );

      expect(getByRole('deletion')).toHaveTextContent('Deletion');
      expect(getByRole('insertion')).toHaveTextContent('Insertion');
    });

    it('should not have other children', (): void => {
      const { getByRole } = render(
        <Suggestion deletion="Deletion" insertion="Insertion" />,
      );

      const suggestion: HTMLElement = getByRole('suggestion');
      expect(suggestion.childNodes).toHaveLength(2);
    });

    /**
     *   TODO: Authors MAY use aria-details or aria-description to associate the
     * suggestion with related information such as comments, authoring info, and
     * time stamps.
     */
  });
}
