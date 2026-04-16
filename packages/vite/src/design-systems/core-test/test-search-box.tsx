import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it, vi } from 'vitest';
import type { SearchBoxProps } from '../core/search-box-props.js';

export default function testSearchBox(
  SearchBox: ComponentType<SearchBoxProps>,
): void {
  const handleTestChange = vi.fn();

  describe('SearchBox', (): void => {
    it('should be a search box', (): void => {
      const { getByName } = render(
        <SearchBox
          label="Test search box"
          onChange={handleTestChange}
          value=""
        />,
      );

      getByName('searchbox', 'Test search box');
    });
  });
}
