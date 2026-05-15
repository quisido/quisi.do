import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Marquee } = await importTestedDesignSystem();

describe('Marquee', (): void => {
  it('should be a marquee', (): void => {
    const { getByRole } = render(<Marquee>Test content</Marquee>);

    const marquee: HTMLElement = getByRole('marquee');
    expect(marquee).toHaveTextContent('Test content');
  });
});
