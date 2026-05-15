import render from './render.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import importTestedDesignSystem from './import-tested-design-system.js';

const handleChange = vi.fn();

const { SpinButton } = await importTestedDesignSystem();

describe('SpinButton', (): void => {
  beforeEach((): void => {
    handleChange.mockClear();
  });

  it('should expose a named numeric spinbutton with its current value', (): void => {
    const { getByName, getByValue } = render(
      <SpinButton
        label="Quantity"
        name="quantity"
        onChange={handleChange}
        value={5}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Quantity');
    expect(spinButton.tagName).toBe('INPUT');
    expect(spinButton).toHaveAttribute('type', 'number');
    expect(spinButton).toHaveAttribute('name', 'quantity');
    expect(spinButton).toHaveAttribute('aria-valuenow', '5');
    expect(spinButton).toHaveValue(5);
    expect(getByValue('spinbutton', 'Quantity', 5)).toBe(spinButton);
  });

  it('should set minimum and maximum values when the range is bounded', (): void => {
    const { getByMaxValue, getByMinValue, getByName } = render(
      <SpinButton
        label="Bounded quantity"
        max={75}
        min={25}
        onChange={handleChange}
        value={50}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Bounded quantity');
    expect(spinButton).toHaveAttribute('aria-valuemax', '75');
    expect(spinButton).toHaveAttribute('aria-valuemin', '25');
    expect(spinButton).toHaveAttribute('max', '75');
    expect(spinButton).toHaveAttribute('min', '25');
    expect(getByMinValue('spinbutton', 'Bounded quantity', 25)).toBe(
      spinButton,
    );
    expect(getByMaxValue('spinbutton', 'Bounded quantity', 75)).toBe(
      spinButton,
    );
  });

  it('should omit minimum and maximum attributes when the range is unbounded', (): void => {
    const { getByName } = render(
      <SpinButton label="Unbounded" onChange={handleChange} value={1} />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Unbounded');
    expect(spinButton).not.toHaveAttribute('aria-valuemin');
    expect(spinButton).not.toHaveAttribute('aria-valuemax');
    expect(spinButton).not.toHaveAttribute('min');
    expect(spinButton).not.toHaveAttribute('max');
  });

  it('should limit accessibility descendants to the native input implementation', (): void => {
    const { getRoleCount } = render(
      <SpinButton
        label="Native spinbutton"
        onChange={handleChange}
        value={1}
      />,
    );

    expect(getRoleCount('spinbutton')).toBe(1);
    expect(getRoleCount('textbox')).toBe(0);
    expect(getRoleCount('button')).toBe(0);
  });

  it('should place focus on the spinbutton input in the primary tab ring', async (): Promise<void> => {
    const { getByName, tab } = render(
      <SpinButton
        label="Focusable quantity"
        onChange={handleChange}
        value={1}
      />,
    );

    const spinButton: HTMLElement = getByName(
      'spinbutton',
      'Focusable quantity',
    );
    await tab();
    expect(spinButton).toHaveFocus();
  });

  it('should increment by the configured step with the up arrow key', async (): Promise<void> => {
    const { getByName } = render(
      <SpinButton
        label="Increment key"
        onChange={handleChange}
        step={2}
        value={1}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Increment key');
    spinButton.focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('should decrement by the configured step with the down arrow key', async (): Promise<void> => {
    const { getByName } = render(
      <SpinButton
        label="Decrement key"
        onChange={handleChange}
        step={2}
        value={3}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Decrement key');
    spinButton.focus();
    expect(spinButton).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(1);
  });

  it('should emit numeric values when edited as text', async (): Promise<void> => {
    const { getByName } = render(
      <SpinButton
        label="Editable quantity"
        onChange={handleChange}
        value={1}
      />,
    );

    await userEvent.fill(getByName('spinbutton', 'Editable quantity'), '42');
    expect(handleChange).toHaveBeenCalledWith(42);
  });

  it('should ignore text input that cannot be parsed as a number', async (): Promise<void> => {
    const { getByName, type } = render(
      <SpinButton label="Numeric only" onChange={handleChange} value={1} />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Numeric only');
    await type(spinButton, 'abc');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
