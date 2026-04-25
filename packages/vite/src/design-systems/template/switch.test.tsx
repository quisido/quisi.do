import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Switch } from './index.js';

describe('Switch', (): void => {
  it('should be a switch', (): void => {
    const { getByRole } = render(<Switch label="Test switch" />);

    getByRole('switch', { name: 'Test switch' });
  });
});
