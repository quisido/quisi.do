import { type ARIARole } from 'aria-query';
import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { SpinButtonProps } from '../core/spin-button-props.js';
import { ARIA_ROLES } from './aria-roles.js';
import { userEvent } from 'vitest/browser';

const handleTestChange = vi.fn();

const ROLE_LIMITS: ReadonlyMap<ARIARole, number> = new Map([
  ['button', 2],
  ['spinbutton', 1],
  ['textbox', 1],
]);

export default function testSpinButton(
  SpinButton: ComponentType<SpinButtonProps>,
): void {
  describe('SpinButton', (): void => {
    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('must limit accessibility children to a textbox and/or two buttons', (): void => {
      const { getRoleCount } = render(
        <SpinButton
          label="Test spin button"
          onChange={handleTestChange}
          value={1}
        />,
      );

      for (const role of ARIA_ROLES) {
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
      const { getByName, getOptionalByRole } = render(
        <SpinButton
          label="Textbox focus"
          onChange={handleTestChange}
          value={1}
        />,
      );

      const spinButton: HTMLElement = getByName('spinbutton', 'Textbox focus');
      const textbox: HTMLElement | null = getOptionalByRole('textbox');
      spinButton.focus();

      if (textbox === null) {
        expect(window.document.activeElement).toBe(spinButton);
        expect(spinButton).toHaveFocus();
        return;
      }

      expect(window.document.activeElement).toBe(textbox);
      expect(textbox).toHaveFocus();
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should be incremented by the up arrow key', async (): Promise<void> => {
      const { getByName } = render(
        <SpinButton
          label="Increment key"
          onChange={handleTestChange}
          step={2}
          value={1}
        />,
      );

      const spinButton: HTMLElement = getByName('spinbutton', 'Increment key');
      spinButton.focus();

      await userEvent.keyboard('{ArrowUp}');

      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith(3);
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should be decremented by the down arrow key', async (): Promise<void> => {
      const { getByName } = render(
        <SpinButton
          label="Decrement key"
          onChange={handleTestChange}
          step={2}
          value={3}
        />,
      );

      const spinButton: HTMLElement = getByName('spinbutton', 'Decrement key');
      spinButton.focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith(1);
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should not include the increment and decrement buttons in the primary navigation ring (the Tab ring)', async (): Promise<void> => {
      const { getByName } = render(
        <SpinButton label="Tab ring" onChange={handleTestChange} value={1} />,
      );

      const spinButton: HTMLElement = getByName('spinbutton', 'Tab ring');
      spinButton.focus();

      await userEvent.keyboard('{Tab}');
      expect(window.document.activeElement).toBe(spinButton);
      expect(spinButton).toHaveFocus();

      await userEvent.keyboard('{Tab}');
      expect(window.document.activeElement).toBe(spinButton);
      expect(spinButton).toHaveFocus();
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should set the `aria-valuenow` attribute when it has a value', (): void => {
      const { getByValue } = render(
        <SpinButton label="Value" onChange={handleTestChange} value={50} />,
      );

      getByValue('spinbutton', 'Value', 50);
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should set the `aria-valuemin` attribute when it has a minimum value', (): void => {
      const { getByMinValue } = render(
        <SpinButton
          label="Min"
          onChange={handleTestChange}
          min={25}
          value={50}
        />,
      );

      getByMinValue('spinbutton', 'Min', 25);
    });

    /** @see {@link https://w3c.github.io/aria/#spinbutton | Source} */
    it('should set the `aria-valuemax` attribute when it has a maximum value', (): void => {
      const { getByMaxValue } = render(
        <SpinButton
          label="Max"
          onChange={handleTestChange}
          max={75}
          value={50}
        />,
      );

      getByMaxValue('spinbutton', 'Max', 75);
    });
  });
}
