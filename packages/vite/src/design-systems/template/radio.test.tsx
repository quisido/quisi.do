import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Radio } from './index.js';

describe('Radio', (): void => {
  it('should be a radio button', (): void => {
    const { getByRole } = render(<Radio label="Test radio" />);

    getByRole('radio', { name: 'Test radio' });
  });
});
