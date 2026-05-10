import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Slider } = await importTestedDesignSystem();

const handleTestChange = vi.fn();

describe('Slider', (): void => {
  it('should be a slider', (): void => {
    const { getByName } = render(
      <Slider
        label="Slider"
        onChange={handleTestChange}
        max={3}
        min={1}
        orientation="vertical"
        value={2}
      />,
    );

    const slider: HTMLElement = getByName('slider', 'Slider');
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');
    expect(slider).toHaveAttribute('aria-valuemax', '3');
    expect(slider).toHaveAttribute('aria-valuemin', '1');
    expect(slider).toHaveAttribute('aria-valuenow', '2');
  });

  it('should have defaults', (): void => {
    const { getByName } = render(
      <Slider label="Defaults" onChange={handleTestChange} value={50} />,
    );

    const slider: HTMLElement = getByName('slider', 'Defaults');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });
});
