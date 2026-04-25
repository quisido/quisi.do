import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ListBox, Option } from './index.js';

describe('ListBox', (): void => {
  it('should be a list box', (): void => {
    const { getByRole } = render(
      <ListBox label="Test list box">
        <Option>Test option</Option>
      </ListBox>,
    );

    getByRole('listbox', { name: 'Test list box' });
  });
});
