import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { SearchBox } from './index.js';

describe('SearchBox', (): void => {
  it('should be a search box', (): void => {
    const { getByRole } = render(<SearchBox label="Test search box" />);

    getByRole('searchbox', { name: 'Test search box' });
  });
});
