import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ListBox, Option } from './index.js';

describe('Option', (): void => {
  it('should be an option', (): void => {
    const { getByRole } = render(
      <ListBox label="Test list box">
        <Option>Test option</Option>
      </ListBox>,
    );

    getByRole('option', { name: 'Test option' });
  });
});
