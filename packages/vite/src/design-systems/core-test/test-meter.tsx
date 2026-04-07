import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MeterProps } from '../core/meter-props.js';

export default function testMeter(Meter: ComponentType<MeterProps>): void {
  describe('Meter', (): void => {
    it('should support internal labels', (): void => {
      const { getByRole } = render(<Meter label="Test label" value={1} />);
      getByRole('meter', { name: 'Test label' });
    });

    it('should support external labels', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test labelled by</span>
          <Meter labelledBy="test-id" value={1} />
        </>,
      );
      getByRole('meter', { name: 'Test labelled by' });
    });

    it('should support values', (): void => {
      const { getByRole } = render(
        <Meter label="Test value label" value={2} />,
      );
      getByRole('meter', { value: { now: 2 } });
    });
  });
}
