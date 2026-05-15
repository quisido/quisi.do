import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Link } = await importTestedDesignSystem();

describe('Link', (): void => {
  it('should expose an internal resource as a native link', (): void => {
    const { getByName, getRoleCount } = render(
      <Link href="/vitest">Internal resource</Link>,
    );

    const link: HTMLElement = getByName('link', 'Internal resource');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/vitest');
    expect(getRoleCount('link')).toBe(1);
  });

  it('should expose an external resource as a native link', (): void => {
    const { getByName } = render(
      <Link href="https://quisido.dev/vitest">External resource</Link>,
    );

    const link: HTMLElement = getByName('link', 'External resource');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://quisido.dev/vitest');
    expect(link).toHaveAttribute('rel', 'nofollow noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should be tabbable', async (): Promise<void> => {
    const { getByName, tab } = render(<Link href="/vitest">Tab target</Link>);

    const link: HTMLElement = getByName('link', 'Tab target');
    await tab();
    expect(link).toHaveFocus();
  });

  it('should support the Enter key', async (): Promise<void> => {
    const initialUrl: string = window.location.href;
    const handleClick = vi.fn();
    const { enter, getByName, tab } = render(
      <Link href="#keyboard-link" onClick={handleClick}>
        Keyboard resource
      </Link>,
    );

    try {
      const link: HTMLElement = getByName('link', 'Keyboard resource');
      await tab();
      expect(link).toHaveFocus();
      await enter();
      expect(handleClick).toHaveBeenCalledExactlyOnceWith();
      expect(window.location.hash).toBe('#keyboard-link');
    } finally {
      window.history.replaceState(null, '', initialUrl);
    }
  });

  it('should not support the Space key', async (): Promise<void> => {
    const handleClick = vi.fn();
    const { getByName, space, tab } = render(
      <Link href="#space-link" onClick={handleClick}>
        Space resource
      </Link>,
    );

    const link: HTMLElement = getByName('link', 'Space resource');
    await tab();
    expect(link).toHaveFocus();
    await space();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should preserve native navigation when click handlers run', (): void => {
    const initialUrl: string = window.location.href;
    const handleClick = vi.fn();
    const { getByName } = render(
      <Link href="#tracked-resource" onClick={handleClick}>
        Tracked resource
      </Link>,
    );

    try {
      const link: HTMLElement = getByName('link', 'Tracked resource');
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });

      expect(link.dispatchEvent(event)).toBe(true);
      expect(event.defaultPrevented).toBe(false);
      expect(handleClick).toHaveBeenCalledExactlyOnceWith();
      expect(window.location.hash).toBe('#tracked-resource');
    } finally {
      window.history.replaceState(null, '', initialUrl);
    }
  });
});
