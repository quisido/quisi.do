import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TimeProps } from '../core/time-props.js';

export default function testTime(Time: ComponentType<TimeProps>): void {
  describe('Time', (): void => {
    it('should be a time', (): void => {
      const { getByRole } = render(<Time>2003-02-01</Time>);
      getByRole('time');
    });
  });
}
