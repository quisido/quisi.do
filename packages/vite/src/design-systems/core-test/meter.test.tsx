import { describe, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Meter } = await importTestedDesignSystem();

describe('Meter', (): void => {
  it('should default to a minimum of 0', (): void => {
    const { expectToHaveThrown } = render(<Meter value={-1} />);
    expectToHaveThrown(
      "A meter's value cannot be less than its minimum: -1 < 0",
    );
  });

  it('should default to a maximum of 100', (): void => {
    const { expectToHaveThrown } = render(<Meter value={101} />);
    expectToHaveThrown(
      "A meter's value cannot be greater than its maximum: 101 > 100",
    );
  });

  it('should support values', (): void => {
    const { getByValue } = render(
      <>
        <span id="test-value-label-id">Test value</span>
        <Meter labelledBy="test-value-label-id" value={50} />
      </>,
    );

    getByValue('meter', 'Test value', 50);
  });
});
