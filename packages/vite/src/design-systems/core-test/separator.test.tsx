import { userEvent } from 'vitest/browser';
import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Separator, SeparatorWidget } = await importTestedDesignSystem();

describe('Separator', (): void => {
  it('should expose a static structural separator', (): void => {
    const { getByRole, getRoleCount } = render(<Separator />);

    const separator: HTMLElement = getByRole('separator');
    expect(separator.tagName).toBe('HR');
    expect(separator).not.toHaveAttribute('tabindex');
    expect(separator).not.toHaveAttribute('aria-valuenow');
    expect(separator).not.toHaveAttribute('aria-valuemin');
    expect(separator).not.toHaveAttribute('aria-valuemax');
    expect(getRoleCount('separator')).toBe(1);
  });

  it('should separate sections of content without entering the tab order', async (): Promise<void> => {
    const { getByRole, tab } = render(
      <>
        <section aria-label="Overview">Overview content</section>
        <Separator />
        <section aria-label="Details">Details content</section>
      </>,
    );

    const separator: HTMLElement = getByRole('separator');
    expect(separator.previousElementSibling).toHaveTextContent('Overview');
    expect(separator.nextElementSibling).toHaveTextContent('Details');
    await tab();
    expect(separator).not.toHaveFocus();
  });

  it('should support vertical static separators', (): void => {
    const { getByRole } = render(<Separator orientation="vertical" />);

    expect(getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('should expose a focusable separator widget with a current value', (): void => {
    const { getByName, getRoleCount } = render(
      <SeparatorWidget
        label="Resize navigation"
        max={300}
        min={100}
        value={180}
      />,
    );

    const separator: HTMLElement = getByName('separator', 'Resize navigation');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(separator).toHaveAttribute('aria-valuemax', '300');
    expect(separator).toHaveAttribute('aria-valuemin', '100');
    expect(separator).toHaveAttribute('aria-valuenow', '180');
    expect(separator).toHaveAttribute('tabindex', '0');
    expect(getRoleCount('separator')).toBe(1);
  });

  it('should default focusable separator widget range to 0 through 100', (): void => {
    const { getByRole } = render(<SeparatorWidget value={50} />);

    const separator: HTMLElement = getByRole('separator');
    expect(separator).toHaveAttribute('aria-valuemax', '100');
    expect(separator).toHaveAttribute('aria-valuemin', '0');
    expect(separator).toHaveAttribute('aria-valuenow', '50');
  });

  it('should support visible labels and value text for separator widgets', (): void => {
    const { getByName } = render(
      <>
        <span id="resize-label">Resize editor panes</span>
        <SeparatorWidget
          labelledBy="resize-label"
          value={60}
          valueText="Primary pane is wider"
        />
      </>,
    );

    const separator: HTMLElement = getByName(
      'separator',
      'Resize editor panes',
    );
    expect(separator).toHaveAttribute('aria-labelledby', 'resize-label');
    expect(separator).toHaveAttribute(
      'aria-valuetext',
      'Primary pane is wider',
    );
  });

  it('should reject widget values below the computed minimum', (): void => {
    const { expectToHaveThrown } = render(
      <SeparatorWidget min={10} value={9} />,
    );

    expectToHaveThrown(
      "A separator's value cannot be less than its minimum: 9 < 10",
    );
  });

  it('should reject widget values above the computed maximum', (): void => {
    const { expectToHaveThrown } = render(
      <SeparatorWidget max={10} value={11} />,
    );

    expectToHaveThrown(
      "A separator's value cannot be greater than its maximum: 11 > 10",
    );
  });

  it('should move horizontal separator widgets with arrow keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <SeparatorWidget onChange={handleChange} value={50} />,
    );

    const separator: HTMLElement = getByRole('separator');
    await tab();
    expect(separator).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenNthCalledWith(1, 51);
    expect(handleChange).toHaveBeenNthCalledWith(2, 49);
  });

  it('should move vertical separator widgets with arrow keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <SeparatorWidget
        onChange={handleChange}
        orientation="vertical"
        value={50}
      />,
    );

    const separator: HTMLElement = getByRole('separator');
    await tab();
    expect(separator).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenNthCalledWith(1, 51);
    expect(handleChange).toHaveBeenNthCalledWith(2, 49);
  });

  it('should clamp separator widget keyboard changes to the configured range', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <SeparatorWidget max={10} min={0} onChange={handleChange} value={10} />,
    );

    const separator: HTMLElement = getByRole('separator');
    await tab();
    expect(separator).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(10);
  });

  it('should expose disabled separator widgets without moving them', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <SeparatorWidget disabled onChange={handleChange} value={50} />,
    );

    const separator: HTMLElement = getByRole('separator');
    expect(separator).toHaveAttribute('aria-disabled', 'true');
    expect(separator).toHaveAttribute('tabindex', '-1');
    separator.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
