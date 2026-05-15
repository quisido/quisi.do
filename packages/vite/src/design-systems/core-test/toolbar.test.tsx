import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Button, Toolbar } = await importTestedDesignSystem();

describe('Toolbar', (): void => {
  it('should expose a named collection of function controls', (): void => {
    const { getByName, getRoleCount } = render(
      <Toolbar label="Formatting">
        <Button onClick={vi.fn()}>Bold</Button>
        <Button onClick={vi.fn()}>Italic</Button>
      </Toolbar>,
    );

    const toolbar: HTMLElement = getByName('toolbar', 'Formatting');
    const bold: HTMLElement = getByName('button', 'Bold');
    const italic: HTMLElement = getByName('button', 'Italic');

    expect(toolbar).toContainElement(bold);
    expect(toolbar).toContainElement(italic);
    expect(getRoleCount('toolbar')).toBe(1);
    expect(getRoleCount('button')).toBe(2);
  });

  it('should support a direct accessible label', (): void => {
    const { getByName } = render(
      <Toolbar label="Canvas tools">Test children</Toolbar>,
    );

    const toolbar: HTMLElement = getByName('toolbar', 'Canvas tools');
    expect(toolbar).toHaveAttribute('aria-label', 'Canvas tools');
    expect(toolbar).not.toHaveAttribute('aria-labelledby');
  });

  it('should support a visible label referenced by aria-labelledby', (): void => {
    const { getByName } = render(
      <>
        <h2 id="text-tools-heading">Text tools</h2>
        <Toolbar labelledBy="text-tools-heading">Test children</Toolbar>
      </>,
    );

    const toolbar: HTMLElement = getByName('toolbar', 'Text tools');
    expect(toolbar).toHaveAttribute('aria-labelledby', 'text-tools-heading');
    expect(toolbar).not.toHaveAttribute('aria-label');
  });

  it('should distinguish multiple toolbars by label', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <Toolbar label="Text formatting">
          <Button onClick={vi.fn()}>Bold</Button>
        </Toolbar>
        <Toolbar label="History">
          <Button onClick={vi.fn()}>Undo</Button>
        </Toolbar>
      </>,
    );

    expect(getByName('toolbar', 'Text formatting')).toContainElement(
      getByName('button', 'Bold'),
    );
    expect(getByName('toolbar', 'History')).toContainElement(
      getByName('button', 'Undo'),
    );
    expect(getRoleCount('toolbar')).toBe(2);
  });

  it('should preserve click behavior of controls inside the toolbar', async (): Promise<void> => {
    const handleBold = vi.fn();
    const handleItalic = vi.fn();
    const { clickButton } = render(
      <Toolbar label="Clickable formatting">
        <Button onClick={handleBold}>Bold</Button>
        <Button onClick={handleItalic}>Italic</Button>
      </Toolbar>,
    );

    await clickButton('Italic');

    expect(handleBold).not.toHaveBeenCalled();
    expect(handleItalic).toHaveBeenCalledExactlyOnceWith();
  });

  it('should allow native focus movement among descendant controls', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Toolbar label="Focusable formatting">
        <Button onClick={vi.fn()}>Bold</Button>
        <Button onClick={vi.fn()}>Italic</Button>
      </Toolbar>,
    );

    const toolbar: HTMLElement = getByName('toolbar', 'Focusable formatting');
    const bold: HTMLElement = getByName('button', 'Bold');
    const italic: HTMLElement = getByName('button', 'Italic');

    expect(toolbar).not.toHaveAttribute('tabindex');

    bold.focus();
    expect(bold).toHaveFocus();

    await tab();
    expect(italic).toHaveFocus();
  });

  describe('orientation', (): void => {
    it('should default to horizontal', (): void => {
      const { getByName } = render(
        <Toolbar label="Test default orientation">Test children</Toolbar>,
      );

      const toolbar: HTMLElement = getByName(
        'toolbar',
        'Test default orientation',
      );
      expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should support vertical', (): void => {
      const { getByName } = render(
        <Toolbar label="Test vertical orientation" orientation="vertical">
          Test children
        </Toolbar>,
      );

      const toolbar: HTMLElement = getByName(
        'toolbar',
        'Test vertical orientation',
      );
      expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
});
