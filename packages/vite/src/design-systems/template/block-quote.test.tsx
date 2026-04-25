import { describe, expect, it } from 'vitest';
import { BlockQuote } from './index.js';
import { render } from '@testing-library/react';

describe('BlockQuote', (): void => {
  it('should be a block quote', (): void => {
    const { getByRole } = render(<BlockQuote>Test block quote</BlockQuote>);

    expect(getByRole('blockquote').textContent).toBe('Test block quote');
  });
});
