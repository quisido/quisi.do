import type { ComponentType } from 'react';
import type { ToggleButtonProps } from '../core/toggle-button-props.js';
import { describe, expect, it, vi } from 'vitest';
import render from './render.jsx';
import noop from '../../utils/noop.js';

export default function testToggleButton(
  ToggleButton: ComponentType<ToggleButtonProps>,
): void {
  describe('ToggleButton', (): void => {
    it('should be tabbable', async (): Promise<void> => {
      const { getByName, tab } = render(
        <ToggleButton onPress={noop} onUnpress={noop} pressed>
          Tabbable
        </ToggleButton>,
      );

      const button: HTMLElement = getByName('button', 'Tabbable');
      await tab();
      expect(button).toHaveFocus();
    });

    it('should support disabled', (): void => {
      const { getByName } = render(
        <ToggleButton disabled onPress={noop} onUnpress={noop} pressed={false}>
          Disabled
        </ToggleButton>,
      );
      expect(getByName('button', 'Disabled')).toBeDisabled();
    });

    it('should support press events', async (): Promise<void> => {
      const handlePress = vi.fn();
      const { clickButton, getByName } = render(
        <ToggleButton onPress={handlePress} onUnpress={noop} pressed={false}>
          Press me
        </ToggleButton>,
      );

      const toggleButton: HTMLElement = getByName('button', 'Press me');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
      await clickButton('Press me');
      expect(handlePress).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support the Enter key', async (): Promise<void> => {
      const handlePress = vi.fn();
      const { enter, focus, getByName } = render(
        <ToggleButton onPress={handlePress} onUnpress={noop} pressed={false}>
          Enter button
        </ToggleButton>,
      );

      const button: HTMLElement = getByName('button', 'Enter button');
      focus(button);
      await enter();
      expect(handlePress).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support the Space key', async (): Promise<void> => {
      const handlePress = vi.fn();
      const { getByName, space } = render(
        <ToggleButton onPress={handlePress} onUnpress={noop} pressed={false}>
          Space button
        </ToggleButton>,
      );

      const button: HTMLElement = getByName('button', 'Space button');
      button.focus();
      await space();
      expect(handlePress).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support unpress events', async (): Promise<void> => {
      const handleUnpress = vi.fn();
      const { clickButton, getByName } = render(
        <ToggleButton onPress={noop} onUnpress={handleUnpress} pressed>
          Unpress me
        </ToggleButton>,
      );

      const toggleButton: HTMLElement = getByName('button', 'Unpress me');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
      await clickButton('Unpress me');
      expect(handleUnpress).toHaveBeenCalledExactlyOnceWith();
    });
  });
}
