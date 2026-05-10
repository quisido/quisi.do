import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Search } = await importTestedDesignSystem();

describe('Search', (): void => {
  it('should be search', (): void => {
    const { getByRole } = render(<Search>Test content</Search>);
    getByRole('search');
  });
});
