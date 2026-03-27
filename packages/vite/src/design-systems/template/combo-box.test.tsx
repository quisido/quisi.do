import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ComboBox, Option } from './index.js';

describe('ComboBox', (): void => {
  it('should be a combo box', (): void => {
    const { getByRole } = render(
      <ComboBox label="Test combo box">
        <Option>Test option</Option>
      </ComboBox>,
    );

    getByRole('combobox', { name: 'Test combo box' });
  });
});
