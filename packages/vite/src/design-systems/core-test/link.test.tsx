import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const handleTestClick = vi.fn();

const { Link } = await importTestedDesignSystem();

describe('Link', (): void => {
  it('must be focusable', async (): Promise<void> => {
    const { enter, focus, getByName } = render(
      <Link href="https://quisido.dev/vitest" onClick={handleTestClick}>
        Keyboard test
      </Link>,
    );

    const link: HTMLElement = getByName('link', 'Keyboard test');
    focus(link);
    expect(link).toHaveFocus();
    await enter();
    expect(handleTestClick).toHaveBeenCalledExactlyOnceWith();
  });

  it('should support relative links', (): void => {
    const { getByName } = render(<Link href="/vitest">Relative test</Link>);
    getByName('link', 'Relative test');
  });
});
