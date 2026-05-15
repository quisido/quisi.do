import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Strong } = await importTestedDesignSystem();

describe('Strong', (): void => {
  it('should be a strong emphasis', (): void => {
    const { getByRole } = render(<Strong>Test strong</Strong>);
    getByRole('strong');
  });
});
