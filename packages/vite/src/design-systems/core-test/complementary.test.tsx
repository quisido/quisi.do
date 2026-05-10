import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Complementary } = await importTestedDesignSystem();

describe('Complementary', (): void => {
  it('should be complementary content', (): void => {
    const { getByRole } = render(<Complementary>Test content</Complementary>);

    const complementary: HTMLElement = getByRole('complementary');
    expect(complementary).toHaveTextContent('Test content');
  });
});
