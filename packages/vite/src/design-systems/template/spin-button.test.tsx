import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { SpinButton } from './index.js';

describe('SpinButton', (): void => {
  it('should be a spin button', (): void => {
    const { getByRole } = render(<SpinButton label="Test spin button" />);

    getByRole('spinbutton', { name: 'Test spin button' });
  });
});
