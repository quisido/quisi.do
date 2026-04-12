import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SliderProps } from '../core/slider-props.js';

export default function testSlider(Slider: ComponentType<SliderProps>): void {
  describe('Slider', (): void => {
    it('should be a slider', (): void => {
      const { getByName } = render(<Slider label="Test slider" />);

      getByName('slider', 'Test slider');
    });
  });
}
