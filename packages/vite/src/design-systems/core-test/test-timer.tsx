import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TimerProps } from '../core/timer-props.js';

export default function testTimer(Timer: ComponentType<TimerProps>): void {
  describe('Timer', (): void => {
    it('should be a timer', (): void => {
      const { getByName } = render(<Timer label="Test timer">00:00</Timer>);

      getByName('timer', 'Test timer');
    });
  });
}
