import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Scrollbar } = await importTestedDesignSystem();

describe('Scrollbar', (): void => {
  it('should expose a focusable scrollbar that controls a viewing area', (): void => {
    const { getByRole, getRoleCount } = render(
      <>
        <div id="test-scrollbar-controls-id">Scrollable content</div>
        <Scrollbar controls="test-scrollbar-controls-id" value={50} />
      </>,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    expect(scrollbar).toHaveAttribute(
      'aria-controls',
      'test-scrollbar-controls-id',
    );
    expect(scrollbar).toHaveAttribute('aria-valuenow', '50');
    expect(scrollbar).toHaveAttribute('tabindex', '0');
    expect(getRoleCount('scrollbar')).toBe(1);
  });

  it('should allow aria-controls to be omitted', (): void => {
    const { getByRole } = render(<Scrollbar value={50} />);

    expect(getByRole('scrollbar')).not.toHaveAttribute('aria-controls');
  });

  it('should default to a vertical scrollbar with a 0 to 100 range', (): void => {
    const { getByRole } = render(<Scrollbar value={1} />);

    const scrollbar: HTMLElement = getByRole('scrollbar');
    expect(scrollbar).toHaveAttribute('aria-disabled', 'false');
    expect(scrollbar).toHaveAttribute('aria-orientation', 'vertical');
    expect(scrollbar).toHaveAttribute('aria-valuemax', '100');
    expect(scrollbar).toHaveAttribute('aria-valuemin', '0');
    expect(scrollbar).toHaveAttribute('aria-valuenow', '1');
  });

  it('should support horizontal orientation and custom range values', (): void => {
    const { getByRole } = render(
      <Scrollbar max={3} min={1} orientation="horizontal" value={2} />,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    expect(scrollbar).toHaveAttribute('aria-orientation', 'horizontal');
    expect(scrollbar).toHaveAttribute('aria-valuemax', '3');
    expect(scrollbar).toHaveAttribute('aria-valuemin', '1');
    expect(scrollbar).toHaveAttribute('aria-valuenow', '2');
  });

  it('should support value text', (): void => {
    const { getByRole } = render(
      <Scrollbar value={25} valueText="Top quarter of results" />,
    );

    expect(getByRole('scrollbar')).toHaveAttribute(
      'aria-valuetext',
      'Top quarter of results',
    );
  });

  it('should reject values below the computed minimum', (): void => {
    const { expectToHaveThrown } = render(<Scrollbar min={10} value={9} />);

    expectToHaveThrown(
      "A scrollbar's value cannot be less than its minimum: 9 < 10",
    );
  });

  it('should reject values above the computed maximum', (): void => {
    const { expectToHaveThrown } = render(<Scrollbar max={10} value={11} />);

    expectToHaveThrown(
      "A scrollbar's value cannot be greater than its maximum: 11 > 10",
    );
  });

  it('should add to and subtract from a vertical value with arrow keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <Scrollbar onChange={handleChange} value={50} />,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    await tab();
    expect(scrollbar).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');
    expect(handleChange).toHaveBeenNthCalledWith(1, 51);
    expect(handleChange).toHaveBeenNthCalledWith(2, 49);
  });

  it('should add to and subtract from a horizontal value with arrow keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <Scrollbar onChange={handleChange} orientation="horizontal" value={50} />,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    await tab();
    expect(scrollbar).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenNthCalledWith(1, 51);
    expect(handleChange).toHaveBeenNthCalledWith(2, 49);
  });

  it('should clamp keyboard changes to the configured range', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole, tab } = render(
      <Scrollbar max={10} min={0} onChange={handleChange} value={10} />,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    await tab();
    expect(scrollbar).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(10);
  });

  it('should expose disabled state without entering the tab ring or changing value', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <Scrollbar disabled onChange={handleChange} value={50} />,
    );

    const scrollbar: HTMLElement = getByRole('scrollbar');
    expect(scrollbar).toHaveAttribute('aria-disabled', 'true');
    expect(scrollbar).toHaveAttribute('tabindex', '-1');
    scrollbar.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
