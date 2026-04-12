import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SpinButtonProps } from '../core/spin-button-props.js';

export default function testSpinButton(
  SpinButton: ComponentType<SpinButtonProps>,
): void {
  describe('SpinButton', (): void => {
    it('should be a spin button', (): void => {
      const { getByName } = render(<SpinButton label="Test spin button" />);

      getByName('spinbutton', 'Test spin button');
    });
  });
}
