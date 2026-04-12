import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SearchBoxProps } from '../core/search-box-props.js';

export default function testSearchBox(
  SearchBox: ComponentType<SearchBoxProps>,
): void {
  describe('SearchBox', (): void => {
    it('should be a search box', (): void => {
      const { getByName } = render(<SearchBox label="Test search box" />);

      getByName('searchbox', 'Test search box');
    });
  });
}
