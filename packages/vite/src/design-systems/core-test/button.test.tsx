import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import noop from '../../utils/noop.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Button } = await importTestedDesignSystem();

describe('Button', (): void => {
  it('should be a command button', (): void => {
    const { getByName } = render(
      <Button onClick={vi.fn()}>Command button</Button>,
    );

    const button: HTMLElement = getByName('button', 'Command button');
    expect(button).not.toHaveAttribute('aria-pressed');
  });

  it('should be tabbable', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Button onClick={noop}>Tab button</Button>,
    );

    const button: HTMLElement = getByName('button', 'Tab button');
    await tab();
    expect(button).toHaveFocus();
  });

  it('should support click events', async (): Promise<void> => {
    const handleClick = vi.fn();
    const { clickButton } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );

    await clickButton('Click me');
    expect(handleClick).toHaveBeenCalledExactlyOnceWith();
  });

  it('should support disabled', (): void => {
    const { getByName } = render(
      <Button disabled onClick={noop}>
        Disabled
      </Button>,
    );
    expect(getByName('button', 'Disabled')).toBeDisabled();
  });

  it('should support the Enter key', async (): Promise<void> => {
    const handleClick = vi.fn();
    const { enter, focus, getByName } = render(
      <Button onClick={handleClick}>Enter button</Button>,
    );

    const button: HTMLElement = getByName('button', 'Enter button');
    focus(button);
    await enter();
    expect(handleClick).toHaveBeenCalledExactlyOnceWith();
  });

  it('should support the Space key', async (): Promise<void> => {
    const handleClick = vi.fn();
    const { focus, getByName, space } = render(
      <Button onClick={handleClick}>Space button</Button>,
    );

    const button: HTMLElement = getByName('button', 'Space button');
    focus(button);
    await space();
    expect(handleClick).toHaveBeenCalledExactlyOnceWith();
  });
});
