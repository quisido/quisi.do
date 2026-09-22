import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { MenuBar } = await importTestedDesignSystem();

describe('MenuBar', (): void => {
  it('should be a menu bar', (): void => {
    const { getByRole } = render(<MenuBar>Test content</MenuBar>);

    const menuBar: HTMLElement = getByRole('menubar');
    expect(menuBar).toMatchTextContent('Test content');
  });

  it('should default to horizontal orientation', (): void => {
    const { getByRole } = render(<MenuBar>Commands</MenuBar>);
    expect(getByRole('menubar')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('should support vertical orientation', (): void => {
    const { getByRole } = render(
      <MenuBar orientation="vertical">Commands</MenuBar>,
    );
    expect(getByRole('menubar')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  // [citation needed]
  it('should preserve keyboard focus for interactive descendants', async (): Promise<void> => {
    const { getByName, tab } = render(
      <MenuBar>
        <button type="button">First command</button>
        <button type="button">Second command</button>
      </MenuBar>,
    );

    await tab();
    expect(getByName('button', 'First command')).toHaveFocus();
    await tab();
    expect(getByName('button', 'Second command')).toHaveFocus();
  });
});
