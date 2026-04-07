import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SearchBoxProps } from '../core/search-box-props.js';

export default function testSearchBox(
  SearchBox: ComponentType<SearchBoxProps>,
): void {
  describe('SearchBox', (): void => {
    it('should be a search box', (): void => {
      const { getByRole } = render(<SearchBox label="Test search box" />);

      getByRole('searchbox', { name: 'Test search box' });
    });
  });
}
