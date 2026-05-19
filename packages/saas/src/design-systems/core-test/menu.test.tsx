import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Menu } = await importTestedDesignSystem();

describe('Menu', (): void => {
  it('should expose a popup-style menu of choices', (): void => {
    const { getByRole, getRoleCount } = render(
      <Menu
        items={[
          { children: 'Cut', key: 'cut' },
          { children: 'Copy', key: 'copy' },
          { children: 'Paste', key: 'paste' },
        ]}
      />,
    );

    const menu: HTMLElement = getByRole('menu');
    expect(menu).toHaveTextContent('CutCopyPaste');
    expect(getRoleCount('menu')).toBe(1);
    expect(getRoleCount('menuitem')).toBe(3);
  });

  it('should default to vertical orientation', (): void => {
    const { getByRole } = render(
      <Menu items={[{ children: 'Vertical item', key: 'vertical' }]} />,
    );

    expect(getByRole('menu')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should support horizontal orientation', (): void => {
    const { getByRole } = render(
      <Menu
        items={[{ children: 'Horizontal item', key: 'horizontal' }]}
        orientation="horizontal"
      />,
    );

    expect(getByRole('menu')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should expose submenu items as popup triggers', (): void => {
    const { getByName } = render(
      <Menu
        items={[
          {
            children: 'More options',
            items: [{ children: 'Export', key: 'export' }],
            key: 'more',
          },
        ]}
      />,
    );

    expect(getByName('menuitem', 'More options')).toHaveAttribute(
      'aria-haspopup',
      'true',
    );
  });

  it('should manage focus among enabled menu items', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Menu
        items={[
          { children: 'First', key: 'first' },
          { children: 'Unavailable', disabled: true, key: 'unavailable' },
          { children: 'Second', key: 'second' },
          { children: 'Third', key: 'third' },
        ]}
      />,
    );

    const first: HTMLElement = getByName('menuitem', 'First');
    const unavailable: HTMLElement = getByName('menuitem', 'Unavailable');
    const second: HTMLElement = getByName('menuitem', 'Second');
    const third: HTMLElement = getByName('menuitem', 'Third');

    expect(first).toHaveAttribute('tabindex', '0');
    expect(unavailable).toHaveAttribute('aria-disabled', 'true');
    expect(unavailable).toHaveAttribute('tabindex', '-1');
    expect(second).toHaveAttribute('tabindex', '-1');

    await tab();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(third).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(third).toHaveFocus();
  });

  it('should activate and dismiss menu items when clicked', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    const handleSelect = vi.fn();
    const { click, getByName } = render(
      <Menu
        items={[
          { children: 'Archive', key: 'archive', onSelect: handleSelect },
        ]}
        onDismiss={handleDismiss}
      />,
    );

    await click(getByName('menuitem', 'Archive'));
    expect(handleSelect).toHaveBeenCalledExactlyOnceWith();
    expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
  });

  it('should activate and dismiss menu items with the keyboard', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    const handleFirstSelect = vi.fn();
    const handleSecondSelect = vi.fn();
    const { enter, getByName, tab } = render(
      <Menu
        items={[
          { children: 'Rename', key: 'rename', onSelect: handleFirstSelect },
          { children: 'Delete', key: 'delete', onSelect: handleSecondSelect },
        ]}
        onDismiss={handleDismiss}
      />,
    );

    await tab();
    expect(getByName('menuitem', 'Rename')).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(getByName('menuitem', 'Delete')).toHaveFocus();
    await enter();
    expect(handleFirstSelect).not.toHaveBeenCalled();
    expect(handleSecondSelect).toHaveBeenCalledExactlyOnceWith();
    expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
  });

  it('should not activate disabled items', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    const handleSelect = vi.fn();
    const { click, getByName } = render(
      <Menu
        items={[
          {
            children: 'Disabled action',
            disabled: true,
            key: 'disabled',
            onSelect: handleSelect,
          },
        ]}
        onDismiss={handleDismiss}
      />,
    );

    await click(getByName('menuitem', 'Disabled action'));
    expect(handleSelect).not.toHaveBeenCalled();
    expect(handleDismiss).not.toHaveBeenCalled();
  });
});
