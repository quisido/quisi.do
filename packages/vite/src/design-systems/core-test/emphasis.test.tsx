import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Emphasis } = await importTestedDesignSystem();

describe('Emphasis', (): void => {
  it('should emphasize text', (): void => {
    const { getByRole } = render(<Emphasis>Test emphasis</Emphasis>);
    const emphasis: HTMLElement = getByRole('emphasis');
    expect(emphasis).toHaveTextContent('Test emphasis');
  });
});
