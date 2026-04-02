import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { ComboBox } from './index.js';

const handleTestChange = vi.fn();

describe('ComboBox', (): void => {
  it('should be a combo box', (): void => {
    const { getByRole } = render(
      <ComboBox
        label="Test combo box"
        onChange={handleTestChange}
        options={[]}
        value=""
      />,
    );

    getByRole('combobox', { name: 'Test combo box' });
  });
});
