import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { SeparatorWidget } = await importTestedDesignSystem();

describe('SeparatorWidget', (): void => {
  it('should be a separator', (): void => {
    const { getByRole } = render(<SeparatorWidget max={3} min={1} value={2} />);
    const separator: HTMLElement = getByRole('separator');
    expect(separator).toHaveAttribute('aria-valuemax', '3');
    expect(separator).toHaveAttribute('aria-valuemin', '1');
    expect(separator).toHaveAttribute('aria-valuenow', '2');
  });

  it('should have defaults', (): void => {
    const { getByRole } = render(<SeparatorWidget value={50} />);
    getByRole('separator');
  });
});
