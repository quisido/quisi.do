import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RadioProps } from '../core/radio-props.js';

export default function testRadio(Radio: ComponentType<RadioProps>): void {
  describe('Radio', (): void => {
    it('should be a radio button', (): void => {
      const { getByRole } = render(<Radio label="Test radio" />);

      getByRole('radio', { name: 'Test radio' });
    });
  });
}
