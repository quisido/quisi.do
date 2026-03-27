import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Checkbox } from './index.js';

describe('Checkbox', (): void => {
  it('should be a checkbox', (): void => {
    const { getByRole } = render(<Checkbox label="Test checkbox" />);

    getByRole('checkbox', { name: 'Test checkbox' });
  });
});
