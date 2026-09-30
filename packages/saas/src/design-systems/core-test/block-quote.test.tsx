import { describe, expect, it } from 'vitest';

import importTestedDesignSystem from './import-tested-design-system.js';
import render from './render.js';

const { BlockQuote } = await importTestedDesignSystem();

describe('BlockQuote', (): void => {
  it('should be a block quote', (): void => {
    const { getByRole } = render(<BlockQuote>Test block quote</BlockQuote>);

    const blockQuote: HTMLElement = getByRole('blockquote');
    expect(blockQuote).toMatchTextContent('Test block quote');
  });
});
