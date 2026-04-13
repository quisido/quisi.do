import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SearchProps } from '../core/search-props.js';

export default function testSearch(Search: ComponentType<SearchProps>): void {
  describe('Search', (): void => {
    it('should be search', (): void => {
      const { getByRole } = render(<Search>Test content</Search>);
      getByRole('search');
    });
  });
}
