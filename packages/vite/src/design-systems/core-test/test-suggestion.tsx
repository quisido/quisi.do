import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SuggestionProps } from '../core/suggestion-props.js';

export default function testSuggestion(
  Suggestion: ComponentType<SuggestionProps>,
): void {
  describe('Suggestion', (): void => {
    it('should be a suggestion', (): void => {
      const { getByName } = render(
        <Suggestion label="Test suggestion">
          Test suggestion content
        </Suggestion>,
      );

      getByName('suggestion', 'Test suggestion');
    });
  });
}
