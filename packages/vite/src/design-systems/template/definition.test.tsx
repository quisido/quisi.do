import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Definition } from './index.js';

describe('Definition', (): void => {
  it('should be a definition', (): void => {
    const { getByRole } = render(
      <Definition label="Test definition">Definition content</Definition>,
    );

    getByRole('definition', { name: 'Test definition' });
  });
});
