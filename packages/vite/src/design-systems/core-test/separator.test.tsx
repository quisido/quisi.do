import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Separator } = await importTestedDesignSystem();

describe('Separator', (): void => {
  it('should be a separator', (): void => {
    const { getByRole } = render(<Separator />);
    getByRole('separator');
  });
});
