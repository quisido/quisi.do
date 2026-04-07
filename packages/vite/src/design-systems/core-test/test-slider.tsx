import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SliderProps } from '../core/slider-props.js';

export default function testSlider(Slider: ComponentType<SliderProps>): void {
  describe('Slider', (): void => {
    it('should be a slider', (): void => {
      const { getByRole } = render(<Slider label="Test slider" />);

      getByRole('slider', { name: 'Test slider' });
    });
  });
}
