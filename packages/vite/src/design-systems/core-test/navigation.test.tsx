import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Navigation } = await importTestedDesignSystem();

describe('Navigation', (): void => {
  it('should be navigation', (): void => {
    const { getByName } = render(
      <Navigation label="Test navigation">Test content</Navigation>,
    );
    getByName('navigation', 'Test navigation');
  });
});
