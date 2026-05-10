import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Switch } = await importTestedDesignSystem();

const handleToggle = vi.fn();

describe('Switch', (): void => {
  it('should emit a toggle event', async (): Promise<void> => {
    const { click, getByName } = render(
      <Switch label="Togglable" on onToggle={handleToggle} />,
    );

    const switchElement: HTMLElement = getByName('switch', 'Togglable');
    await click(switchElement);
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(false);
  });
});
