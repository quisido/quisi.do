import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { SectionFooter } = await importTestedDesignSystem();

describe('SectionFooter', (): void => {
  it('should be a section footer', (): void => {
    const { getByRole } = render(<SectionFooter>Test content</SectionFooter>);
    const sectionFooter: HTMLElement = getByRole('sectionfooter');
    expect(sectionFooter).toHaveTextContent('Test content');
  });
});
