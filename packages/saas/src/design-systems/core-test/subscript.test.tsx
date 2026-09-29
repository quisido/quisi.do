import { describe, it } from 'vitest';

import importTestedDesignSystem from './import-tested-design-system.js';
import render from './render.js';

const { Subscript } = await importTestedDesignSystem();

describe('Subscript', (): void => {
  it('should be a subscript', (): void => {
    const { getByRole } = render(<Subscript>Test subscript</Subscript>);
    getByRole('subscript');
  });
});
