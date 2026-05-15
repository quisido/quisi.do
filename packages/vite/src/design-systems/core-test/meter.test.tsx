import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Meter } = await importTestedDesignSystem();

describe('Meter', (): void => {
  it('should expose a scalar measurement within a known range', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <span id="test-meter-label-id">Storage used</span>
        <Meter labelledBy="test-meter-label-id" value={50} />
      </>,
    );

    const meter: HTMLElement = getByName('meter', 'Storage used');
    expect(meter.tagName).toBe('METER');
    expect(meter).toHaveAttribute('aria-labelledby', 'test-meter-label-id');
    expect(meter).toHaveAttribute('aria-valuenow', '50');
    expect(getRoleCount('meter')).toBe(1);
    expect(getRoleCount('progressbar')).toBe(0);
  });

  describe('min', (): void => {
    it('should default to 0', (): void => {
      const { getByMinValue } = render(
        <>
          <span id="test-default-min-label-id">Default minimum</span>
          <Meter labelledBy="test-default-min-label-id" value={50} />
        </>,
      );

      const meter: HTMLElement = getByMinValue('meter', 'Default minimum', 0);
      expect(meter).toHaveAttribute('aria-valuemin', '0');
      expect(meter).toHaveAttribute('min', '0');
    });

    it('should be supported', (): void => {
      const { getByMinValue } = render(
        <>
          <span id="test-custom-min-label-id">Custom minimum</span>
          <Meter labelledBy="test-custom-min-label-id" min={20} value={60} />
        </>,
      );

      const meter: HTMLElement = getByMinValue('meter', 'Custom minimum', 20);
      expect(meter).toHaveAttribute('aria-valuemin', '20');
      expect(meter).toHaveAttribute('min', '20');
    });

    it('should reject values below the computed minimum', (): void => {
      const { expectToHaveThrown } = render(<Meter min={10} value={9} />);
      expectToHaveThrown(
        "A meter's value cannot be less than its minimum: 9 < 10",
      );
    });
  });

  describe('max', (): void => {
    it('should default to 100', (): void => {
      const { getByMaxValue } = render(
        <>
          <span id="test-default-max-label-id">Default maximum</span>
          <Meter labelledBy="test-default-max-label-id" value={50} />
        </>,
      );

      const meter: HTMLElement = getByMaxValue('meter', 'Default maximum', 100);
      expect(meter).toHaveAttribute('aria-valuemax', '100');
      expect(meter).toHaveAttribute('max', '100');
    });

    it('should be supported', (): void => {
      const { getByMaxValue } = render(
        <>
          <span id="test-custom-max-label-id">Custom maximum</span>
          <Meter labelledBy="test-custom-max-label-id" max={80} value={60} />
        </>,
      );

      const meter: HTMLElement = getByMaxValue('meter', 'Custom maximum', 80);
      expect(meter).toHaveAttribute('aria-valuemax', '80');
      expect(meter).toHaveAttribute('max', '80');
    });

    it('should reject values above the computed maximum', (): void => {
      const { expectToHaveThrown } = render(<Meter max={10} value={11} />);
      expectToHaveThrown(
        "A meter's value cannot be greater than its maximum: 11 > 10",
      );
    });
  });

  describe('value', (): void => {
    it('should support scalar values', (): void => {
      const { getByValue } = render(
        <>
          <span id="test-value-label-id">Test value</span>
          <Meter labelledBy="test-value-label-id" value={50} />
        </>,
      );

      getByValue('meter', 'Test value', 50);
    });

    it('should support fractional values', (): void => {
      const { getByValue } = render(
        <>
          <span id="test-fraction-label-id">Completion ratio</span>
          <Meter labelledBy="test-fraction-label-id" max={1} value={0.75} />
        </>,
      );

      const meter: HTMLElement = getByValue('meter', 'Completion ratio', 0.75);
      expect(meter).toHaveAttribute('aria-valuenow', '0.75');
      expect(meter).toHaveAttribute('value', '0.75');
    });
  });

  describe('thresholds', (): void => {
    it('should expose low, high, and optimum as native meter attributes only', (): void => {
      const { getByName } = render(
        <>
          <span id="test-threshold-label-id">Battery charge</span>
          <Meter
            high={80}
            labelledBy="test-threshold-label-id"
            low={20}
            optimum={90}
            value={60}
          />
        </>,
      );

      const meter: HTMLElement = getByName('meter', 'Battery charge');
      expect(meter).toHaveAttribute('low', '20');
      expect(meter).toHaveAttribute('high', '80');
      expect(meter).toHaveAttribute('optimum', '90');
      expect(meter).not.toHaveAttribute('aria-valuelow');
      expect(meter).not.toHaveAttribute('aria-valuehigh');
      expect(meter).not.toHaveAttribute('aria-valueoptimum');
    });

    it('should reject threshold values outside the meter range', (): void => {
      const { expectToHaveThrown } = render(
        <Meter high={101} low={-1} optimum={102} value={50} />,
      );

      expectToHaveThrown(
        "A meter's high threshold cannot be greater than its maximum value: 101 > 100",
      );
    });
  });
});
