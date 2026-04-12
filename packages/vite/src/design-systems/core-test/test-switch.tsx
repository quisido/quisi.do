import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SwitchProps } from '../core/switch-props.js';

export default function testSwitch(Switch: ComponentType<SwitchProps>): void {
  describe('Switch', (): void => {
    it('should be a switch', (): void => {
      const { getByName } = render(<Switch label="Test switch" />);

      getByName('switch', 'Test switch');
    });
  });
}
