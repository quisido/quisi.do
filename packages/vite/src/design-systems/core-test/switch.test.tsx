import render from './render.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Switch } = await importTestedDesignSystem();

const handleToggle = vi.fn();

describe('Switch', (): void => {
  beforeEach((): void => {
    handleToggle.mockClear();
  });

  it('should expose an on switch with a true checked state', (): void => {
    const { getByName, getRoleCount } = render(
      <Switch label="Airplane mode" on onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Airplane mode');
    expect(switchElement.tagName).toBe('INPUT');
    expect(switchElement).toHaveAttribute('type', 'checkbox');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect((switchElement as HTMLInputElement).checked).toBe(true);
    expect(getRoleCount('switch')).toBe(1);
    expect(getRoleCount('checkbox')).toBe(0);
  });

  it('should expose an off switch with a false checked state', (): void => {
    const { getByName } = render(
      <Switch label="Notifications" on={false} onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Notifications');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect((switchElement as HTMLInputElement).checked).toBe(false);
  });

  it('should never expose the invalid mixed switch state', (): void => {
    const { getByName, rerender } = render(
      <Switch label="Power" on={false} onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Power');
    expect(switchElement).not.toHaveAttribute('aria-checked', 'mixed');
    rerender(<Switch label="Power" on onToggle={handleToggle} />);
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).not.toHaveAttribute('aria-checked', 'mixed');
  });

  it('should emit an off value when an on switch is clicked', async (): Promise<void> => {
    const { click, getByName } = render(
      <Switch label="Togglable" on onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Togglable');
    await click(switchElement);
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('should emit an on value when an off switch is clicked', async (): Promise<void> => {
    const { click, getByName } = render(
      <Switch label="Dark mode" on={false} onToggle={handleToggle} />,
    );

    await click(getByName('switch', 'Dark mode'));
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('should toggle with the Space key when focused', async (): Promise<void> => {
    const { getByName } = render(
      <Switch label="Keyboard switch" on={false} onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Keyboard switch');
    switchElement.focus();
    expect(switchElement).toHaveFocus();
    await userEvent.keyboard('[Space]');
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('should be reachable in the primary tab ring', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Switch label="Focusable switch" on={false} onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Focusable switch');
    await tab();
    expect(switchElement).toHaveFocus();
  });
});
