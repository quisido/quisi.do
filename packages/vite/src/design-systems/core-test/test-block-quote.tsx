import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { BlockQuoteProps } from '../core/block-quote-props.js';

export default function testBlockQuote(
  BlockQuote: ComponentType<BlockQuoteProps>,
): void {
  describe('BlockQuote', (): void => {
    it('should be a block quote', (): void => {
      const { getByRole } = render(<BlockQuote>Test block quote</BlockQuote>);

      expect(getByRole('blockquote').textContent).toBe('Test block quote');
    });
  });
}
