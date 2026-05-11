import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import { type DesignSystemRole, ROLES } from './roles.js';
import { userEvent } from 'vitest/browser';
import importTestedDesignSystem from './import-tested-design-system.js';

const handleChange = vi.fn();

const ROLE_LIMITS: ReadonlyMap<DesignSystemRole, number> = new Map([
  ['button', 2],
  ['spinbutton', 1],
  ['textbox', 1],
]);

const { SpinButton } = await importTestedDesignSystem();

describe('SpinButton', (): void => {
  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('must limit accessibility children to a textbox and/or two buttons', (): void => {
    const { getRoleCount } = render(
      <SpinButton label="Test spin button" onChange={handleChange} value={1} />,
    );

    for (const role of ROLES) {
      if (role === 'generic') {
        continue;
      }

      const count: number = getRoleCount(role);
      const limit: number = ROLE_LIMITS.get(role) ?? 0;
      expect(count, `${role} count`).toBeLessThanOrEqual(limit);
    }
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should focus the textbox if present', (): void => {
    const { focus, getByName, getOptionalByRole } = render(
      <SpinButton label="Textbox focus" onChange={handleChange} value={1} />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Textbox focus');
    const textbox: HTMLElement | null = getOptionalByRole('textbox');
    focus(spinButton);

    if (textbox === null) {
      expect(spinButton).toHaveFocus();
      return;
    }

    expect(textbox).toHaveFocus();
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should be incremented by the up arrow key', async (): Promise<void> => {
    const { focus, getByName } = render(
      <SpinButton
        label="Increment key"
        onChange={handleChange}
        step={2}
        value={1}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Increment key');
    focus(spinButton);
    await userEvent.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(3);
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should be decremented by the down arrow key', async (): Promise<void> => {
    const { getByName, tab } = render(
      <SpinButton
        label="Decrement key"
        onChange={handleChange}
        step={2}
        value={3}
      />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Decrement key');
    await tab();
    expect(spinButton).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(1);
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should not include the increment and decrement buttons in the primary navigation ring (the Tab ring)', async (): Promise<void> => {
    const { getByName, tab } = render(
      <SpinButton label="Tab ring" onChange={handleChange} value={1} />,
    );

    const spinButton: HTMLElement = getByName('spinbutton', 'Tab ring');
    await tab();
    expect(spinButton).toHaveFocus();
    await tab();
    expect(spinButton).toHaveFocus();
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should set the `aria-valuenow` attribute when it has a value', (): void => {
    const { getByValue } = render(
      <SpinButton label="Value" onChange={handleChange} value={50} />,
    );

    getByValue('spinbutton', 'Value', 50);
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should set the `aria-valuemin` attribute when it has a minimum value', (): void => {
    const { getByMinValue } = render(
      <SpinButton label="Min" onChange={handleChange} min={25} value={50} />,
    );

    getByMinValue('spinbutton', 'Min', 25);
  });

  /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
  it('should set the `aria-valuemax` attribute when it has a maximum value', (): void => {
    const { getByMaxValue } = render(
      <SpinButton label="Max" onChange={handleChange} max={75} value={50} />,
    );

    getByMaxValue('spinbutton', 'Max', 75);
  });
});
