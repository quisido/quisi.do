import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TimeProps } from '../core/time-props.js';

export default function testTime(Time: ComponentType<TimeProps>): void {
  describe('Time', (): void => {
    it('should be a time', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Time describedBy="test-id">2018-07-07</Time>
        </>,
      );
      getByRole('time', { description: 'Test description' });
    });
  });
}
