import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Slider } from './index.js';

describe('Slider', (): void => {
  it('should be a slider', (): void => {
    const { getByRole } = render(<Slider label="Test slider" />);

    getByRole('slider', { name: 'Test slider' });
  });
});
