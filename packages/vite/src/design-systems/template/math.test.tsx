import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Math } from './index.js';

describe('Math', (): void => {
  it('should be math', (): void => {
    const { getByRole } = render(<Math label="Test math">1 + 1 = 2</Math>);

    getByRole('math', { name: 'Test math' });
  });
});
