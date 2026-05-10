import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Math } = await importTestedDesignSystem();

describe('Math', (): void => {
  it('should be math', (): void => {
    const { getByRole } = render(<Math>1 + 1 = 2</Math>);
    const math: HTMLElement = getByRole('math');
    expect(math).toHaveTextContent('1 + 1 = 2');
  });
});
