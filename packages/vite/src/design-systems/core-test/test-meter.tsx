import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MeterProps } from '../core/meter-props.js';
import render from './render.js';

export default function testMeter(Meter: ComponentType<MeterProps>): void {
  describe('Meter', (): void => {
    it('should support internal labels', (): void => {
      const { getByName } = render(<Meter label="Test label" value={1} />);
      getByName('meter', 'Test label');
    });

    it('should support external labels', (): void => {
      const { getByName } = render(
        <>
          <span id="test-meter-label-id">Test labelled by</span>
          <Meter labelledBy="test-meter-label-id" value={1} />
        </>,
      );
      getByName('meter', 'Test labelled by');
    });

    it('should support values', (): void => {
      const { getByValue } = render(
        <Meter label="Test value label" value={2} />,
      );

      // eslint-disable-next-line no-magic-numbers
      getByValue('meter', 2);
    });
  });
}
