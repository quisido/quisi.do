import render from './render.js';
import { describe, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { SearchBox } = await importTestedDesignSystem();

const handleChange = vi.fn();

describe('SearchBox', (): void => {
  it('should be a search box', (): void => {
    const { getByName } = render(
      <SearchBox label="Test search box" onChange={handleChange} value="" />,
    );

    getByName('searchbox', 'Test search box');
  });
});
