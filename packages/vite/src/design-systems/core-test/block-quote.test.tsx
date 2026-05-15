import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { BlockQuote } = await importTestedDesignSystem();

describe('BlockQuote', (): void => {
  it('should be a block quote', (): void => {
    const { getByRole } = render(<BlockQuote>Test block quote</BlockQuote>);

    const blockQuote: HTMLElement = getByRole('blockquote');
    expect(blockQuote).toHaveTextContent('Test block quote');
  });
});
