import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Superscript } = await importTestedDesignSystem();

describe('Superscript', (): void => {
  it('should be a superscript', (): void => {
    const { getByRole } = render(<Superscript>Test superscript</Superscript>);
    getByRole('superscript');
  });
});
