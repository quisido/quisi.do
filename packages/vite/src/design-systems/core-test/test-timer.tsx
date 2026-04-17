import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { TimerProps } from '../core/timer-props.js';

export default function testTimer(Timer: ComponentType<TimerProps>): void {
  describe('Timer', (): void => {
    it('should be a timer', (): void => {
      const { getByRole } = render(<Timer>00:00</Timer>);
      expect(getByRole('timer')).toHaveTextContent('00:00');
    });
  });
}
