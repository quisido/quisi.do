import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RadioProps } from '../core/radio-props.js';

export default function testRadio(Radio: ComponentType<RadioProps>): void {
  describe('Radio', (): void => {
    it('should be a radio button', (): void => {
      const { getByName } = render(<Radio label="Test radio" />);

      getByName('radio', 'Test radio');
    });
  });
}
