import { userEvent } from 'vitest/browser';
import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Slider } = await importTestedDesignSystem();

describe('Slider', (): void => {
  it('should expose a named horizontal slider with the default range', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <Slider label="Volume" onChange={handleChange} value={50} />,
    );

    const slider: HTMLElement = getByName('slider', 'Volume');
    expect(slider.tagName).toBe('INPUT');
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveValue('50');
  });

  it('should support custom range values and vertical orientation', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <Slider
        label="Zoom"
        onChange={handleChange}
        max={3}
        min={1}
        orientation="vertical"
        value={2}
      />,
    );

    const slider: HTMLElement = getByName('slider', 'Zoom');
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');
    expect(slider).toHaveAttribute('aria-valuemax', '3');
    expect(slider).toHaveAttribute('aria-valuemin', '1');
    expect(slider).toHaveAttribute('aria-valuenow', '2');
    expect(slider).toHaveAttribute('max', '3');
    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveValue('2');
  });

  it('should use the visible label as the accessible name', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <Slider label="Search radius" onChange={handleChange} value={25} />,
    );

    expect(getByName('slider', 'Search radius')).toHaveAttribute(
      'aria-valuenow',
      '25',
    );
  });

  it('should be keyboard focusable', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByName, tab } = render(
      <Slider label="Brightness" onChange={handleChange} value={50} />,
    );

    const slider: HTMLElement = getByName('slider', 'Brightness');
    await tab();
    expect(slider).toHaveFocus();
  });

  it('should add to and subtract from the value with directional keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByName, rerender, tab } = render(
      <Slider label="Balance" onChange={handleChange} value={50} />,
    );

    const slider: HTMLElement = getByName('slider', 'Balance');
    await tab();
    expect(slider).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(51);

    rerender(<Slider label="Balance" onChange={handleChange} value={51} />);
    await userEvent.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenNthCalledWith(2, 50);
  });

  it('should report numeric change values from direct input changes', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <Slider label="Threshold" onChange={handleChange} value={40} />,
    );

    await userEvent.fill(getByName('slider', 'Threshold'), '65');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(65);
  });
});
